/* =====================================================================
   VƯƠNG QUỐC HÁN TỰ — đồ họa minh họa (canvas 1000×560), vẽ bằng code
   6 thời đại: 水墨古风 · 盛唐华彩 · 江南雅苑 · 民国摩登 · 都市霓虹 · 未来幻境
   KingdomArt.draw(ctx, era, levels, selectedId, tMs)
   levels: { palace:0-3, library:.., garden:.., market:.., pavilion:.., gate:.. }
   KingdomArt.SLOTS: vùng bấm cho từng công trình (toạ độ 1000×560)
   ===================================================================== */
(function() {
"use strict";

var W = 1000, H = 560, HZ = 250;
var SLOTS = {
    palace:   { x: 500, y: 318, w: 300, h: 220 },
    library:  { x: 185, y: 335, w: 170, h: 190 },
    garden:   { x: 815, y: 335, w: 200, h: 170 },
    pavilion: { x: 205, y: 480, w: 150, h: 150 },
    market:   { x: 805, y: 482, w: 200, h: 150 },
    gate:     { x: 500, y: 535, w: 230, h: 150 }
};
var DRAW_ORDER = ["palace", "library", "garden", "pavilion", "market", "gate"];

var ctx;
/* ---------- tiện ích vẽ ---------- */
function lg(x0, y0, x1, y1, stops) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    stops.forEach(function(s) { g.addColorStop(s[0], s[1]); });
    return g;
}
function rect(x, y, w, h, fill) { ctx.fillStyle = fill; ctx.fillRect(x, y, w, h); }
function rrect(x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
}
function poly(pts, fill, stroke, lw) {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1.5; ctx.stroke(); }
}
function ell(x, y, rx, ry, fill) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); }
function shadow(x, y, w) { ell(x, y, w / 2, w / 9, "rgba(20,25,10,.28)"); }
function glow(color, blur, fn) { ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = blur; fn(); ctx.restore(); }
function rnd(seed) { var x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function text(str, x, y, size, color, font) {
    ctx.font = "bold " + size + "px " + (font || '"HanKai","KaiTi","STKaiti",serif');
    ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = color; ctx.fillText(str, x, y);
}

/* khối hộp 3/4: mặt trước + mặt bên phải + mặt trên */
function box(x, y, w, h, d, cF, cS, cT) {
    poly([[x + w, y], [x + w + d, y - d * 0.45], [x + w + d, y - h - d * 0.45], [x + w, y - h]], cS);
    poly([[x, y - h], [x + w, y - h], [x + w + d, y - h - d * 0.45], [x + d, y - h - d * 0.45]], cT || cF);
    ctx.fillStyle = cF; ctx.fillRect(x, y - h, w, h);
}

/* mái kiểu Trung Hoa: cong, vểnh góc */
function chRoof(cx, y, w, h, over, c1, c2, trim) {
    var x0 = cx - w / 2 - over, x1 = cx + w / 2 + over;
    ctx.beginPath();
    ctx.moveTo(x0, y - 8);
    ctx.quadraticCurveTo(x0 + 18, y + 6, cx - w * 0.28, y + 2);
    ctx.lineTo(cx + w * 0.28, y + 2);
    ctx.quadraticCurveTo(x1 - 18, y + 6, x1, y - 8);
    ctx.quadraticCurveTo(x1 - 40, y - 4, cx + w * 0.30, y - h);
    ctx.lineTo(cx - w * 0.30, y - h);
    ctx.quadraticCurveTo(x0 + 40, y - 4, x0, y - 8);
    ctx.closePath();
    ctx.fillStyle = lg(0, y - h, 0, y + 4, [[0, c1], [1, c2]]);
    ctx.fill();
    /* hàng ngói */
    ctx.strokeStyle = "rgba(0,0,0,.18)"; ctx.lineWidth = 1;
    for (var i = 1; i < 9; i++) {
        var u = i / 9;
        ctx.beginPath(); ctx.moveTo(x0 + (cx - w * 0.30 - x0) * u * 0.9 + 6, y - 4 - (h - 4) * u * 0.0);
        ctx.lineTo(cx - w * 0.30 + (w * 0.60) * u, y - h);
        ctx.stroke();
    }
    ctx.fillStyle = trim; ctx.fillRect(cx - w * 0.30, y - h - 4, w * 0.60, 5);              /* sống mái */
    ctx.beginPath(); ctx.moveTo(x0, y - 8); ctx.quadraticCurveTo(x0 + 18, y + 6, cx - w * 0.28, y + 2); ctx.lineTo(cx + w * 0.28, y + 2);
    ctx.quadraticCurveTo(x1 - 18, y + 6, x1, y - 8); ctx.strokeStyle = trim; ctx.lineWidth = 3; ctx.stroke();
    ell(x0 + 1, y - 10, 5, 3, trim); ell(x1 - 1, y - 10, 5, 3, trim);
}
function lantern(x, y, r, c, t, ph) {
    var s = Math.sin((t || 0) / 500 + (ph || 0)) * 1.5;
    ctx.strokeStyle = "#3a2a1a"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y - r - 8); ctx.lineTo(x + s * 0.3, y - r); ctx.stroke();
    glow(c, 12, function() { ell(x + s * 0.3, y, r * 0.8, r, c); });
    ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(x - 1 + s * 0.3, y - r, 2, r * 2);
}
function window2(x, y, w, h, c, frame) { rect(x, y, w, h, c); ctx.strokeStyle = frame; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h); ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2); ctx.stroke(); }
function tree(x, y, r, c1, c2, sway) {
    ctx.fillStyle = "#6b4a2a"; ctx.fillRect(x - 3, y - r * 0.9, 6, r * 0.9);
    var o = Math.sin(sway || 0) * 1.5;
    ell(x + o, y - r * 1.25, r * 0.9, r * 0.8, c1);
    ell(x - r * 0.45 + o, y - r * 0.9, r * 0.6, r * 0.55, c2);
    ell(x + r * 0.5 + o, y - r * 1.0, r * 0.55, r * 0.5, c2);
    ell(x + o - r * 0.15, y - r * 1.5, r * 0.4, r * 0.3, "rgba(255,255,255,.18)");
}

/* ===================================================================
   PHÔNG NỀN THEO THỜI ĐẠI
   =================================================================== */
var THEME = {
    1: { sky: ["#f4efe2", "#e3dccb"], ground: ["#cfd6c0", "#aab59a"], mount: ["#9aa19b", "#b9bdb5", "#d4d6cf"], path: "#e6dcc3", pathE: "#cbbf9f", sun: "#c4382c" },
    2: { sky: ["#ffd9a0", "#ffb36b"], ground: ["#c9d48a", "#9bb65a"], mount: ["#9a6a9a", "#b9829a", "#d9a199"], path: "#f2d899", pathE: "#d4b266", sun: "#fff0b3" },
    3: { sky: ["#cfe8ef", "#eaf4ee"], ground: ["#a9d08a", "#7fb86a"], mount: ["#8fb5a8", "#a9c9b7", "#c6dccb"], path: "#e9e4d6", pathE: "#cfc8b4", sun: "#fffbe0" },
    4: { sky: ["#f2d6a2", "#d9a77c"], ground: ["#8fa874", "#6c8a58"], mount: ["#9b7e6a", "#b69685", "#cfb09b"], path: "#d7c8a6", pathE: "#b8a883", sun: "#fff1c9" },
    5: { sky: ["#3b5a9a", "#ffbe85"], ground: ["#6a6f7c", "#454955"], mount: ["#5c6a98", "#7a82ab", "#9a98b8"], path: "#b9bcc6", pathE: "#8d909c", sun: "#ffe7b8" },
    6: { sky: ["#2f56b8", "#c4ecff"], ground: ["#d5ecf0", "#93b8cc"], mount: ["#9ec6e0", "#b9dcee", "#d3eaf6"], path: "#f4fbff", pathE: "#7fd8ee", sun: "#fff6d0" }
};

function drawSky(era, t) {
    var th = THEME[era];
    ctx.fillStyle = lg(0, 0, 0, HZ + 40, [[0, th.sky[0]], [1, th.sky[1]]]); ctx.fillRect(0, 0, W, HZ + 60);
    if (false) {
        for (var i = 0; i < 90; i++) { var tw = 0.5 + 0.5 * Math.sin(t / 700 + i); ctx.fillStyle = "rgba(255,255,255," + (0.25 + 0.5 * tw) + ")"; ctx.fillRect(rnd(i) * W, rnd(i + 99) * 200, 2, 2); }
    }
    /* mặt trời / trăng */
    var sx = era === 2 ? 760 : era === 4 ? 300 : 820, sy = era === 2 ? 150 : 90;
    if (era === 5) { glow("#ffcf8a", 90, function() { ell(sx - 120, HZ - 40, 46, 46, th.sun); }); }
    else glow("#fff2b0", 60, function() { ell(sx, sy, 38, 38, th.sun); });
    if (era === 1) { ell(sx, sy, 38, 38, th.sun); ctx.globalAlpha = 0.25; ell(sx, sy, 56, 56, th.sun); ctx.globalAlpha = 1; }
    /* mây */
    for (var k = 0; k < 4; k++) {
        var cx = ((t / (30 + k * 12) + k * 260) % (W + 300)) - 150, cy = 40 + k * 38;
        ctx.globalAlpha = era === 6 ? 0.25 : era === 1 ? 0.6 : 0.8;
        ell(cx, cy, 60, 14, "#fff"); ell(cx - 30, cy + 4, 36, 10, "#fff"); ell(cx + 34, cy + 5, 38, 10, "#fff");
        ctx.globalAlpha = 1;
    }
}


function mountains(era, t) {
    var th = THEME[era], m = th.mount, i;
    if (era === 5) { cityModern(t); return; }
    if (era === 6) { cityFuture(t); return; }
    if (era === 4) { cityRepublic(t); return; }
    for (var L = 0; L < 3; L++) {
        ctx.beginPath(); ctx.moveTo(0, HZ + 20);
        for (var x2 = 0; x2 <= W; x2 += 20) {
            var yy = HZ - 30 - L * 38 + Math.sin(x2 / (110 + L * 40) + L * 2) * (36 - L * 6) + Math.sin(x2 / 37 + L) * 6;
            if (era === 6) yy -= 20 + Math.abs(Math.sin(x2 / 90 + L)) * 30;
            ctx.lineTo(x2, yy);
        }
        ctx.lineTo(W, HZ + 20); ctx.closePath();
        ctx.fillStyle = m[2 - L]; ctx.fill();
        if (era === 1) {                                         /* sương mù thủy mặc */
            ctx.fillStyle = lg(0, HZ - 80 - L * 30, 0, HZ + 10 - L * 8, [[0, "rgba(244,239,226,0)"], [1, "rgba(244,239,226,.8)"]]); ctx.fillRect(0, HZ - 90 - L * 30, W, 100);
        }
    }
}


/* ===================================================================
   THỜI DÂN QUỐC — phố thị thập niên 1920–30: dãy nhà phố, tháp đồng hồ,
   ống khói, cột điện, xe điện, xe kéo (vẽ riêng, không theo tác phẩm nào)
   =================================================================== */
