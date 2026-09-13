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
        underlines: { suffix: "Underlines", fallback: {} },
        pinnedWords: { suffix: "PinnedWords", fallback: [] },
        pinnedPositions: { suffix: "PinnedPositions", fallback: {} },
        notes: { suffix: "Notes", fallback: {} },

        // Highlight cả cụm từ
        phraseMarks: { suffix: "PhraseMarks", fallback: [] }
    };


    function emptyValue(fallback) {
        return Array.isArray(fallback) ? [] : {};
    }


    function readLocalValue(key, fallback) {
        const raw = localStorage.getItem(key);

        if (raw === null) {
            return emptyValue(fallback);
        }

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

            const value =
                progress[field] !== undefined
                    ? progress[field]
                    : emptyValue(config.fallback);

            localStorage.setItem(
                prefix + config.suffix,
                JSON.stringify(value)
            );
        });

        if (progress.completed) {
            localStorage.setItem(
                prefix + "Completed",
                "true"
            );
        } else {
            localStorage.removeItem(
                prefix + "Completed"
            );
        }

        if (progress.started) {
            localStorage.setItem(
                prefix + "Started",
                "true"
            );
        } else {
            localStorage.removeItem(
                prefix + "Started"
            );
        }
    }


    function getLessonColumn(row) {
        if (row && "lesson_id" in row) {
            return "lesson_id";
        }

        if (row && "lesson_number" in row) {
            return "lesson_number";
        }

        if (row && "lesson" in row) {
            return "lesson";
        }

        return "lesson_id";
    }


    function getDataColumn(row) {
        if (row && "progress_data" in row) {
            return "progress_data";
        }

        if (row && "data" in row) {
            return "data";
        }

        if (row && "progress" in row) {
            return "progress";
        }

        return null;
    }


    function getLessonNumber(row) {
        if (!row) return null;

        return (
            row.lesson_id ??
            row.lesson_number ??
            row.lesson ??
            null
        );
    }


    /*
     * Đọc progress từ Supabase.
     *
     * QUAN TRỌNG:
     * Không return progress_data trực tiếp nữa.
     *
     * Nếu row cũ có:
     *
     * progress_data = {}
     * status = "completed"
     *
     * thì vẫn phải giữ trạng thái completed.
     */
    function progressFromRow(row) {

        const dataColumn = getDataColumn(row);

        let progress = {};

        if (
            dataColumn &&
            row[dataColumn] &&
            typeof row[dataColumn] === "object"
        ) {
            progress = {
                ...row[dataColumn]
            };
        } else {

            progress = {
                savedWords: row.saved_words || [],
                sentences: row.sentences || {},
                highlights: row.highlights || {},
                underlines: row.underlines || {},
                pinnedWords: row.pinned_words || [],
                pinnedPositions: row.pinned_positions || {},
                notes: row.notes || {},
                phraseMarks: row.phrase_marks || []
            };
        }


        /*
         * Gộp status của row với dữ liệu trong progress_data.
         *
         * Status trong bảng là nguồn dự phòng để tránh mất
         * trạng thái của các row cũ.
         */

        const rowCompleted =
            row.status === "completed" ||
            Boolean(
                row.completed ??
                row.is_completed
            );

        const rowStarted =
            row.status === "learning" ||
            row.status === "completed" ||
            Boolean(
                row.completed ??
                row.is_completed
            );


        progress.completed =
            Boolean(progress.completed) ||
            rowCompleted;


        progress.started =
            Boolean(progress.started) ||
            rowStarted ||
            progress.completed;


        /*
         * Đảm bảo các field luôn tồn tại.
         */

        Object.keys(LOCAL_FIELDS).forEach(function(field) {

            if (progress[field] === undefined) {

                progress[field] =
                    emptyValue(
                        LOCAL_FIELDS[field].fallback
                    );
            }
        });


        return progress;
    }


    function expandedProgress(progress) {

        return {
            saved_words: progress.savedWords,
            sentences: progress.sentences,
            highlights: progress.highlights,
            underlines: progress.underlines,
            pinned_words: progress.pinnedWords,
            pinned_positions: progress.pinnedPositions,
            notes: progress.notes,
            phrase_marks: progress.phraseMarks,
            completed: progress.completed
        };
    }


    /*
     * Tính status dựa trên progress hiện tại.
     */
    function getProgressStatus(progress) {

        if (progress.completed) {
            return "completed";
        }

        if (
            progress.started ||
            (progress.savedWords || []).length > 0 ||
            (progress.phraseMarks || []).length > 0
        ) {
            return "learning";
        }

        return "new";
    }


    function changesForExistingRow(row, progress) {

        const dataColumn = getDataColumn(row);

        /*
         * Trường hợp bảng dùng progress_data JSONB.
         */
        if (dataColumn) {

            const changes = {};

            changes[dataColumn] = progress;


            /*
             * Đồng bộ luôn status.
             *
             * Đây là phần quan trọng:
             * trước đây update progress_data nhưng status
             * có thể vẫn giữ giá trị cũ.
             */
            if ("status" in row) {
                changes.status =
                    getProgressStatus(progress);
            }


            if ("updated_at" in row) {
                changes.updated_at =
                    new Date().toISOString();
            }

            return changes;
        }


        /*
         * Hỗ trợ schema cũ nếu dữ liệu đang nằm ở
         * từng column riêng.
         */

        const allChanges =
            expandedProgress(progress);

        const changes = {};


        Object.keys(allChanges).forEach(
            function(key) {

                if (key in row) {
                    changes[key] =
                        allChanges[key];
                }
            }
        );


        if ("is_completed" in row) {

            changes.is_completed =
                progress.completed;

            delete changes.completed;
        }


        if ("status" in row) {

            changes.status =
                getProgressStatus(progress);
        }


        if ("updated_at" in row) {

            changes.updated_at =
                new Date().toISOString();
        }


        return changes;
    }


    function createSession(
        lessonNumber,
        options
    ) {

        let user = null;
        let row = null;

        let lessonColumn =
            "lesson_id";

        let saveTimer = null;

        let ready = false;

        let applyingRemote = false;


        const session = {

            scheduleSave: function() {

                if (
                    !ready ||
                    applyingRemote ||
                    !user
                ) {
                    return;
                }

                clearTimeout(saveTimer);

                saveTimer =
                    setTimeout(
                        saveNow,
                        350
                    );
            },


            saveNow: saveNow,


            isReady: function() {
                return ready;
            }
        };


        /*
         * Tạo row đầu tiên nếu lesson chưa có dữ liệu.
         */
        async function insertFirstRow(progress) {

            const common = {
                user_id: user.id
            };


            /*
             * Ưu tiên schema hiện tại:
             *
             * lesson_id
             * progress_data
             * status
             */

            const compactCandidates = [

                [
                    "lesson_id",
                    "progress_data"
                ],

                [
                    "lesson_number",
                    "progress_data"
                ],

                [
                    "lesson_id",
                    "data"
                ],

                [
                    "lesson_number",
                    "data"
                ],

                [
                    "lesson_id",
                    "progress"
                ],

                [
                    "lesson_number",
                    "progress"
                ]
            ];


            for (
                const pair
                of compactCandidates
            ) {

                const payload = {
                    ...common
                };

                payload[pair[0]] =
                    lessonNumber;

                payload[pair[1]] =
                    progress;


                /*
                 * Với schema hiện tại của bé,
                 * progress_data đi cùng status.
                 */
                if (
                    pair[1] === "progress_data"
                ) {

                    payload.status =
                        getProgressStatus(
                            progress
                        );

                    payload.reading_id = 0;

                    payload.updated_at =
                        new Date()
                            .toISOString();
                }


                const result =
                    await supabaseClient
                        .from(TABLE_NAME)
                        .insert(payload)
                        .select()
                        .maybeSingle();


                if (!result.error) {

                    lessonColumn =
                        pair[0];

                    row =
                        result.data;

                    return true;
                }
            }


            /*
             * Fallback cho schema chỉ có status.
             */

            const statusPayload = {

                ...common,

                lesson_id:
                    lessonNumber,

                reading_id: 0,

                status:
                    getProgressStatus(
                        progress
                    ),

                updated_at:
                    new Date()
                        .toISOString()
            };


            const statusResult =
                await supabaseClient
                    .from(TABLE_NAME)
                    .insert(statusPayload)
                    .select()
                    .maybeSingle();


            if (!statusResult.error) {

                lessonColumn =
                    "lesson_id";

                row =
                    statusResult.data;

                return true;
            }


            /*
             * Fallback cho schema cũ:
             * mỗi loại dữ liệu là một column.
             */

            const expandedLessonColumns = [
                "lesson_id",
                "lesson_number"
            ];


            for (
                const field
                of expandedLessonColumns
            ) {

                const payload = {

                    ...common,

                    ...expandedProgress(
                        progress
                    )
                };


                payload[field] =
                    lessonNumber;


                const result =
                    await supabaseClient
                        .from(TABLE_NAME)
                        .insert(payload)
                        .select()
                        .maybeSingle();


                if (!result.error) {

                    lessonColumn =
                        field;

                    row =
                        result.data;

                    return true;
                }
            }


            console.warn(

                "Không lưu được tiến độ bài " +
                lessonNumber +
                " vào bảng " +
                TABLE_NAME +
                "."
            );


            return false;
        }


        /*
         * Lưu dữ liệu hiện tại lên Supabase.
         */
        async function saveNow() {

            if (
                !ready ||
                !user
            ) {
                return;
            }


            const progress =
                collectLocalProgress(
                    lessonNumber
                );


            if (!row) {

                await insertFirstRow(
                    progress
                );

                return;
            }


            const changes =
                changesForExistingRow(
                    row,
                    progress
                );


            if (
                Object.keys(changes)
                    .length === 0
            ) {
                return;
            }


            let query =
                supabaseClient
                    .from(TABLE_NAME)
                    .update(changes);


            if (
                row.id !== undefined
            ) {

                query =
                    query.eq(
                        "id",
                        row.id
                    );

            } else {

                query =
                    query
                        .eq(
                            "user_id",
                            user.id
                        )
                        .eq(
                            lessonColumn,
                            lessonNumber
                        );
            }


            const result =
                await query
                    .select()
                    .maybeSingle();


            if (result.error) {

                console.warn(

                    "Không cập nhật được tiến độ bài " +
                    lessonNumber +
                    ":",

                    result.error.message
                );

            } else if (result.data) {

                row =
                    result.data;
            }
        }


        /*
         * Load dữ liệu khi mở lesson.
         */

        session.readyPromise =
            (async function() {

                const userResult =
                    await supabaseClient
                        .auth
                        .getUser();


                user =
                    userResult.data &&
                    userResult.data.user;


                if (!user) {
                    return session;
                }


                const rowResult =
                    await supabaseClient
                        .from(TABLE_NAME)
                        .select("*")
                        .eq(
                            "user_id",
                            user.id
                        );


                if (rowResult.error) {

                    console.warn(

                        "Không đọc được bảng " +
                        TABLE_NAME +
                        ":",

                        rowResult.error.message
                    );

                    return session;
                }


                const rows =
                    rowResult.data || [];


                row =
                    rows.find(
                        function(item) {

                            return (
                                Number(
                                    getLessonNumber(
                                        item
                                    )
                                ) ===
                                Number(
                                    lessonNumber
                                )
                            );
                        }
                    ) || null;


                const schemaSample =
                    row ||
                    rows[0] ||
                    null;


                lessonColumn =
                    getLessonColumn(
                        schemaSample
                    );


                ready = true;


                if (row) {

                    applyingRemote =
                        true;


                    applyLocalProgress(

                        lessonNumber,

                        progressFromRow(
                            row
                        )
                    );


                    if (
                        options &&
                        typeof options.onRemoteLoaded ===
                            "function"
                    ) {

                        options
                            .onRemoteLoaded();
                    }


                    applyingRemote =
                        false;

                } else {

                    await saveNow();
                }


                return session;

            })();


        return session;
    }


    /*
     * Load trạng thái các lesson để tô màu
     * ở trang danh sách bài học.
     */

    async function loadLessonStatuses(
        lessonNumbers
    ) {

        const result = {};


        lessonNumbers.forEach(
            function(number) {

                const localProgress =
                    collectLocalProgress(
                        number
                    );


                if (
                    localProgress.completed
                ) {

                    result[number] =
                        "completed";

                } else if (
                    localProgress.started ||
                    (
                        localProgress.savedWords ||
                        []
                    ).length > 0 ||
                    (
                        localProgress.phraseMarks ||
                        []
                    ).length > 0
                ) {

                    result[number] =
                        "learning";

                } else {

                    result[number] =
                        "new";
                }
            }
        );


        const userResult =
            await supabaseClient
                .auth
                .getUser();


        const user =
            userResult.data &&
            userResult.data.user;


        if (!user) {
            return result;
        }


        const rowResult =
            await supabaseClient
                .from(TABLE_NAME)
                .select("*")
                .eq(
                    "user_id",
                    user.id
                );


        if (rowResult.error) {
            return result;
        }


        (
            rowResult.data || []
        ).forEach(
            function(row) {

                const number =
                    Number(
                        getLessonNumber(
                            row
                        )
                    );


                if (
                    !lessonNumbers.includes(
                        number
                    )
                ) {
                    return;
                }


                const progress =
                    progressFromRow(
                        row
                    );


                if (
                    progress.completed
                ) {

                    result[number] =
                        "completed";

                } else if (
                    progress.started ||
                    (
                        progress.savedWords ||
                        []
                    ).length > 0 ||
                    (
                        progress.phraseMarks ||
                        []
                    ).length > 0
                ) {

                    result[number] =
                        "learning";

                } else {

                    result[number] =
                        "new";
                }
            }
        );


        return result;
    }


    /*
     * Cho các lesson HTML gọi chung.
     */

    window.LessonProgress = {

        create:
            createSession,

        collectLocalProgress:
            collectLocalProgress,

        loadLessonStatuses:
            loadLessonStatuses
    };

})();