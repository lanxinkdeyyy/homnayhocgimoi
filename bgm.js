/* Nhạc nền không lời tự tổng hợp bằng Web Audio (không cần file nhạc).
   BGM.play("era1".."era6" | "study" | "off"), BGM.toggle(). Nút 🔊/🔇 ở góc màn hình. */
(function() {
"use strict";
var AC = null, bus = null, cur = null, wanted = "off", timer = null, nextT = 0, stepN = 0, unlocked = false;
var enabled = true;
try { if (localStorage.getItem("bgmOn") === "0") enabled = false; } catch (e) {}
var LOOK = 0.6;

function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
function getCtx() {
  if (!AC) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); }
  return AC;
}
var noiseBuf = null;
function noise() {
  if (noiseBuf) return noiseBuf;
  noiseBuf = AC.createBuffer(1, AC.sampleRate * 0.5, AC.sampleRate);
  var d = noiseBuf.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}

/* ---- âm sắc ---- */
function env(g, t, a, d, v, rel) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d + (rel || 0)); }
function osc(type, f, t, dur) { var o = AC.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); o.start(t); o.stop(t + dur + 0.1); return o; }
function pluck(f, t, d, v) { var o = osc("triangle", f, t, d), g = AC.createGain(); env(g, t, 0.004, d, v); o.connect(g); g.connect(bus);
  var o2 = osc("sine", f * 2, t, d * 0.5), g2 = AC.createGain(); env(g2, t, 0.003, d * 0.4, v * 0.35); o2.connect(g2); g2.connect(bus); }
function bell(f, t, d, v) { [[1, 1], [2.76, 0.25], [5.4, 0.08]].forEach(function(p) { var o = osc("sine", f * p[0], t, d), g = AC.createGain(); env(g, t, 0.003, d * (p[0] > 1 ? 0.5 : 1), v * p[1]); o.connect(g); g.connect(bus); }); }
function flute(f, t, d, v) { var o = osc("sine", f, t, d + 0.3), g = AC.createGain(), l = osc("sine", 5, t, d + 0.3), lg = AC.createGain();
  lg.gain.value = f * 0.008; l.connect(lg); lg.connect(o.frequency);
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.18); g.gain.setValueAtTime(v, t + d); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.3);
  o.connect(g); g.connect(bus);
  var n = AC.createBufferSource(); n.buffer = noise(); var bp = AC.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = f * 2; var ng = AC.createGain(); env(ng, t, 0.05, d * 0.5, v * 0.06); n.connect(bp); bp.connect(ng); ng.connect(bus); n.start(t); n.stop(t + d); }
function pad(f, t, d, v, bright) { [-6, 6].forEach(function(det) { var o = osc("sawtooth", f, t, d + 1.5); o.detune.value = det; var fl = AC.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = bright || 700; var g = AC.createGain();
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + Math.min(1.2, d * 0.4)); g.gain.setValueAtTime(v, t + d); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 1.4);
  o.connect(fl); fl.connect(g); g.connect(bus); }); }
function epiano(f, t, d, v) { var o = osc("sine", f, t, d), g = AC.createGain(); env(g, t, 0.006, d, v); o.connect(g); g.connect(bus);
  var o2 = osc("sine", f * 2, t, d), g2 = AC.createGain(); env(g2, t, 0.004, d * 0.35, v * 0.4); o2.connect(g2); g2.connect(bus);
  var o3 = osc("triangle", f * 4, t, 0.25), g3 = AC.createGain(); env(g3, t, 0.002, 0.15, v * 0.1); o3.connect(g3); g3.connect(bus); }