var SHOPS = ["#b5654a", "#e6d5b1", "#6f9a82", "#8497ae", "#d19b52", "#c9826a"];
var SHOP_SIGN = ["茶", "酒", "布", "药", "書", "旅", "糕", "鐘"];
function cityRepublic(t) {
    var base = HZ, i;
    /* trời hoàng hôn: tia nắng + khinh khí cầu */
    ctx.save(); ctx.globalAlpha = 0.16;
    for (i = 0; i < 7; i++) { ctx.fillStyle = "#fff1c9"; ctx.beginPath(); ctx.moveTo(300, 90); ctx.lineTo(300 + (i - 3) * 190 - 40, base); ctx.lineTo(300 + (i - 3) * 190 + 40, base); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    var zx = ((t / 60) % (W + 300)) - 150, zy = 60 + Math.sin(t / 1200) * 4;
    ell(zx, zy, 46, 14, "#cfc0a8"); ell(zx, zy - 3, 40, 8, "rgba(255,255,255,.35)"); rect(zx - 8, zy + 11, 16, 6, "#6b5a48"); poly([[zx + 40, zy], [zx + 56, zy - 8], [zx + 56, zy + 8]], "#b89f84");
    /* lớp xa: nhà cao tầng art-deco */
    ctx.globalAlpha = 0.55;
    for (i = 0; i < 24; i++) {
        var w = 26 + rnd(i * 3) * 26, h = 90 + rnd(i + 9) * 130, x = i * 44 - 10, c = i % 2 ? "#9a8f9c" : "#8a8296";
        rect(x, base - h, w, h, c);
        if (i % 3 === 0) poly([[x + 2, base - h], [x + w / 2, base - h - 30], [x + w - 2, base - h]], "#7d7488");
        if (i % 4 === 1) { rect(x + w / 2 - 1, base - h - 40, 2, 40, "#7d7488"); rect(x + 3, base - h, w - 6, 5, "#a89fb0"); }
        for (var wy = base - h + 10; wy < base - 8; wy += 14) rect(x + 5, wy, 3, 6, "rgba(255,226,150,.55)"), rect(x + w - 9, wy, 3, 6, "rgba(255,226,150,.55)");
    }
    ctx.globalAlpha = 1;
    /* tháp đồng hồ + nhà thờ làm điểm nhấn */
    rect(120, base - 190, 44, 190, "#c9b99a"); rect(116, base - 196, 52, 10, "#8f7c5c"); poly([[116, base - 196], [142, base - 238], [168, base - 196]], "#6a4a3a");
    ell(142, base - 160, 15, 15, "#f6efdc"); ctx.strokeStyle = "#3a2a1a"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(142, base - 160, 15, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(142, base - 160); ctx.lineTo(142 + Math.cos(t / 3000) * 9, base - 160 + Math.sin(t / 3000) * 9); ctx.moveTo(142, base - 160); ctx.lineTo(142, base - 172); ctx.stroke();
    rect(840, base - 150, 60, 150, "#d8c8aa"); poly([[836, base - 150], [870, base - 232], [904, base - 150]], "#7a5340"); rect(868, base - 258, 4, 28, "#4a3a2a"); rect(861, base - 248, 18, 4, "#4a3a2a");
    ctx.beginPath(); ctx.arc(870, base - 108, 14, Math.PI, 0); ctx.lineTo(884, base - 80); ctx.lineTo(856, base - 80); ctx.closePath(); ctx.fillStyle = "#3a5a8a"; ctx.fill();
    /* dãy nhà phố thương mại */
    var x2 = -14, n = 0;
    while (x2 < W + 20) {
        var bw = 70 + Math.floor(rnd(n + 3) * 3) * 12, bh = 72 + Math.floor(rnd(n * 5 + 1) * 4) * 18, col = SHOPS[n % SHOPS.length];
        if ((x2 > 100 && x2 < 175) || (x2 > 810 && x2 < 910)) { x2 += bw + 4; n++; continue; }
        rect(x2, base - bh, bw, bh, col); rect(x2, base - bh, bw, 6, "rgba(255,255,255,.28)"); rect(x2 + bw - 5, base - bh, 5, bh, "rgba(0,0,0,.14)");
        if (n % 3 === 0) { poly([[x2 - 4, base - bh], [x2 + bw / 2, base - bh - 20], [x2 + bw + 4, base - bh]], "#5a4034"); } else { rect(x2 - 3, base - bh - 6, bw + 6, 8, "#4a3a30"); for (var b2 = 0; b2 < bw; b2 += 10) rect(x2 + b2, base - bh - 10, 5, 5, "#4a3a30"); }
        var fl = Math.floor((bh - 30) / 28);
        for (var f = 0; f < fl; f++) for (var wx = x2 + 9; wx < x2 + bw - 16; wx += 24) {
            var wy = base - bh + 12 + f * 28, lit = rnd(wx * 0.37 + f + n) > 0.4, flick = lit && rnd(Math.floor(t / 900) + wx) > 0.93 ? 0.5 : 1;
            ctx.beginPath(); ctx.moveTo(wx, wy + 16); ctx.lineTo(wx, wy + 6); ctx.arc(wx + 6, wy + 6, 6, Math.PI, 0); ctx.lineTo(wx + 12, wy + 16); ctx.closePath();
            ctx.fillStyle = lit ? "rgba(255,214,120," + flick + ")" : "#2f3e50"; ctx.fill(); ctx.strokeStyle = "#f1e6cf"; ctx.lineWidth = 1.6; ctx.stroke();
            if (f % 2 === 1) rect(wx - 2, wy + 16, 16, 3, "#3a3a3a");
        }
        var aw = n % 2 ? "#2e6b4f" : "#c0392b";
        for (var k2 = 0; k2 < bw; k2 += 12) poly([[x2 + k2, base - 30], [x2 + k2 + 12, base - 30], [x2 + k2 + 14, base - 18], [x2 + k2 - 2, base - 18]], (k2 / 12) % 2 ? "#fff" : aw);
        rect(x2 + 6, base - 18, bw - 12, 18, "#26180e");
        if (n % 2 === 0) { rrect(x2 + bw - 18, base - bh + 8, 14, 52, 2, "#e8dcc0"); text(SHOP_SIGN[n % SHOP_SIGN.length], x2 + bw - 11, base - bh + 24, 13, "#b3362c"); }
        x2 += bw + 4; n++;
    }
    /* ống khói + khói bay */
    [[250, 150], [520, 168], [700, 140]].forEach(function(c, ci) {
        rect(c[0], c[1], 12, base - c[1], "#6a5648"); rect(c[0] - 2, c[1], 16, 5, "#4a3a30");
        for (var q = 0; q < 6; q++) { var ph = ((t / 55 + q * 18 + ci * 30) % 110), a = 0.5 - ph / 230; if (a > 0) ell(c[0] + 6 + ph * 0.5 + Math.sin(ph / 13 + ci) * 4, c[1] - ph, 7 + ph / 9, 5 + ph / 12, "rgba(90,80,78," + a + ")"); }
    });
    rect(0, base - 4, W, 8, "rgba(255,230,190,.25)");
}
/* mặt đường thời Dân Quốc + phương tiện */
function groundRepublic(t) {
    var i;
    ctx.fillStyle = lg(0, HZ, 0, H, [[0, "#8d8577"], [0.2, "#a79e8b"], [1, "#c2b79f"]]); ctx.fillRect(0, HZ, W, H - HZ);
    rect(0, HZ, W, 9, "#d4cbb8"); rect(0, HZ + 9, W, 3, "#6f685c");                       /* vỉa hè */
    for (i = 0; i < W; i += 36) rect(i, HZ + 1, 1, 8, "rgba(0,0,0,.12)");
    rect(0, HZ + 12, W, 42, "#6e6a66");                                                    /* lòng đường */
    for (i = 0; i < W; i += 40) { rect(i, HZ + 33, 22, 2, "rgba(255,240,200,.45)"); }
    ctx.fillStyle = "#4a4640"; ctx.fillRect(0, HZ + 22, W, 2); ctx.fillRect(0, HZ + 28, W, 2);   /* ray xe điện */
    for (i = 0; i < W; i += 14) rect(i, HZ + 20, 3, 12, "rgba(40,35,30,.5)");
    rect(0, HZ + 54, W, 5, "#dcd3bf"); rect(0, HZ + 59, W, 2, "#8f8575");                 /* lề đường */
    /* quảng trường lát đá + cỏ viền */
    for (i = 0; i < 12; i++) { var yy = HZ + 62 + i * i * 2.3; ctx.strokeStyle = "rgba(90,78,58,.18)"; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke(); }
    for (i = -12; i <= 12; i++) { ctx.strokeStyle = "rgba(90,78,58,.14)"; ctx.beginPath(); ctx.moveTo(500 + i * 18, HZ + 60); ctx.lineTo(500 + i * 120, H); ctx.stroke(); }
    [[40, 420], [960, 420], [60, 530], [940, 530]].forEach(function(c) { ell(c[0], c[1], 70, 20, "rgba(86,120,70,.55)"); ell(c[0], c[1] - 2, 56, 14, "rgba(120,160,90,.6)"); });
    /* cột điện + dây điện võng */
    var poles = [60, 330, 640, 930];
    poles.forEach(function(px) { rect(px - 2, HZ - 96, 4, 154, "#3a2f26"); rect(px - 16, HZ - 88, 32, 3, "#3a2f26"); rect(px - 11, HZ - 74, 22, 3, "#3a2f26"); ell(px - 14, HZ - 88, 2, 2, "#d9d4c4"); ell(px + 14, HZ - 88, 2, 2, "#d9d4c4"); });
    ctx.strokeStyle = "rgba(30,25,20,.65)"; ctx.lineWidth = 1.2;
    for (var pi = 0; pi < poles.length - 1; pi++) [[-14, -88], [14, -88], [-9, -74], [9, -74]].forEach(function(o) {
        ctx.beginPath(); ctx.moveTo(poles[pi] + o[0], HZ + o[1]); ctx.quadraticCurveTo((poles[pi] + poles[pi + 1]) / 2 + o[0], HZ + o[1] + 22, poles[pi + 1] + o[0], HZ + o[1]); ctx.stroke();
    });
    /* đèn đường gas */
    [150, 480, 790].forEach(function(lx, li) { rect(lx - 1.5, HZ - 30, 3, 40, "#2a2a2a"); glow("#ffd98a", 16 + 4 * Math.sin(t / 300 + li), function() { rrect(lx - 5, HZ - 42, 10, 13, 3, "#ffe9a8"); }); });
    /* xe điện chạy ngang */
    var tx = ((t / 14) % (W + 420)) - 280;
    shadow(tx + 100, HZ + 40, 200);
    rrect(tx, HZ - 6, 200, 40, 5, "#b5372c"); rect(tx, HZ + 8, 200, 6, "#f1e3c2"); rect(tx, HZ + 26, 200, 4, "#4a1a14");
    for (i = 0; i < 6; i++) { rect(tx + 10 + i * 30, HZ + 2, 22, 14, "#ffe2a0"); rect(tx + 10 + i * 30, HZ + 2, 22, 14, "rgba(255,255,255,.08)"); if (i % 2) { ell(tx + 21 + i * 30, HZ + 8, 4, 4, "#2a1a10"); } }
    ell(tx + 30, HZ + 36, 8, 4, "#222"); ell(tx + 170, HZ + 36, 8, 4, "#222");
    ctx.strokeStyle = "#2a2a2a"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx + 100, HZ - 6); ctx.lineTo(tx + 118, HZ - 50); ctx.stroke();
    ctx.strokeStyle = "rgba(30,25,20,.7)"; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(0, HZ - 50); ctx.lineTo(W, HZ - 50); ctx.stroke();
    /* xe kéo + người đi bộ trên vỉa hè */
    var rx = W - (((t / 22) + 400) % (W + 200)) + 20;
    rect(rx - 4, HZ + 46, 40, 2, "#2a2a2a"); ell(rx + 2, HZ + 46, 7, 7, "#3a3a3a"); ell(rx + 32, HZ + 46, 7, 7, "#3a3a3a");
    ctx.beginPath(); ctx.arc(rx + 17, HZ + 34, 14, Math.PI, 0); ctx.closePath(); ctx.fillStyle = "#2a3a4a"; ctx.fill(); rect(rx + 3, HZ + 34, 28, 8, "#a33"); rect(rx + 36, HZ + 30, 22, 2, "#2a1a10");
    ell(rx + 58, HZ + 24, 4, 4, "#f1cfa8"); rect(rx + 55, HZ + 28, 7, 14, "#7a5a40"); rect(rx + 54 + Math.sin(t / 90) * 2, HZ + 41, 3, 6, "#222"); rect(rx + 59 - Math.sin(t / 90) * 2, HZ + 41, 3, 6, "#222");
    for (i = 0; i < 5; i++) {
        var gx = ((t / (40 + i * 6) + i * 210) % (W + 60)) - 30, dir = i % 2 ? 1 : -1; gx = dir > 0 ? gx : W - gx;
        var cl = ["#4a5a7a", "#8a4a3a", "#3a6a5a", "#6a4a7a", "#7a6a3a"][i];
        ell(gx, HZ + 4, 4, 4, "#f1cfa8"); rrect(gx - 5, HZ + 7, 10, 14, 3, cl); rect(gx - 4 + Math.sin(t / 100 + i) * 2, HZ + 20, 3, 5, "#2a1a10"); rect(gx + 1 - Math.sin(t / 100 + i) * 2, HZ + 20, 3, 5, "#2a1a10");
        if (i % 2) { ctx.strokeStyle = "#5a3a1a"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(gx + 3, HZ + 4, 10, Math.PI, 0); ctx.stroke(); }
    }
}


/* ===================================================================
   CẢNH NỀN MỚI CHO TỪNG THỜI (đều vẽ gốc, chỉ lấy không khí chung)
   1 làng núi thủy mặc · 2 Trường An mẫu đơn · 3 thủy trấn Giang Nam
   5 đô thị hiện đại lúc hoàng hôn · 6 căn cứ trên Mặt Trăng
   =================================================================== */
function person(x, y, col, t, ph, opt) {
    var sw = Math.sin(t / 110 + ph) * 2;
    shadow(x, y + 22, 16);
    if (opt && opt.long) { poly([[x - 5, y - 4], [x + 5, y - 4], [x + 9, y + 22], [x - 9, y + 22]], col); }
    else { rrect(x - 5, y - 4, 10, 14, 3, col); rect(x - 4 + sw, y + 10, 3, 9, "#2a1a10"); rect(x + 1 - sw, y + 10, 3, 9, "#2a1a10"); }
    ell(x, y - 9, 5, 5, "#f1cfa8"); ell(x, y - 12, 5.5, 3.6, "#241810");
    if (opt && opt.bun) ell(x, y - 17, 3, 3, "#241810");
    if (opt && opt.bag) { rect(x + 5, y + 2, 6, 7, opt.bag); }
}
function cloudWisp(x, y, w, a) { ctx.globalAlpha = a; ell(x, y, w, w * 0.16, "#fff"); ell(x + w * 0.4, y - 3, w * 0.6, w * 0.12, "#fff"); ctx.globalAlpha = 1; }

/* ---------- THỜI 1: làng núi thủy mặc ---------- */
function inkFront(t) {
    var i, b = HZ + 10;
    /* thác nước + sương */
    for (i = 0; i < 5; i++) { var o = (t / 40 + i * 14) % 70; ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.fillRect(730 + i * 3.5, HZ - 98 + o * 1.6, 2.4, 22); }
    ctx.fillStyle = "rgba(230,236,232,.55)"; ctx.fillRect(728, HZ - 100, 20, 108); cloudWisp(738, HZ + 8, 44, 0.7);
    /* thông trên sườn */
    [[60, 4], [96, 10], [430, 2], [470, 8], [640, 6], [800, 4], [900, 10]].forEach(function(q) { var x = q[0], y = HZ + q[1]; rect(x - 1.5, y - 16, 3, 20, "#4a4f4c"); for (var j = 0; j < 4; j++) poly([[x - 13 + j * 2, y - 8 - j * 9], [x, y - 22 - j * 9], [x + 13 - j * 2, y - 8 - j * 9]], "rgba(58,72,66,.85)"); });
    /* nhà tranh bên bờ + khói */
    [[190, 1], [275, -2], [860, 2]].forEach(function(c, ci) {
        var x = c[0], y = b + c[1];
        rect(x - 22, y - 24, 44, 24, "#e8dfc8"); rect(x - 22, y - 24, 44, 3, "#cfc4a8"); rect(x - 5, y - 16, 10, 16, "#4a3a2a");
        poly([[x - 34, y - 22], [x, y - 52], [x + 34, y - 22]], "#7a6a52"); ctx.strokeStyle = "rgba(60,45,30,.5)"; ctx.lineWidth = 1;
        for (var k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(x - 30 + k * 6, y - 23 - k * 1.5); ctx.lineTo(x - 2 + k * 3, y - 49 + k); ctx.stroke(); }
        for (var q2 = 0; q2 < 5; q2++) { var ph = (t / 70 + q2 * 16 + ci * 20) % 80, al = 0.5 - ph / 170; if (al > 0) ell(x + 14 + ph * 0.4, y - 56 - ph, 5 + ph / 12, 4 + ph / 16, "rgba(120,120,120," + al + ")"); }
    });
    /* cầu đá vòm */
    ctx.fillStyle = "#b9b3a2"; ctx.beginPath(); ctx.moveTo(512, b + 22); ctx.quadraticCurveTo(560, b - 30, 608, b + 22); ctx.lineTo(608, b + 26); ctx.quadraticCurveTo(560, b - 20, 512, b + 26); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(560, b + 24, 24, Math.PI, 0); ctx.strokeStyle = "#8f8a7c"; ctx.lineWidth = 6; ctx.stroke(); ell(560, b + 22, 20, 8, "rgba(90,110,110,.45)");
    /* thuyền chài chậm rãi */
    var bx = 300 + ((t / 50) % 420); shadow(bx, b + 46, 70);
    poly([[bx - 36, b + 36], [bx + 40, b + 36], [bx + 28, b + 46], [bx - 28, b + 46]], "#4a3f36"); rect(bx - 2, b + 6, 2, 30, "#4a3f36"); poly([[bx, b + 8], [bx + 22, b + 28], [bx, b + 30]], "#e8dfc8");
    ell(bx - 18, b + 28, 5, 5, "#f1cfa8"); poly([[bx - 28, b + 24], [bx - 8, b + 24], [bx - 18, b + 14]], "#6a5a42"); rect(bx - 22, b + 32, 8, 5, "#6a7a6a");
    ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(bx - 44, b + 47); ctx.lineTo(bx - 70, b + 49); ctx.moveTo(bx + 44, b + 47); ctx.lineTo(bx + 62, b + 49); ctx.stroke();
    /* trúc hai bên */
    [[24, 5], [58, 2], [946, 5], [978, 3]].forEach(function(q, qi) {
        var x = q[0], sw = Math.sin(t / 700 + qi) * 3;
        for (var j = 0; j < 3; j++) {
            var xx = x + j * 9, top = HZ - 150 + j * 18 + q[1];
            ctx.strokeStyle = "rgba(72,104,82,.9)"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xx, HZ + 80); ctx.quadraticCurveTo(xx + sw * 0.5, HZ - 30, xx + sw, top); ctx.stroke();
            for (var nd = 0; nd < 6; nd++) { var ny = HZ + 70 - nd * 38; rect(xx - 3 + sw * (HZ + 80 - ny) / 230, ny, 6, 2, "#3f5a46"); }
            for (var lf = 0; lf < 5; lf++) { poly([[xx + sw, top + lf * 14], [xx + sw + 22, top + lf * 14 - 5], [xx + sw + 4, top + lf * 14 + 6]], "rgba(86,128,98,.85)"); poly([[xx + sw, top + lf * 14 + 4], [xx + sw - 22, top + lf * 14 - 1], [xx + sw - 4, top + lf * 14 + 10]], "rgba(86,128,98,.85)"); }
        }
    });
    /* sương trên mặt hồ */
    ctx.fillStyle = lg(0, HZ + 6, 0, HZ + 50, [[0, "rgba(244,239,226,.55)"], [1, "rgba(244,239,226,0)"]]); ctx.fillRect(0, HZ + 6, W, 44);
    /* hạc bay */
    for (i = 0; i < 3; i++) { var cx = ((t / 70 + i * 120) % (W + 120)) - 60, cy = 70 + i * 26 + Math.sin(t / 700 + i) * 5, fl = Math.sin(t / 220 + i) * 6; ctx.strokeStyle = "#fff"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 14, cy - fl); ctx.quadraticCurveTo(cx, cy - 6, cx + 14, cy - fl); ctx.stroke(); ctx.fillStyle = "#2a2a2a"; ctx.fillRect(cx - 16, cy - fl - 1, 3, 2); ctx.fillRect(cx + 13, cy - fl - 1, 3, 2); ell(cx, cy, 6, 3, "#fff"); rect(cx + 6, cy - 3, 8, 1.6, "#fff"); }
}
function deerDraw(t) {
    var x = 300 + ((Math.sin(t / 5200) + 1) / 2) * 150, y = 506, dir = Math.cos(t / 5200) >= 0 ? 1 : -1, st = Math.sin(t / 160) * 3;
    ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
    shadow(0, 10, 44);
    [[-12, 1], [-6, -1], [8, -1], [14, 1]].forEach(function(l) { ctx.fillStyle = "#8a5a34"; ctx.fillRect(l[0], 0, 3, 16 + l[1] * st * 0.2); });
    ell(0, -2, 20, 10, "#c98b52"); ell(-2, 2, 14, 6, "#e8c9a0");
    [[-8, -6], [0, -9], [8, -5], [-4, 0]].forEach(function(d) { ell(d[0], d[1], 1.8, 1.8, "#f8e8cc"); });
    poly([[14, -6], [22, -22], [27, -20], [21, -4]], "#c98b52"); ell(26, -22, 7, 5, "#c98b52"); ell(30, -21, 2, 2, "#2a1a10"); ell(24, -28, 3, 5, "#b87942");
    ctx.strokeStyle = "#6a4a2a"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(25, -30); ctx.lineTo(23, -38); ctx.lineTo(27, -41); ctx.moveTo(23, -37); ctx.lineTo(19, -40); ctx.stroke();
    ctx.strokeStyle = "#b0302a"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(17, -9); ctx.lineTo(21, -6); ctx.stroke();
    glow("#ffd25a", 6, function() { ell(19, -3 + Math.sin(t / 130) * 1, 2.6, 2.6, "#ffd25a"); });
    ctx.restore();
}

