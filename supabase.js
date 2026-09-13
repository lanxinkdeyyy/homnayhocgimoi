const SUPABASE_URL = "https://wxtkadxcoqssaoustjga.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Pt8lW1WAzLwM8cLDy4TQtA_uv_CEwzA";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// Giữ tên này để login.html, register.html và profile.html vẫn dùng như cũ.
window.supabaseClient = supabaseClient;


/* ================================================= */
/* ===== BỘ ĐỒNG BỘ TIẾN ĐỘ DÙNG CHUNG ============= */
/* ================================================= */

(function() {

    const TABLE_NAME = "user_progress";

    const LOCAL_FIELDS = {
        savedWords: { suffix: "SavedWords", fallback: [] },
        sentences: { suffix: "Sentences", fallback: {} },
        highlights: { suffix: "Highlights", fallback: {} },
        phraseMarks: { suffix: "PhraseMarks", fallback: {} },
        underlines: { suffix: "Underlines", fallback: {} },
        pinnedWords: { suffix: "PinnedWords", fallback: [] },
        pinnedPositions: { suffix: "PinnedPositions", fallback: {} },
        notes: { suffix: "Notes", fallback: {} }
    };

    function emptyValue(fallback) {
        return Array.isArray(fallback) ? [] : {};
    }

    function readLocalValue(key, fallback) {
        const raw = localStorage.getItem(key);
        if (raw === null) return emptyValue(fallback);

        try {
            return JSON.parse(raw);
        } catch (error) {
            return emptyValue(fallback);
        }
    }

    function collectLocalProgress(lessonNumber) {
        const prefix = "lesson" + lessonNumber;
        const progress = {};

        Object.keys(LOCAL_FIELDS).forEach(function(field) {
            const config = LOCAL_FIELDS[field];
            progress[field] = readLocalValue(
                prefix + config.suffix,
                config.fallback
            );
        });

        progress.completed =
            localStorage.getItem(prefix + "Completed") === "true";

        progress.started =
            localStorage.getItem(prefix + "Started") === "true";

        return progress;
    }

    function applyLocalProgress(lessonNumber, progress) {
        if (!progress || typeof progress !== "object") return;

        const prefix = "lesson" + lessonNumber;

        Object.keys(LOCAL_FIELDS).forEach(function(field) {
            const config = LOCAL_FIELDS[field];
            const value = progress[field] !== undefined
                ? progress[field]
                : emptyValue(config.fallback);

            localStorage.setItem(
                prefix + config.suffix,
                JSON.stringify(value)
            );
        });

        if (progress.completed) {
            localStorage.setItem(prefix + "Completed", "true");
        } else {
            localStorage.removeItem(prefix + "Completed");
        }

        if (progress.started) {
            localStorage.setItem(prefix + "Started", "true");
        } else {
            localStorage.removeItem(prefix + "Started");
        }
    }

    function getLessonColumn(row) {
        if (row && "lesson_id" in row) return "lesson_id";
        if (row && "lesson_number" in row) return "lesson_number";
        if (row && "lesson" in row) return "lesson";
        return "lesson_id";
    }

    function getDataColumn(row) {
        if (row && "progress_data" in row) return "progress_data";
        if (row && "data" in row) return "data";
        if (row && "progress" in row) return "progress";
        return null;
    }

    function getLessonNumber(row) {
        if (!row) return null;
        return row.lesson_id ?? row.lesson_number ?? row.lesson ?? null;
    }

    function progressFromRow(row) {
        const dataColumn = getDataColumn(row);
        let progress = {};

        if (dataColumn && row[dataColumn] && typeof row[dataColumn] === "object") {
            progress = { ...row[dataColumn] };
        } else {
            progress = {
                savedWords: row.saved_words || [],
                sentences: row.sentences || {},
                highlights: row.highlights || {},
                phraseMarks: row.phrase_marks || {},
                underlines: row.underlines || {},
                pinnedWords: row.pinned_words || [],
                pinnedPositions: row.pinned_positions || {},
                notes: row.notes || {}
            };
        }

        Object.keys(LOCAL_FIELDS).forEach(function(field) {
            if (progress[field] === undefined) {
                progress[field] = emptyValue(LOCAL_FIELDS[field].fallback);
            }
        });

        const rowCompleted = Boolean(
            row.completed ?? row.is_completed ?? row.status === "completed"
        );
        const rowStarted = row.status === "learning" ||
            row.status === "completed" ||
            rowCompleted;

        progress.completed = Boolean(progress.completed) || rowCompleted;
        progress.started = Boolean(progress.started) || rowStarted || progress.completed;

        return progress;
    }

    function expandedProgress(progress) {
        return {
            saved_words: progress.savedWords,
            sentences: progress.sentences,
            highlights: progress.highlights,
            phrase_marks: progress.phraseMarks,
            underlines: progress.underlines,
            pinned_words: progress.pinnedWords,
            pinned_positions: progress.pinnedPositions,
            notes: progress.notes,
            completed: progress.completed
        };
    }

    function changesForExistingRow(row, progress) {
        const dataColumn = getDataColumn(row);

        if (dataColumn) {
            const changes = {};
            changes[dataColumn] = progress;
            if ("status" in row) {
                changes.status = progress.completed
                    ? "completed"
                    : (progress.started || (progress.savedWords || []).length > 0)
                        ? "learning"
                        : "new";
            }
            if ("updated_at" in row) {
                changes.updated_at = new Date().toISOString();
            }
            return changes;
        }

        const allChanges = expandedProgress(progress);
        const changes = {};

        Object.keys(allChanges).forEach(function(key) {
            if (key in row) changes[key] = allChanges[key];
        });

        if ("is_completed" in row) {
            changes.is_completed = progress.completed;
            delete changes.completed;
        }

        if ("status" in row) {
            changes.status = progress.completed
                ? "completed"
                : (progress.started || (progress.savedWords || []).length > 0)
                    ? "learning"
                    : "new";
        }

        if ("updated_at" in row) {
            changes.updated_at = new Date().toISOString();
        }

        return changes;
    }

    function createSession(lessonNumber, options) {
        let user = null;
        let row = null;
        let lessonColumn = "lesson_id";
        let saveTimer = null;
        let ready = false;
        let applyingRemote = false;

        const session = {
            scheduleSave: function() {
                if (!ready || applyingRemote || !user) return;
                clearTimeout(saveTimer);
                saveTimer = setTimeout(saveNow, 350);
            },
            saveNow: saveNow,
            isReady: function() {
                return ready;
            }
        };

        async function insertFirstRow(progress) {
            const common = { user_id: user.id };
            const compactCandidates = [
                // "lesson" (text) là tên cột thật trong bảng user_progress
                // trên Supabase -> phải thử trước tiên, nếu không mọi lần
                // insert đều bị Postgrest từ chối vì các cột lesson_id /
                // lesson_number dưới đây không tồn tại trong bảng thật.
                ["lesson", "progress_data"],
                ["lesson_id", "progress_data"],
                ["lesson_number", "progress_data"],
                ["lesson_id", "data"],
                ["lesson_number", "data"],
                ["lesson_id", "progress"],
                ["lesson_number", "progress"]
            ];

            for (const pair of compactCandidates) {
                const payload = { ...common };
                // Cột "lesson" là kiểu text trong DB, còn lessonNumber
                // truyền vào là số (9) -> phải ép sang chuỗi cho đúng kiểu.
                payload[pair[0]] = (pair[0] === "lesson")
                    ? String(lessonNumber)
                    : lessonNumber;
                payload[pair[1]] = progress;

                const result = await supabaseClient
                    .from(TABLE_NAME)
                    .upsert(payload, { onConflict: "user_id," + pair[0] })
                    .select()
                    .maybeSingle();

                if (!result.error) {
                    lessonColumn = pair[0];
                    row = result.data;
                    return true;
                }
            }

            const statusPayload = {
                ...common,
                lesson_id: lessonNumber,
                reading_id: 0,
                status: progress.completed
                    ? "completed"
                    : (progress.started || (progress.savedWords || []).length > 0)
                        ? "learning"
                        : "new",
                updated_at: new Date().toISOString()
            };

            const statusResult = await supabaseClient
                .from(TABLE_NAME)
                .insert(statusPayload)
                .select()
                .maybeSingle();

            if (!statusResult.error) {
                lessonColumn = "lesson_id";
                row = statusResult.data;
                return true;
            }

            const expandedLessonColumns = ["lesson_id", "lesson_number"];

            for (const field of expandedLessonColumns) {
                const payload = {
                    ...common,
                    ...expandedProgress(progress)
                };
                payload[field] = lessonNumber;

                const result = await supabaseClient
                    .from(TABLE_NAME)
                    .insert(payload)
                    .select()
                    .maybeSingle();

                if (!result.error) {
                    lessonColumn = field;
                    row = result.data;
                    return true;
                }
            }

            console.warn(
                "Không lưu được tiến độ bài " + lessonNumber +
                " vào bảng " + TABLE_NAME + "."
            );
            return false;
        }

        function flushNow() {
            // Lưu ngay lập tức (bỏ qua debounce 350ms) khi tab/app sắp bị
            // ẩn hoặc đóng, để không mất tiến độ vừa học nếu người dùng
            // tắt máy/chuyển app trước khi debounce kịp chạy. Đây là chỗ
            // khiến tiến độ học trên máy này chưa kịp lên cloud, nên máy
            // khác đăng nhập cùng tài khoản không thấy được.
            if (!ready || applyingRemote || !user) return;
            clearTimeout(saveTimer);
            saveNow();
        }

        if (typeof document !== "undefined") {
            document.addEventListener("visibilitychange", function() {
                if (document.visibilityState === "hidden") flushNow();
            });
        }
        if (typeof window !== "undefined") {
            window.addEventListener("pagehide", flushNow);
        }

        async function saveNow() {
            if (!ready || !user) return;

            const progress = collectLocalProgress(lessonNumber);

            if (!row) {
                await insertFirstRow(progress);
                return;
            }

            const changes = changesForExistingRow(row, progress);
            if (Object.keys(changes).length === 0) return;

            let query = supabaseClient
                .from(TABLE_NAME)
                .update(changes);

            if (row.id !== undefined) {
                query = query.eq("id", row.id);
            } else {
                query = query
                    .eq("user_id", user.id)
                    .eq(lessonColumn, lessonNumber);
            }

            const result = await query.select().maybeSingle();

            if (result.error) {
                console.warn(
                    "Không cập nhật được tiến độ bài " + lessonNumber + ":",
                    result.error.message
                );
            } else if (result.data) {
                row = result.data;
            }
        }

        session.readyPromise = (async function() {
            const userResult = await supabaseClient.auth.getUser();
            user = userResult.data && userResult.data.user;

            if (!user) return session;

            const rowResult = await supabaseClient
                .from(TABLE_NAME)
                .select("*")
                .eq("user_id", user.id);

            if (rowResult.error) {
                console.warn(
                    "Không đọc được bảng " + TABLE_NAME + ":",
                    rowResult.error.message
                );
                return session;
            }

            const rows = rowResult.data || [];
            const matchingRows = rows.filter(function(item) {
                return Number(getLessonNumber(item)) === Number(lessonNumber);
            });

            // Bình thường chỉ có 1 row cho mỗi bài học. Nếu vì lý do gì đó
            // (ví dụ 2 thiết bị cùng tạo row gần như đồng thời) mà có nhiều
            // hơn 1 row trùng bài học, ưu tiên lấy row được cập nhật gần
            // đây nhất để không bị "kẹt" ở một bản ghi cũ, thiếu tiến độ.
            matchingRows.sort(function(a, b) {
                const aTime = new Date(a.updated_at || a.created_at || 0).getTime();
                const bTime = new Date(b.updated_at || b.created_at || 0).getTime();
                return bTime - aTime;
            });

            row = matchingRows[0] || null;

            const schemaSample = row || rows[0] || null;
            lessonColumn = getLessonColumn(schemaSample);
            ready = true;

            if (row) {
                applyingRemote = true;
                applyLocalProgress(lessonNumber, progressFromRow(row));

                if (options && typeof options.onRemoteLoaded === "function") {
                    options.onRemoteLoaded();
                }

                applyingRemote = false;
            } else {
                await saveNow();
            }

            subscribeRealtime();

            return session;
        })();

        function subscribeRealtime() {
            // Lắng nghe realtime: khi THIẾT BỊ KHÁC (đang đăng nhập cùng
            // tài khoản) lưu tiến độ lên Supabase, dòng user_progress đổi
            // -> Supabase đẩy sự kiện này về ngay lập tức cho mọi thiết bị
            // đang mở trang, không cần load lại trang mới thấy.
            if (!user) return;

            const channel = supabaseClient
                .channel("user_progress_lesson_" + lessonNumber + "_" + user.id)
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: TABLE_NAME,
                        filter: "user_id=eq." + user.id
                    },
                    function(payload) {
                        const changedRow = payload.new;
                        if (!changedRow) return;
                        if (Number(getLessonNumber(changedRow)) !== Number(lessonNumber)) return;

                        // Bỏ qua nếu đây chính là lần lưu do THIẾT BỊ NÀY vừa
                        // gửi lên (updated_at trùng row đang giữ) để khỏi tự
                        // làm mới lại UI của chính mình sau khi lưu.
                        if (row && changedRow.updated_at && row.updated_at === changedRow.updated_at) {
                            return;
                        }

                        row = changedRow;
                        applyingRemote = true;
                        applyLocalProgress(lessonNumber, progressFromRow(changedRow));

                        if (options && typeof options.onRemoteLoaded === "function") {
                            options.onRemoteLoaded();
                        }

                        applyingRemote = false;
                    }
                )
                .subscribe();

            session.unsubscribeRealtime = function() {
                supabaseClient.removeChannel(channel);
            };
        }

        return session;
    }

    async function loadLessonStatuses(lessonNumbers) {
        const result = {};
        lessonNumbers.forEach(function(number) {
            const localProgress = collectLocalProgress(number);
            if (localProgress.completed) result[number] = "completed";
            else if (localProgress.started || (localProgress.savedWords || []).length > 0) result[number] = "learning";
            else result[number] = "new";
        });

        const userResult = await supabaseClient.auth.getUser();
        const user = userResult.data && userResult.data.user;

        if (!user) return result;

        const rowResult = await supabaseClient
            .from(TABLE_NAME)
            .select("*")
            .eq("user_id", user.id);

        if (rowResult.error) return result;

        (rowResult.data || []).forEach(function(row) {
            const number = Number(getLessonNumber(row));
            if (!lessonNumbers.includes(number)) return;

            const progress = progressFromRow(row);
            if (progress.completed) result[number] = "completed";
            else if (progress.started || (progress.savedWords || []).length > 0) result[number] = "learning";
        });

        return result;
    }

    window.LessonProgress = {
        create: createSession,
        collectLocalProgress: collectLocalProgress,
        loadLessonStatuses: loadLessonStatuses
    };

})();