function bass(f, t, d, v, type, cut) { var o = osc(type || "triangle", f, t, d), fl = AC.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = cut || 500; var g = AC.createGain(); env(g, t, 0.01, d, v); o.connect(fl); fl.connect(g); g.connect(bus); }
function arp(f, t, d, v) { var o = osc("sawtooth", f, t, d), fl = AC.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.setValueAtTime(2200, t); fl.frequency.exponentialRampToValueAtTime(500, t + d); var g = AC.createGain(); env(g, t, 0.004, d, v); o.connect(fl); fl.connect(g); g.connect(bus); }
function wood(t, v, f) { var o = osc("sine", f || 900, t, 0.1); o.frequency.exponentialRampToValueAtTime((f || 900) * 0.6, t + 0.06); var g = AC.createGain(); env(g, t, 0.002, 0.06, v); o.connect(g); g.connect(bus); }
function kick(t, v) { var o = osc("sine", 120, t, 0.25); o.frequency.exponentialRampToValueAtTime(40, t + 0.2); var g = AC.createGain(); env(g, t, 0.003, 0.2, v); o.connect(g); g.connect(bus); }
function hat(t, v, len) { var n = AC.createBufferSource(); n.buffer = noise(); var hp = AC.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 7000; var g = AC.createGain(); env(g, t, 0.002, len || 0.04, v); n.connect(hp); hp.connect(g); g.connect(bus); n.start(t); n.stop(t + 0.1); }

/* ---- các bản nhạc: spb = giây mỗi bước, step(i, t) lên lịch nốt ---- */
function walk(state, scale, lo, hi) { state.i = Math.max(lo, Math.min(hi, state.i + rnd([-2, -1, -1, 0, 1, 1, 2]))); return scale[state.i]; }
function scaleOf(root, ivs, oct) { var a = []; for (var o = 0; o < oct; o++) ivs.forEach(function(x) { a.push(root + x + 12 * o); }); return a; }

