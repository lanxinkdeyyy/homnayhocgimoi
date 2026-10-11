/* =====================================================================
   VƯƠNG QUỐC HÁN TỰ — lõi game (dùng chung cho lesson.html và kingdom.html)
   - Trạng thái lưu trong localStorage ("hanTuKingdom"), đồng bộ lên Supabase
     (bảng kingdom_state) khi đã đăng nhập. Xem kingdom-supabase.sql.
   - Vàng = tổng "sổ cái" (ledger) − chi phí các công trình đã xây.
     Sổ cái chỉ tăng nên gộp 2 thiết bị rất an toàn (lấy max từng khoản).
   - Đơn vị nội bộ: 1 vàng = 10 "mảnh" (để có 0,2 vàng).
   ===================================================================== */
(function() {
    "use strict";

    var STORE_KEY = "hanTuKingdom";
    var TABLE = "kingdom_state";

    /* ---------- Công trình (Thời Hoàng cung · HSK 4) ---------- */
    var BUILDINGS = {
        palace:   { name: "Cung điện",          icon: "🏯", costs: [100, 300, 800], desc: "Trung tâm vương quốc. Nâng cấp để mở khóa cấp cao hơn cho các công trình khác." },
        library:  { name: "Thư viện hoàng gia", icon: "📚", costs: [80, 200, 500],  desc: "Mỗi cấp: +10% vàng khi học từ mới và khi làm đúng bài tập lần đầu." },
        garden:   { name: "Vườn ngự uyển",      icon: "🌸", costs: [60, 150, 400],  desc: "Mỗi ngày nhận miễn phí 15 vàng × cấp (không tính vào trần vàng ngày)." },
        market:   { name: "Chợ hoàng gia",      icon: "🛍️", costs: [60, 150, 400],  desc: "Mỗi cấp: nâng trần vàng mỗi ngày thêm 20." },
        pavilion: { name: "Đình nghỉ mát",      icon: "⛩️", costs: [50, 120, 300],  desc: "Mỗi cấp: thưởng điểm danh hằng ngày tăng thêm 50%." },
        gate:     { name: "Cổng thành",         icon: "🚪", costs: [70, 180, 450],  desc: "Mỗi cấp: +20 vàng khi hoàn thành trọn một bài (Game đặt câu)." }
    };
    var ORDER = ["palace", "library", "garden", "market", "pavilion", "gate"];
    var MAX_LEVEL = 3;

    var TITLES = [
        [0, "Dân thường"], [3, "Trưởng làng"], [8, "Thành chủ"],
        [16, "Quận công"], [28, "Hoàng tử"], [44, "Vua Hán tự"], [72, "Đại đế Hán tự"]
    ];

    var REWARD = { word: 50, exFirst: 20, exRepeat: 2, exRepeatMax: 10, lesson: 500, rowBonus: 30 };
    var BASE_CAP = 1500;   /* 150 vàng mỗi ngày */

    var listeners = [];
    var state = null;
    var rowStreak = 0;
    var syncStatus = "Chưa đồng bộ";
    var syncUser = null;
    var pushTimer = null;
    var syncing = false;

    /* ---------- tiện ích ---------- */
    function todayStr() {
        var d = new Date();
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    }
    function dayDiff(a, b) {
        return Math.round((new Date(a + "T00:00:00") - new Date(b + "T00:00:00")) / 86400000);
    }
    function hash(s) {
        var h = 5381;
        for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
        return (h >>> 0).toString(36);
    }
    function emptyState() {
        return { v: 1, ledger: {}, b: {}, cap: {}, days: {} };
    }
    function load() {
        try {
            var raw = localStorage.getItem(STORE_KEY);
            if (raw) {
                var s = JSON.parse(raw);
                if (s && s.ledger) { s.b = s.b || {}; s.cap = s.cap || {}; s.days = s.days || {}; return migrate(s); }
            }
        } catch (e) {}
        return emptyState();
    }
    /* b dạng cũ {palace:1,...} (chỉ HSK4) -> b = {"4": {palace:1,...}} */
    function migrate(s) {
        var flat = false, k;
        for (k in s.b) if (typeof s.b[k] === "number") flat = true;
        if (flat) {
            var old = s.b; s.b = { "4": {} };
            for (k in old) if (typeof old[k] === "number") s.b["4"][k] = old[k];
        }
        return s;
    }
    function save() {
        try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
        schedulePush();
    }
    function emit(ev) {
        listeners.forEach(function(fn) { try { fn(ev || {}); } catch (e) {} });
    }
    var ERAS = [
        { n: 1, hsk: "HSK 1", zh: "水墨古风", name: "Cổ phong mực nước",   cost: 1.0 },
        { n: 2, hsk: "HSK 2", zh: "盛唐华彩", name: "Thịnh Đường rực sắc", cost: 1.25 },
        { n: 3, hsk: "HSK 3", zh: "江南雅苑", name: "Giang Nam nhã uyển",  cost: 1.5 },
        { n: 4, hsk: "HSK 4", zh: "民国摩登", name: "Dân quốc tân thời",   cost: 1.0 },
        { n: 5, hsk: "HSK 5", zh: "都市华灯", name: "Đô thị lên đèn",    cost: 1.75 },
        { n: 6, hsk: "HSK 6", zh: "月球基地", name: "Căn cứ Mặt Trăng", cost: 2.0 }
    ];
    /* Tên công trình của từng thời đại (cùng 6 vai trò) */
    var NAMES = {
        1: { palace: "Thảo đường",           library: "Thư trai",            garden: "Vườn trúc – tùng",   market: "Chợ làng bên suối", pavilion: "Đình ngắm núi",     gate: "Cổng trúc" },
        2: { palace: "Cung điện Đại Minh",   library: "Quốc Tử Giám",        garden: "Vườn mẫu đơn",       market: "Tây Thị Trường An", pavilion: "Tháp Đại Nhạn",     gate: "Cổng Chu Tước" },
        3: { palace: "Viên lâm Giang Nam",   library: "Thư phòng ven hồ",    garden: "Hồ sen & liễu",      market: "Chợ nước",          pavilion: "Đình hoa sen",      gate: "Cổng trăng" },
        4: { palace: "Dinh thự Thượng Hải",  library: "Tòa soạn – Thư xã",   garden: "Công viên Tây dương", market: "Phố sườn xám",     pavilion: "Vũ trường Art Deco", gate: "Cổng Thạch Khố Môn" },
        5: { palace: "Tòa tháp kính",        library: "Thư viện kính số",    garden: "Vườn trên mái",      market: "Phố thương mại",    pavilion: "Trạm tàu điện",     gate: "Cổng thành phố" },
        6: { palace: "Tháp chỉ huy",         library: "Kho tri thức Nguyệt cầu", garden: "Vườn trong mái vòm", market: "Chợ căn cứ",      pavilion: "Đài thiên văn",     gate: "Cổng khí áp" }
    };
    function eraObj(era) { return ERAS[(era || 4) - 1]; }
    function levelAt(era, id) { var e = state.b[String(era)]; return e ? Math.min(MAX_LEVEL, e[id] || 0) : 0; }
    /* cấp dùng cho hiệu ứng = cấp cao nhất ở bất kỳ thời đại nào */
    function level(id) {
        var m = 0;
        for (var e = 1; e <= 6; e++) m = Math.max(m, levelAt(e, id));
        return m;
    }
    function costAt(era, id, l) { return Math.round(BUILDINGS[id].costs[l] * eraObj(era).cost); }

    function spent() {
        var t = 0;
        for (var e = 1; e <= 6; e++) ORDER.forEach(function(id) {
            for (var i = 0; i < levelAt(e, id); i++) t += costAt(e, id, i) * 10;
        });
        return t;
    }
    function earned() {
        var t = 0;
        for (var k in state.ledger) if (k.charAt(0) !== "F") t += state.ledger[k];
        return t;
    }
    function gold10() { return earned() - spent(); }

    function prestige() {
        var t = 0;
        for (var e = 1; e <= 6; e++) ORDER.forEach(function(id) { t += levelAt(e, id); });
        return t;
    }
    function title() {
        var p = prestige(), name = TITLES[0][1];
        TITLES.forEach(function(t) { if (p >= t[0]) name = t[1]; });
        return name;
    }
    function dailyCap10() { return BASE_CAP + level("market") * 200; }
    function capUsed10() { return state.cap[todayStr()] || 0; }

    function streakDays() {
        var d = todayStr(), n = 0;
        if (!state.days[d]) {
            var y = new Date(); y.setDate(y.getDate() - 1);
            d = y.getFullYear() + "-" + String(y.getMonth() + 1).padStart(2, "0") + "-" + String(y.getDate()).padStart(2, "0");
            if (!state.days[d]) return 0;
        }
        while (state.days[d]) {
            n++;
            var p = new Date(d + "T00:00:00"); p.setDate(p.getDate() - 1);
            d = p.getFullYear() + "-" + String(p.getMonth() + 1).padStart(2, "0") + "-" + String(p.getDate()).padStart(2, "0");
        }
        return n;
    }

    function fmt(g10) {
        var v = Math.round(g10) / 10;
        return (Math.abs(v - Math.round(v)) < 1e-9) ? String(Math.round(v)) : v.toFixed(1).replace(".", ",");
    }

    /* ---------- thưởng vàng ---------- */
    function dailyOpen() {
        /* điểm danh: ghi nhận ngày hôm nay + thưởng chuỗi ngày */
        var d = todayStr();
        if (state.days[d]) return 0;
        state.days[d] = 1;
        var n = streakDays();
        var bonus = Math.min(n, 7) * 20;
        bonus = Math.round(bonus * (1 + 0.5 * level("pavilion")));
        if (bonus > 0) state.ledger["s" + d] = bonus;
        return bonus;
    }

    function addCapped(key, amount) {
        var cap = dailyCap10(), used = capUsed10();
        var room = Math.max(0, cap - used);
        var give = Math.min(amount, room);
        if (give <= 0) return { give: 0, capped: true };
        state.ledger[key] = (state.ledger[key] || 0) + give;
        state.cap[todayStr()] = used + give;
        return { give: give, capped: give < amount };
    }

    /* kind: "word" | "exercise" | "lesson"; key: định danh duy nhất; ok: đúng/sai (với exercise) */
    function award(kind, key, ok) {
        if (!state) state = load();
        var out = { gold10: 0, capped: false, bonus10: 0, rowBonus10: 0 };
        var libMul = 1 + 0.1 * level("library");
        var first = false;

        if (kind === "exercise") {
            if (!ok) { rowStreak = 0; return out; }
            rowStreak++;
        }

        out.bonus10 = dailyOpen();
        var d = todayStr();

        if (kind === "word") {
            var lk = "w" + key;
            if (state.ledger[lk] === undefined) {
                var r = addCapped(lk, Math.round(REWARD.word * libMul));
                out.gold10 += r.give; out.capped = r.capped;
            }
        } else if (kind === "exercise") {
            var ek = "e" + key;
            var cur = state.ledger[ek];
            if (cur === undefined) {
                var first10 = Math.round(REWARD.exFirst * libMul);
                var r2 = addCapped(ek, first10);
                out.gold10 += r2.give; out.capped = r2.capped;
                if (r2.give > 0) state.ledger["F" + ek] = first10; /* mốc để biết đã nhận lần đầu bao nhiêu */
            } else {
                var base = state.ledger["F" + ek] || REWARD.exFirst;
                if (cur < base + REWARD.exRepeatMax) {
                    var r3 = addCapped(ek, REWARD.exRepeat);
                    out.gold10 += r3.give; out.capped = r3.capped;
                }
            }
            /* chuỗi 5 câu đúng liên tiếp */
            if (rowStreak > 0 && rowStreak % 5 === 0) {
                var idx = 1;
                while (state.ledger["r" + d + "|" + idx] !== undefined) idx++;
                if (idx <= 10) {
                    state.ledger["r" + d + "|" + idx] = REWARD.rowBonus;
                    out.rowBonus10 = REWARD.rowBonus;
                }
            }
        } else if (kind === "lesson") {
            var bk = "L" + key;
            if (state.ledger[bk] === undefined) {
                state.ledger[bk] = REWARD.lesson + level("gate") * 200;
                out.gold10 += REWARD.lesson + level("gate") * 200;
            }
        }

        /* "F..." chỉ là mốc, không phải vàng: tách khỏi sổ cái khi tính tổng */
        save();
        emit({ type: "award", out: out });
        if (typeof window !== "undefined" && window.document) toast(out);
        return out;
    }

    /* ---------- mua / nâng cấp ---------- */
    function nextCost(era, id) {
        var l = levelAt(era, id);
        if (l >= MAX_LEVEL) return null;
        return costAt(era, id, l);
    }
    function canBuy(era, id) {
        var l = levelAt(era, id);
        var c = nextCost(era, id);
        if (c === null) return { ok: false, why: "Đã đạt cấp tối đa" };
        if (id !== "palace" && levelAt(era, "palace") < 1) return { ok: false, why: "Hãy xây " + NAMES[era].palace + " trước" };
        if (id !== "palace" && l >= levelAt(era, "palace") + 1) return { ok: false, why: "Cần nâng cấp " + NAMES[era].palace + " trước" };
        if (gold10() < c * 10) return { ok: false, why: "Chưa đủ vàng" };
        return { ok: true, why: "" };
    }
    function buy(era, id) {
        var chk = canBuy(era, id);
        if (!chk.ok) return chk;
        var key = String(era);
        state.b[key] = state.b[key] || {};
        state.b[key][id] = levelAt(era, id) + 1;
        save();
        emit({ type: "buy", id: id, era: era });
        return { ok: true };
    }

    /* ---------- vườn ngự uyển: nhận vàng hằng ngày ---------- */
    function gardenAvailable() {
        return level("garden") > 0 && state.ledger["g" + todayStr()] === undefined;
    }
    function claimGarden() {
        if (!gardenAvailable()) return 0;
        var amt = 150 * level("garden");
        state.ledger["g" + todayStr()] = amt;
        dailyOpen();
        save();
        emit({ type: "claim" });
        return amt;
    }

    /* ---------- toast & HUD (chỉ ở trang bài học) ---------- */
    var toastBox = null;
    function ensureToastBox() {
        if (toastBox) return toastBox;
        toastBox = document.createElement("div");
        toastBox.style.cssText = "position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:3000;display:flex;flex-direction:column;gap:6px;align-items:center;pointer-events:none";
        document.body.appendChild(toastBox);
        return toastBox;
    }
    var cappedShown = "";
    function toast(out) {
        if (!document.body) return;
        var lines = [];
        if (out.gold10 > 0) lines.push("+" + fmt(out.gold10) + " 🪙");
        if (out.bonus10 > 0) lines.push("Điểm danh +" + fmt(out.bonus10) + " 🪙");
        if (out.rowBonus10 > 0) lines.push("5 câu đúng liên tiếp! +" + fmt(out.rowBonus10) + " 🪙");
        if (out.capped && cappedShown !== todayStr()) {
            cappedShown = todayStr();
            lines.push("Hôm nay đã chạm trần vàng — mai nhận tiếp nhé!");
        }
        if (!lines.length) return;
        var box = ensureToastBox();
        lines.forEach(function(t) {
            var el = document.createElement("div");
            el.textContent = t;
            el.style.cssText = "background:#2f4f3a;color:#fff7c2;font-weight:700;padding:7px 14px;border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,.25);font-size:15px;opacity:0;transition:opacity .2s,transform .4s;transform:translateY(8px)";
            box.appendChild(el);
            setTimeout(function() { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 10);
            setTimeout(function() { el.style.opacity = "0"; el.style.transform = "translateY(-12px)"; }, 1900);
            setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 2400);
        });
        updateHud();
    }
    var hud = null;
    function updateHud() {
        if (!hud) return;
        hud.textContent = "🪙 " + fmt(Math.max(0, gold10())) + " · Vương quốc";
    }
    function mountHud() {
        if (hud || !document.body || document.getElementById("kingdomLeaveHud")) return;
        hud = document.createElement("a");
        hud.id = "kingdomHud";
        hud.href = "kingdom.html";
        hud.style.cssText = "position:fixed;right:12px;top:64px;z-index:1400;background:#fff7d6;color:#7a5200;border:2px solid #e0b84a;border-radius:999px;padding:6px 12px;font-weight:700;font-size:13px;text-decoration:none;box-shadow:0 3px 10px rgba(0,0,0,.12)";
        document.body.appendChild(hud);
        updateHud();
    }

    /* ---------- đồng bộ Supabase ---------- */
    function mergeInto(dst, src) {
        var k;
        for (k in (src.ledger || {})) if (!(k in dst.ledger) || src.ledger[k] > dst.ledger[k]) dst.ledger[k] = src.ledger[k];
        var sb = migrate({ b: JSON.parse(JSON.stringify(src.b || {})) }).b;
        for (k in sb) {
            dst.b[k] = dst.b[k] || {};
            for (var id in sb[k]) if ((sb[k][id] || 0) > (dst.b[k][id] || 0)) dst.b[k][id] = sb[k][id];
        }
        for (k in (src.cap || {})) if ((src.cap[k] || 0) > (dst.cap[k] || 0)) dst.cap[k] = src.cap[k];
        for (k in (src.days || {})) dst.days[k] = 1;
    }
    function hasClient() {
        try { return typeof supabaseClient !== "undefined" && supabaseClient && supabaseClient.auth; } catch (e) { return false; }
    }
    function schedulePush() {
        if (!syncUser) return;
        clearTimeout(pushTimer);
        pushTimer = setTimeout(push, 1200);
    }
    function push() {
        if (!syncUser || !hasClient()) return Promise.resolve();
        return supabaseClient.from(TABLE).upsert({
            user_id: syncUser.id,
            state: state,
            updated_at: new Date().toISOString()
        }, { onConflict: "user_id" }).then(function(res) {
            if (res && res.error) setSync("Lỗi đồng bộ (đã lưu trên máy): " + (res.error.message || res.error.code));
            else setSync("Đã đồng bộ ✓");
        });
    }
    function setSync(t) { syncStatus = t; emit({ type: "sync" }); }

    function initSync() {
        if (syncing) return;
        if (!hasClient()) { setSync("Chưa đồng bộ (chưa tải được Supabase)"); return; }
        syncing = true;
        supabaseClient.auth.getSession().then(function(r) {
            var sess = r && r.data && r.data.session;
            if (!sess || !sess.user) { setSync("Chưa đăng nhập — game đang lưu trên máy này"); return null; }
            syncUser = sess.user;
            return supabaseClient.from(TABLE).select("state").eq("user_id", syncUser.id).maybeSingle();
        }).then(function(res) {
            if (res === null || res === undefined) return;
            if (res.error) {
                setSync(/kingdom_state|schema cache|does not exist/i.test(res.error.message || "") ? "Chưa đồng bộ — Supabase chưa có bảng lưu game. Cần chạy file kingdom-supabase.sql 1 lần trong Supabase → SQL Editor (game vẫn chạy bình thường trên máy này)." : "Chưa đồng bộ được: " + (res.error.message || ""));
                syncUser = null;
                return;
            }
            if (res.data && res.data.state) {
                mergeInto(state, res.data.state);
                try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
                emit({ type: "merged" });
                updateHud();
            }
            return push();
        }).catch(function(e) {
            setSync("Chưa đồng bộ được (" + (e && e.message ? e.message : "lỗi mạng") + ")");
        });
    }

    /* Gọi kiểu cũ (id) = thời đại 4; kiểu mới (era, id) */
    function compat(fn) {
        return function(a, b) { return typeof a === "string" ? fn(4, a) : fn(a, b); };
    }

    /* ---------- khởi tạo ---------- */
    state = load();
    window.Kingdom = {
        BUILDINGS: BUILDINGS, ORDER: ORDER, MAX_LEVEL: MAX_LEVEL,
        hash: hash,
        award: award,
        buy: compat(buy), canBuy: compat(canBuy), nextCost: compat(nextCost), level: level, levelAt: levelAt, ERAS: ERAS, NAMES: NAMES,
        gold10: gold10, gold: function() { return gold10() / 10; }, fmt: fmt,
        prestige: prestige, title: title,
        dailyCap10: dailyCap10, capUsed10: capUsed10,
        streakDays: streakDays,
        gardenAvailable: gardenAvailable, claimGarden: claimGarden,
        totalEarned10: earned,
        syncStatus: function() { return syncStatus; },
        initSync: initSync,
        onChange: function(fn) { listeners.push(fn); },
        reload: function() { state = load(); emit({ type: "reload" }); }
    };

    if (typeof document !== "undefined") {
        document.addEventListener("DOMContentLoaded", function() {
            if (document.getElementById("kingdomPage")) return; /* trang vương quốc tự vẽ HUD riêng */
            mountHud();
            setTimeout(initSync, 900);
        });
    }
})();
