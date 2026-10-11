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
    5: { sky: ["#0a0c2b", "#3a1259"], ground: ["#161a3a", "#0c0f26"], mount: ["#171c4a", "#232a66", "#2f3a86"], path: "#1d2350", pathE: "#2ee6ff", sun: "#f6e9ff" },
    6: { sky: ["#150a3a", "#5b2fb0"], ground: ["#3a2a7a", "#241556"], mount: ["#3b2a86", "#5a40b0", "#7f64d6"], path: "#6a55c8", pathE: "#b9a2ff", sun: "#ffe9ff" }
};

function drawSky(era, t) {
    var th = THEME[era];
    ctx.fillStyle = lg(0, 0, 0, HZ + 40, [[0, th.sky[0]], [1, th.sky[1]]]); ctx.fillRect(0, 0, W, HZ + 60);
    if (era === 5 || era === 6) {
        for (var i = 0; i < 70; i++) { var tw = 0.5 + 0.5 * Math.sin(t / 700 + i); ctx.fillStyle = "rgba(255,255,255," + (0.25 + 0.5 * tw) + ")"; ctx.fillRect(rnd(i) * W, rnd(i + 99) * 200, 2, 2); }
    }
    /* mặt trời / trăng */
    var sx = era === 2 ? 760 : era === 4 ? 300 : 820, sy = era === 2 ? 150 : 90;
    glow(era === 5 || era === 6 ? "#c79bff" : "#fff2b0", 60, function() { ell(sx, sy, 38, 38, th.sun); });
    if (era === 1) { ell(sx, sy, 38, 38, th.sun); ctx.globalAlpha = 0.25; ell(sx, sy, 56, 56, th.sun); ctx.globalAlpha = 1; }
    /* mây */
    if (era !== 5) for (var k = 0; k < 4; k++) {
        var cx = ((t / (30 + k * 12) + k * 260) % (W + 300)) - 150, cy = 40 + k * 38;
        ctx.globalAlpha = era === 6 ? 0.25 : era === 1 ? 0.6 : 0.8;
        ell(cx, cy, 60, 14, "#fff"); ell(cx - 30, cy + 4, 36, 10, "#fff"); ell(cx + 34, cy + 5, 38, 10, "#fff");
        ctx.globalAlpha = 1;
    }
}

function mountains(era, t) {
    var th = THEME[era], m = th.mount, i;
    if (era === 5) {                                           /* đường chân trời thành phố */
        for (var layer = 0; layer < 3; layer++) {
            for (i = 0; i < 26; i++) {
                var bw = 28 + rnd(i + layer * 31) * 34, bh = 40 + rnd(i * 3 + layer) * (110 - layer * 22), bx = i * 42 - 10 + layer * 14;
                rect(bx, HZ + 10 - bh + layer * 4, bw, bh, m[layer]);
                for (var wy = 0; wy < bh - 6; wy += 10) for (var wx = 4; wx < bw - 4; wx += 8)
                    if (rnd(i * 17 + wy + wx + layer) > 0.62) { ctx.fillStyle = rnd(wy + i) > 0.5 ? "rgba(46,230,255,.8)" : "rgba(255,61,242,.75)"; ctx.fillRect(bx + wx, HZ + 14 - bh + wy + layer * 4, 3, 5); }
            }
        }
        return;
    }
    if (era === 4) {                                           /* bến Thượng Hải xa xa */
        ctx.globalAlpha = 0.7;
        for (i = 0; i < 18; i++) {
            var w = 30 + rnd(i) * 30, h = 50 + rnd(i + 7) * 90, x = i * 58 - 20;
            rect(x, HZ + 12 - h, w, h, m[i % 3]);
            if (i % 4 === 0) { poly([[x + 4, HZ + 12 - h], [x + w / 2, HZ + 12 - h - 28], [x + w - 4, HZ + 12 - h]], m[(i + 1) % 3]); }
            if (i % 5 === 2) { ell(x + w / 2, HZ + 12 - h, w / 2, 10, m[(i + 1) % 3]); }
        }
        ctx.globalAlpha = 1;
        rect(0, HZ + 6, W, 10, "rgba(255,230,190,.35)");
        return;
    }
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
    if (era === 6) {                                           /* đảo bay */
        for (i = 0; i < 3; i++) {
            var fy = 70 + i * 40 + Math.sin(t / 900 + i) * 6, fx = 140 + i * 330;
            glow("#a98bff", 24, function() { poly([[fx - 50, fy], [fx + 50, fy], [fx + 22, fy + 26], [fx, fy + 44], [fx - 22, fy + 26]], "#6f55c9"); });
            ell(fx, fy, 50, 9, "#8ee6a8");
        }
    }
}

function ground(era, t) {
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
}