var TRACKS = {
  /* 1. Cổ phong mực nước – đàn tranh, sáo, chậm rãi (ngũ cung Re) */
  era1: (function() { var sc = scaleOf(50, [0, 2, 4, 7, 9], 4), st = { i: 8 };
    return { spb: 0.28, step: function(i, t) {
      if (i % 32 === 0) { pad(mtof(38), t, 8, 0.05, 400); pad(mtof(45), t, 8, 0.035, 400); }
      if (i % 2 === 0 && Math.random() < 0.85) pluck(mtof(walk(st, sc, 4, 15)), t, 0.9, 0.16);
      if (i % 8 === 0) pluck(mtof(sc[rnd([0, 1, 2, 3])] - 0), t, 1.6, 0.12);
      if (i % 4 === 2) wood(t, 0.05, 1000);
      if (i % 16 === 6 && Math.random() < 0.7) flute(mtof(sc[rnd([8, 9, 10, 11])] + 12), t, 1.4, 0.07);
    } }; })(),
  /* 2. Thịnh Đường rực sắc – chuông, đàn tỳ bà, sáng và uy nghi (ngũ cung Đô) */
  era2: (function() { var sc = scaleOf(60, [0, 2, 4, 7, 9], 3), st = { i: 5 }, prog = [[48, 55, 64], [45, 52, 60], [41, 48, 57], [43, 50, 59]];
    return { spb: 0.2, step: function(i, t) {
      var ch = prog[Math.floor(i / 16) % 4];
      if (i % 16 === 0) ch.forEach(function(m) { pad(mtof(m), t, 5, 0.04, 900); });
      if (i % 2 === 0) bell(mtof(ch[(i / 2) % 3] + 24), t, 0.9, 0.05);
      if (i % 4 === 2) wood(t, 0.045, 1100);
      if (i % 4 === 0 && Math.random() < 0.9) pluck(mtof(walk(st, sc, 3, 13)), t, 0.6, 0.15);
      if (i % 16 === 0) bass(mtof(ch[0] - 12), t, 3, 0.18);
    } }; })(),
  /* 3. Giang Nam nhã uyển – sáo trúc, nước chảy, êm dịu (ngũ cung Sol) */
  era3: (function() { var sc = scaleOf(55, [0, 2, 4, 7, 9], 3), st = { i: 7 };
    return { spb: 0.32, step: function(i, t) {
      if (i % 24 === 0) { pad(mtof(43), t, 7, 0.045, 500); pad(mtof(50), t, 7, 0.03, 500); }
      if (i % 2 === 0) pluck(mtof(sc[(i / 2 * 2) % 10 + 3]), t, 0.8, 0.1);
      if (i % 6 === 3) wood(t, 0.04, 950);
      if (i % 12 === 0 && Math.random() < 0.9) { var n = mtof(walk(st, sc, 5, 13) + 12); flute(n, t, 1.8, 0.09); }
      if (i % 12 === 6 && Math.random() < 0.6) flute(mtof(walk(st, sc, 5, 13) + 12), t, 1.0, 0.07);
    } }; })(),
  /* 4. Dân quốc tân thời – jazz Thượng Hải, swing */
  era4: (function() { var prog = [[48, 52, 55, 59], [45, 48, 52, 55], [50, 53, 57, 60], [43, 47, 50, 53]], sc = [60, 62, 63, 64, 67, 69, 72, 74, 75, 76], st = { i: 4 };
    return { spb: 0.125, step: function(i, t) {
      var bar = Math.floor(i / 12) % 4, ch = prog[bar], k = i % 12, sw = (k % 3 === 2) ? 0.04 : 0;
      if (k === 0 || k === 6) ch.forEach(function(m, j) { epiano(mtof(m + 12), t + j * 0.012, 1.2, 0.05); });
      if (k % 3 === 0) bass(mtof(ch[0] - 12 + rnd([0, 0, 7, 0])), t, 0.5, 0.2);
      if (k % 3 === 0 || k % 3 === 2) hat(t + sw, k % 3 === 0 ? 0.03 : 0.015, 0.05);
      if ((k % 3 === 0 || k % 3 === 2) && Math.random() < 0.65) epiano(mtof(walk(st, sc, 0, 9)), t + sw, 0.5, 0.08);
    } }; })(),
  /* 5. Đô thị nghê hồng – synthwave */
  era5: (function() { var prog = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]];
    return { spb: 0.15, step: function(i, t) {
      var ch = prog[Math.floor(i / 16) % 4], k = i % 16;
      arp(mtof(ch[[0, 1, 2, 1][k % 4]] + 12 * (1 + (k % 8 > 3 ? 1 : 0))), t, 0.18, 0.07);
      if (k % 2 === 0) bass(mtof(ch[0] - 24), t, 0.28, 0.2, "sawtooth", 380);
      if (k % 8 === 0) kick(t, 0.28);
      if (k % 4 === 2) hat(t, 0.025, 0.04);
      if (k === 0) pad(mtof(ch[1]), t, 2.4, 0.03, 900);
    } }; })(),
  /* 6. Tương lai huyền cảnh – ambient, chuông thủy tinh */
  era6: (function() { var prog = [[53, 60, 64, 69], [52, 59, 64, 67], [50, 57, 62, 65], [48, 55, 62, 64]], sc = scaleOf(72, [0, 2, 4, 7, 9], 2), st = { i: 4 };
    return { spb: 0.4, step: function(i, t) {
      var ch = prog[Math.floor(i / 12) % 4];
      if (i % 12 === 0) ch.forEach(function(m) { pad(mtof(m), t, 5, 0.03, 1200); });
      if (Math.random() < 0.6) bell(mtof(walk(st, sc, 0, 9)), t, 1.8, 0.05);
      if (i % 4 === 0) bell(mtof(ch[(i / 4) % 4] + 24), t, 3.4, 0.03);
    } }; })(),
  /* Học bài / ôn bài / bài tập – lofi êm để tập trung */
  study: (function() { var prog = [[48, 52, 55, 59], [45, 48, 52, 55], [41, 45, 48, 52], [43, 47, 50, 53]], sc = [72, 74, 76, 79, 81, 84], st = { i: 2 };
    return { spb: 0.2, step: function(i, t) {
      var ch = prog[Math.floor(i / 16) % 4], k = i % 16;
      if (k === 0 || k === 10) ch.forEach(function(m, j) { epiano(mtof(m + 12), t + j * 0.015, 1.8, 0.045); });
      if (k === 0 || k === 8) bass(mtof(ch[0] - 12), t, 1.2, 0.16, "sine", 300);
      if (k === 0 || k === 10) kick(t, 0.12);
      if (k % 4 === 2) hat(t, 0.012, 0.05);
      if (k % 2 === 0 && Math.random() < 0.55) epiano(mtof(walk(st, sc, 0, 5)), t, 0.8, 0.05);
    } }; })()
};