/* ---------- THỜI 2: Trường An + vườn mẫu đơn ---------- */
var PEONY = null;
function tangFront(t) {
    var i, b = HZ + 8;
    /* tường thành + cổng lâu */
    rect(0, b - 34, W, 36, "#d2a064"); rect(0, b - 34, W, 4, "#e8c58a");
    for (i = 0; i < W; i += 20) rect(i + 3, b - 42, 12, 10, "#d2a064");
    for (i = 0; i < W; i += 36) { ctx.fillStyle = "rgba(90,50,20,.12)"; ctx.fillRect(i, b - 30, 1, 30); }
    [170, 830].forEach(function(gx, gi) {
        rect(gx - 50, b - 88, 100, 90, "#c0301f"); rect(gx - 50, b - 88, 100, 8, "#8a1f14");
        ctx.beginPath(); ctx.moveTo(gx - 20, b + 2); ctx.lineTo(gx - 20, b - 34); ctx.arc(gx, b - 34, 20, Math.PI, 0); ctx.lineTo(gx + 20, b + 2); ctx.closePath(); ctx.fillStyle = "#2a1208"; ctx.fill();
        for (var r = 0; r < 3; r++) for (var c = 0; c < 8; c++) ell(gx - 42 + c * 12, b - 78 + r * 12, 1.6, 1.6, "#ffd25a");
        chRoof(gx, b - 88, 84, 26, 20, "#e8b04a", "#b9751b", "#ffd25a");
        rect(gx - 32, b - 122, 64, 34, "#c0301f"); window2(gx - 14, b - 116, 28, 22, "#3a1a10", "#ffd25a");
        chRoof(gx, b - 122, 56, 22, 16, "#e8b04a", "#b9751b", "#ffd25a");
        var f = Math.sin(t / 260 + gi) * 5; rect(gx - 1, b - 170, 2, 30, "#6b4a2a"); ctx.fillStyle = "#ffd25a"; ctx.beginPath(); ctx.moveTo(gx + 1, b - 170); ctx.lineTo(gx + 26 + f, b - 163); ctx.lineTo(gx + 1, b - 156); ctx.fill();
        lantern(gx - 40, b - 60, 6, "#ff4a3a", t, gi); lantern(gx + 40, b - 60, 6, "#ff4a3a", t, gi + 2);
    });
    /* đại nhạn tháp */
    var px = 330;
    for (i = 0; i < 6; i++) { var tw = 56 - i * 6, ty = b - 20 - i * 24; rect(px - tw / 2, ty - 22, tw, 22, i % 2 ? "#d9c7a0" : "#cfbb92"); poly([[px - tw / 2 - 5, ty - 22], [px, ty - 30], [px + tw / 2 + 5, ty - 22]], "#8a6a46"); rect(px - 4, ty - 17, 8, 12, "#4a3320"); }
    poly([[px - 7, b - 20 - 6 * 24 - 8], [px, b - 20 - 6 * 24 - 38], [px + 7, b - 20 - 6 * 24 - 8]], "#e8b04a");
    /* biển mẫu đơn: cánh đồng hoa */
    if (!PEONY) { PEONY = []; for (var k = 0; k < 120; k++) PEONY.push({ x: rnd(k) * W, y: HZ + 24 + rnd(k + 70) * (H - HZ - 30), c: Math.floor(rnd(k + 9) * 6), r: rnd(k + 33) }); PEONY.sort(function(a, c) { return a.y - c.y; }); }
    var cols = ["#ff7aa8", "#e0457b", "#ffb3c9", "#b84cc7", "#fff0f4", "#ff9a5a"];
    PEONY.forEach(function(q, qi) {
        var sc = 0.45 + (q.y - HZ) / 320, sw = Math.sin(t / 600 + qi) * 1.6;
        ell(q.x, q.y, 24 * sc, 9 * sc, "rgba(40,70,30,.3)"); ell(q.x, q.y - 6 * sc, 20 * sc, 12 * sc, "#4f9a52"); ell(q.x - 8 * sc, q.y - 10 * sc, 11 * sc, 8 * sc, "#6bb86a");
        for (var j = 0; j < 3; j++) {
            var bx = q.x + (j - 1) * 11 * sc + sw, by = q.y - 16 * sc - (j % 2) * 7 * sc, rr = 9 * sc, cc = cols[(q.c + j) % 6];
            ell(bx, by, rr, rr * 0.85, cc); ell(bx - rr * 0.3, by - rr * 0.2, rr * 0.6, rr * 0.5, "rgba(255,255,255,.28)"); ell(bx + rr * 0.15, by + rr * 0.1, rr * 0.4, rr * 0.35, "rgba(150,30,70,.25)"); ell(bx, by, rr * 0.16, rr * 0.16, "#ffd25a");
        }
    });
    /* thiếu nữ Hán phục dạo vườn */
    [["#e0457b", 0, 1], ["#4aa8c8", 330, -1], ["#f0a830", 640, 1]].forEach(function(l, li) {
        var lx = ((t / (46 + li * 8) + l[1]) % (W + 80)) - 40; if (l[2] < 0) lx = W - lx;
        var ly = 392 + li * 38;
        person(lx, ly, l[0], t, li, { long: true, bun: true });
        rect(lx - 7, ly + 2, 14, 3, "#ffd25a"); ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx + 5, ly + 1); ctx.quadraticCurveTo(lx + 22 + Math.sin(t / 180 + li) * 4, ly + 6, lx + 16, ly + 20); ctx.stroke();
        if (li === 1) { ctx.beginPath(); ctx.arc(lx - 10, ly - 22, 16, Math.PI, 0); ctx.fillStyle = "#fff0b0"; ctx.fill(); ctx.strokeStyle = "#c0301f"; ctx.lineWidth = 2; ctx.stroke(); ctx.beginPath(); ctx.moveTo(lx - 10, ly - 22); ctx.lineTo(lx - 6, ly + 6); ctx.stroke(); }
    });
    /* dải dây đèn lồng */
    ctx.strokeStyle = "rgba(90,40,20,.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(240, b - 6); ctx.quadraticCurveTo(500, b + 30, 760, b - 6); ctx.stroke();
    for (i = 0; i < 9; i++) { var u = (i + 1) / 10; lantern(240 + 520 * u, b - 6 + Math.sin(u * Math.PI) * 26 + 8, 6, i % 2 ? "#ff4a3a" : "#ffb52e", t, i); }
}

/* ---------- THỜI 3: thủy trấn Giang Nam ---------- */
function jiangnanFront(t) {
    var i, b = HZ + 8;
    /* dãy nhà tường trắng ngói đen, đầu hồi mã đầu */
    var x = -12, n = 0;
    while (x < W + 10) {
        var bw = 74 + Math.floor(rnd(n + 11) * 3) * 14, bh = 46 + Math.floor(rnd(n * 3 + 2) * 3) * 14;
        if (x > 570 && x < 720) { x += bw + 2; n++; continue; }
        rect(x, b - bh, bw, bh, "#f4f2ea"); rect(x + bw - 6, b - bh, 6, bh, "rgba(0,0,0,.08)");
        [[x, 1], [x + bw, -1]].forEach(function(e) { var sx = e[0], d = e[1]; poly([[sx, b - bh], [sx + d * 0, b - bh - 18], [sx + d * 10, b - bh - 18], [sx + d * 10, b - bh - 10], [sx + d * 20, b - bh - 10], [sx + d * 20, b - bh - 2], [sx + d * 30, b - bh - 2], [sx + d * 30, b - bh]], "#2f3238"); });
        poly([[x - 3, b - bh], [x + bw / 2, b - bh - 22], [x + bw + 3, b - bh]], "#343840"); rect(x - 3, b - bh - 2, bw + 6, 4, "#26292e");
        for (var w2 = x + 12; w2 < x + bw - 22; w2 += 30) { rect(w2, b - bh + 12, 16, 20, "#6b4a2a"); ctx.strokeStyle = "#3a2a1a"; ctx.lineWidth = 1; ctx.strokeRect(w2, b - bh + 12, 16, 20); ctx.beginPath(); ctx.moveTo(w2 + 8, b - bh + 12); ctx.lineTo(w2 + 8, b - bh + 32); ctx.moveTo(w2, b - bh + 22); ctx.lineTo(w2 + 16, b - bh + 22); ctx.stroke(); }
        rect(x + bw / 2 - 6, b - 22, 12, 22, "#5a3a1e");
        if (n % 2 === 0) lantern(x + 12, b - bh + 40, 5, "#e63946", t, n);
        ctx.fillStyle = "rgba(40,70,80,.18)"; ctx.fillRect(x, b - 3, bw, 3);
        x += bw + 2; n++;
    }
    /* khách điếm hai tầng, cờ hiệu, đèn lồng */
    var ix = 645;
    rect(ix - 66, b - 98, 132, 98, "#f1ead8"); rect(ix - 66, b - 98, 132, 5, "#dcd2b8");
    poly([[ix - 80, b - 96], [ix - 48, b - 126], [ix + 48, b - 126], [ix + 80, b - 96]], "#2f3238"); rect(ix - 62, b - 54, 124, 5, "#5a3a1e");
    for (i = 0; i < 6; i++) rect(ix - 60 + i * 24, b - 54, 2.5, 20, "#5a3a1e");
    rect(ix - 62, b - 38, 124, 3, "#5a3a1e");
    for (i = 0; i < 3; i++) { window2(ix - 54 + i * 40, b - 90, 24, 26, "#ffdc9a", "#5a3a1e"); }
    rect(ix - 14, b - 34, 28, 34, "#4a2a14"); rect(ix - 6, b - 34, 12, 34, "rgba(255,200,120,.35)");
    for (i = 0; i < 5; i++) lantern(ix - 56 + i * 28, b - 60 + (i % 2) * 4, 6, "#e63946", t, i);
    var f = Math.sin(t / 400) * 3; rect(ix + 72, b - 150, 2, 90, "#5a3a1e"); ctx.fillStyle = "#f0b830"; ctx.beginPath(); ctx.moveTo(ix + 74, b - 148); ctx.lineTo(ix + 104 + f, b - 146); ctx.lineTo(ix + 104 + f, b - 94); ctx.lineTo(ix + 74, b - 96); ctx.fill();
    text("客", ix + 90 + f * 0.5, b - 130, 17, "#7a1a10"); text("栈", ix + 90 + f * 0.5, b - 108, 17, "#7a1a10");
    /* cầu đá vòm bắc qua kênh */
    var bxx = 330;
    ctx.fillStyle = "#d4cdb8"; ctx.beginPath(); ctx.moveTo(bxx - 84, b + 18); ctx.quadraticCurveTo(bxx, b - 30, bxx + 84, b + 18); ctx.lineTo(bxx + 84, b + 32); ctx.lineTo(bxx - 84, b + 32); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#a69f8a"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bxx - 84, b + 16); ctx.quadraticCurveTo(bxx, b - 34, bxx + 84, b + 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bxx - 40, b + 32); ctx.quadraticCurveTo(bxx, b - 6, bxx + 40, b + 32); ctx.closePath(); ctx.fillStyle = "#4f7a84"; ctx.fill();
    /* liễu rủ */
    [70, 250, 470, 905].forEach(function(lx, li) {
        rect(lx - 3, b - 40, 6, 46, "#5a4a36"); ell(lx, b - 52, 30, 18, "#86bf6e");
        for (var j = 0; j < 14; j++) { var sx = lx - 28 + j * 4.3, sw = Math.sin(t / 650 + j + li) * 4; ctx.strokeStyle = j % 2 ? "#79b062" : "#8ccb74"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(sx, b - 50); ctx.quadraticCurveTo(sx + sw, b - 26, sx + sw * 1.5, b - 4 + (j % 3) * 8); ctx.stroke(); }
    });
    /* thuyền ô bồng + người chèo */
    [[0, 52, 1], [260, 24, -1]].forEach(function(bt, bi) {
        var tx = ((t / (36 + bi * 10) + bt[0]) % (W + 160)) - 80; if (bt[2] < 0) tx = W - tx; var ty = b + 18 + bt[1];
        shadow(tx, ty + 8, 90);
        poly([[tx - 44, ty - 4], [tx + 46, ty - 4], [tx + 34, ty + 8], [tx - 34, ty + 8]], "#3a2a1e");
        ctx.beginPath(); ctx.ellipse(tx - 4, ty - 4, 24, 14, 0, Math.PI, 0); ctx.fillStyle = "#2a2a2c"; ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.lineWidth = 1; for (var k = -3; k <= 3; k++) { ctx.beginPath(); ctx.moveTo(tx - 4 + k * 6, ty - 17); ctx.lineTo(tx - 4 + k * 7, ty - 4); ctx.stroke(); }
        rrect(tx + 28, ty - 22, 7, 15, 3, "#4a6a8a"); ell(tx + 31, ty - 26, 4.5, 4.5, "#f1cfa8"); poly([[tx + 25, ty - 28], [tx + 31, ty - 36], [tx + 37, ty - 28]], "#c8b078");
        ctx.strokeStyle = "#5a3a1e"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx + 33, ty - 16); ctx.lineTo(tx + 56, ty + 12 + Math.sin(t / 260 + bi) * 3); ctx.stroke();
        glow("#ffd98a", 10, function() { ell(tx - 30, ty - 8, 3, 3, "#ffe9a8"); });
        ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(tx - 50, ty + 9); ctx.lineTo(tx - 76, ty + 10); ctx.moveTo(tx + 52, ty + 9); ctx.lineTo(tx + 70, ty + 10); ctx.stroke();
    });
    /* mưa phùn nhẹ */
    ctx.strokeStyle = "rgba(200,225,235,.35)"; ctx.lineWidth = 1;
    for (i = 0; i < 40; i++) { var rx = (rnd(i) * W + t / 14) % W, ry = ((t / 5 + rnd(i + 3) * 500) % 520); ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 3, ry + 10); ctx.stroke(); }
}