function pathway(era) {
    var th = THEME[era];
    ctx.beginPath();
    ctx.moveTo(470, 545); ctx.bezierCurveTo(420, 470, 560, 430, 490, 350);
    ctx.lineTo(515, 350); ctx.bezierCurveTo(600, 430, 470, 470, 540, 545); ctx.closePath();
    if (era === 5 || era === 6) { glow(th.pathE, 18, function() { ctx.fillStyle = th.path; ctx.fill(); }); ctx.strokeStyle = th.pathE; ctx.lineWidth = 2; ctx.stroke(); }
    else { ctx.fillStyle = th.path; ctx.fill(); ctx.strokeStyle = th.pathE; ctx.lineWidth = 3; ctx.stroke(); }
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
    var c1 = era === 5 ? "#2ee6ff" : "#c9a8ff", c2 = era === 5 ? "#ff3df2" : "#7ff5c8", s = 1 + l * 0.07;
    neonTower(x, y, 80 * s, 120 * s, c1, c2, t, 11, era === 6);
    glow(c1, 14, function() { ctx.strokeStyle = c1; ctx.lineWidth = 3; rrect(x - 22, y - 58, 44, 30, 4, null, c1); ctx.beginPath(); ctx.moveTo(x, y - 58); ctx.lineTo(x, y - 28); ctx.stroke(); });
    text("書", x, y - 140 * s + 10, 20, c2);
    if (l >= 2) { glow(c2, 16, function() { ctx.strokeStyle = c2; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x + 10, y - 130 * s, 36, 8, 0, 0, Math.PI * 2); ctx.stroke(); }); }
    if (l >= 3) { glow(c1, 18, function() { ell(x + 10, y - 148 * s, 6, 6, c1); }); }
}
function nHall(era, x, y, l, t) {
    var c1 = era === 5 ? "#2ee6ff" : "#c9a8ff", c2 = era === 5 ? "#ff3df2" : "#ffd0ff", s = 1 + l * 0.1;
    neonTower(x - 52, y, 80 * s, 150 * s, c1, c2, t, 3, era === 6);
    neonTower(x + 44, y, 90 * s, 190 * s, c2, c1, t, 21, era === 6);
    glow(c1, 20, function() { ctx.strokeStyle = c1; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x + 44 + 11, y - 190 * s - 14, 70, 14, 0, 0, Math.PI * 2); ctx.stroke(); });
    glow(c2, 16, function() { rect(x + 44 + 8, y - 190 * s - 70, 3, 56, c2); ell(x + 44 + 9, y - 190 * s - 74, 5, 5, c2); });
    if (l >= 2) glow(c1, 22, function() { ctx.strokeStyle = c2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 20, y - 110 * s); ctx.lineTo(x + 20, y - 130 * s); ctx.stroke(); });
    if (l >= 3) for (var i = 0; i < 3; i++) glow(c1, 12, function() { var a = t / 600 + i * 2.1; ell(x + 40 + Math.cos(a) * 90, y - 230 * s + Math.sin(a) * 14, 4, 4, c1); });
    text(era === 5 ? "霓虹" : "星", x - 12, y - 100 * s, 16, "#fff");
}
function nPavilion(era, x, y, l, t) {
    var c1 = era === 5 ? "#ff3df2" : "#7ff5c8", c2 = era === 5 ? "#2ee6ff" : "#c9a8ff", s = 1 + l * 0.09;
    shadow(x, y + 6, 130);
    glow(c2, 12, function() { ctx.fillStyle = "#1a1f44"; ctx.beginPath(); ctx.arc(x, y - 40 * s, 46 * s, Math.PI, 0); ctx.lineTo(x + 46 * s, y); ctx.lineTo(x - 46 * s, y); ctx.closePath(); ctx.fill(); ctx.strokeStyle = c2; ctx.lineWidth = 3; ctx.stroke(); });
    glow(c1, 14, function() { ctx.strokeStyle = c1; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y - 40 * s, 30 * s, Math.PI, 0); ctx.stroke(); rect(x - 14, y - 30, 28, 30, "#0a0e22"); ctx.strokeStyle = c1; ctx.strokeRect(x - 14, y - 30, 28, 30); });
    if (era === 6) { glow("#ffe9ff", 18, function() { ell(x, y - 40 * s - 62, 10, 10, "#ffe9ff"); }); ctx.strokeStyle = "rgba(255,233,255,.5)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, y - 40 * s - 62, 22, 6, t / 800, 0, Math.PI * 2); ctx.stroke(); }
    if (l >= 2) { glow(c1, 14, function() { ctx.strokeStyle = c1; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 60, y); ctx.lineTo(x + 60, y); ctx.stroke(); }); }
    if (l >= 3) { glow(c2, 16, function() { rect(x - 2, y - 40 * s - 90, 4, 44, c2); }); }
}
function nGate(era, x, y, l, t) {
    var c1 = era === 5 ? "#2ee6ff" : "#c9a8ff", c2 = era === 5 ? "#ff3df2" : "#7ff5c8", s = 1 + l * 0.06, w = 170 * s, h = 120 * s;
    shadow(x, y + 5, w + 40);
    ctx.fillStyle = "#10162f"; ctx.fillRect(x - w / 2, y - h, 28, h); ctx.fillRect(x + w / 2 - 28, y - h, 28, h);
    glow(c1, 16, function() { ctx.strokeStyle = c1; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w / 2 + 28, y); ctx.lineTo(x - w / 2 + 28, y - h * 0.7); ctx.arc(x, y - h * 0.7, w / 2 - 28, Math.PI, 0); ctx.lineTo(x + w / 2 - 28, y); ctx.stroke(); ctx.strokeRect(x - w / 2, y - h, 28, h); ctx.strokeRect(x + w / 2 - 28, y - h, 28, h); });
    glow(c2, 24, function() { ctx.strokeStyle = c2; ctx.lineWidth = 2; for (var i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x, y - h * 0.7, (w / 2 - 36) - i * 10, Math.PI, 0); ctx.stroke(); } });
    var swirl = (t / 500) % (Math.PI * 2);
    if (era === 6) { glow("#ffe9ff", 24, function() { ctx.fillStyle = "rgba(210,190,255,.35)"; ctx.beginPath(); ctx.arc(x, y - h * 0.7, w / 2 - 40, Math.PI, 0); ctx.lineTo(x + w / 2 - 40, y); ctx.lineTo(x - w / 2 + 40, y); ctx.fill(); ctx.strokeStyle = "rgba(255,255,255,.7)"; ctx.beginPath(); ctx.ellipse(x, y - h * 0.4, 30, 8, swirl, 0, Math.PI * 2); ctx.stroke(); }); }
    text(era === 5 ? "夜" : "門", x, y - h * 0.9, 20, c2);
    if (l >= 2) { glow(c2, 20, function() { rect(x - w / 2 + 12, y - h - 18, 4, 18, c2); rect(x + w / 2 - 16, y - h - 18, 4, 18, c2); }); }
    if (l >= 3) { glow(c1, 20, function() { ell(x - w / 2 + 14, y - h - 24, 5, 5, c1); ell(x + w / 2 - 14, y - h - 24, 5, 5, c1); }); }
}
function nMarket(era, x, y, l, t) {
    var c1 = era === 5 ? "#ff3df2" : "#7ff5c8", c2 = era === 5 ? "#2ee6ff" : "#ffd0ff", n = 2 + (l >= 3 ? 1 : 0), i;
    shadow(x, y + 5, 170);
    for (i = 0; i < n; i++) {
        var sx = x - (n - 1) * 34 + i * 68;
        rrect(sx - 28, y - 30, 56, 30, 3, "#161b3e");
        poly([[sx - 34, y - 52], [sx + 34, y - 52], [sx + 28, y - 36], [sx - 28, y - 36]], i % 2 ? c1 : c2);
        glow(i % 2 ? c1 : c2, 12, function() { ctx.strokeStyle = i % 2 ? c1 : c2; ctx.lineWidth = 2; ctx.strokeRect(sx - 28, y - 30, 56, 30); });
        ell(sx - 12, y - 38, 6, 5, "#ffd25a"); ell(sx + 6, y - 38, 6, 5, "#7ff5c8"); ell(sx + 20, y - 38, 5, 5, "#ff9ac1");
    }
    glow(c1, 16, function() { rrect(x - 28, y - 92, 56, 22, 3, "#10162f", c1); }); text(era === 5 ? "夜市" : "市", x, y - 81, 14, c2);
    if (l >= 2) { glow(c2, 14, function() { ctx.strokeStyle = c2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 80, y - 60); ctx.quadraticCurveTo(x, y - 40, x + 80, y - 60); ctx.stroke(); }); }
}
function nGarden(era, x, y, l, t) {
    var c1 = era === 5 ? "#7ff5c8" : "#ffd0ff", i;
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
        if (era === 5 || era === 6) { glow(era === 5 ? "#ff3df2" : "#ffd0ff", 10, function() { ell(bx, by, 4, 3, era === 5 ? "#ff3df2" : "#ffd0ff"); }); }
        else { ctx.fillStyle = era === 1 ? "#4a4a4a" : "#fff"; var fl = Math.sin(t / 90 + i) * 3; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx - 7, by - 4 + fl); ctx.lineTo(bx - 3, by + 1); ctx.lineTo(bx + 7, by - 4 - fl); ctx.lineTo(bx + 3, by + 1); ctx.fill(); }
    }
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
    var s = SLOTS[id], neon = era >= 5;
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
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, era >= 5 ? "rgba(0,0,10,.35)" : "rgba(40,30,10,.18)");
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
    if (level <= 0) drawPlot(era, id, t);
    else if (era <= 3) BUILD[era][id](era, s.x, s.y, level, t);
    else if (era === 4) ({ palace: dqHall, library: dqLibrary, garden: dqGarden, market: dqMarket, pavilion: dqPavilion, gate: dqGate })[id](s.x, s.y, level, t);
    else ({ palace: nHall, library: nLibrary, garden: nGarden, market: nMarket, pavilion: nPavilion, gate: nGate })[id](era, s.x, s.y, level, t);
    c.restore();
}

window.KingdomArt = { W: W, H: H, SLOTS: SLOTS, ORDER: DRAW_ORDER, draw: draw, drawThumb: drawThumb };
})();