/* ---- bộ lập lịch ---- */
function tick() {
  if (!cur || !AC) return;
  while (nextT < AC.currentTime + LOOK) { cur.def.step(stepN, nextT); nextT += cur.def.spb; stepN++; }
}
function stopCur() {
  if (!cur) return;
  var old = cur; cur = null; clearInterval(timer); timer = null;
  try { old.bus.gain.cancelScheduledValues(AC.currentTime); old.bus.gain.setValueAtTime(old.bus.gain.value, AC.currentTime); old.bus.gain.linearRampToValueAtTime(0.0001, AC.currentTime + 0.9); } catch (e) {}
  setTimeout(function() { try { old.bus.disconnect(); } catch (e) {} }, 4500);
}
function startTrack(id) {
  var def = TRACKS[id]; if (!def || !getCtx()) return;
  stopCur();
  var b = AC.createGain(); b.gain.setValueAtTime(0.0001, AC.currentTime); b.gain.linearRampToValueAtTime(0.5, AC.currentTime + 1.5); b.connect(AC.destination);
  bus = b; cur = { id: id, def: def, bus: b }; stepN = 0; nextT = AC.currentTime + 0.1;
  timer = setInterval(tick, 120); tick();
}
function apply() {
  if (!enabled || wanted === "off" || !unlocked) { stopCur(); return; }
  if (AC && AC.state === "suspended") AC.resume();
  if (!cur || cur.id !== wanted) startTrack(wanted);
}

/* ---- nút bật/tắt ---- */
var btn = null;
function paintBtn() { if (!btn) return; btn.textContent = enabled ? "🎵" : "🔇"; btn.title = enabled ? "Tắt nhạc nền" : "Bật nhạc nền"; btn.setAttribute("aria-label", btn.title); btn.style.opacity = enabled ? "1" : ".75"; }
function makeBtn() {
  if (btn || !document.body) return;
  btn = document.createElement("button"); btn.type = "button"; btn.id = "bgmToggle";
  btn.style.cssText = "position:fixed;left:14px;bottom:84px;z-index:99999;width:46px;height:46px;border-radius:50%;border:3px solid #d9b86c;background:#fff7e0;font-size:22px;line-height:1;cursor:pointer;box-shadow:0 3px 0 #b9964a,0 4px 12px rgba(0,0,0,.25);padding:0";
  btn.addEventListener("click", function() { unlocked = true; toggle(); });
  document.body.appendChild(btn); paintBtn();
}
function toggle() { enabled = !enabled; try { localStorage.setItem("bgmOn", enabled ? "1" : "0"); } catch (e) {} paintBtn(); if (enabled) { getCtx(); } apply(); }
function unlock() { if (unlocked) return; unlocked = true; getCtx(); apply(); }
["pointerdown", "keydown", "touchstart"].forEach(function(ev) { window.addEventListener(ev, unlock, { once: false, passive: true }); });
document.addEventListener("visibilitychange", function() { if (!AC) return; if (document.hidden) AC.suspend(); else if (enabled && unlocked && wanted !== "off") AC.resume(); });
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", makeBtn); else makeBtn();

window.BGM = { play: function(id) { wanted = id || "off"; apply(); }, stop: function() { wanted = "off"; apply(); }, toggle: toggle, isOn: function() { return enabled; }, tracks: Object.keys(TRACKS) };
})();