/* ---------- THỜI 5: đô thị hiện đại lúc hoàng hôn ---------- */
function glassTower(x, w, h, base, c, seed, t) {
    ctx.fillStyle = lg(x, base - h, x + w, base, [[0, c[0]], [1, c[1]]]); ctx.fillRect(x, base - h, w, h);
    rect(x, base - h, w * 0.18, h, "rgba(255,255,255,.1)"); rect(x + w - 3, base - h, 3, h, "rgba(0,0,0,.18)");
    for (var wy = base - h + 8; wy < base - 6; wy += 9) for (var wx = x + 4; wx < x + w - 4; wx += 7) {
        var r = rnd(seed + wx * 0.31 + wy * 0.17); if (r > 0.55) { ctx.fillStyle = r > 0.9 && Math.floor(t / 1100 + wx) % 2 ? "rgba(255,255,230,.95)" : "rgba(255,206,120,.82)"; ctx.fillRect(wx, wy, 3.5, 5); }
    }
}
function cityModern(t) {
    var base = HZ + 4, i;
    /* lớp xa mờ */
    ctx.globalAlpha = 0.45;
    for (i = 0; i < 26; i++) { var w = 22 + rnd(i * 5) * 24, h = 50 + rnd(i + 5) * 110; rect(i * 40 - 8, base - h, w, h, i % 2 ? "#6f7aa6" : "#7d84ad"); }
    ctx.globalAlpha = 1;
    /* tháp truyền hình (có khối cầu) + tháp vương miện + tháp vát */
    var tx = 250; rect(tx - 5, base - 330, 10, 330, "#8d96b8"); glow("#ffb36b", 14, function() { ell(tx, base - 220, 20, 20, "#c9a58c"); ell(tx, base - 290, 12, 12, "#c9a58c"); }); rect(tx - 1, base - 380, 2, 50, "#8d96b8");
    if (Math.floor(t / 600) % 2) ell(tx, base - 382, 3, 3, "#ff5a4a");
    glassTower(380, 70, 230, base, ["#8fb4d8", "#4a6a96"], 3, t); poly([[380, base - 230], [415, base - 262], [450, base - 230]], "#7a9ac0"); rect(414, base - 292, 2, 30, "#7a9ac0");
    glassTower(130, 64, 190, base, ["#a0bcd8", "#56709a"], 7, t); rect(124, base - 194, 76, 6, "#cfd8e8");
    glassTower(540, 58, 280, base, ["#b0c2dc", "#5a6f98"], 11, t); poly([[540, base - 280], [598, base - 280], [570, base - 316]], "#9fb2d0"); if (Math.floor(t / 700) % 2) ell(570, base - 320, 3, 3, "#ff5a4a");
    glassTower(660, 80, 205, base, ["#9ab0d4", "#4a5f8c"], 17, t); rect(660, base - 214, 80, 9, "#c4d0e6");
    glassTower(780, 62, 250, base, ["#a8bcd8", "#52688f"], 23, t); rect(796, base - 270, 30, 20, "#8fa4c6"); rect(808, base - 292, 6, 22, "#8fa4c6");
    glassTower(880, 90, 170, base, ["#9eb4d6", "#4d6290"], 29, t); glassTower(30, 76, 150, base, ["#9eb4d6", "#4d6290"], 31, t);
    /* mây hoàng hôn đậm */
    cloudWisp(520, 120, 120, 0.35); cloudWisp(150, 90, 90, 0.3);
}
function car(x, y, col, dir, t) {
    var hx = dir > 0 ? x + 24 : x - 24;
    shadow(x, y + 9, 54);
    rrect(x - 24, y - 8, 48, 14, 5, col); rrect(x - 13, y - 17, 26, 11, 4, "rgba(30,40,60,.85)"); ell(x - 14, y + 7, 5, 5, "#1a1a1a"); ell(x + 14, y + 7, 5, 5, "#1a1a1a");
    glow("#fff0b0", 12, function() { ell(hx, y - 1, 3, 3, "#fff6c8"); }); ell(dir > 0 ? x - 24 : x + 24, y - 1, 2.5, 2.5, "#ff3a2a");
}
function groundModern(t) {
    var i;
    ctx.fillStyle = lg(0, HZ, 0, H, [[0, "#6a6f7c"], [0.2, "#8a8d96"], [1, "#a8a59c"]]); ctx.fillRect(0, HZ, W, H - HZ);
    /* sông + phản chiếu ánh đèn */
    ctx.fillStyle = lg(0, HZ, 0, HZ + 30, [[0, "#ffb27a"], [1, "#4a68a0"]]); ctx.fillRect(0, HZ, W, 30);
    for (i = 0; i < 46; i++) { var rx = rnd(i) * W, rl = 4 + rnd(i + 4) * 20; ctx.fillStyle = "rgba(255,220,150," + (0.2 + 0.3 * Math.sin(t / 400 + i)) + ")"; ctx.fillRect(rx, HZ + 2 + rnd(i + 8) * 24, 2 + rnd(i + 12) * 10, 1.5); ctx.fillRect(rx, HZ + 2, 1.5, rl * 0.5); }
    var bx = ((t / 30) % (W + 200)) - 100; rrect(bx, HZ + 12, 60, 8, 3, "#e8e6f0"); rect(bx + 30, HZ + 6, 20, 7, "#3a4a6a"); glow("#ffe9a8", 8, function() { ell(bx + 4, HZ + 14, 2, 2, "#ffe9a8"); });
    rect(0, HZ + 30, W, 5, "#d2cdbd"); rect(0, HZ + 35, W, 3, "#6a6a70");
    for (i = 0; i < 14; i++) { var x = i * 74 + 30; ell(x, HZ + 30, 12, 9, "#3f7a4a"); ell(x - 4, HZ + 26, 8, 7, "#58a05f"); rect(x - 1.5, HZ + 30, 3, 8, "#4a3a2a"); }
    /* đại lộ */
    rect(0, HZ + 38, W, 44, "#3b3d46"); rect(0, HZ + 60, W, 2, "rgba(255,230,150,.6)");
    for (i = 0; i < W; i += 44) { rect(i, HZ + 49, 24, 2, "rgba(255,255,255,.35)"); rect(i, HZ + 71, 24, 2, "rgba(255,255,255,.35)"); }
    for (i = 0; i < 4; i++) { var cx = ((t / (22 + i * 5) + i * 270) % (W + 160)) - 80, d = i % 2 ? -1 : 1; if (d < 0) cx = W - cx; car(cx, d > 0 ? HZ + 70 : HZ + 48, ["#e8e8ee", "#c0392b", "#2f5fa0", "#f0b830"][i], d, t); }
    for (i = 0; i < 7; i++) rect(150 + i * 80, HZ + 38, 30, 44, i % 2 ? "rgba(255,255,255,.0)" : "rgba(255,255,255,.0)");
    rect(0, HZ + 82, W, 6, "#cfc9b8"); rect(0, HZ + 88, W, 2, "#85807a");
    /* quảng trường lát đá */
    for (i = 0; i < 12; i++) { var yy = HZ + 94 + i * i * 2.2; ctx.strokeStyle = "rgba(80,76,70,.16)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke(); }
    for (i = -12; i <= 12; i++) { ctx.strokeStyle = "rgba(80,76,70,.12)"; ctx.beginPath(); ctx.moveTo(500 + i * 18, HZ + 92); ctx.lineTo(500 + i * 120, H); ctx.stroke(); }
    [[70, 400], [930, 400], [60, 520], [940, 520]].forEach(function(c, ci) { ell(c[0], c[1] + 10, 54, 14, "rgba(40,40,40,.18)"); rect(c[0] - 1.5, c[1] - 34, 3, 44, "#4a4a4a"); ctx.beginPath(); ctx.arc(c[0], c[1] - 34, 34, Math.PI, 0); ctx.closePath(); ctx.fillStyle = ci % 2 ? "#e8e3d3" : "#c0392b"; ctx.fill(); for (var k = -2; k <= 2; k += 2) { ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.beginPath(); ctx.moveTo(c[0], c[1] - 34); ctx.lineTo(c[0] + k * 14, c[1] - 34); ctx.stroke(); } ell(c[0] + 16, c[1] + 2, 8, 3, "#5a4a3a"); });
    [150, 350, 650, 850].forEach(function(lx, li) { rect(lx - 1.5, HZ + 96, 3, 56, "#2f2f35"); glow("#ffd98a", 20 + 4 * Math.sin(t / 300 + li), function() { ell(lx, HZ + 94, 6, 6, "#ffe6a0"); }); });
    [["#d8506a", 0, 1], ["#3a6a9a", 280, -1], ["#6a4a9a", 520, 1], ["#2a8a6a", 760, -1]].forEach(function(l, li) {
        var lx = ((t / (50 + li * 7) + l[1]) % (W + 80)) - 40; if (l[2] < 0) lx = W - lx;
        person(lx, 360 + (li % 2) * 40, l[0], t, li, { bag: "#e8a0a8" });
    });
}

/* ---------- THỜI 6: đô thị tương lai thế kỷ 22 ---------- */
function futureTower(x, w, h, base, seed, t, kind) {
    ctx.fillStyle = lg(x, base - h, x + w, base, [[0, "#f4fcff"], [1, "#78b8dc"]]);
    ctx.beginPath(); ctx.moveTo(x, base);
    if (kind === 1) { ctx.lineTo(x + 2, base - h + 24); ctx.quadraticCurveTo(x + w / 2, base - h - 14, x + w - 2, base - h + 24); }
    else { ctx.lineTo(x, base - h + 8); ctx.quadraticCurveTo(x + w / 2, base - h - 6, x + w, base - h + 8); }
    ctx.lineTo(x + w, base); ctx.closePath(); ctx.fill();
    rect(x, base - h + 10, w * 0.16, h - 10, "rgba(255,255,255,.35)"); rect(x + w - 3, base - h + 10, 3, h - 10, "rgba(30,80,130,.22)");
    for (var fy = base - h + 22, fi = 0; fy < base - 8; fy += 16, fi++) {
        rect(x, fy, w, 2, "rgba(40,100,150,.22)");
        if (fi % 3 === 1) { ell(x + 2, fy + 2, 9, 4, "#4cc27e"); ell(x + w - 2, fy + 2, 9, 4, "#5fd08c"); ell(x + w * 0.5, fy + 1, w * 0.18, 3, "rgba(90,200,140,.8)"); }
        for (var wx = x + 5; wx < x + w - 5; wx += 8) { var r = rnd(seed + wx * 0.29 + fy * 0.13); if (r > 0.62) { ctx.fillStyle = r > 0.92 && Math.floor(t / 900 + wx) % 2 ? "rgba(255,255,255,.95)" : "rgba(80,220,255,.75)"; ctx.fillRect(wx, fy + 5, 4, 7); } }
    }
    if (kind === 0) { glow("#7fe8ff", 10, function() { ctx.strokeStyle = "#7fe8ff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x + w / 2, base - h - 6, w * 0.45, 5, 0, 0, Math.PI * 2); ctx.stroke(); }); rect(x + w / 2 - 1, base - h - 34, 2, 28, "#a8c8e0"); if (Math.floor(t / 600) % 2) glow("#ff6a5a", 8, function() { ell(x + w / 2, base - h - 36, 2.5, 2.5, "#ff6a5a"); }); }
    if (kind === 2) { glow("#9ff0ff", 16, function() { ell(x + w / 2, base - h - 16, 14, 14, "#d8f8ff"); ctx.strokeStyle = "#9ff0ff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x + w / 2, base - h - 16, 24, 6, t / 900, 0, Math.PI * 2); ctx.stroke(); }); rect(x + w / 2 - 2, base - h - 4, 4, 10, "#a8c8e0"); }
}
function hoverCar(x, y, dir, col, t, ph) {
    var bob = Math.sin(t / 260 + ph) * 1.6; y += bob;
    ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - dir * 18, y); ctx.lineTo(x - dir * 60, y + 1); ctx.stroke();
    glow("#7fe8ff", 10, function() { ell(x, y + 6, 12, 2.4, "rgba(127,232,255,.9)"); });
    rrect(x - 13, y - 4, 26, 8, 4, col); rrect(x - 5 + dir * 2, y - 9, 12, 7, 3, "rgba(30,60,110,.85)"); ell(x + dir * 12, y, 2, 2, "#fff7c0");
}
function deckRoad(y0, sag, t, dir, speed, cols, seed) {
    var i, x, y;
    ctx.beginPath(); ctx.moveTo(-10, y0 + 6);
    for (x = -10; x <= W + 10; x += 25) ctx.lineTo(x, y0 + sag * Math.sin(Math.PI * (x + 10) / (W + 20)) + 6);
    for (x = W + 10; x >= -10; x -= 25) ctx.lineTo(x, y0 + sag * Math.sin(Math.PI * (x + 10) / (W + 20)));
    ctx.closePath(); ctx.fillStyle = "#e6eef8"; ctx.fill();
    ctx.strokeStyle = "#7fe8ff"; ctx.lineWidth = 2; ctx.beginPath(); for (x = -10; x <= W + 10; x += 25) { y = y0 + sag * Math.sin(Math.PI * (x + 10) / (W + 20)) + 6; if (x < 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke();
    for (x = 40; x < W; x += 110) { y = y0 + sag * Math.sin(Math.PI * (x + 10) / (W + 20)) + 8; rect(x - 2.5, y, 5, HZ - y + 4, "rgba(150,190,215,.8)"); }
    for (i = 0; i < cols.length; i++) {
        var vx = (((t * speed) / 10 + i * (W / cols.length) + seed * 97) % (W + 80)) - 40; if (dir < 0) vx = W - vx;
        y = y0 + sag * Math.sin(Math.PI * (vx + 10) / (W + 20)) - 2;
        glow(cols[i], 10, function() { rrect(vx - 11, y - 4, 22, 6, 3, cols[i]); }); ell(vx + dir * 10, y - 1, 1.8, 1.8, "#fff");
    }
}
function ringRoad(cx, cy, rx, ry, t, k) {
    ctx.strokeStyle = "#dbe6f4"; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
    glow("#7fe8ff", 8, function() { ctx.strokeStyle = "#7fe8ff"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.ellipse(cx, cy - 3, rx, ry, 0, 0, Math.PI * 2); ctx.stroke(); });
    for (var j = 0; j < 3; j++) { var a = t / (1100 + k * 260) * (k % 2 ? -1 : 1) + j * 2.1, vx = cx + rx * Math.cos(a), vy = cy + ry * Math.sin(a) - 4; glow(j % 2 ? "#ffd86a" : "#7fe8ff", 8, function() { ell(vx, vy, 4.5, 2.5, j % 2 ? "#ffd86a" : "#c8f8ff"); }); }
}
function cityFuture(t) {
    var base = HZ + 2, i;
    /* sương xa */
    ctx.globalAlpha = 0.5;
    for (i = 0; i < 22; i++) { var w = 22 + rnd(i * 7) * 28, h = 70 + rnd(i + 5) * 150, x = i * 47 - 10; ctx.fillStyle = lg(x, base - h, x + w, base, [[0, "#d6f2fb"], [1, "#a6c8ec"]]); ctx.beginPath(); ctx.moveTo(x, base); ctx.lineTo(x, base - h + 10); ctx.quadraticCurveTo(x + w / 2, base - h - 8, x + w, base - h + 10); ctx.lineTo(x + w, base); ctx.fill(); }
    ctx.globalAlpha = 1;
    /* làn bay: vạch sáng trên trời */
    ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t / 30; ctx.strokeStyle = "rgba(200,248,255,.45)"; ctx.lineWidth = 1.5;
    [70, 120, 170].forEach(function(ly, li) { ctx.beginPath(); ctx.moveTo(0, ly + li * 4); ctx.quadraticCurveTo(500, ly - 30, W, ly + 10); ctx.stroke(); });
    ctx.setLineDash([]);
    /* tháp chính */
    futureTower(60, 56, 210, base, 3, t, 2); futureTower(130, 48, 150, base, 7, t, 1); futureTower(255, 66, 250, base, 11, t, 0);
    futureTower(410, 52, 180, base, 17, t, 1); futureTower(540, 70, 270, base, 23, t, 2); futureTower(690, 56, 200, base, 29, t, 0);
    futureTower(780, 64, 240, base, 31, t, 1); futureTower(890, 60, 190, base, 37, t, 2);
    /* cầu trời nối giữa các tháp */
    [[116, 130, 140], [321, 410, 150], [466, 540, 170], [610, 690, 150], [746, 780, 140], [844, 890, 130]].forEach(function(b) { var y = base - b[2]; rrect(b[0], y, b[1] - b[0], 8, 4, "rgba(230,248,255,.95)"); glow("#7fe8ff", 6, function() { rect(b[0] + 3, y + 3, b[1] - b[0] - 6, 2, "#7fe8ff"); }); });
    /* các tầng đường vành đai chồng lên nhau */
    [[190, HZ - 6, 170, 20], [820, HZ - 6, 170, 20]].forEach(function(r, ri) { for (var k = 0; k < 3; k++) ringRoad(r[0], r[1] - k * 30, r[2] - k * 14, r[3] - k * 2, t, k + ri); for (var q = -1; q <= 1; q += 2) rect(r[0] + q * (r[2] - 34) - 2, r[1] - 62, 4, 68, "rgba(160,196,220,.8)"); });
    deckRoad(HZ - 36, 14, t, 1, 1.8, ["#ffd86a", "#7fe8ff", "#ff9ac1", "#c8f8ff", "#7fe8ff", "#ffd86a"], 1);
    deckRoad(HZ - 74, 20, t, -1, 2.4, ["#7fe8ff", "#ffffff", "#ffd86a", "#7fe8ff"], 2);
    deckRoad(HZ - 112, 24, t, 1, 3.2, ["#ffffff", "#7fe8ff", "#ff9ac1"], 3);
    /* tàu đệm từ */
    var mx = ((t / 9) % (W + 520)) - 260, my = HZ - 150; rect(0, my + 8, W, 3, "rgba(255,255,255,.5)");
    for (i = 0; i < 4; i++) { rrect(mx + i * 62, my - 8, 58, 14, 6, "#f4fbff"); rect(mx + i * 62 + 6, my - 4, 46, 4, "#5ac8ee"); }
    glow("#ffd86a", 8, function() { ell(mx + 4 * 62 - 2, my - 1, 3, 3, "#ffd86a"); });
    /* khinh khí cầu quảng cáo hologram */
    var ax = ((t / 55) % (W + 360)) - 180, ay = 52 + Math.sin(t / 1000) * 5;
    ell(ax, ay, 66, 18, "#f4fbff"); ell(ax, ay - 4, 58, 9, "rgba(255,255,255,.55)"); rrect(ax - 20, ay + 14, 40, 8, 3, "#8fb4d0");
    glow("#7fe8ff", 14, function() { rrect(ax - 34, ay + 24, 68, 24, 4, "rgba(140,240,255,.35)"); }); text("汉语", ax, ay + 37, 15, "#0a5a7a");
    /* xe bay */
    [[0, 96, 1, "#ff9ac1"], [300, 140, -1, "#ffd86a"], [560, 190, 1, "#c8f8ff"], [140, 230, -1, "#ffffff"], [700, 108, -1, "#7fe8ff"], [420, 176, 1, "#ff7a5a"]].forEach(function(c, ci) {
        var sp = 22 + ci * 5, cx = ((t / sp + c[0]) % (W + 160)) - 80; if (c[2] < 0) cx = W - cx;
        hoverCar(cx, c[1], c[2], c[3], t, ci);
    });
    /* drone giao hàng */
    for (i = 0; i < 4; i++) { var dx = ((t / (16 + i * 4) + i * 260) % (W + 80)) - 40, dy = 250 - 60 - i * 12 + Math.sin(t / 300 + i) * 6; ctx.strokeStyle = "#5a7a90"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(dx - 8, dy); ctx.lineTo(dx + 8, dy); ctx.stroke(); ell(dx - 8, dy - 2, 4, 1.2, "rgba(60,90,110,.7)"); ell(dx + 8, dy - 2, 4, 1.2, "rgba(60,90,110,.7)"); rect(dx - 3, dy, 6, 5, "#ffd86a"); glow("#ff5a4a", 6, function() { if (Math.floor(t / 250 + i) % 2) ell(dx, dy - 3, 1.5, 1.5, "#ff5a4a"); }); }
}
function groundFuture(t) {
    var i;
    ctx.fillStyle = lg(0, HZ, 0, H, [[0, "#d9eef2"], [0.3, "#c1dde6"], [1, "#9fc2d4"]]); ctx.fillRect(0, HZ, W, H - HZ);
    /* dải băng chuyền đi bộ + đại lộ nhẹ */
    rect(0, HZ, W, 12, "#eef8fc"); rect(0, HZ + 12, W, 2, "rgba(100,170,200,.6)");
    for (i = 0; i < W; i += 40) { var o = (i + t / 20) % W; ctx.fillStyle = "rgba(90,190,230,.55)"; ctx.fillRect(o, HZ + 4, 14, 3); }
    /* lưới sáng phối cảnh */
    for (i = 0; i < 12; i++) { var yy = HZ + 24 + i * i * 2.4; ctx.strokeStyle = "rgba(90,190,230," + (0.12 + i * 0.012) + ")"; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke(); }
    for (i = -12; i <= 12; i++) { ctx.strokeStyle = "rgba(90,190,230,.14)"; ctx.beginPath(); ctx.moveTo(500 + i * 18, HZ + 22); ctx.lineTo(500 + i * 120, H); ctx.stroke(); }
    /* cây cầu hình cầu + bồn hoa phát sáng */
    [[60, 410], [940, 410], [50, 520], [950, 520], [330, 330], [670, 330]].forEach(function(c, ci) {
        var sc = 0.7 + (c[1] - 330) / 400; ell(c[0], c[1] + 8, 34 * sc, 9 * sc, "rgba(30,70,100,.18)"); rect(c[0] - 2, c[1] - 24 * sc, 4, 30 * sc, "#c8dce8");
        glow("#7fe8c8", 12, function() { ell(c[0], c[1] - 36 * sc, 20 * sc, 18 * sc, "#4cc27e"); }); ell(c[0] - 6 * sc, c[1] - 42 * sc, 9 * sc, 7 * sc, "#7fe4a8");
        ell(c[0], c[1] + 6, 16 * sc, 4 * sc, "#eef8fc"); ell(c[0], c[1] + 5, 12 * sc, 3 * sc, "#7fd8ee");
    });
    /* đèn trụ hologram */
    [150, 350, 650, 850].forEach(function(lx, li) { rect(lx - 1.5, HZ + 60, 3, 50, "#b8ccd8"); glow("#7fe8ff", 16 + 4 * Math.sin(t / 300 + li), function() { ell(lx, HZ + 58, 6, 6, "#c8f8ff"); }); ctx.strokeStyle = "rgba(127,232,255,.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(lx, HZ + 58, 12, 3, t / 700 + li, 0, Math.PI * 2); ctx.stroke(); });
    /* robot nhỏ + người đi bộ */
    for (i = 0; i < 2; i++) { var rx = ((t / (30 + i * 9) + i * 400) % (W + 60)) - 30, ry = 380 + i * 80; shadow(rx, ry + 12, 22); rrect(rx - 8, ry - 6, 16, 14, 5, "#f4fbff"); ell(rx, ry - 10, 6, 5, "#f4fbff"); glow("#7fe8ff", 6, function() { rect(rx - 3, ry - 11, 6, 2, "#7fe8ff"); }); ell(rx - 5, ry + 9, 3, 2, "#8fb4d0"); ell(rx + 5, ry + 9, 3, 2, "#8fb4d0"); }
    [["#ff7aa8", 0, 1], ["#4aa8e8", 300, -1], ["#ffd86a", 560, 1], ["#7fe8c8", 790, -1]].forEach(function(l, li) {
        var lx = ((t / (50 + li * 7) + l[1]) % (W + 80)) - 40; if (l[2] < 0) lx = W - lx;
        person(lx, 350 + (li % 2) * 36, l[0], t, li, { bag: "#ffffff" });
    });
}

function ground(era, t) {
    if (era === 4) { groundRepublic(t); return; }
    if (era === 5) { groundModern(t); return; }
    if (era === 6) { groundFuture(t); return; }
    var th = THEME[era];
    ctx.fillStyle = lg(0, HZ, 0, H, [[0, th.ground[0]], [1, th.ground[1]]]); ctx.fillRect(0, HZ, W, H - HZ);
    var i;
    if (era === 5) {                                           /* mặt đường ướt neon */
        for (i = 0; i < 12; i++) { var yy = HZ + 20 + i * i * 2.4; ctx.strokeStyle = "rgba(46,230,255," + (0.08 + i * 0.012) + ")"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke(); }
        for (i = -8; i <= 8; i++) { ctx.strokeStyle = "rgba(255,61,242,.14)"; ctx.beginPath(); ctx.moveTo(500, HZ + 4); ctx.lineTo(500 + i * 130, H); ctx.stroke(); }
        return;
    }
    if (era === 6) {                                           /* nền năng lượng */
        for (i = 0; i < 16; i++) { ctx.strokeStyle = "rgba(185,162,255," + (0.08 + i * 0.01) + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, HZ + i * i * 1.3 + 10); ctx.lineTo(W, HZ + i * i * 1.3 + 10); ctx.stroke(); }
        for (i = -10; i <= 10; i++) { ctx.strokeStyle = "rgba(185,162,255,.12)"; ctx.beginPath(); ctx.moveTo(500, HZ); ctx.lineTo(500 + i * 120, H); ctx.stroke(); }
        return;
    }
    /* mặt nước (hồ / sông) cho thời 1, 3 */
    if (era === 1 || era === 3) {
        ctx.fillStyle = lg(0, HZ + 6, 0, HZ + 60, [[0, era === 1 ? "#c9d3cf" : "#9fd3d6"], [1, era === 1 ? "#aebbb6" : "#6fb7c4"]]);
        ctx.beginPath(); ctx.moveTo(0, HZ + 8); ctx.quadraticCurveTo(300, HZ + 30, 520, HZ + 14); ctx.quadraticCurveTo(760, HZ + 2, W, HZ + 24); ctx.lineTo(W, HZ + 70); ctx.quadraticCurveTo(500, HZ + 56, 0, HZ + 74); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1.5;
        for (i = 0; i < 9; i++) { var wx = (i * 130 + t / 40) % W; ctx.beginPath(); ctx.moveTo(wx, HZ + 30 + (i % 3) * 8); ctx.lineTo(wx + 24, HZ + 30 + (i % 3) * 8); ctx.stroke(); }
    }
    /* chấm cỏ / đá */
    for (i = 0; i < 160; i++) {
        var gx = rnd(i) * W, gy = HZ + 80 + rnd(i + 50) * (H - HZ - 80);
        ctx.fillStyle = era === 4 ? "rgba(70,90,50,.35)" : "rgba(60,100,40,.28)";
        ctx.fillRect(gx, gy, 3, 6); ctx.fillRect(gx + 4, gy + 2, 2, 5);
    }
    if (era === 1) inkFront(t); else if (era === 2) tangFront(t); else if (era === 3) jiangnanFront(t);
}

function pathway(era) {
    var th = THEME[era];
    ctx.beginPath();
    ctx.moveTo(470, 545); ctx.bezierCurveTo(420, 470, 560, 430, 490, 350);
    ctx.lineTo(515, 350); ctx.bezierCurveTo(600, 430, 470, 470, 540, 545); ctx.closePath();
    ctx.fillStyle = th.path; ctx.fill(); ctx.strokeStyle = th.pathE; ctx.lineWidth = 3; ctx.stroke();
    /* nhánh sang trái / phải */
    [[490, 400, 250, 440, 330, 360], [510, 400, 760, 440, 700, 360]].forEach(function(p, idx) {
        ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(p[2], p[3] - 24, idx ? 760 : 240, 470); ctx.lineTo(idx ? 760 : 240, 484); ctx.quadraticCurveTo(p[2], p[3] + 4, p[0], p[1] + 26); ctx.closePath();
        ctx.fillStyle = th.path; ctx.fill(); ctx.strokeStyle = th.pathE; ctx.lineWidth = 2; ctx.stroke();
    });
}

/* ===================================================================
   CÔNG TRÌNH — TRUYỀN THỐNG (thời 1, 2, 3)
   =================================================================== */
var TRAD = {
    1: { wall: "#d8cdb2", wallS: "#b9ad92", pillar: "#53463a", roof1: "#6a6d70", roof2: "#4a4d50", trim: "#2f3234", accent: "#b3362c", awn: ["#e8dec4", "#b3362c"] },
    2: { wall: "#f4e4bc", wallS: "#d6c08e", pillar: "#c0301f", roof1: "#e8b04a", roof2: "#b9751b", trim: "#ffd25a", accent: "#c0301f", awn: ["#c0301f", "#ffd25a"] },
    3: { wall: "#f7f5ee", wallS: "#dcd8cb", pillar: "#6b4a2a", roof1: "#5a606a", roof2: "#343840", trim: "#22252b", accent: "#4e8c64", awn: ["#f7f5ee", "#4e8c64"] }
};

function tradHall(era, x, y, l, t) {
    var c = TRAD[era], s = 1 + l * 0.08, w = 190 * s, h = 70 * s;
    shadow(x, y + 6, w + 70);
    rect(x - w / 2 - 14, y - 12, w + 28, 12, era === 2 ? "#e0cfa0" : "#b9b3a6");                       /* nền bậc thềm */
    rect(x - w / 2 - 4, y - 22, w + 8, 10, era === 2 ? "#efdfb0" : "#cfc9bc");
    box(x - w / 2, y - 22, w, h, 26, c.wall, c.wallS, c.wall);
    for (var i = 0; i < 6; i++) { var px = x - w / 2 + 6 + i * (w - 18) / 5; ctx.fillStyle = lg(px, 0, px + 10, 0, [[0, c.pillar], [1, "rgba(0,0,0,.35)"]]); ctx.fillRect(px, y - 22 - h, 10, h); }
    rect(x - 20, y - 22 - h * 0.78, 40, h * 0.78, "#3a2416"); rect(x - 16, y - 22 - h * 0.7, 32, h * 0.7, "#5a3a22");
    if (era === 2) { for (var d = 0; d < 3; d++) for (var e = 0; e < 3; e++) ell(x - 10 + e * 10, y - 22 - h * 0.62 + d * 14, 2, 2, "#ffd25a"); }
    [[-1], [1]].forEach(function(sg) { window2(x + sg[0] * (w * 0.31) - 14, y - 22 - h * 0.7, 28, 30, era === 3 ? "#7aa6a0" : "#3a2a18", c.pillar); });
    /* mái hai tầng */
    chRoof(x, y - 22 - h + 4, w + 20, 34 * s, 36, c.roof1, c.roof2, c.trim);
    chRoof(x, y - 22 - h - 26 * s, w * 0.66, 30 * s, 28, c.roof1, c.roof2, c.trim);
    if (l >= 2) chRoof(x, y - 22 - h - 54 * s, w * 0.36, 24 * s, 20, c.roof1, c.roof2, c.trim);
    if (l >= 3) {
        ell(x, y - 22 - h - 86 * s, 7, 9, "#ffd25a");
        var f = Math.sin(t / 220) * 3; ctx.fillStyle = c.accent; ctx.beginPath(); ctx.moveTo(x + 1, y - 22 - h - 108 * s); ctx.lineTo(x + 26 + f, y - 22 - h - 100 * s); ctx.lineTo(x + 1, y - 22 - h - 94 * s); ctx.fill();
        ctx.fillStyle = "#6b4a2a"; ctx.fillRect(x - 1, y - 22 - h - 110 * s, 2, 26);
    }
    text(era === 1 ? "堂" : era === 2 ? "殿" : "苑", x, y - 22 - h * 0.38 - 36, 20, c.trim);
    lantern(x - w / 2 + 8, y - 22 - h * 0.28, 7, "#e63946", t, 0); lantern(x + w / 2 - 6, y - 22 - h * 0.28, 7, "#e63946", t, 1.7);
}
function tradLibrary(era, x, y, l, t) {
    var c = TRAD[era], s = 1 + l * 0.07, w = 90 * s, h = 90 * s;
    shadow(x, y + 5, w + 50);
    box(x - w / 2, y, w, h, 20, c.wall, c.wallS, c.wall);
    for (var i = 0; i < 3; i++) window2(x - w / 2 + 10 + i * (w - 20) / 3, y - h + 14, (w - 30) / 3, 26, "#2a1d12", c.pillar);
    rect(x - 14, y - 36, 28, 36, "#3a2416");
    rect(x - w / 2, y - h - 2, w, 6, c.pillar);
    chRoof(x, y - h + 4, w + 6, 30 * s, 24, c.roof1, c.roof2, c.trim);
    if (l >= 2) { box(x - w * 0.3, y - h - 22 * s, w * 0.6, 28 * s, 12, c.wall, c.wallS, c.wall); chRoof(x, y - h - 20 * s, w * 0.6, 22 * s, 18, c.roof1, c.roof2, c.trim); }
    if (l >= 3) lantern(x + w / 2 + 6, y - h * 0.6, 8, "#ffcf5a", t, 2);
    rrect(x - 16, y - h * 0.58, 32, 22, 3, c.accent); text("書", x, y - h * 0.58 + 11, 17, "#fff1c9");
}
function tradPavilion(era, x, y, l, t) {
    var c = TRAD[era], s = 1 + l * 0.09, w = 100 * s, h = 62 * s;
    shadow(x, y + 5, w + 40);
    if (era === 2) {                                           /* tháp Đại Nhạn */
        var tw = 56, i;
        for (i = 0; i < 4 + l; i++) {
            var ty = y - i * 36, ww = tw - i * 6;
            box(x - ww / 2, ty, ww, 30, 10, "#d8c9a2", "#b9a97f", "#d8c9a2");
            chRoof(x, ty - 26, ww + 10, 14, 10, "#b9a97f", "#8a7a50", "#6b5a30");
            rect(x - 5, ty - 18, 10, 14, "#3a2a18");
        }
        ell(x, y - (4 + l) * 36 - 6, 5, 8, "#ffd25a");
        return;
    }
    if (era === 3) {                                           /* đình hoa sen bên hồ */
        ell(x, y + 6, w * 0.7, 18, "#6fb7c4"); ell(x - 18, y + 4, 12, 5, "#8fd69a"); ell(x + 34, y + 9, 10, 4, "#8fd69a"); glow("#ff9ac1", 8, function() { ell(x - 18, y + 1, 5, 4, "#ff9ac1"); });
    }
    [-1, 1].forEach(function(sg) { ctx.fillStyle = lg(0, 0, 10, 0, [[0, c.pillar], [1, "#2a1a10"]]); ctx.fillRect(x + sg * w * 0.38 - 5, y - h, 10, h); });
    rect(x - w * 0.38, y - h * 0.35, w * 0.76, 4, c.pillar);
    chRoof(x, y - h + 6, w, 34 * s, 22, c.roof1, c.roof2, c.trim);
    if (l >= 2) chRoof(x, y - h - 22 * s, w * 0.6, 24 * s, 16, c.roof1, c.roof2, c.trim);
    lantern(x, y - h * 0.5, 7, "#e63946", t, 0.5);
    if (l >= 3) { ell(x, y - h - 52 * s, 5, 8, "#ffd25a"); }
}
function tradGate(era, x, y, l, t) {
    var c = TRAD[era], s = 1 + l * 0.07, w = 150 * s, h = 96 * s;
    shadow(x, y + 5, w + 60);
    if (era === 3) {                                           /* cổng trăng giữa tường trắng */
        box(x - w / 2, y, w, h * 0.9, 16, c.wall, c.wallS, c.wall);
        ctx.save(); ctx.beginPath(); ctx.arc(x, y - h * 0.38, 36 * s, 0, Math.PI * 2); ctx.fillStyle = "#6fa97a"; ctx.fill(); ctx.strokeStyle = "#8d7a5a"; ctx.lineWidth = 8; ctx.stroke(); ctx.restore();
        ctx.beginPath(); ctx.arc(x, y - h * 0.38, 28 * s, 0, Math.PI * 2); ctx.fillStyle = "#dff0d6"; ctx.fill();
        tree(x + 6, y - h * 0.2, 14, "#6fa97a", "#8cc08a", t / 600);
        chRoof(x, y - h * 0.9 + 6, w + 6, 22 * s, 16, c.roof1, c.roof2, c.trim);
        text("門", x + w / 2 - 20, y - h * 0.6, 16, c.roof2);
        return;
    }
    [-1, 1].forEach(function(sg) { ctx.fillStyle = lg(0, 0, 14, 0, [[0, c.pillar], [1, "#2a1a10"]]); ctx.fillRect(x + sg * w * 0.42 - 8, y - h, 16, h); rect(x + sg * w * 0.42 - 12, y - 8, 24, 8, era === 2 ? "#e0cfa0" : "#8e8b84"); });
    rect(x - w * 0.42, y - h + 12, w * 0.84, 12, c.pillar); rect(x - w * 0.42, y - h + 28, w * 0.84, 6, c.trim);
    chRoof(x, y - h + 10, w + 20, 30 * s, 26, c.roof1, c.roof2, c.trim);
    text(era === 1 ? "竹" : "朱雀", x, y - h + 20, 15, era === 2 ? "#ffd25a" : "#e8dec4");
    if (era === 2) { rect(x - 28, y - 70, 56, 70, "#c0301f"); for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) ell(x - 20 + j * 13, y - 60 + i * 15, 2, 2, "#ffd25a"); ctx.fillStyle = "#ffd25a"; ctx.fillRect(x - 1, y - 70, 2, 70); }
    if (l >= 2) { lantern(x - w * 0.42, y - h * 0.5, 8, "#e63946", t, 0); lantern(x + w * 0.42, y - h * 0.5, 8, "#e63946", t, 2); }
    if (l >= 3) { chRoof(x, y - h - 18 * s, w * 0.5, 22 * s, 18, c.roof1, c.roof2, c.trim); }
}
function tradMarket(era, x, y, l, t) {
    var c = TRAD[era], n = 1 + (l >= 2 ? 1 : 0) + (l >= 3 ? 1 : 0), i;
    shadow(x, y + 5, 160 + n * 30);
    for (i = 0; i < n; i++) {
        var sx = x - (n - 1) * 36 + i * 72, sy = y - (i % 2) * 8;
        [-26, 26].forEach(function(o) { rect(sx + o - 2, sy - 52, 4, 52, "#6b4a2a"); });
        for (var k = 0; k < 6; k++) { var ax = sx - 32 + k * 11; poly([[ax, sy - 56], [ax + 11, sy - 56], [ax + 13, sy - 40], [ax - 2, sy - 40]], k % 2 ? c.awn[0] : c.awn[1]); }
        rrect(sx - 28, sy - 20, 56, 20, 3, "#a67c4a"); rect(sx - 28, sy - 24, 56, 5, "#c79a5e");
        ell(sx - 14, sy - 28, 7, 5, ["#e63946", "#f4c20d", "#58a05c"][(i + era) % 3]); ell(sx, sy - 28, 7, 5, ["#f4c20d", "#58a05c", "#e63946"][(i + era) % 3]); ell(sx + 14, sy - 28, 7, 5, "#58a05c");
        lantern(sx + 30, sy - 46, 6, "#ffcf5a", t, i);
    }
    rrect(x - 14, y - 78 - n * 2, 28, 16, 3, c.accent); text("市", x, y - 70 - n * 2, 13, "#fff1c9");
}
function tradGarden(era, x, y, l, t) {
    var i;
    shadow(x, y + 6, 190);
    ell(x + 4, y - 6, 78, 20, era === 1 ? "#b9c6c1" : "#7fc4d0");
    ctx.strokeStyle = "rgba(255,255,255,.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x + 4, y - 6, 60 + Math.sin(t / 500) * 3, 14, 0, 0, Math.PI * 2); ctx.stroke();
    /* đá & cây theo thời */
    ell(x - 62, y - 14, 18, 14, "#8a8d88"); ell(x - 56, y - 24, 12, 10, "#a2a59f");
    if (era === 1) {                                           /* trúc + tùng */
        for (i = 0; i < 5 + l * 2; i++) { var bx = x + 50 + i * 7 - l * 8, sw = Math.sin(t / 700 + i) * 3; ctx.strokeStyle = "#5a7a4a"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx, y - 4); ctx.lineTo(bx + sw, y - 90 - (i % 3) * 14); ctx.stroke(); ell(bx + sw, y - 92 - (i % 3) * 14, 12, 4, "#7f9f6a"); ell(bx + sw + 4, y - 66 - (i % 3) * 10, 12, 4, "#8fae78"); }
        ctx.fillStyle = "#4a3a2a"; ctx.fillRect(x - 40, y - 70, 5, 70); ell(x - 38, y - 80, 30, 12, "#4f6a48"); ell(x - 24, y - 64, 22, 9, "#5f7a56");
    } else if (era === 2) {                                    /* mẫu đơn rực rỡ */
        for (i = 0; i < 6 + l * 3; i++) { var fx = x - 60 + (i % 6) * 22 + Math.floor(i / 6) * 8, fy = y - 8 - Math.floor(i / 6) * 14; ell(fx, fy + 4, 10, 6, "#4f8a3a"); glow("#ff5d8f", 8, function() { ell(fx, fy - 6, 9, 8, ["#ff5d8f", "#ff9a3c", "#ff3d6b"][i % 3]); }); ell(fx, fy - 8, 3, 2, "#ffd25a"); }
        tree(x + 62, y - 6, 34, "#e8a317", "#f0c24a", t / 700);
    } else {                                                   /* liễu + sen */
        for (i = 0; i < 4; i++) { glow("#ff9ac1", 6, function() { ell(x - 20 + i * 18, y - 8 - (i % 2) * 4, 6, 4, "#ff9ac1"); }); ell(x - 24 + i * 18, y - 5 - (i % 2) * 3, 11, 4, "#6cc07a"); }
        ctx.fillStyle = "#6b4a2a"; ctx.fillRect(x + 56, y - 90, 7, 90);
        for (i = 0; i < 12; i++) { var lx = x + 46 + i * 4, sw2 = Math.sin(t / 600 + i * 0.7) * 4; ctx.strokeStyle = i % 2 ? "#7fb86a" : "#6aa65a"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + 59, y - 88); ctx.quadraticCurveTo(lx - 8 + sw2, y - 60, lx + sw2, y - 14); ctx.stroke(); }
        ell(x + 59, y - 92, 24, 8, "#7fb86a");
    }
    if (l >= 2) { poly([[x - 12, y - 14], [x + 22, y - 14], [x + 22, y - 8], [x - 12, y - 8]], "#c0392b"); rect(x - 10, y - 22, 3, 8, "#8e2a20"); rect(x + 17, y - 22, 3, 8, "#8e2a20"); }
    if (l >= 3) { lantern(x - 80, y - 40, 7, "#ffcf5a", t, 0); lantern(x + 90, y - 50, 7, "#ffcf5a", t, 1); }
}

/* ===================================================================
   CÔNG TRÌNH — DÂN QUỐC (thời 4)
   =================================================================== */
var DQ = { brick: "#b4573d", brickS: "#8f4330", cream: "#eadfc8", creamS: "#cdbfa0", roof: "#6a4a3a", roofS: "#4a3226", green: "#2e6b4f", gold: "#d4a93f" };

function dqHall(x, y, l, t) {
    var s = 1 + l * 0.08, w = 170 * s, h = 110 * s, i;
    shadow(x, y + 6, w + 80);
    box(x - w / 2, y, w, h, 30, DQ.brick, DQ.brickS, DQ.brick);
    rect(x - w / 2, y - h * 0.5, w, 6, DQ.cream); rect(x - w / 2, y - h, w, 8, DQ.cream);
    for (i = 0; i < 4; i++) {
        var wx = x - w / 2 + 14 + i * (w - 28) / 3.5;
        for (var r = 0; r < 2; r++) {
            var wy = y - 38 - r * h * 0.5;
            ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx, wy - 22); ctx.arc(wx + 9, wy - 22, 9, Math.PI, 0); ctx.lineTo(wx + 18, wy); ctx.closePath();
            ctx.fillStyle = r === 1 && i % 2 ? "#ffd98a" : "#2a3a4a"; ctx.fill(); ctx.strokeStyle = DQ.cream; ctx.lineWidth = 3; ctx.stroke();
        }
    }
    rect(x - 18, y - 52, 36, 52, DQ.green); ctx.strokeStyle = DQ.gold; ctx.lineWidth = 3; ctx.strokeRect(x - 18, y - 52, 36, 52); ell(x, y - 26, 4, 4, DQ.gold);
    rect(x - w * 0.3, y - h * 0.5 + 4, 50, 6, DQ.gold);                                       /* ban công */
    poly([[x - w / 2 - 10, y - h], [x - w / 2 + 40, y - h - 46 * s], [x + w / 2 - 20, y - h - 46 * s], [x + w / 2 + 14, y - h]], DQ.roof);
    poly([[x + w / 2 + 14, y - h], [x + w / 2 + 30, y - h - 12], [x + w / 2 - 6, y - h - 46 * s - 12], [x + w / 2 - 20, y - h - 46 * s]], DQ.roofS);
    if (l >= 2) { box(x - 26, y - h - 46 * s, 52, 36 * s, 14, DQ.cream, DQ.creamS, DQ.cream); window2(x - 14, y - h - 46 * s - 28, 28, 22, "#ffd98a", DQ.green); poly([[x - 32, y - h - 46 * s - 36 * s], [x, y - h - 46 * s - 36 * s - 28], [x + 32, y - h - 46 * s - 36 * s]], DQ.green); }
    if (l >= 3) { var f = Math.sin(t / 240) * 3; rect(x - 1, y - h - 46 * s - 36 * s - 54, 2, 30, "#6b4a2a"); ctx.fillStyle = "#c0392b"; ctx.beginPath(); ctx.moveTo(x + 1, y - h - 46 * s - 36 * s - 54); ctx.lineTo(x + 24 + f, y - h - 46 * s - 36 * s - 46); ctx.lineTo(x + 1, y - h - 46 * s - 36 * s - 38); ctx.fill(); }
    text("府", x, y - 60, 14, DQ.gold);
}
function dqLibrary(x, y, l, t) {
    var s = 1 + l * 0.07, w = 96 * s, h = 150 * s;
    shadow(x, y + 5, w + 50);
    box(x - w / 2, y, w, h, 20, DQ.cream, DQ.creamS, DQ.cream);
    for (var r = 0; r < 4; r++) for (var c = 0; c < 3; c++) window2(x - w / 2 + 10 + c * 28, y - h + 28 + r * 28, 20, 18, (r + c) % 3 ? "#ffd98a" : "#3a4a5a", DQ.green);
    rrect(x - w / 2 - 4, y - h - 8, w + 8, 14, 3, DQ.green);
    poly([[x - w / 2, y - h - 8], [x, y - h - 40 * s], [x + w / 2, y - h - 8]], DQ.green);
    rrect(x - 32, y - 34, 64, 22, 3, "#2a3a4a"); text("書報", x, y - 23, 15, DQ.gold);
    rect(x - 10, y - 12, 20, 12, "#4a2c17");
    if (l >= 2) { glow("#ffd98a", 10, function() { ell(x, y - h - 48 * s, 6, 6, "#ffd98a"); }); }
    if (l >= 3) { rect(x + w / 2 + 6, y - h * 0.7, 4, 50, "#6b4a2a"); for (var i = 0; i < 3; i++) ell(x + w / 2 + 8, y - h * 0.7 + i * 14, 4, 6, "#e63946"); }
}
function dqPavilion(x, y, l, t) {
    var s = 1 + l * 0.08, w = 130 * s, h = 80 * s, i;
    shadow(x, y + 5, w + 40);
    box(x - w / 2, y, w, h, 18, "#2a3a4a", "#1d2a38", "#2a3a4a");
    for (i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x - 6, y - h * 0.45); var ang = Math.PI + (i / 5) * Math.PI; ctx.lineTo(x + Math.cos(ang) * 40 * s, y - h * 0.45 + Math.sin(ang) * 40 * s); ctx.strokeStyle = DQ.gold; ctx.lineWidth = 3; ctx.stroke(); }
    ctx.beginPath(); ctx.arc(x, y - h * 0.45, 40 * s, Math.PI, 0); ctx.strokeStyle = DQ.gold; ctx.lineWidth = 4; ctx.stroke();
    rrect(x - w * 0.42, y - h - 4, w * 0.84, 18, 4, DQ.green);
    for (i = 0; i < 9; i++) { var on = Math.floor(t / 300 + i) % 3 !== 0; ell(x - w * 0.38 + i * (w * 0.76 / 8), y - h + 5, 3.5, 3.5, on ? "#fff1a8" : "#8a7a40"); }
    rect(x - 14, y - 32, 28, 32, "#c9a24a");
    if (l >= 2) { rect(x - 3, y - h - 50, 6, 46, DQ.gold); ell(x, y - h - 52, 10, 5, DQ.gold); }
    if (l >= 3) { glow("#ffd98a", 20, function() { ell(x, y - h - 56, 6, 6, "#fff1a8"); }); }
}
function dqGate(x, y, l, t) {
    var s = 1 + l * 0.06, w = 170 * s, h = 120 * s;
    shadow(x, y + 5, w + 60);
    box(x - w / 2, y, w, h, 16, DQ.brick, DQ.brickS, DQ.brick);
    for (var r = 0; r < 8; r++) for (var c = 0; c < 12; c++) { ctx.fillStyle = (r + c) % 2 ? "rgba(0,0,0,.08)" : "rgba(255,255,255,.05)"; ctx.fillRect(x - w / 2 + c * w / 12, y - h + r * h / 8, w / 12, h / 8); }
    ctx.beginPath(); ctx.moveTo(x - 36, y); ctx.lineTo(x - 36, y - 62); ctx.arc(x, y - 62, 36, Math.PI, 0); ctx.lineTo(x + 36, y); ctx.closePath();
    ctx.fillStyle = "#2a1a10"; ctx.fill(); ctx.strokeStyle = "#e0d6c0"; ctx.lineWidth = 10; ctx.stroke();
    rect(x - 22, y - 70, 44, 70, "#3a2416"); ctx.strokeStyle = DQ.gold; ctx.lineWidth = 2; ctx.strokeRect(x - 22, y - 70, 44, 70); ell(x - 8, y - 32, 3, 3, DQ.gold); ell(x + 8, y - 32, 3, 3, DQ.gold);
    rrect(x - 26, y - 118, 52, 22, 3, "#e0d6c0"); text("石庫門", x, y - 107, 14, "#3a2416");
    poly([[x - w / 2 - 6, y - h], [x - w / 2 + 20, y - h - 22], [x + w / 2 - 20, y - h - 22], [x + w / 2 + 6, y - h]], DQ.roof);
    if (l >= 2) { lantern(x - w * 0.38, y - h * 0.5, 8, "#e63946", t, 0); lantern(x + w * 0.38, y - h * 0.5, 8, "#e63946", t, 2); }
    if (l >= 3) { glow("#ffd98a", 14, function() { ell(x - 54, y - h + 18, 5, 5, "#ffd98a"); ell(x + 54, y - h + 18, 5, 5, "#ffd98a"); }); }
}
function dqMarket(x, y, l, t) {
    var n = 2 + (l >= 3 ? 1 : 0), i;
    shadow(x, y + 5, 170 + n * 20);
    for (i = 0; i < n; i++) {
        var sx = x - (n - 1) * 34 + i * 68;
        box(sx - 30, y, 60, 80, 12, i % 2 ? DQ.cream : "#d9c9a8", DQ.creamS, DQ.cream);
        for (var k = 0; k < 6; k++) { var ax = sx - 33 + k * 11; poly([[ax, y - 56], [ax + 11, y - 56], [ax + 14, y - 40], [ax - 3, y - 40]], k % 2 ? "#fff" : (i % 2 ? "#2e6b4f" : "#c0392b")); }
        window2(sx - 20, y - 36, 40, 30, "#ffe3a8", DQ.green);
        ell(sx - 6, y - 20, 4, 8, "#c0392b"); ell(sx + 8, y - 20, 4, 8, "#2e6b4f");
    }
    rrect(x - 26, y - 96, 52, 18, 3, "#2a3a4a"); text("旗袍", x, y - 87, 13, DQ.gold);
    if (l >= 2) { rect(x + 60, y - 70, 3, 70, "#3a3a3a"); glow("#ffd98a", 14, function() { ell(x + 61, y - 74, 6, 6, "#ffe9a8"); }); }
}
function dqGarden(x, y, l, t) {
    shadow(x, y + 6, 190);
    ell(x, y - 6, 88, 20, "#6c9a5a"); ell(x, y - 8, 70, 14, "#7fb26a");
    ell(x, y - 10, 24, 7, "#cfc8b4"); ell(x, y - 18, 14, 5, "#7fc4d0"); rect(x - 3, y - 30, 6, 14, "#cfc8b4"); ell(x, y - 32, 8, 4, "#cfc8b4");
    var spray = Math.sin(t / 150) * 2; ctx.strokeStyle = "rgba(190,230,255,.9)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 34); ctx.quadraticCurveTo(x - 10 + spray, y - 50, x - 18, y - 24); ctx.moveTo(x, y - 34); ctx.quadraticCurveTo(x + 10 - spray, y - 50, x + 18, y - 24); ctx.stroke();
    tree(x - 60, y - 6, 34, "#6aa65a", "#85c071", t / 700); tree(x + 62, y - 4, 38, "#d99a2b", "#f0c24a", t / 800);
    rect(x - 40, y - 20, 22, 4, "#6b4a2a"); rect(x - 38, y - 16, 2, 8, "#3a2a1a"); rect(x - 22, y - 16, 2, 8, "#3a2a1a");
    if (l >= 2) { rect(x + 30, y - 66, 3, 60, "#3a3a3a"); glow("#ffe9a8", 14, function() { ell(x + 31, y - 70, 6, 6, "#ffe9a8"); }); }
    if (l >= 3) { rect(x - 90, y - 60, 3, 54, "#3a3a3a"); glow("#ffe9a8", 14, function() { ell(x - 89, y - 64, 6, 6, "#ffe9a8"); }); }
}

/* ===================================================================
   CÔNG TRÌNH — ĐÔ THỊ NEON (thời 5) & TƯƠNG LAI (thời 6)
   =================================================================== */
function neonTower(x, y, w, h, c1, c2, t, seed, crystal) {
    var d = 22;
    shadow(x, y + 6, w + 60);
    box(x - w / 2, y, w, h, d, crystal ? "#5a3fb8" : "#10162f", crystal ? "#3a2a86" : "#0a0e22", crystal ? "#8a6aff" : "#1a2144");
    glow(c1, 12, function() { ctx.strokeStyle = c1; ctx.lineWidth = 2; ctx.strokeRect(x - w / 2, y - h, w, h); ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2 + d, y - h - d * 0.45); ctx.lineTo(x + w / 2 + d, y - h - d * 0.45); ctx.lineTo(x + w / 2, y - h); ctx.stroke(); });
    for (var wy = 10; wy < h - 10; wy += 14) for (var wx = 8; wx < w - 10; wx += 12) {
        var on = rnd(seed + wx * 3 + wy) > 0.35 ? (Math.sin(t / 900 + wx + wy * 0.3) > -0.6) : false;
        if (on) { ctx.fillStyle = rnd(seed + wx + wy) > 0.5 ? c1 : c2; ctx.globalAlpha = 0.85; ctx.fillRect(x - w / 2 + wx, y - h + wy, 6, 8); ctx.globalAlpha = 1; }
    }
}
function nLibrary(era, x, y, l, t) {
    var c1 = era === 5 ? "#8fd8ff" : "#cfe0ff", c2 = era === 5 ? "#ffb36b" : "#9ff0ff", s = 1 + l * 0.07;
    neonTower(x, y, 80 * s, 120 * s, c1, c2, t, 11, era === 6);
    glow(c1, 14, function() { ctx.strokeStyle = c1; ctx.lineWidth = 3; rrect(x - 22, y - 58, 44, 30, 4, null, c1); ctx.beginPath(); ctx.moveTo(x, y - 58); ctx.lineTo(x, y - 28); ctx.stroke(); });
    text("書", x, y - 140 * s + 10, 20, c2);
    if (l >= 2) { glow(c2, 16, function() { ctx.strokeStyle = c2; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x + 10, y - 130 * s, 36, 8, 0, 0, Math.PI * 2); ctx.stroke(); }); }
    if (l >= 3) { glow(c1, 18, function() { ell(x + 10, y - 148 * s, 6, 6, c1); }); }
}
function nHall(era, x, y, l, t) {
    var c1 = era === 5 ? "#8fd8ff" : "#cfe0ff", c2 = era === 5 ? "#ffb36b" : "#f0f6ff", s = 1 + l * 0.1;
    neonTower(x - 52, y, 80 * s, 150 * s, c1, c2, t, 3, era === 6);
    neonTower(x + 44, y, 90 * s, 190 * s, c2, c1, t, 21, era === 6);
    glow(c1, 20, function() { ctx.strokeStyle = c1; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x + 44 + 11, y - 190 * s - 14, 70, 14, 0, 0, Math.PI * 2); ctx.stroke(); });
    glow(c2, 16, function() { rect(x + 44 + 8, y - 190 * s - 70, 3, 56, c2); ell(x + 44 + 9, y - 190 * s - 74, 5, 5, c2); });
    if (l >= 2) glow(c1, 22, function() { ctx.strokeStyle = c2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20, y - 110 * s); ctx.lineTo(x + 20, y - 130 * s); ctx.stroke(); });
    if (l >= 3) for (var i = 0; i < 3; i++) glow(c1, 12, function() { var a = t / 600 + i * 2.1; ell(x + 40 + Math.cos(a) * 90, y - 230 * s + Math.sin(a) * 14, 4, 4, c1); });
    text(era === 5 ? "摩天" : "星", x - 12, y - 100 * s, 16, "#fff");
}
function nPavilion(era, x, y, l, t) {
    var c1 = era === 5 ? "#ffb36b" : "#9ff0ff", c2 = era === 5 ? "#8fd8ff" : "#cfe0ff", s = 1 + l * 0.09;
    shadow(x, y + 6, 130);
    glow(c2, 12, function() { ctx.fillStyle = "#1a1f44"; ctx.beginPath(); ctx.arc(x, y - 40 * s, 46 * s, Math.PI, 0); ctx.lineTo(x + 46 * s, y); ctx.lineTo(x - 46 * s, y); ctx.closePath(); ctx.fill(); ctx.strokeStyle = c2; ctx.lineWidth = 3; ctx.stroke(); });
    glow(c1, 14, function() { ctx.strokeStyle = c1; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 40 * s, 30 * s, Math.PI, 0); ctx.stroke(); rect(x - 14, y - 30, 28, 30, "#0a0e22"); ctx.strokeStyle = c1; ctx.strokeRect(x - 14, y - 30, 28, 30); });
    if (era === 6) { glow("#ffe9ff", 18, function() { ell(x, y - 40 * s - 62, 10, 10, "#ffe9ff"); }); ctx.strokeStyle = "rgba(255,233,255,.5)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, y - 40 * s - 62, 22, 6, t / 800, 0, Math.PI * 2); ctx.stroke(); }
    if (l >= 2) { glow(c1, 14, function() { ctx.strokeStyle = c1; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 60, y); ctx.lineTo(x + 60, y); ctx.stroke(); }); }
    if (l >= 3) { glow(c2, 16, function() { rect(x - 2, y - 40 * s - 90, 4, 44, c2); }); }
}
function nGate(era, x, y, l, t) {
    var c1 = era === 5 ? "#8fd8ff" : "#cfe0ff", c2 = era === 5 ? "#ffb36b" : "#9ff0ff", s = 1 + l * 0.06, w = 170 * s, h = 120 * s;
    shadow(x, y + 5, w + 40);
    ctx.fillStyle = "#10162f"; ctx.fillRect(x - w / 2, y - h, 28, h); ctx.fillRect(x + w / 2 - 28, y - h, 28, h);
    glow(c1, 16, function() { ctx.strokeStyle = c1; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2 + 28, y); ctx.lineTo(x - w / 2 + 28, y - h * 0.7); ctx.arc(x, y - h * 0.7, w / 2 - 28, Math.PI, 0); ctx.lineTo(x + w / 2 - 28, y); ctx.stroke(); ctx.strokeRect(x - w / 2, y - h, 28, h); ctx.strokeRect(x + w / 2 - 28, y - h, 28, h); });
    glow(c2, 24, function() { ctx.strokeStyle = c2; ctx.lineWidth = 2; for (var i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x, y - h * 0.7, (w / 2 - 36) - i * 10, Math.PI, 0); ctx.stroke(); } });
    var swirl = (t / 500) % (Math.PI * 2);
    if (era === 6) { glow("#ffe9ff", 24, function() { ctx.fillStyle = "rgba(210,190,255,.35)"; ctx.beginPath(); ctx.arc(x, y - h * 0.7, w / 2 - 40, Math.PI, 0); ctx.lineTo(x + w / 2 - 40, y); ctx.lineTo(x - w / 2 + 40, y); ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.beginPath(); ctx.ellipse(x, y - h * 0.4, 30, 8, swirl, 0, Math.PI * 2); ctx.stroke(); }); }
    text(era === 5 ? "城" : "門", x, y - h * 0.9, 20, c2);
    if (l >= 2) { glow(c2, 20, function() { rect(x - w / 2 + 12, y - h - 18, 4, 18, c2); rect(x + w / 2 - 16, y - h - 18, 4, 18, c2); }); }
    if (l >= 3) { glow(c1, 20, function() { ell(x - w / 2 + 14, y - h - 24, 5, 5, c1); ell(x + w / 2 - 14, y - h - 24, 5, 5, c1); }); }
}
function nMarket(era, x, y, l, t) {
    var c1 = era === 5 ? "#ffb36b" : "#9ff0ff", c2 = era === 5 ? "#8fd8ff" : "#f0f6ff", n = 2 + (l >= 3 ? 1 : 0), i;
    shadow(x, y + 5, 170);
    for (i = 0; i < n; i++) {
        var sx = x - (n - 1) * 34 + i * 68;
        rrect(sx - 28, y - 30, 56, 30, 3, "#161b3e");
        poly([[sx - 34, y - 52], [sx + 34, y - 52], [sx + 28, y - 36], [sx - 28, y - 36]], i % 2 ? c1 : c2);
        glow(i % 2 ? c1 : c2, 12, function() { ctx.strokeStyle = i % 2 ? c1 : c2; ctx.lineWidth = 2; ctx.strokeRect(sx - 28, y - 30, 56, 30); });
        ell(sx - 12, y - 38, 6, 5, "#ffd25a"); ell(sx + 6, y - 38, 6, 5, "#9ff0ff"); ell(sx + 20, y - 38, 5, 5, "#ff9ac1");
    }
    glow(c1, 16, function() { rrect(x - 28, y - 92, 56, 22, 3, "#10162f", c1); }); text(era === 5 ? "商街" : "市", x, y - 81, 14, c2);
    if (l >= 2) { glow(c2, 14, function() { ctx.strokeStyle = c2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 80, y - 60); ctx.quadraticCurveTo(x, y - 40, x + 80, y - 60); ctx.stroke(); }); }
}
function nGarden(era, x, y, l, t) {
    var c1 = era === 5 ? "#9ff0ff" : "#f0f6ff", i;
    shadow(x, y + 6, 190);
    glow(c1, 16, function() { ctx.fillStyle = "#10162f"; ctx.fillRect(x - 84, y - 24, 168, 24); ctx.strokeStyle = c1; ctx.lineWidth = 2; ctx.strokeRect(x - 84, y - 24, 168, 24); });
    for (i = 0; i < 4 + l * 2; i++) {
        var tx = x - 66 + i * (132 / (3 + l * 2)), th = 24 + rnd(i) * 26;
        glow(c1, 14, function() { ctx.strokeStyle = c1; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx, y - 24); ctx.lineTo(tx, y - 24 - th); ctx.stroke(); ell(tx, y - 24 - th - 8, 11, 10, "rgba(127,245,200,.55)"); });
    }
    for (i = 0; i < 6; i++) { var a = t / 900 + i; glow("#ffd25a", 10, function() { ell(x - 60 + i * 24, y - 60 + Math.sin(a) * 10, 2.5, 2.5, "#ffe9a8"); }); }
}

var BUILD = {
    1: { palace: tradHall, library: tradLibrary, garden: tradGarden, market: tradMarket, pavilion: tradPavilion, gate: tradGate },
    2: { palace: tradHall, library: tradLibrary, garden: tradGarden, market: tradMarket, pavilion: tradPavilion, gate: tradGate },
    3: { palace: tradHall, library: tradLibrary, garden: tradGarden, market: tradMarket, pavilion: tradPavilion, gate: tradGate }
};

/* ---------- nhân vật nhỏ + sinh vật trang trí ---------- */
function walker(era, t) {
    var p = (t / 38) % 360, x = p < 180 ? 330 + p * 1.5 : 600 - (p - 180) * 1.5, dir = p < 180 ? 1 : -1;
    var y = 462 + Math.sin(t / 130) * 2, c = [["#7a6a5a", "#c4382c"], ["#c0301f", "#ffd25a"], ["#4e8c64", "#f7f5ee"], ["#2e6b4f", "#d4a93f"], ["#2ee6ff", "#ff3df2"], ["#c9a8ff", "#ffffff"]][era - 1];
    shadow(x, y + 24, 22);
    if (false) {
        rrect(x - 11, y - 8, 7, 18, 3, "#cfd3de"); rrect(x - 8, y - 6, 16, 26, 6, "#f4f6fa"); rect(x - 8, y + 4, 16, 3, "#c8402e");
        ell(x, y - 14, 10, 10, "#f4f6fa"); ell(x + dir * 2, y - 14, 7, 6, "#35507e"); ell(x + dir * 4, y - 16, 2, 2, "rgba(255,255,255,.6)");
        ctx.fillStyle = "#cfd3de"; ctx.fillRect(x - 6 + Math.sin(t / 110) * 2, y + 20, 5, 6); ctx.fillRect(x + 1 - Math.sin(t / 110) * 2, y + 20, 5, 6); return;
    }
    ctx.fillStyle = c[0]; rrect(x - 8, y - 6, 16, 26, 6, c[0]);
    ell(x, y - 14, 8, 8, "#f1cfa8"); ell(x, y - 19, 8, 5, "#2a1a10");
    ctx.fillStyle = c[1]; ctx.fillRect(x - 8, y + 4, 16, 3);
    ctx.fillStyle = "#2a1a10"; ctx.fillRect(x - 6 + Math.sin(t / 110) * 2, y + 20, 5, 6); ctx.fillRect(x + 1 - Math.sin(t / 110) * 2, y + 20, 5, 6);
    ctx.fillStyle = "#222"; ctx.fillRect(x + dir * 3 - 1, y - 15, 2, 2);
}
function critters(era, t) {
    var i;
    for (i = 0; i < 5; i++) {
        var bx = ((t / (30 + i * 9) + i * 210) % (W + 80)) - 40, by = 110 + i * 22 + Math.sin(t / 400 + i) * 12;
        if (era === 6) { }
        else { ctx.fillStyle = era === 1 ? "#4a4a4a" : "#fff"; var fl = Math.sin(t / 90 + i) * 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx - 7, by - 4 + fl); ctx.lineTo(bx - 3, by + 1); ctx.lineTo(bx + 7, by - 4 - fl); ctx.lineTo(bx + 3, by + 1); ctx.fill(); }
    }
    if (era === 1) deerDraw(t);
    if (era <= 4) {                                           /* hoa/cánh lá rơi */
        for (i = 0; i < 12; i++) { var px = (rnd(i) * W + t / 24 + i * 40) % W, py = ((t / 22 + rnd(i + 5) * 500) % 420) + 20; ctx.fillStyle = era === 2 ? "rgba(255,184,76,.8)" : era === 3 ? "rgba(255,190,210,.8)" : era === 4 ? "rgba(214,150,60,.8)" : "rgba(80,80,80,.35)"; ell(px, py, 3, 1.8, ctx.fillStyle); }
    }
}

function selection(id, t) {
    var s = SLOTS[id], b = Math.sin(t / 220) * 4;
    ctx.save(); ctx.strokeStyle = "rgba(255,225,80,.95)"; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.lineDashOffset = -t / 40;
    ctx.beginPath(); ctx.ellipse(s.x, s.y + 6, s.w * 0.56, 20, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    glow("#ffe14d", 10, function() { poly([[s.x - 9, s.y - s.h - 28 + b], [s.x + 9, s.y - s.h - 28 + b], [s.x, s.y - s.h - 12 + b]], "#ffd23f"); });
}

/* ---------- ô trống (chưa xây) ---------- */
function drawPlot(era, id, t) {
    var s = SLOTS[id], neon = false;
    ctx.save(); ctx.globalAlpha = 0.9;
    ell(s.x, s.y - 4, s.w * 0.4, 16, neon ? "rgba(255,255,255,.07)" : "rgba(120,90,50,.45)");
    ctx.setLineDash([8, 6]); ctx.strokeStyle = neon ? "#2ee6ff" : "#7a5a30"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(s.x, s.y - 4, s.w * 0.4, 16, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    [-1, 1].forEach(function(sg) { rect(s.x + sg * s.w * 0.28 - 2, s.y - 38, 4, 34, neon ? "#2ee6ff" : "#7a5230"); });
    rect(s.x - s.w * 0.28, s.y - 40, s.w * 0.56, 6, neon ? "#ff3df2" : "#c79a5e");
    text("＋", s.x, s.y - 20 + Math.sin(t / 300) * 2, 22, neon ? "#fff" : "#fff3c2");
    ctx.restore();
}

/* ===================================================================
   VẼ TOÀN CẢNH
   =================================================================== */
function draw(c, era, levels, selected, t) {
    ctx = c;
    ctx.clearRect(0, 0, W, H);
    drawSky(era, t);
    mountains(era, t);
    ground(era, t);
    pathway(era);
    DRAW_ORDER.slice().sort(function(a, b) { return SLOTS[a].y - SLOTS[b].y; }).forEach(function(id) {
        var s = SLOTS[id], l = levels[id] || 0;
        if (l <= 0) { drawPlot(era, id, t); }
        else if (era <= 3) BUILD[era][id](era, s.x, s.y, l, t);
        else if (era === 4) ({ palace: dqHall, library: dqLibrary, garden: dqGarden, market: dqMarket, pavilion: dqPavilion, gate: dqGate })[id](s.x, s.y, l, t);
        else ({ palace: nHall, library: nLibrary, garden: nGarden, market: nMarket, pavilion: nPavilion, gate: nGate })[id](era, s.x, s.y, l, t);
        if (id === selected) selection(id, t);
    });
    walker(era, t);
    critters(era, t);
    /* vignette nhẹ */
    var v = ctx.createRadialGradient(W / 2, H / 2, H * 0.4, W / 2, H / 2, H * 0.9);
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(40,30,10,.18)");
    ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
}

/* Ảnh nhỏ của một công trình (để hiện ở thẻ) */
function drawThumb(c, era, id, level, t) {
    var s = SLOTS[id], cw = c.canvas.width, ch = c.canvas.height;
    var rw = s.w + 40, rh = s.h + 70, k = Math.min(cw / rw, ch / rh);
    var save = c;
    c.save();
    c.beginPath(); c.rect(0, 0, cw, ch); c.clip();
    c.translate(cw / 2, ch - 8);
    c.scale(k, k);
    c.translate(-s.x, -(s.y + 18));
    ctx = c;
    drawSky(era, t); mountains(era, t); ground(era, t);
    if (level <= 0) level = 1;
    if (era <= 3) BUILD[era][id](era, s.x, s.y, level, t);
    else if (era === 4) ({ palace: dqHall, library: dqLibrary, garden: dqGarden, market: dqMarket, pavilion: dqPavilion, gate: dqGate })[id](s.x, s.y, level, t);
    else ({ palace: nHall, library: nLibrary, garden: nGarden, market: nMarket, pavilion: nPavilion, gate: nGate })[id](era, s.x, s.y, level, t);
    c.restore();
}

window.KingdomArt = { W: W, H: H, SLOTS: SLOTS, ORDER: DRAW_ORDER, draw: draw, drawThumb: drawThumb };
})();
