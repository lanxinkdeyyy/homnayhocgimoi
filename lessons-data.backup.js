/* =====================================================================
   lessons-data.js  —  TOÀN BỘ NỘI DUNG CÁC BÀI HỌC (HSK 4)
   ---------------------------------------------------------------------
   THÊM BÀI MỚI: copy khối "MẪU" ở cuối file, đổi số bài, rồi sửa 2 chỗ:
     1) readings : text bài đọc  (mỗi bài đọc 1 dòng { no, text })
     2) vocab    : từ vựng       (mỗi từ 1 dòng)
   Trang tự có mặt trong danh sách bài (reading.html) và mở bằng
   lesson.html?id=<số bài>.

   --- Định dạng 1 dòng từ vựng ---------------------------------------
   ["汉字", "pinyin", "[Hán Việt]", "loại từ", "Nghĩa tiếng Việt"]
   Muốn thêm ví dụ / cách dùng thì thêm 1 object ở cuối (tất cả tuỳ chọn):
   ["汉字", "pinyin", "[Hán Việt]", "n", "Nghĩa",
        { ex: "例句 tiếng Trung", py: "pinyin câu ví dụ",
          vi: "→ Nghĩa câu ví dụ", use: "Cách dùng" }]

   --- Tuỳ chọn cho từng bài (không bắt buộc) -------------------------
   title     : tên hiện trong trang bài học
   listTitle : tên hiện ở danh sách bài (mặc định = title)
   level     : "HSK 4"          book : "quyển thượng"
   readings[i].no      : số 课文 (mặc định 1,2,3...). Ghép tên audio:
                         audio/HSK4 - <book> - Bài <id>.<no>.mp3
   readings[i].audio   : đường dẫn audio riêng, hoặc false nếu không có
   readings[i].heading : tiêu đề riêng (mặc định "📖 课文 <no>")
   Chưa có file mp3 thì trang tự ẩn phần nghe, cứ thêm file sau là chạy.
   ===================================================================== */

window.LESSONS = {

    1: {
        title: "爱情与婚姻",
        listTitle: "简单的爱情",

        readings: [
            { no: 4, audio: "audio/01-4.mp3", text: "很多女孩子羡慕浪漫的爱情。那什么是浪漫呢？年轻人说：浪漫是她想要月亮时，你不会给她星星；中年人说：浪漫是即使晚上加班到零点，到家时，自己家里也还亮着灯；老年人说：浪漫其实就像歌中唱的那样，我能想到最浪漫的事，就是和你一起慢慢变老。其实，让我们感动的，就是生活中简单的爱情。有时候，简单就是最大的幸福。" },
            { no: 5, audio: "audio/01-5.mp3", text: "说到结婚，人们就会很自然地想起爱情。爱情是结婚的重要原因，但两个人共同生活，不仅需要浪漫的爱情，更需要性格上互相吸引。我丈夫是个很幽默的人。即使是很普通的事情，从他嘴里说出来也会变得很有意思。在我难过的时候，他总是有办法让我高兴起来。而且他的脾气也不错，结婚快十年了，我们俩几乎没为什么事红过脸，很多人都特别羡慕我们。" }
        ],

        vocab: [
            /* Chưa có từ vựng cho bài này */
        ]
    },

    2: {
        title: "朋友",
        listTitle: "真正的友谊",

        readings: [
            { no: 4, audio: "audio/02-4.mp3", text: "每个人都需要朋友，朋友可以丰富我们的生活。离开朋友，我们的生活一定会非常无聊。那么，怎样才能交到更多的朋友呢？当然，要有好脾气。一个脾气不好的人虽然不一定让人讨厌，但是却很难跟人交朋友。因为没有人会喜欢跟一个总是容易生气的人在一起。我们还要经常跟周围的人交流。交流能让人们互相了解，如果有共同的兴趣、爱好或者习惯，就更容易成为朋友了。" },
            { no: 5, audio: "audio/02-5.mp3", text: "人的一生可以什么都没有，但不能没有朋友，而且必须要有自己真正的朋友。什么是真正的朋友？不同的人会有不同的理解。有些人觉得朋友就是能和自己一起快乐的人；有些人觉得朋友应该像镜子，能帮自己看到缺点。而我的理解是：当你遇到困难的时候，真正的朋友会站出来，及时给你帮助；当你无聊或者难过的时候，真正的朋友会陪在你身边，想办法让你感到幸福。" }
        ],

        vocab: [
            /* Chưa có từ vựng cho bài này */
        ]
    },

    3: {
        title: "面试与第一印象",
        listTitle: "经理对我印象不错",

        readings: [
            { no: 4, audio: "audio/03-4.mp3", text: "面试的时候，经理对我印象不错，还通知我明天就可以上班了。真没想到，找工作这么顺利。你想知道面试需要注意什么吗？首先，要穿正式的衣服，这会给面试者留下一个好的印象，让他觉得你是一个认真的人。其次，应聘时不要紧张。回答问题时，说得不要太快，声音也不要太小，要相信自己有能力做好。当然，最重要的是回答问题要诚实。" },
            { no: 5, audio: "audio/03-5.mp3", text: "第一印象就是第一次见面时给别人留下的印象。虽然第一印象不总是对的，但如果想改变却很困难。你给别人的第一印象会影响他们以后对你的感觉和判断。所以，给第一次见面的同事留下好的印象，以后的工作可能会更顺利；给第一次见面的顾客留下好的印象，你可能会卖出更多的东西。但是，如果第一次见面给别人留下像不准时这样的坏印象，那么以后就很难让别人相信你。所以不管是上课、上班，还是与别人约会，准时都非常重要。" }
        ],

        vocab: [
            /* Chưa có từ vựng cho bài này */
        ]
    },

    4: {
        title: "工作与责任心",
        listTitle: "不要太着急赚钱",

        readings: [
            { no: 4, audio: "audio/04-4.mp3", text: "我们今年的工作都已经按照计划完成了。这一段时间，尽管工作很紧张，中间也遇到了很多困难，但是因为有大家的努力，我们成功地解决了问题，顺利地完成了工作，非常感谢大家对我的帮助！另外，马经理让我告诉大家一个好消息，因为大家按时完成了工作，公司决定这个月给每人多发三千元奖金。感谢大家这三个多月的努力工作，希望明年能有更大的成绩！" },
            { no: 5, audio: "audio/04-5.mp3", text: "年轻人刚开始工作的时候，不要太急着赚钱，不要眼睛里只有工资和奖金。在工作的前几年，重要的是丰富自己的工作经验，学习与同事交流的方法，积累专业知识，这些比收入重要多了。但是很多时候，我们不得不去做一些自己不愿意做甚至是非常不喜欢的工作。这时，我们最需要的就是对工作的责任心。一个人即使能力再高，经验再丰富，如果对工作没有责任心，也很难把工作做好。" }
        ],

        vocab: [
            /* Chưa có từ vựng cho bài này */
        ]
    },

    5: {
        title: "买衣服与网上购物",
        listTitle: "只买对的，不买贵的",

        readings: [
            { no: 4, text: "买衣服只考虑价格当然不好，但是只考虑买好看的也不一定对。我买衣服的标准是只买对的，不买贵的。第一，自己穿着舒服；第二，衣服的质量要好，而且又不能太贵。对我来说，衣服的样子流行不流行并不是很重要。很多年龄大的人喜欢在打折的时候买便宜的衣服，但对那些衣服是不是适合自己却考虑得不多。这点是我理解不了的，因为如果不适合自己，即使花钱很少，也是一种浪费。" },
            { no: 5, text: "现在网上购物变得越来越流行了，年轻人尤其喜欢在网上买东西。在网上几乎什么都可以买到，你可以上网买书、买衣服、买包，还可以买家具、买手机。网上购物能够受到人们的喜爱，原因主要有两个：首先，网上的东西很多，而且比去商店买便宜，这是吸引人们购买的主要原因。其次，人们可以在任何时间上网购买自己喜欢的东西，卖家可以把你买的东西寄到你办公室或者家里，非常方便。" }
        ],

        vocab: [
            /* Chưa có từ vựng cho bài này */
        ]
    },

    6: {
        title: "购物与价格",
        listTitle: "一分钱，一分货",

        readings: [
            { no: 4, text: "顾客朋友们，为了感谢大家的支持，我们书店今天举行购书送好礼活动，购书满100元送一个笔记本，满200元送一本词典。另外，一些图书还有打折活动，其中，小说7.5折，地图8折，留学考试用书6折。如果购书满500元可免费办会员卡，以后购书可打8折。今天过生日的朋友和所有的小朋友还可以获得一份小礼物。欢迎大家选购！" },
            { no: 5, text: "人们常说一分钱一分货，意思是东西的质量和价格有很大的关系，也可以说便宜没好货，好货不便宜，一般情况下，你花的钱越多，买的东西也就越好。其实也不一定都是这样的。有的时候，质量很好的东西也会很便宜。例如，春天来了，冬天的衣服就会打折，质量很好，还很便宜，花很少的钱就可以买到。一到节日，商场也会举办各种各样的活动，降低价格，这个时候我们也可以买到又便宜又好的东西。" }
        ],

        vocab: [
            /* Chưa có từ vựng cho bài này */
        ]
    },

    7: {
        title: "健康与散步",
        listTitle: "最好的医生是自己",

        readings: [
            { no: 4, heading: "📖 Bài đọc 1", text: "每个人都希望自己健康，那么什么才是健康呢？过去，人们认为健康就是指身体不生病。但是，现在人们认识到，健康还指精神上的健康。只有身体和精神都健康，才算是真正的健康。有一位教授用数字来说明健康有多么重要：要是健康是1，其他都是1后面的0；如果没有1，不管有多少0也没用。所以我们平时一定要注意锻炼，别等健康出问题了才后悔。" },
            { no: 5, heading: "📖 Bài đọc 2", text: "我听一位医生说过一句话：“最好的医生是自己，最好的药是时间，最好的运动是散步。”前两条我理解得不深，最后一条我完全同意。散步是生活中最简单的锻炼方法，既可以活动身体，又可以减肥，而且不会像跑步那样辛苦。晚饭后，一家人一起出去散散步，是一件很幸福的事情。肚子吃饱了需要活动，家人忙了一天需要交流，夫妻说说一天的工作能加深感情，听孩子谈谈学校里有意思的事，一天的烦恼就都跑掉了。" }
        ],

        vocab: [
            ["每个人", "měi ge rén", "[Mỗi Cá Nhân]", "n", "Mỗi người, mọi người", { ex: "每个人都需要休息。", vi: "→ Mỗi người đều cần nghỉ ngơi.", use: "Dùng để nói về từng người trong một nhóm." }],
            ["希望", "xīwàng", "[Hy Vọng]", "v", "Hy vọng, mong muốn", { ex: "我希望明天是好天气。", vi: "→ Tôi hy vọng ngày mai thời tiết đẹp.", use: "Thường dùng: 希望 + mệnh đề / 希望 + động từ." }],
            ["自己", "zìjǐ", "[Tự Kỷ]", "pron", "Bản thân, chính mình", { ex: "你要相信自己。", vi: "→ Bạn phải tin vào bản thân mình.", use: "Đại từ phản thân, chỉ chính người được nhắc đến." }],
            ["健康", "jiànkāng", "[Kiện Khang]", "n, a", "Sức khỏe; khỏe mạnh", { ex: "健康比什么都重要。", vi: "→ Sức khỏe quan trọng hơn tất cả mọi thứ.", use: "Có thể làm danh từ hoặc tính từ: 身体健康 (cơ thể khỏe mạnh)." }],
            ["那么", "nàme", "[Na Ma]", "adv", "Vậy thì; như vậy; thế thì", { ex: "那么，我们开始吧。", vi: "→ Vậy thì, chúng ta bắt đầu nhé.", use: "Dùng để nối câu, chuyển sang kết quả hoặc câu hỏi tiếp theo." }],
            ["什么", "shénme", "[Thập Ma]", "pron", "Cái gì; gì", { ex: "你想吃什么？", vi: "→ Bạn muốn ăn gì?", use: "Đại từ nghi vấn, dùng để hỏi sự vật, việc hoặc nội dung." }],
            ["才", "cái", "[Tài]", "adv", "Mới; mới là; thì mới", { ex: "努力学习才会进步。", vi: "→ Chăm chỉ học thì mới tiến bộ.", use: "Trong bài, 才 nhấn mạnh điều kiện cần để có kết quả." }],
            ["过去", "guòqù", "[Quá Khứ]", "n / v", "Quá khứ; đi qua, trôi qua", { ex: "过去的事情就让它过去吧。", vi: "→ Chuyện đã qua thì hãy để nó qua đi.", use: "Làm danh từ chỉ thời gian đã qua; cũng có thể là động từ 'đi qua'." }],
            ["人们", "rénmen", "[Nhân Môn]", "n", "Mọi người, con người", { ex: "现在人们很重视环境保护。", vi: "→ Hiện nay mọi người rất coi trọng việc bảo vệ môi trường.", use: "Chỉ con người nói chung; không dùng cho một số lượng người xác định." }],
            ["认为", "rènwéi", "[Nhận Vi]", "v", "Cho rằng, cho là, cho rằng", { ex: "我认为这个办法很好。", vi: "→ Tôi cho rằng cách này rất tốt.", use: "Thường dùng: 认为 + mệnh đề." }],
            ["指", "zhǐ", "[Chỉ]", "v", "Chỉ, đề cập đến, nói đến/ (n) ngón tay, chỉ số", { ex: "这里的“他”指谁？", vi: "→ “Anh ấy” ở đây chỉ ai?", use: "Thường dùng để giải thích một từ hoặc khái niệm: A 指 B." }],
            ["认识", "rènshi", "[Nhận Thức]", "v, n", "(v) biết, quen / (n) sự nhận thức, hiểu biết", { ex: "这里的“他”指谁？", use: "认识 + người/ sự vật/ khái niệm/ sự thật, vấn đề." }],
            ["身体", "shēntǐ", "[Thân Thể]", "n", "Cơ thể, thân thể", { ex: "你要照顾好自己的身体。", vi: "→ Bạn phải chăm sóc tốt cơ thể của mình.", use: "Thường kết hợp: 身体健康, 锻炼身体." }],
            ["生病", "shēng bìng", "[Sinh Bệnh]", "v", "Bị bệnh, ốm", { ex: "他昨天生病了，没去上班。", vi: "→ Hôm qua anh ấy bị ốm nên không đi làm.", use: "Dùng với 了 khi nói một lần bị ốm cụ thể." }],
            ["但是", "dànshì", "[Đãn Thị]", "conj", "Nhưng, tuy nhiên", { ex: "他很累，但是还在学习。", vi: "→ Anh ấy rất mệt nhưng vẫn đang học.", use: "Liên từ biểu thị sự chuyển ý hoặc đối lập." }],
            ["现在", "xiànzài", "[Hiện Tại]", "n / adv", "Hiện tại, bây giờ", { ex: "现在我明白了。", vi: "→ Bây giờ tôi hiểu rồi.", use: "Dùng ở đầu câu hoặc trước động từ để chỉ thời điểm hiện tại." }],
            ["认识到", "rènshi dào", "[Nhận Thức Đáo]", "v", "Nhận thức được, nhận ra", { ex: "我终于认识到时间的重要性。", vi: "→ Cuối cùng tôi cũng nhận ra tầm quan trọng của thời gian.", use: "认识到 + sự việc / ý nghĩa / vấn đề." }],
            ["精神", "jīngshén", "[Tinh Thần]", "n", "Tinh thần; tâm trạng", { ex: "她今天精神很好。", vi: "→ Hôm nay tinh thần cô ấy rất tốt.", use: "Trong bài, 精神上的健康 là sức khỏe tinh thần." }],
            ["精神上", "jīngshén shàng", "[Tinh Thần Thượng]", "n", "Về mặt tinh thần", { ex: "他精神上压力很大。", vi: "→ Về mặt tinh thần, anh ấy có áp lực rất lớn.", use: "Thường dùng sau một danh từ để nói về một phương diện nào đó." }],
            ["只有…才…", "zhǐyǒu…cái…", "[Chỉ Hữu…Tài…]", "cấu trúc", "Chỉ có… thì mới…", { ex: "只有认真练习，才会说好中文。", vi: "→ Chỉ có luyện tập nghiêm túc thì mới nói tiếng Trung tốt.", use: "Nhấn mạnh điều kiện cần thiết để kết quả phía sau xảy ra." }],
            ["算", "suàn", "[Toán]", "v", "Tính là, được coi là", { ex: "这样算不算迟到？", vi: "→ Như vậy có được tính là đi muộn không?", use: "Thường dùng: 算 + danh từ / 算是 + danh từ." }],
            ["真正", "zhēnzhèng", "[Chân Chính]", "a / adv", "Thật sự, thực sự, chân chính", { ex: "真正的朋友会帮助你。", vi: "→ Người bạn thật sự sẽ giúp đỡ bạn.", use: "Thường đứng trước danh từ để nhấn mạnh tính xác thực." }],
            ["教授", "jiàoshòu", "[Giáo Thụ]", "n", "Giáo sư", { ex: "王教授正在给学生上课。", vi: "→ Giáo sư Vương đang dạy học sinh.", use: "Cách gọi chức danh học thuật: 王教授." }],
            ["数字", "shùzì", "[Số Tự]", "n", "Con số, chữ số", { ex: "这个数字不太准确。", vi: "→ Con số này không được chính xác lắm.", use: "Dùng cho số liệu, chữ số hoặc số lượng thể hiện bằng số." }],
            ["说明", "shuōmíng", "[Thuyết Minh]", "v", "Giải thích, chứng minh, cho thấy", { ex: "这个例子说明了问题。", vi: "→ Ví dụ này đã cho thấy vấn đề.", use: "说明 + sự việc / nguyên nhân / ý nghĩa." }],
            ["多么", "duōme", "[Đa Ma]", "adv", "Biết bao, bao nhiêu, rất", { ex: "健康是多么重要啊！", vi: "→ Sức khỏe quan trọng biết bao!", use: "Dùng trong câu cảm thán để nhấn mạnh mức độ." }],
            ["重要", "zhòngyào", "[Trọng Yếu]", "a", "Quan trọng", { ex: "这是一个很重要的决定。", vi: "→ Đây là một quyết định rất quan trọng.", use: "Thường dùng: 对…很重要 / 重要的 + danh từ." }],
            ["要是", "yàoshi", "[Yếu Thị]", "conj", "Nếu, giả sử như", { ex: "要是明天下雨，我们就不去了。", vi: "→ Nếu ngày mai mưa, chúng tôi sẽ không đi.", use: "Dùng để giả định điều kiện, gần nghĩa với 如果." }],
            ["其他", "qítā", "[Kỳ Tha]", "pron", "Khác, những cái khác", { ex: "其他问题以后再说。", vi: "→ Những vấn đề khác để sau nói tiếp.", use: "Thường đứng trước danh từ: 其他人, 其他事情." }],
            ["后面", "hòumian", "[Hậu Diện]", "n", "Phía sau; phần sau", { ex: "答案在书的后面。", vi: "→ Đáp án ở phía sau quyển sách.", use: "Có thể chỉ vị trí hoặc phần nội dung ở sau." }],
            ["如果", "rúguǒ", "[Như Quả]", "conj", "Nếu", { ex: "如果你有时间，就来找我吧。", vi: "→ Nếu bạn có thời gian thì đến tìm tôi nhé.", use: "Dùng mở đầu mệnh đề điều kiện; thường đi với 就 ở vế sau." }],
            ["不管", "bùguǎn", "[Bất Quản]", "conj", "Bất kể, dù cho, không quan tâm", { ex: "不管多忙，我都会吃早餐。", vi: "→ Dù bận thế nào, tôi cũng sẽ ăn sáng.", use: "Thường dùng với 都 / 也: 不管…都/也…" }],
            ["多少", "duōshao", "[Đa Thiểu]", "pron", "Bao nhiêu; một mức độ nào đó", { ex: "这里有多少人？", vi: "→ Ở đây có bao nhiêu người?", use: "Dùng để hỏi số lượng; trong 不管有多少 là 'dù có bao nhiêu'." }],
            ["没用", "méi yòng", "[Một Dụng]", "a", "Vô dụng, không có tác dụng", { ex: "光着急是没用的。", vi: "→ Chỉ lo lắng thôi thì không có tác dụng.", use: "Dùng để nói một việc, đồ vật hoặc cách làm không đem lại hiệu quả." }],
            ["所以", "suǒyǐ", "[Sở Dĩ]", "conj", "Cho nên, vì vậy", { ex: "今天下雨，所以我没出门。", vi: "→ Hôm nay trời mưa, vì vậy tôi không ra ngoài.", use: "Dùng ở vế kết quả; vế trước thường nêu nguyên nhân." }],
            ["平时", "píngshí", "[Bình Thời]", "n / adv", "Bình thường, thường ngày", { ex: "我平时晚上十点睡觉。", vi: "→ Bình thường tôi ngủ lúc 10 giờ tối.", use: "Dùng để nói thói quen hoặc tình trạng thường ngày." }],
            ["一定", "yídìng", "[Nhất Định]", "adv", "Nhất định, chắc chắn, phải", { ex: "你一定要注意安全。", vi: "→ Bạn nhất định phải chú ý an toàn.", use: "Đặt trước động từ để nhấn mạnh yêu cầu hoặc sự chắc chắn." }],
            ["注意", "zhùyì", "[Chú Ý]", "v", "Chú ý, để ý", { ex: "请注意听老师说。", vi: "→ Hãy chú ý nghe thầy giáo nói.", use: "Thường dùng: 注意 + động từ / danh từ; 注意安全." }],
            ["锻炼", "duànliàn", "[Đoán Luyện]", "v", "Rèn luyện, tập luyện", { ex: "为了健康，他每天锻炼身体。", vi: "→ Vì sức khỏe, anh ấy tập luyện cơ thể mỗi ngày.", use: "Thường dùng: 锻炼身体; cũng có thể là rèn luyện năng lực." }],
            ["别", "bié", "[Biệt]", "adv", "Đừng, chớ", { ex: "别忘了带手机。", vi: "→ Đừng quên mang điện thoại.", use: "Đặt trước động từ để tạo câu mệnh lệnh phủ định." }],
            ["等", "děng", "[Đẳng]", "v", "Đợi, chờ", { ex: "请你等我一下。", vi: "→ Bạn hãy đợi tôi một lát.", use: "Thường dùng: 等 + người / sự việc; 等一下 là đợi một lát." }],
            ["出问题", "chū wèntí", "[Xuất Vấn Đề]", "v", "Xảy ra vấn đề, gặp trục trặc", { ex: "电脑出问题了，打不开。", vi: "→ Máy tính xảy ra vấn đề rồi, không mở được.", use: "Dùng cho sức khỏe, máy móc, kế hoạch hoặc công việc gặp vấn đề." }],
            ["后悔", "hòuhuǐ", "[Hậu Hối]", "v", "Hối hận", { ex: "我后悔没有早点开始学习。", vi: "→ Tôi hối hận vì đã không bắt đầu học sớm hơn.", use: "Thường dùng: 后悔 + động từ / 后悔做了某事." }]
        ]
    },

    8: {
        title: "生活态度与颜色",
        listTitle: "生活中不缺少美",

        readings: [
            { no: 4, heading: "📖 Bài đọc 1", text: "草绿了，那是生命的颜色；花开了，那是大自然的礼物。生活中不缺少美，缺少的是发现美的眼睛。只要有心，生活中的美到处都是。生活的态度要自己选择，因此，遇到烦恼时，你应该想一些办法让自己从不高兴的心情中走出来。窗外是什么样子，我们无法改变，但我们可以选择站在哪个窗户前。选择一个能够带给我们快乐的窗户，这样才能选对心情，选对生活的态度。" },
            { no: 5, heading: "📖 Bài đọc 2", text: "科学研究证明，女孩子对衣服颜色的选择往往与她们的性格有关。喜欢穿白色衣服的女孩子性格比较阳光，生活态度积极向上是她们的共同特点；而喜欢穿红色衣服的女孩子性格比较浪漫。颜色也会影响人的心情，不同的颜色会给我们带来不同的感情变化。红色让人变得热情；黄色和白色让人心情愉快；黑色却容易让人感到伤心；人们在看到蓝色时会觉得很舒服，变得安静下来；绿色让我们的眼睛得到休息。" }
        ],

        vocab: [
            ["草", "cǎo", "[Thảo]", "n", "Cỏ", { ex: "草绿了。", vi: "→ Cỏ xanh rồi.", use: "Danh từ chỉ cỏ." }],
            ["生命", "shēngmìng", "[Sinh Mệnh]", "n", "Sinh mệnh, sự sống", { ex: "生命很宝贵。", vi: "→ Sự sống rất quý giá.", use: "Chỉ sự sống hoặc cuộc đời." }],
            ["颜色", "yánsè", "[Nhan Sắc]", "n", "Màu sắc", { ex: "我喜欢这个颜色。", vi: "→ Tôi thích màu này.", use: "Dùng để nói về màu sắc." }],
            ["花", "huā", "[Hoa]", "n", "Hoa", { ex: "花开了。", vi: "→ Hoa nở rồi.", use: "Danh từ chỉ hoa." }],
            ["自然", "zìrán", "[Tự Nhiên]", "n", "Thiên nhiên", { ex: "大自然很美。", vi: "→ Thiên nhiên rất đẹp.", use: "Chỉ thế giới tự nhiên." }],
            ["礼物", "lǐwù", "[Lễ Vật]", "n", "Quà tặng", { ex: "这是送给你的礼物。", vi: "→ Đây là quà tặng cho bạn.", use: "礼物 thường đi với 送、收到." }],
            ["生活", "shēnghuó", "[Sinh Hoạt]", "n / v", "Cuộc sống; sinh hoạt", { ex: "我的生活很简单。", vi: "→ Cuộc sống của tôi rất đơn giản.", use: "Có thể là danh từ hoặc động từ." }],
            ["缺少", "quēshǎo", "[Khuyết Thiểu]", "v", "Thiếu, thiếu hụt", { ex: "这里缺少水。", vi: "→ Ở đây thiếu nước.", use: "缺少 + danh từ." }],
            ["发现", "fāxiàn", "[Phát Hiện]", "v", "Phát hiện, nhận ra", { ex: "我发现了一个问题。", vi: "→ Tôi phát hiện một vấn đề.", use: "发现 + sự vật / vấn đề." }],
            ["眼睛", "yǎnjing", "[Nhãn Tinh]", "n", "Mắt", { ex: "让眼睛休息一下。", vi: "→ Hãy để mắt nghỉ một chút.", use: "Danh từ chỉ mắt." }],
            ["有关", "yǒuguān", "[Hữu Quan]", "v", "Có liên quan", { ex: "这件事跟你的工作有关。", vi: "→ Việc này có liên quan đến công việc của bạn.", use: "Thường dùng: 与/跟/和……有关 = có liên quan đến…; 无关 = không liên quan." }],
            ["穿", "chuān", "[Xuyên]", "v", "Mặc; xuyên qua", { ex: "今天很冷，记得多穿一点儿。", vi: "→ Hôm nay lạnh, nhớ mặc thêm một chút.", use: "穿 + quần áo/giày: mặc hoặc đi. Ví dụ: 穿衣服、穿裙子、穿鞋。" }],
            ["比较", "bǐjiào", "[Tỉ Giảo]", "adv / v", "Khá, tương đối; so sánh", { ex: "这件衣服比较适合你。", vi: "→ Bộ quần áo này khá hợp với bạn.", use: "比较 + tính từ: khá/tương đối…; 比较 A 和 B: so sánh A và B。" }],
            ["只要", "zhǐyào", "[Chỉ Yếu]", "conj", "Chỉ cần", { ex: "只要努力，就会进步。", vi: "→ Chỉ cần cố gắng thì sẽ tiến bộ.", use: "Thường dùng với 就 ở vế sau." }],
            ["到处", "dàochù", "[Đáo Xứ]", "adv", "Khắp nơi, mọi nơi", { ex: "这里到处都是花。", vi: "→ Ở đây đâu đâu cũng có hoa.", use: "Đứng trước động từ hoặc 是." }],
            ["窗户", "chuānghu", "[Song Hộ]", "n", "Cửa sổ", { ex: "请打开窗户。", vi: "→ Hãy mở cửa sổ.", use: "Danh từ. 常用：开窗户、关窗户。" }],
            ["共同", "gòngtóng", "[Cộng Đồng]", "a / adv", "Chung, cùng nhau", { ex: "我们有一个共同的目标。", vi: "→ Chúng tôi có một mục tiêu chung.", use: "共同的 + danh từ: chung; 共同 + động từ: cùng nhau làm gì. Ví dụ: 共同努力。" }],
            ["而", "ér", "[Nhi]", "conj", "Mà, còn, nhưng", { ex: "他很努力，而结果也很好。", vi: "→ Anh ấy rất nỗ lực, và kết quả cũng tốt.", use: "Dùng để nối hai vế/cụm có quan hệ bổ sung hoặc đối lập nhẹ. Thường gặp: 而且 (hơn nữa), 然而 (tuy nhiên), 而不是 (chứ không phải)。" }],
            ["却", "què", "[Khước]", "adv", "Lại, nhưng lại", { ex: "他想帮忙，却不知道怎么做。", vi: "→ Anh ấy muốn giúp, nhưng lại không biết làm thế nào.", use: "Thường đặt trước động từ/tính từ để nhấn mạnh kết quả trái với điều người ta mong đợi: 虽然……却……。" }],
            ["容易", "róngyì", "[Dung Dị]", "a", "Dễ, dễ dàng", { ex: "这个问题不容易回答。", vi: "→ Câu hỏi này không dễ trả lời.", use: "容易 + động từ: dễ làm gì; 不容易: không dễ. Ví dụ: 容易忘记、容易生病。" }],
            ["觉得", "juéde", "[Giác Đắc]", "v", "Cảm thấy, cho rằng", { ex: "我觉得这个方法很好。", vi: "→ Tôi thấy phương pháp này rất tốt.", use: "觉得 + tính từ/câu: cảm thấy, cho rằng thế nào. Ví dụ: 觉得很累、觉得他说得对。" }],
            ["得到", "dédào", "[Đắc Đáo]", "v", "Nhận được, có được", { ex: "他终于得到了大家的支持。", vi: "→ Cuối cùng anh ấy đã nhận được sự ủng hộ của mọi người.", use: "得到 + kết quả/thứ trừu tượng: 得到帮助、得到机会、得到答案、得到充分的休息。" }],
            ["窗外", "chuāngwài", "[Song Ngoại]", "n", "Bên ngoài cửa sổ", { ex: "窗外下雨了。", vi: "→ Bên ngoài cửa sổ trời mưa rồi.", use: "窗 + 外. Chỉ không gian ở phía ngoài cửa sổ." }],
            ["站", "zhàn", "[Trạm]", "v", "Đứng; đứng tại", { ex: "请站在门口等我。", vi: "→ Hãy đứng ở cửa chờ tôi.", use: "站 + địa điểm: đứng ở đâu. Trong bài: 站在……前 = đứng trước…" }],
            ["选", "xuǎn", "[Tuyển]", "v", "Chọn, lựa chọn", { ex: "你可以选自己喜欢的颜色。", vi: "→ Bạn có thể chọn màu mình thích.", use: "选 + danh từ: chọn cái gì. 选择 là dạng đầy đủ hơn của 选." }],
            ["与", "yǔ", "[Dữ]", "prep", "Với, và", { ex: "我想与你分享这个好消息。", vi: "→ Tôi muốn chia sẻ tin tốt này với bạn.", use: "与 là cách nói trang trọng của 和、跟. Thường dùng: 与……一起 / 与……有关 / 与……交流。" }],
            ["样子", "yàngzi", "[Dạng Tử]", "n", "Dáng vẻ, hình dáng, bộ dạng", { ex: "这个地方以前是什么样子？", vi: "→ Nơi này trước đây trông như thế nào?", use: "Thường dùng: 什么样子？; ……的样子; 看起来……的样子。" }],
            ["态度", "tàidu", "[Thái Độ]", "n", "Thái độ", { ex: "他的学习态度很好。", vi: "→ Thái độ học tập của anh ấy rất tốt.", use: "Thường dùng: 对…的态度." }],
            ["选择", "xuǎnzé", "[Tuyển Trạch]", "v / n", "Lựa chọn", { ex: "你可以自己选择。", vi: "→ Bạn có thể tự lựa chọn.", use: "选择 + danh từ / động từ." }],
            ["因此", "yīncǐ", "[Nhân Thử]", "conj", "Vì vậy, do đó", { ex: "他生病了，因此没来。", vi: "→ Anh ấy bị ốm, vì vậy không đến.", use: "Dùng để nối nguyên nhân và kết quả." }],
            ["遇到", "yùdào", "[Ngộ Đáo]", "v", "Gặp phải", { ex: "遇到问题别着急。", vi: "→ Gặp vấn đề đừng vội.", use: "遇到 + người / việc / khó khăn." }],
            ["烦恼", "fánnǎo", "[Phiền Não]", "n / v", "Phiền não, buồn phiền", { ex: "别为小事烦恼。", vi: "→ Đừng phiền não vì chuyện nhỏ.", use: "Có thể là danh từ hoặc động từ." }],
            ["应该", "yīnggāi", "[Ưng Cai]", "aux", "Nên, cần phải", { ex: "你应该早点休息。", vi: "→ Bạn nên nghỉ sớm.", use: "Đặt trước động từ để đưa lời khuyên." }],
            ["办法", "bànfǎ", "[Biện Pháp]", "n", "Cách, biện pháp", { ex: "我想到了一个办法。", vi: "→ Tôi nghĩ ra một cách.", use: "想办法 = tìm cách." }],
            ["心情", "xīnqíng", "[Tâm Tình]", "n", "Tâm trạng", { ex: "我今天心情很好。", vi: "→ Hôm nay tâm trạng tôi rất tốt.", use: "Thường dùng: 心情好 / 不好." }],
            ["无法", "wúfǎ", "[Vô Pháp]", "v", "Không thể", { ex: "我无法回答这个问题。", vi: "→ Tôi không thể trả lời câu hỏi này.", use: "无法 + động từ." }],
            ["改变", "gǎibiàn", "[Cải Biến]", "v", "Thay đổi", { ex: "我们不能改变过去。", vi: "→ Chúng ta không thể thay đổi quá khứ.", use: "改变 + sự vật / tình hình." }],
            ["能够", "nénggòu", "[Năng Cấu]", "aux", "Có thể, có khả năng", { ex: "我能够帮助你。", vi: "→ Tôi có thể giúp bạn.", use: "Đặt trước động từ." }],
            ["带给", "dài gěi", "[Đới Cấp]", "v", "Mang đến cho", { ex: "音乐带给我快乐。", vi: "→ Âm nhạc mang đến cho tôi niềm vui.", use: "带给 + người + điều gì." }],
            ["快乐", "kuàilè", "[Khoái Lạc]", "a", "Vui vẻ, hạnh phúc", { ex: "祝你快乐。", vi: "→ Chúc bạn vui vẻ.", use: "Có thể làm tính từ hoặc danh từ." }],
            ["科学", "kēxué", "[Khoa Học]", "n", "Khoa học", { ex: "科学改变生活。", vi: "→ Khoa học thay đổi cuộc sống.", use: "Danh từ chỉ khoa học." }],
            ["研究", "yánjiū", "[Nghiên Cứu]", "v / n", "Nghiên cứu", { ex: "他们正在研究这个问题。", vi: "→ Họ đang nghiên cứu vấn đề này.", use: "研究 + vấn đề / lĩnh vực." }],
            ["证明", "zhèngmíng", "[Chứng Minh]", "v", "Chứng minh", { ex: "事实证明他是对的。", vi: "→ Sự thật chứng minh anh ấy đúng.", use: "证明 + kết luận / sự việc." }],
            ["女孩子", "nǚ háizi", "[Nữ Hài Tử]", "n", "Cô gái", { ex: "那个女孩子很开朗。", vi: "→ Cô gái đó rất vui vẻ.", use: "Cách nói thân mật về bé gái/cô gái." }],
            ["衣服", "yīfu", "[Y Phục]", "n", "Quần áo", { ex: "这件衣服很漂亮。", vi: "→ Bộ quần áo này rất đẹp.", use: "Lượng từ thường dùng: 件." }],
            ["往往", "wǎngwǎng", "[Vãng Vãng]", "adv", "Thường thường", { ex: "他往往很早起床。", vi: "→ Anh ấy thường dậy rất sớm.", use: "Chỉ tình huống thường xảy ra." }],
            ["性格", "xìnggé", "[Tính Cách]", "n", "Tính cách", { ex: "她的性格很开朗。", vi: "→ Tính cách cô ấy rất vui vẻ.", use: "性格 + tính từ." }],
            ["喜欢", "xǐhuan", "[Hỉ Hoan]", "v", "Thích", { ex: "我喜欢蓝色。", vi: "→ Tôi thích màu xanh lam.", use: "喜欢 + danh từ / động từ." }],
            ["白色", "báisè", "[Bạch Sắc]", "n", "Màu trắng", { ex: "我喜欢白色衣服。", vi: "→ Tôi thích quần áo màu trắng.", use: "Tên một màu sắc." }],
            ["阳光", "yángguāng", "[Dương Quang]", "n / a", "Ánh nắng; lạc quan", { ex: "她是一个很阳光的人。", vi: "→ Cô ấy là người rất lạc quan.", use: "Trong bài chỉ tính cách tích cực." }],
            ["积极向上", "jījí xiàngshàng", "[Tích Cực Hướng Thượng]", "a", "Tích cực vươn lên", { ex: "保持积极向上的态度。", vi: "→ Giữ thái độ tích cực vươn lên.", use: "Cụm miêu tả thái độ sống." }],
            ["特点", "tèdiǎn", "[Đặc Điểm]", "n", "Đặc điểm", { ex: "这是它的特点。", vi: "→ Đây là đặc điểm của nó.", use: "Dùng để nói điểm nổi bật." }],
            ["红色", "hóngsè", "[Hồng Sắc]", "n", "Màu đỏ", { ex: "红色让人热情。", vi: "→ Màu đỏ khiến người ta nhiệt tình.", use: "Tên một màu sắc." }],
            ["浪漫", "làngmàn", "[Lãng Mạn]", "a", "Lãng mạn", { ex: "这是一个浪漫的故事。", vi: "→ Đây là một câu chuyện lãng mạn.", use: "Dùng để miêu tả tính cách hoặc bầu không khí." }],
            ["影响", "yǐngxiǎng", "[Ảnh Hưởng]", "v / n", "Ảnh hưởng", { ex: "天气影响心情。", vi: "→ Thời tiết ảnh hưởng tâm trạng.", use: "影响 + người / sự việc." }],
            ["不同", "bùtóng", "[Bất Đồng]", "a", "Khác nhau", { ex: "每个人的想法不同。", vi: "→ Suy nghĩ của mỗi người khác nhau.", use: "不同的 + danh từ." }],
            ["感情", "gǎnqíng", "[Cảm Tình]", "n", "Tình cảm, cảm xúc", { ex: "颜色会影响人的感情。", vi: "→ Màu sắc có thể ảnh hưởng cảm xúc của con người.", use: "Trong bài là thay đổi cảm xúc." }],
            ["变化", "biànhuà", "[Biến Hóa]", "n / v", "Thay đổi, biến hóa", { ex: "天气发生了变化。", vi: "→ Thời tiết đã có thay đổi.", use: "发生变化 = xảy ra thay đổi." }],
            ["热情", "rèqíng", "[Nhiệt Tình]", "a", "Nhiệt tình", { ex: "他对人很热情。", vi: "→ Anh ấy rất nhiệt tình với mọi người.", use: "热情地 + động từ / 很热情." }],
            ["黄色", "huángsè", "[Hoàng Sắc]", "n", "Màu vàng", { ex: "黄色让人心情愉快。", vi: "→ Màu vàng khiến người ta vui vẻ.", use: "Tên một màu sắc." }],
            ["愉快", "yúkuài", "[Du Khoái]", "a", "Vui vẻ, dễ chịu", { ex: "祝你旅途愉快。", vi: "→ Chúc bạn chuyến đi vui vẻ.", use: "Thường dùng: 心情愉快." }],
            ["黑色", "hēisè", "[Hắc Sắc]", "n", "Màu đen", { ex: "他穿黑色衣服。", vi: "→ Anh ấy mặc quần áo màu đen.", use: "Tên một màu sắc." }],
            ["伤心", "shāngxīn", "[Thương Tâm]", "a / v", "Buồn, đau lòng", { ex: "别太伤心。", vi: "→ Đừng quá buồn.", use: "Dùng để nói cảm xúc buồn." }],
            ["蓝色", "lánsè", "[Lam Sắc]", "n", "Màu xanh lam", { ex: "蓝色看起来很舒服。", vi: "→ Màu xanh lam trông rất dễ chịu.", use: "Tên một màu sắc." }],
            ["舒服", "shūfu", "[Thư Phục]", "a", "Thoải mái, dễ chịu", { ex: "这个房间很舒服。", vi: "→ Căn phòng này rất dễ chịu.", use: "Dùng cho cảm giác cơ thể hoặc tâm trạng." }],
            ["安静", "ānjìng", "[An Tĩnh]", "a", "Yên tĩnh", { ex: "请安静一下。", vi: "→ Hãy yên lặng một chút.", use: "Có thể chỉ nơi chốn hoặc trạng thái." }],
            ["绿色", "lǜsè", "[Lục Sắc]", "n", "Màu xanh lá", { ex: "草是绿色的。", vi: "→ Cỏ có màu xanh lá.", use: "Tên một màu sắc." }],
            ["休息", "xiūxi", "[Hưu Tức]", "v", "Nghỉ ngơi", { ex: "眼睛需要休息。", vi: "→ Mắt cần nghỉ ngơi.", use: "休息一下 = nghỉ một chút." }]
        ]
    },

    9: {
        title: "勇敢与坚持",
        listTitle: "阳光总在风雨后",

        readings: [
            { no: 4, text: "如果你想做什么事情，那就勇敢地去做，不要担心结果，不要考虑会不会失败。要是太看重结果，失败就会给人们带来很多烦恼。我们应该把注意力放在做事情的过程中，这样你会在做的过程中发现解决问题的快乐，这是其他任何东西都给不了的。即使最后失败了也没有关系，因为至少你已经努力过，而且我们还可以从失败中总结出有用的经验，有了这些积累，成功自然离我们越来越近。" },
            { no: 5, text: "每一个人都希望成功，可是很多时候，在成功之前会遇到很多困难。有些人遇到困难就放弃，而有些人遇到困难却想办法解决它。对困难的态度不同，结果也是不一样的。爱迪生就是在找了上千种材料后，才找到了能点亮电灯的材料。取得成功的人往往都经历过许多失败，他们和普通人的区别就是他们都坚持了下来。所以就算只有1%的希望，我们也要做出100%的努力。困难只是暂时的，“阳光总在风雨后”，只有我们勇敢地面对困难，才能有希望取得成功。" }
        ],

        vocab: [
            ["勇敢", "yǒnggǎn", "[Dũng Cảm]", "a", "Dũng cảm"],
            ["担心", "dānxīn", "[Đam Tâm]", "v", "Lo lắng"],
            ["结果", "jiéguǒ", "[Kết Quả]", "n", "Kết quả"],
            ["考虑", "kǎolǜ", "[Khảo Lự]", "v", "Cân nhắc"],
            ["失败", "shībài", "[Thất Bại]", "v / n", "Thất bại"],
            ["看重", "kànzhòng", "[Khán Trọng]", "v", "Coi trọng"],
            ["烦恼", "fánnǎo", "[Phiền Não]", "n", "Phiền não"],
            ["注意力", "zhùyìlì", "[Chú Ý Lực]", "n", "Sự chú ý"],
            ["过程", "guòchéng", "[Quá Trình]", "n", "Quá trình"],
            ["解决", "jiějué", "[Giải Quyết]", "v", "Giải quyết"],
            ["即使", "jíshǐ", "[Tức Sử]", "conj", "Cho dù"],
            ["至少", "zhìshǎo", "[Chí Thiểu]", "adv", "Ít nhất"],
            ["努力", "nǔlì", "[Nỗ Lực]", "v / n", "Nỗ lực"],
            ["总结", "zǒngjié", "[Tổng Kết]", "v", "Tổng kết"],
            ["经验", "jīngyàn", "[Kinh Nghiệm]", "n", "Kinh nghiệm"],
            ["积累", "jīlěi", "[Tích Lũy]", "v / n", "Tích lũy"],
            ["成功", "chénggōng", "[Thành Công]", "v / n", "Thành công"],
            ["越来越", "yuèláiyuè", "[Việt Lai Việt]", "adv", "Càng ngày càng"],
            ["困难", "kùnnan", "[Khốn Nan]", "n / a", "Khó khăn"],
            ["放弃", "fàngqì", "[Phóng Khí]", "v", "Từ bỏ"],
            ["态度", "tàidu", "[Thái Độ]", "n", "Thái độ"],
            ["爱迪生", "Àidíshēng", "[Ái Địch Sinh]", "n", "Edison"],
            ["材料", "cáiliào", "[Tài Liệu]", "n", "Vật liệu"],
            ["点亮", "diǎnliàng", "[Điểm Lượng]", "v", "Thắp sáng"],
            ["经历", "jīnglì", "[Kinh Lịch]", "v", "Trải qua"],
            ["区别", "qūbié", "[Khu Biệt]", "n", "Sự khác biệt"],
            ["坚持", "jiānchí", "[Kiên Trì]", "v", "Kiên trì"],
            ["暂时", "zànshí", "[Tạm Thời]", "adv", "Tạm thời"],
            ["面对", "miànduì", "[Diện Đối]", "v", "Đối mặt"]
        ]
    },

    10: {
        title: "幸福与经济条件",
        listTitle: "幸福的标准",

        readings: [
            { no: 4, text: "有的人希望穿得再好一些，房子再大一些，认为经济条件越好人就越幸福。其实有很多富人过得并不愉快，而有些穷人却过得很快乐。有钱不一定幸福，因为很多东西都是不能用钱买到的，例如时间、感情、生活经历等。但是，从另外一个方面看，如果没钱，也很难过得幸福。当你生病了，如果由于缺钱而不能及时去看医生，你的健康都很难得到保证，就更别说幸福了。" },
            { no: 5, text: "什么是幸福？有的人认为，工资高、能赚钱就是幸福；有的人认为，心情放松、身体健康才是幸福；也有人认为，能帮助别人就是一种幸福。还有人说，小时候幸福是一件东西，比如一块橡皮、一块糖，得到了就很幸福；长大后幸福是一种态度，生活的态度决定了我们幸福感的高低。那怎样才算是真正的幸福？其实，幸福并没有一个标准答案，每个人对幸福都有不同的理解。不管你认为幸福是什么，只要你用心去找，就一定能发现它。" }
        ],

        vocab: [
            ["幸福", "xìngfú", "[Hạnh Phúc]", "n / a", "Hạnh phúc"],
            ["经济", "jīngjì", "[Kinh Tế]", "n", "Kinh tế"],
            ["条件", "tiáojiàn", "[Điều Kiện]", "n", "Điều kiện"],
            ["富人", "fùrén", "[Phú Nhân]", "n", "Người giàu"],
            ["穷人", "qióngrén", "[Cùng Nhân]", "n", "Người nghèo"],
            ["愉快", "yúkuài", "[Du Khoái]", "a", "Vui vẻ"],
            ["感情", "gǎnqíng", "[Cảm Tình]", "n", "Tình cảm"],
            ["经历", "jīnglì", "[Kinh Lịch]", "n / v", "Trải nghiệm; trải qua"],
            ["另外", "lìngwài", "[Lệnh Ngoại]", "adv", "Mặt khác"],
            ["由于", "yóuyú", "[Do Vu]", "conj", "Do, bởi vì"],
            ["及时", "jíshí", "[Kịp Thời]", "adv", "Kịp thời"],
            ["医生", "yīshēng", "[Y Sinh]", "n", "Bác sĩ"],
            ["保证", "bǎozhèng", "[Bảo Chứng]", "v", "Bảo đảm"],
            ["工资", "gōngzī", "[Công Tư]", "n", "Tiền lương"],
            ["赚钱", "zhuànqián", "[Trám Tiền]", "v", "Kiếm tiền"],
            ["放松", "fàngsōng", "[Phóng Tùng]", "v", "Thư giãn"],
            ["帮助", "bāngzhù", "[Bang Trợ]", "v", "Giúp đỡ"],
            ["小时候", "xiǎoshíhou", "[Tiểu Thời Hậu]", "n", "Lúc nhỏ"],
            ["橡皮", "xiàngpí", "[Tượng Bì]", "n", "Cục tẩy"],
            ["长大", "zhǎngdà", "[Trưởng Đại]", "v", "Trưởng thành"],
            ["态度", "tàidu", "[Thái Độ]", "n", "Thái độ"],
            ["决定", "juédìng", "[Quyết Định]", "v", "Quyết định"],
            ["幸福感", "xìngfúgǎn", "[Hạnh Phúc Cảm]", "n", "Cảm giác hạnh phúc"],
            ["高低", "gāodī", "[Cao Đê]", "n", "Cao thấp"],
            ["真正", "zhēnzhèng", "[Chân Chính]", "a / adv", "Thật sự"],
            ["标准答案", "biāozhǔn dá'àn", "[Tiêu Chuẩn Đáp Án]", "n", "Đáp án tiêu chuẩn"],
            ["理解", "lǐjiě", "[Lý Giải]", "v / n", "Hiểu; sự hiểu biết"],
            ["不管", "bùguǎn", "[Bất Quản]", "conj", "Bất kể"],
            ["只要", "zhǐyào", "[Chỉ Yếu]", "conj", "Chỉ cần"]
        ]
    },

    11: {
        title: "阅读与读书",
        listTitle: "读书好，读好书，好读书",

        readings: [
            { no: 4, text: "根据调查，阅读能力好的人，不但容易找到工作，而且工资也比较高。怎么才能有效提高自己的阅读能力呢？做读书笔记就是其中一种好方法。读书笔记有很多种，最简单的就是把自己喜欢或者觉得有用的词语和句子记下来。另外，在看完一篇文章或一本书之后，还可以把它的主要内容和自己的想法写下来。然而，你不能完全相信书本上的内容，要有自己的看法和判断。坚持做读书笔记，对提高阅读能力有很大帮助。" },
            { no: 5, text: "读书好，读好书，好读书。虽然这句话只用了三个相同的汉字，但是不同的顺序却表示了不同的意思。首先，读书好说的是读书有很多好处；其次，每个人的时间都是有限的，不可能把世界上每一本书都读完，所以要读好的书；最后，好读书就是要养成阅读的习惯，使读书真正成为自己的兴趣爱好。阅读有许多好处，它能丰富你的知识，让你找到解决问题的办法；同时，它还会丰富你的情感，使你的生活更精彩。所以，让阅读成为你的习惯吧！" }
        ],

        vocab: [
            ["根据", "gēnjù", "[Căn Cứ]", "prep / v", "Căn cứ; theo", { ex: "根据调查，我们发现了问题。", py: "Gēnjù diàochá, wǒmen fāxiàn le wèntí.", vi: "→ Căn cứ; theo", use: "根据 + danh từ, nêu căn cứ." }],
            ["调查", "diàochá", "[Điều Tra]", "v / n", "Điều tra, khảo sát", { ex: "公司正在调查这个问题。", py: "Gōngsī zhèngzài diàochá zhège wèntí.", vi: "→ Điều tra, khảo sát", use: "调查 + vấn đề/đối tượng." }],
            ["阅读能力", "yuèdú nénglì", "[Duyệt Độc Năng Lực]", "n", "Năng lực đọc hiểu", { ex: "他的阅读能力很强。", py: "Tā de yuèdú nénglì hěn qiáng.", vi: "→ Năng lực đọc hiểu", use: "Chỉ khả năng đọc hiểu." }],
            ["不但…而且…", "bùdàn…érqiě…", "[Bất Đãn…Nhi Thả…]", "cấu trúc", "Không những… mà còn…", { ex: "她不但会说中文，而且会说英语。", py: "Tā bùdàn huì shuō Zhōngwén, érqiě huì shuō Yīngyǔ.", vi: "→ Không những… mà còn…", use: "Liên kết hai ý tăng tiến." }],
            ["提高", "tígāo", "[Đề Cao]", "v", "Nâng cao", { ex: "多练习能提高水平。", py: "Duō liànxí néng tígāo shuǐpíng.", vi: "→ Nâng cao", use: "提高 + năng lực/trình độ." }],
            ["读书笔记", "dúshū bǐjì", "[Độc Thư Bút Ký]", "n", "Ghi chép khi đọc sách", { ex: "我每天写读书笔记。", py: "Wǒ měitiān xiě dúshū bǐjì.", vi: "→ Ghi chép khi đọc sách", use: "做/写读书笔记." }],
            ["主要内容", "zhǔyào nèiróng", "[Chủ Yếu Nội Dung]", "n", "Nội dung chính", { ex: "请说说文章的主要内容。", py: "Qǐng shuōshuo wénzhāng de zhǔyào nèiróng.", vi: "→ Nội dung chính", use: "主要 + danh từ." }],
            ["看法", "kànfa", "[Khán Pháp]", "n", "Quan điểm", { ex: "我有不同的看法。", py: "Wǒ yǒu bùtóng de kànfa.", vi: "→ Quan điểm", use: "对…有看法." }],
            ["判断", "pànduàn", "[Phán Đoán]", "v / n", "Phán đoán", { ex: "你要自己判断。", py: "Nǐ yào zìjǐ pànduàn.", vi: "→ Phán đoán", use: "自己判断 / 作出判断." }],
            ["坚持", "jiānchí", "[Kiên Trì]", "v", "Kiên trì", { ex: "请坚持每天阅读。", py: "Qǐng jiānchí měitiān yuèdú.", vi: "→ Kiên trì", use: "坚持 + động từ." }],
            ["虽然…但是…", "suīrán…dànshì…", "[Tuy Nhiên…Đãn Thị…]", "cấu trúc", "Tuy… nhưng…", { ex: "虽然很忙，但是他还在学习。", py: "Suīrán hěn máng, dànshì tā hái zài xuéxí.", vi: "→ Tuy… nhưng…", use: "Biểu thị chuyển ý." }],
            ["顺序", "shùnxù", "[Thuận Tự]", "n", "Thứ tự", { ex: "请按顺序回答问题。", py: "Qǐng àn shùnxù huídá wèntí.", vi: "→ Thứ tự", use: "按顺序 = theo thứ tự." }],
            ["首先", "shǒuxiān", "[Thủ Tiên]", "adv", "Trước hết", { ex: "首先，我们看看原因。", py: "Shǒuxiān, wǒmen kànkan yuányīn.", vi: "→ Trước hết", use: "Đi với 其次、最后." }],
            ["其次", "qícì", "[Kỳ Thứ]", "adv", "Thứ hai", { ex: "其次，要注意安全。", py: "Qícì, yào zhùyì ānquán.", vi: "→ Thứ hai", use: "Liệt kê ý thứ hai." }],
            ["有限", "yǒuxiàn", "[Hữu Hạn]", "a", "Có hạn", { ex: "时间是有限的。", py: "Shíjiān shì yǒuxiàn de.", vi: "→ Có hạn", use: "有限的 + danh từ." }],
            ["养成", "yǎngchéng", "[Dưỡng Thành]", "v", "Hình thành", { ex: "要养成好习惯。", py: "Yào yǎngchéng hǎo xíguàn.", vi: "→ Hình thành", use: "养成 + thói quen." }],
            ["兴趣爱好", "xìngqù àihào", "[Hứng Thú Ái Hảo]", "n", "Sở thích", { ex: "阅读是我的兴趣爱好。", py: "Yuèdú shì wǒ de xìngqù àihào.", vi: "→ Sở thích", use: "Sở thích cá nhân." }],
            ["丰富", "fēngfù", "[Phong Phú]", "v / a", "Làm phong phú", { ex: "旅行能丰富生活。", py: "Lǚxíng néng fēngfù shēnghuó.", vi: "→ Làm phong phú", use: "丰富 + kiến thức/cuộc sống." }],
            ["精彩", "jīngcǎi", "[Tinh Thái]", "a", "Đặc sắc", { ex: "比赛非常精彩。", py: "Bǐsài fēicháng jīngcǎi.", vi: "→ Đặc sắc", use: "很/非常精彩." }]
        ]
    },

    12: {
        title: "说话的艺术与学习方法",
        listTitle: "用心发现世界",

        readings: [
            { no: 4, text: "人人都会使用语言，但是怎么用语言把话说好却是一门艺术。看一个人怎么说话，往往可以比较准确地判断出他是一个什么样的人。有的人心里怎么想，嘴上就怎么说，即使是别人的缺点，他也会直接说出来，这样的人虽然很诚实，但是可能会引起别人的误会；有的人虽然也看到了别人的缺点，但却不会直接指出来，而是通过别的方法来提醒，让他认识到自己的缺点，这样的人会让人觉得更友好。" },
            { no: 5, text: "无论做什么事情，都要注意方法，学习尤其是这样。使用正确的方法，我们做起事来能事半功倍，也就是说，能节约时间，用较少的力气，取得更好的效果。相反，如果方法不对，可能花五倍甚至十倍的时间都不能完成任务，结果变成了事倍功半。有一点需要提醒大家，别人的方法也许很有效，但是并不一定适合自己。因此，我们应该在听取别人意见的同时，仔细考虑一下，再根据不同的情况选择不同的方法，这样才能达到最好的效果。" }
        ],

        vocab: [
            ["使用", "shǐyòng", "[Sử Dụng]", "v", "Sử dụng", { ex: "请正确使用这个方法。", py: "Qǐng zhèngquè shǐyòng zhège fāngfǎ.", vi: "→ Sử dụng", use: "使用 + công cụ/phương pháp." }],
            ["语言", "yǔyán", "[Ngữ Ngôn]", "n", "Ngôn ngữ", { ex: "语言是交流的工具。", py: "Yǔyán shì jiāoliú de gōngjù.", vi: "→ Ngôn ngữ", use: "Chỉ ngôn ngữ nói hoặc viết." }],
            ["艺术", "yìshù", "[Nghệ Thuật]", "n", "Nghệ thuật", { ex: "说话也是一门艺术。", py: "Shuōhuà yě shì yì mén yìshù.", vi: "→ Nghệ thuật", use: "一门艺术 = một loại nghệ thuật." }],
            ["往往", "wǎngwǎng", "[Vãng Vãng]", "adv", "Thường thường", { ex: "他往往很早起床。", py: "Tā wǎngwǎng hěn zǎo qǐchuáng.", vi: "→ Thường thường", use: "Chỉ việc thường xảy ra." }],
            ["准确", "zhǔnquè", "[Chuẩn Xác]", "a", "Chính xác", { ex: "这个答案很准确。", py: "Zhège dá'àn hěn zhǔnquè.", vi: "→ Chính xác", use: "准确地 + động từ." }],
            ["判断", "pànduàn", "[Phán Đoán]", "v / n", "Phán đoán", { ex: "你要自己判断。", py: "Nǐ yào zìjǐ pànduàn.", vi: "→ Phán đoán", use: "判断 + sự việc." }],
            ["缺点", "quēdiǎn", "[Khuyết Điểm]", "n", "Khuyết điểm", { ex: "每个人都有缺点。", py: "Měi ge rén dōu yǒu quēdiǎn.", vi: "→ Khuyết điểm", use: "Ưu điểm/khuyết điểm: 优点/缺点." }],
            ["直接", "zhíjiē", "[Trực Tiếp]", "adv / a", "Trực tiếp", { ex: "请直接告诉我。", py: "Qǐng zhíjiē gàosu wǒ.", vi: "→ Trực tiếp", use: "直接 + động từ." }],
            ["诚实", "chéngshí", "[Thành Thực]", "a", "Thành thật", { ex: "他是个诚实的人。", py: "Tā shì ge chéngshí de rén.", vi: "→ Thành thật", use: "诚实的 + danh từ." }],
            ["引起", "yǐnqǐ", "[Dẫn Khởi]", "v", "Gây ra", { ex: "这件事引起了误会。", py: "Zhè jiàn shì yǐnqǐ le wùhuì.", vi: "→ Gây ra", use: "引起 + kết quả/phản ứng." }],
            ["误会", "wùhuì", "[Ngộ Hội]", "n / v", "Hiểu lầm", { ex: "请别误会我的意思。", py: "Qǐng bié wùhuì wǒ de yìsi.", vi: "→ Hiểu lầm", use: "产生误会 / 误会某人." }],
            ["指出", "zhǐchū", "[Chỉ Xuất]", "v", "Chỉ ra", { ex: "老师指出了我的问题。", py: "Lǎoshī zhǐchū le wǒ de wèntí.", vi: "→ Chỉ ra", use: "指出 + vấn đề/lỗi." }],
            ["通过", "tōngguò", "[Thông Qua]", "prep / v", "Thông qua", { ex: "我们通过练习提高水平。", py: "Wǒmen tōngguò liànxí tígāo shuǐpíng.", vi: "→ Thông qua", use: "通过 + cách thức." }],
            ["提醒", "tíxǐng", "[Đề Tỉnh]", "v", "Nhắc nhở", { ex: "请提醒我明天开会。", py: "Qǐng tíxǐng wǒ míngtiān kāihuì.", vi: "→ Nhắc nhở", use: "提醒 + người + việc." }],
            ["友好", "yǒuhǎo", "[Hữu Hảo]", "a", "Thân thiện", { ex: "大家对我很友好。", py: "Dàjiā duì wǒ hěn yǒuhǎo.", vi: "→ Thân thiện", use: "对…友好." }],
            ["无论", "wúlùn", "[Vô Luận]", "conj", "Bất luận", { ex: "无论多忙，我都学习。", py: "Wúlùn duō máng, wǒ dōu xuéxí.", vi: "→ Bất luận", use: "无论…都…" }],
            ["尤其", "yóuqí", "[Vưu Kỳ]", "adv", "Đặc biệt là", { ex: "我尤其喜欢中文。", py: "Wǒ yóuqí xǐhuan Zhōngwén.", vi: "→ Đặc biệt là", use: "尤其 + động từ/tính từ." }],
            ["正确", "zhèngquè", "[Chính Xác]", "a", "Đúng đắn", { ex: "这是正确的方法。", py: "Zhè shì zhèngquè de fāngfǎ.", vi: "→ Đúng đắn", use: "正确的 + danh từ." }],
            ["事半功倍", "shìbàn gōngbèi", "[Sự Bán Công Bội]", "thành ngữ", "Ít công nhiều hiệu quả", { ex: "用对方法能事半功倍。", py: "Yòng duì fāngfǎ néng shìbàn gōngbèi.", vi: "→ Ít công nhiều hiệu quả", use: "Dùng khi hiệu quả cao." }],
            ["节约", "jiéyuē", "[Tiết Ước]", "v", "Tiết kiệm", { ex: "我们要节约时间。", py: "Wǒmen yào jiéyuē shíjiān.", vi: "→ Tiết kiệm", use: "节约 + thời gian/tài nguyên." }],
            ["取得", "qǔdé", "[Thủ Đắc]", "v", "Đạt được", { ex: "他取得了好成绩。", py: "Tā qǔdé le hǎo chéngjì.", vi: "→ Đạt được", use: "取得 + thành tích/kết quả." }],
            ["效果", "xiàoguǒ", "[Hiệu Quả]", "n", "Hiệu quả", { ex: "这个办法效果很好。", py: "Zhège bànfǎ xiàoguǒ hěn hǎo.", vi: "→ Hiệu quả", use: "效果好/不好." }],
            ["相反", "xiāngfǎn", "[Tương Phản]", "adv", "Ngược lại", { ex: "相反，他不喜欢。", py: "Xiāngfǎn, tā bù xǐhuan.", vi: "→ Ngược lại", use: "Dùng để nêu ý trái ngược." }],
            ["事倍功半", "shìbèi gōngbàn", "[Sự Bội Công Bán]", "thành ngữ", "Nhiều công ít hiệu quả", { ex: "方法不对会事倍功半。", py: "Fāngfǎ bú duì huì shìbèi gōngbàn.", vi: "→ Nhiều công ít hiệu quả", use: "Trái nghĩa với 事半功倍." }],
            ["有效", "yǒuxiào", "[Hữu Hiệu]", "a", "Có hiệu quả", { ex: "这个方法很有效。", py: "Zhège fāngfǎ hěn yǒuxiào.", vi: "→ Có hiệu quả", use: "有效的 + danh từ." }],
            ["适合", "shìhé", "[Thích Hợp]", "v", "Phù hợp", { ex: "这份工作很适合你。", py: "Zhè fèn gōngzuò hěn shìhé nǐ.", vi: "→ Phù hợp", use: "适合 + người/hoàn cảnh." }],
            ["听取", "tīngqǔ", "[Thính Thủ]", "v", "Lắng nghe, tiếp thu", { ex: "我们应该听取意见。", py: "Wǒmen yīnggāi tīngqǔ yìjiàn.", vi: "→ Lắng nghe, tiếp thu", use: "听取 + 意见/建议." }],
            ["仔细", "zǐxì", "[Tử Tế]", "adv / a", "Cẩn thận, kỹ lưỡng", { ex: "请仔细考虑一下。", py: "Qǐng zǐxì kǎolǜ yíxià.", vi: "→ Cẩn thận, kỹ lưỡng", use: "仔细 + động từ." }],
            ["根据", "gēnjù", "[Căn Cứ]", "prep / v", "Căn cứ, theo", { ex: "根据情况选择方法。", py: "Gēnjù qíngkuàng xuǎnzé fāngfǎ.", vi: "→ Căn cứ, theo", use: "根据 + danh từ." }],
            ["达到", "dádào", "[Đạt Đáo]", "v", "Đạt tới", { ex: "我们达到了目标。", py: "Wǒmen dádào le mùbiāo.", vi: "→ Đạt tới", use: "达到 + mục tiêu/tiêu chuẩn." }]
        ]
    },

    13: {
        title: "筷子与茶文化",
        listTitle: "喝着茶看京剧",

        readings: [
            { no: 4, text: "筷子在中国大约已经有3000多年的历史了。对外国人来说，使用筷子吃饭并不容易，所以，国外的一些中国餐厅在放筷子的纸袋上会提供使用筷子的详细说明。不过，如果你认为每个中国人都会正确使用筷子，那就错了。有人在互联网上专门进行过调查，结果发现每六个中国人中就有一个使用筷子的方法是错误的。如果你想正确使用筷子，那就好好练习吧。" },
            { no: 5, text: "茶在中国有几千年的历史，是中国最常见的饮料。最早的时候，茶只是被当作一种药，而不是饮料。后来，随着人们对茶的认识的加深，慢慢开始把它当作解渴的饮料，这才慢慢有了中国的茶文化。在中国，喝茶是一种十分普遍的生活习惯。对很多中国人来说，喝茶已成为他们生活中不可缺少的一部分。但是有的饮料虽然名字叫茶，却并不是真正的茶。比如广东省的人爱喝的凉茶，它的味道稍微有点儿苦，其实是一种用中药做成的饮料。" }
        ],

        vocab: [
            ["筷子", "kuàizi", "[Khoái Tử]", "n", "Đũa", { ex: "我正在学习筷子。", py: "Wǒ zhèngzài xuéxí kuàizi.", vi: "→ Tôi đang học về Đũa." }],
            ["历史", "lìshǐ", "[Lịch Sử]", "n", "Lịch sử", { ex: "我正在学习历史。", py: "Wǒ zhèngzài xuéxí lìshǐ.", vi: "→ Tôi đang học về Lịch sử." }],
            ["外国人", "wàiguó rén", "[Ngoại Quốc Nhân]", "n", "Người nước ngoài", { ex: "我正在学习外国人。", py: "Wǒ zhèngzài xuéxí wàiguó rén.", vi: "→ Tôi đang học về Người nước ngoài." }],
            ["详细", "xiángxì", "[Tường Tế]", "a", "Chi tiết", { ex: "我正在学习详细。", py: "Wǒ zhèngzài xuéxí xiángxì.", vi: "→ Tôi đang học về Chi tiết." }],
            ["说明", "shuōmíng", "[Thuyết Minh]", "n / v", "Hướng dẫn; giải thích", { ex: "我正在学习说明。", py: "Wǒ zhèngzài xuéxí shuōmíng.", vi: "→ Tôi đang học về Hướng dẫn; giải thích." }],
            ["正确", "zhèngquè", "[Chính Xác]", "a", "Đúng đắn", { ex: "我正在学习正确。", py: "Wǒ zhèngzài xuéxí zhèngquè.", vi: "→ Tôi đang học về Đúng đắn." }],
            ["调查", "diàochá", "[Điều Tra]", "v / n", "Khảo sát", { ex: "我正在学习调查。", py: "Wǒ zhèngzài xuéxí diàochá.", vi: "→ Tôi đang học về Khảo sát." }],
            ["错误", "cuòwù", "[Thác Ngộ]", "n / a", "Sai lầm", { ex: "我正在学习错误。", py: "Wǒ zhèngzài xuéxí cuòwù.", vi: "→ Tôi đang học về Sai lầm." }],
            ["练习", "liànxí", "[Luyện Tập]", "v / n", "Luyện tập", { ex: "我正在学习练习。", py: "Wǒ zhèngzài xuéxí liànxí.", vi: "→ Tôi đang học về Luyện tập." }],
            ["饮料", "yǐnliào", "[Ẩm Liệu]", "n", "Đồ uống", { ex: "我正在学习饮料。", py: "Wǒ zhèngzài xuéxí yǐnliào.", vi: "→ Tôi đang học về Đồ uống." }],
            ["认识", "rènshi", "[Nhận Thức]", "v / n", "Nhận thức", { ex: "我正在学习认识。", py: "Wǒ zhèngzài xuéxí rènshi.", vi: "→ Tôi đang học về Nhận thức." }],
            ["解渴", "jiěkě", "[Giải Khát]", "v", "Giải khát", { ex: "我正在学习解渴。", py: "Wǒ zhèngzài xuéxí jiěkě.", vi: "→ Tôi đang học về Giải khát." }],
            ["茶文化", "chá wénhuà", "[Trà Văn Hóa]", "n", "Văn hóa trà", { ex: "我正在学习茶文化。", py: "Wǒ zhèngzài xuéxí chá wénhuà.", vi: "→ Tôi đang học về Văn hóa trà." }],
            ["普遍", "pǔbiàn", "[Phổ Biến]", "a", "Phổ biến", { ex: "我正在学习普遍。", py: "Wǒ zhèngzài xuéxí pǔbiàn.", vi: "→ Tôi đang học về Phổ biến." }],
            ["缺少", "quēshǎo", "[Khuyết Thiểu]", "v", "Thiếu", { ex: "我正在学习缺少。", py: "Wǒ zhèngzài xuéxí quēshǎo.", vi: "→ Tôi đang học về Thiếu." }],
            ["稍微", "shāowēi", "[Sảo Vi]", "adv", "Hơi, một chút", { ex: "我正在学习稍微。", py: "Wǒ zhèngzài xuéxí shāowēi.", vi: "→ Tôi đang học về Hơi, một chút." }],
            ["中药", "zhōngyào", "[Trung Dược]", "n", "Thuốc Đông y", { ex: "我正在学习中药。", py: "Wǒ zhèngzài xuéxí zhōngyào.", vi: "→ Tôi đang học về Thuốc Đông y." }]
        ]
    },

    14: {
        title: "保护环境",
        listTitle: "保护地球母亲",

        readings: [
            { no: 4, text: "塑料袋给人们的生活带来方便，受到人们的普遍欢迎，可是，它的大量使用也带来了严重的环境污染问题。于是，一些国家规定，超市、商场不能为顾客提供免费塑料袋，并且鼓励大家购买可以多次使用的购物袋。我们每个人都有责任保护环境，因此，请大家节约使用塑料袋，或者购物时自备购物袋，甚至拒绝使用塑料袋。虽然这是一件很小的事，但这样做可以减少塑料袋的使用数量，对环境保护有很大的作用。" },
            { no: 5, text: "保护地球环境，并不是一件离我们很远、很难做到的事情。实际上，我们只需注意一下身边的小事就可以。例如，夏天把空调的温度开得高一些，出门时记得关空调和电脑，这样可以节约用电；少开车，多骑车或者乘坐地铁和公共汽车，这样能降低空气污染；还有养成把垃圾丢进垃圾桶的习惯什么的。这些是我们每个人都能够做到的小事，但却有实实在在的效果。地球是我们共同的家，只有大家共同努力，减少污染、保护环境，才能使我们的家变得更美丽。" }
        ],

        vocab: [
            ["塑料袋", "sùliào dài", "[Tố Liệu Đại]", "n", "Túi nhựa", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["方便", "fāngbiàn", "[Phương Tiện]", "n / a", "Tiện lợi", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["普遍", "pǔbiàn", "[Phổ Biến]", "a", "Phổ biến", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["大量", "dàliàng", "[Đại Lượng]", "a", "Số lượng lớn", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["环境污染", "huánjìng wūrǎn", "[Hoàn Cảnh Ô Nhiễm]", "n", "Ô nhiễm môi trường", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["规定", "guīdìng", "[Quy Định]", "n / v", "Quy định", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["顾客", "gùkè", "[Cố Khách]", "n", "Khách hàng", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["免费", "miǎnfèi", "[Miễn Phí]", "a", "Miễn phí", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["鼓励", "gǔlì", "[Cổ Lệ]", "v", "Khuyến khích", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["购物袋", "gòuwù dài", "[Cấu Vật Đại]", "n", "Túi mua sắm", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["责任", "zérèn", "[Trách Nhiệm]", "n", "Trách nhiệm", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["节约", "jiéyuē", "[Tiết Ước]", "v", "Tiết kiệm", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["自备", "zìbèi", "[Tự Bị]", "v", "Tự mang theo", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["拒绝", "jùjué", "[Cự Tuyệt]", "v", "Từ chối", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["减少", "jiǎnshǎo", "[Giảm Thiểu]", "v", "Giảm bớt", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["地球", "dìqiú", "[Địa Cầu]", "n", "Trái Đất", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["空调", "kōngtiáo", "[Không Điều]", "n", "Điều hòa", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["用电", "yòngdiàn", "[Dụng Điện]", "v", "Dùng điện", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["骑车", "qíchē", "[Kỵ Xa]", "v", "Đi xe đạp", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["乘坐", "chéngzuò", "[Thừa Tọa]", "v", "Đi bằng", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["地铁", "dìtiě", "[Địa Thiết]", "n", "Tàu điện ngầm", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["降低", "jiàngdī", "[Giáng Đê]", "v", "Hạ thấp", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["垃圾桶", "lājītǒng", "[Lạp Cơ Thống]", "n", "Thùng rác", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["实实在在", "shíshízàizài", "[Thực Thực Tại Tại]", "a", "Thiết thực", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }],
            ["共同", "gòngtóng", "[Cộng Đồng]", "adv / a", "Cùng nhau", { ex: "我们要保护环境。", py: "Wǒmen yào bǎohù huánjìng.", vi: "→ Chúng ta phải bảo vệ môi trường." }]
        ]
    },

    15: {
        title: "儿童教育",
        listTitle: "教育孩子的艺术",

        readings: [
            { no: 4, text: "有的孩子在得不到自己想要的东西的时候，会通过哭、扔东西或者故意敲打来引起父母的注意。在这种情况下，建议父母先不要生气，应该停下手中的事情，陪孩子整理整理东西，和他们聊聊天儿，弄清楚他们的问题。父母的关心，可以让孩子心情愉快起来。教育孩子应该选择合适的教育方法，最好不要为了解决问题而骗孩子，这是因为儿童缺少判断能力，看到父母骗人，他们也会学着说假话。" },
            { no: 5, text: "七岁左右的儿童普遍好动，坐不住，所以老师在教这个年龄段的孩子时，一定要想办法引起他们的兴趣。只有让他们觉得你教的内容有趣，他们才会愿意努力学习。当孩子不明白时，应该多鼓励他，不要用懒、笨、粗心这种词批评他，这样对他们的正常发展不好。而且，对不同性格的孩子要使用不同的教育方法。如果孩子比较骄傲，应该让他明白还有很多知识需要学习；要是孩子性格有些害羞，就要经常鼓励他说出自己的看法，这样才能让每一个孩子都健康地发展。" }
        ],

        vocab: [
            ["得到", "dédào", "[Đắc Đáo]", "v", "Có được", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["通过", "tōngguò", "[Thông Qua]", "prep / v", "Thông qua", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["故意", "gùyì", "[Cố Ý]", "adv", "Cố ý", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["引起", "yǐnqǐ", "[Dẫn Khởi]", "v", "Gây ra", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["父母", "fùmǔ", "[Phụ Mẫu]", "n", "Bố mẹ", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["建议", "jiànyì", "[Kiến Nghị]", "n / v", "Đề nghị", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["整理", "zhěnglǐ", "[Chỉnh Lý]", "v", "Sắp xếp", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["弄清楚", "nòng qīngchu", "[Lộng Thanh Sở]", "v", "Làm rõ", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["关心", "guānxīn", "[Quan Tâm]", "v", "Quan tâm", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["愉快", "yúkuài", "[Du Khoái]", "a", "Vui vẻ", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["合适", "héshì", "[Hợp Thích]", "a", "Phù hợp", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["骗", "piàn", "[Phiến]", "v", "Lừa", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["判断能力", "pànduàn nénglì", "[Phán Đoán Năng Lực]", "n", "Khả năng phán đoán", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["假话", "jiǎhuà", "[Giả Thoại]", "n", "Lời nói dối", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["普遍", "pǔbiàn", "[Phổ Biến]", "a", "Phổ biến", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["好动", "hàodòng", "[Hiếu Động]", "a", "Hiếu động", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["年龄段", "niánlíngduàn", "[Niên Linh Đoạn]", "n", "Độ tuổi", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["兴趣", "xìngqù", "[Hứng Thú]", "n", "Hứng thú", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["鼓励", "gǔlì", "[Cổ Lệ]", "v", "Khích lệ", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["批评", "pīpíng", "[Phê Bình]", "v", "Phê bình", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["发展", "fāzhǎn", "[Phát Triển]", "v / n", "Phát triển", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["性格", "xìnggé", "[Tính Cách]", "n", "Tính cách", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["骄傲", "jiāo'ào", "[Kiêu Ngạo]", "a", "Kiêu ngạo", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["害羞", "hàixiū", "[Hại Tu]", "a", "Ngại ngùng", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }],
            ["看法", "kànfa", "[Khán Pháp]", "n", "Quan điểm", { ex: "我们应该关心孩子。", py: "Wǒmen yīnggāi guānxīn háizi.", vi: "→ Chúng ta nên quan tâm trẻ em." }]
        ]
    },

    16: {
        title: "从现在做起与保持谦虚",
        listTitle: "生活可以更美好",

        readings: [
            { no: 4, text: "有些同学经常把明天和将来挂在嘴边，常说作业明天再完成，下次考试一定好好儿复习，等等。这种态度会浪费时间，不但会让到最后什么事情都做不成，而且还得不到别人的同情。所以不要把什么事情都推到明天，一切从现在做起。就拿学汉语来说吧，首先要注意课前预习，找出第二天要学习的重点；其次，上课时要认真听，不能马虎；最后，课后要记得复习。只要这样，汉语就能越学越好，越说越自信。" },
            { no: 5, text: "当你认为自己在哪方面很优秀时，千万要冷静，不要骄傲。因为这个世界很大，天外有天，人外有人，很可能有人在这方面比你更厉害。你现在是第一，并不表示你永远都是第一。就像比赛一样，没有人会永远输，也没有人会一直赢。我们知道的越多，就会发现自己不懂的也越多。我们应该重视平时的积累，多向周围的人学习。如果你敢诚实地说出自己对哪方面不了解，并不说明自己比别人差，相反，这样做更能得到别人的尊重。" }
        ],

        vocab: [
            ["将来", "jiānglái", "[Tương Lai]", "n", "Tương lai", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["态度", "tàidu", "[Thái Độ]", "n", "Thái độ", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["浪费", "làngfèi", "[Lãng Phí]", "v", "Lãng phí", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["同情", "tóngqíng", "[Đồng Tình]", "v / n", "Đồng cảm", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["推到", "tuīdào", "[Thôi Đáo]", "v", "Đẩy đến", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["预习", "yùxí", "[Dự Tập]", "v", "Chuẩn bị bài", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["重点", "zhòngdiǎn", "[Trọng Điểm]", "n", "Trọng điểm", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["认真", "rènzhēn", "[Nhận Chân]", "a", "Nghiêm túc", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["马虎", "mǎhu", "[Mã Hổ]", "a", "Cẩu thả", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["复习", "fùxí", "[Phục Tập]", "v", "Ôn tập", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["自信", "zìxìn", "[Tự Tín]", "a / n", "Tự tin", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["优秀", "yōuxiù", "[Ưu Tú]", "a", "Xuất sắc", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["冷静", "lěngjìng", "[Lãnh Tĩnh]", "a", "Bình tĩnh", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["骄傲", "jiāo'ào", "[Kiêu Ngạo]", "a", "Kiêu ngạo", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["厉害", "lìhai", "[Lợi Hại]", "a", "Giỏi, lợi hại", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["表示", "biǎoshì", "[Biểu Thị]", "v", "Biểu thị", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["积累", "jīlěi", "[Tích Lũy]", "v / n", "Tích lũy", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["周围", "zhōuwéi", "[Chu Vi]", "n", "Xung quanh", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["诚实", "chéngshí", "[Thành Thực]", "a", "Thành thật", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["相反", "xiāngfǎn", "[Tương Phản]", "adv", "Ngược lại", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }],
            ["尊重", "zūnzhòng", "[Tôn Trọng]", "v", "Tôn trọng", { ex: "我们要认真学习。", py: "Wǒmen yào rènzhēn xuéxí.", vi: "→ Chúng ta phải học nghiêm túc." }]
        ]
    },

    17: {
        title: "植物竞争与海底世界",
        listTitle: "人与自然",

        readings: [
            { no: 4, text: "不仅社会上的人与人之间有竞争，森林里的各种植物之间也有竞争，这一点儿也不奇怪。植物会为了阳光、空气和水而竞争。一些高大的植物往往能获得更多的阳光、空气和水，而剩下的一些比较低矮的植物就只能长在这些高大植物的下面。由于气候条件不同，世界各地植物叶子的样子也很不相同。在暖和、水分比较多的地方，叶子往往长得又大又厚；在阳光特别厉害、水分少的地方，叶子就会长得又细又长。" },
            { no: 5, text: "地球上大约71%的地方是蓝色的海洋，在美丽的海底世界里，生活着各种各样的植物和动物。我们小时候都听过美人鱼的故事，其实真正的海底世界比故事里写的更美。科学研究发现，海洋底部看上去非常安静，然而却不是一点儿声音也没有，海底的动物们一直在说话，只不过人的耳朵是听不到的。另外，就算在几公里深的海底也仍然能看到东西，许多鱼会发出各种颜色的亮光，像一个个排列起来的灯，美极了，就像在梦里一样。" }
        ],

        vocab: [
            ["不仅…也…", "bùjǐn…yě…", "[Bất Cận…Dã…]", "cấu trúc", "Không chỉ… cũng…", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["竞争", "jìngzhēng", "[Cạnh Tranh]", "v / n", "Cạnh tranh", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["植物", "zhíwù", "[Thực Vật]", "n", "Thực vật", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["森林", "sēnlín", "[Sâm Lâm]", "n", "Rừng", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["阳光", "yángguāng", "[Dương Quang]", "n", "Ánh nắng", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["获得", "huòdé", "[Hoạch Đắc]", "v", "Có được", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["低矮", "dī'ǎi", "[Đê Ải]", "a", "Thấp bé", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["由于", "yóuyú", "[Do Vu]", "conj", "Do bởi", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["气候", "qìhòu", "[Khí Hậu]", "n", "Khí hậu", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["条件", "tiáojiàn", "[Điều Kiện]", "n", "Điều kiện", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["暖和", "nuǎnhuo", "[Noãn Hòa]", "a", "Ấm áp", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["水分", "shuǐfèn", "[Thủy Phận]", "n", "Độ ẩm", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["海洋", "hǎiyáng", "[Hải Dương]", "n", "Đại dương", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["海底", "hǎidǐ", "[Hải Để]", "n", "Đáy biển", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["各种各样", "gèzhǒng gèyàng", "[Các Chủng Các Dạng]", "a", "Đủ loại", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["美人鱼", "měirényú", "[Mỹ Nhân Ngư]", "n", "Nàng tiên cá", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["科学研究", "kēxué yánjiū", "[Khoa Học Nghiên Cứu]", "n", "Nghiên cứu khoa học", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["安静", "ānjìng", "[An Tĩnh]", "a", "Yên tĩnh", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["耳朵", "ěrduo", "[Nhĩ Đóa]", "n", "Tai", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["仍然", "réngrán", "[Nhưng Nhiên]", "adv", "Vẫn", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["亮光", "liàngguāng", "[Lượng Quang]", "n", "Ánh sáng", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }],
            ["排列", "páiliè", "[Bài Liệt]", "v", "Xếp thành hàng", { ex: "海底世界非常美丽。", py: "Hǎidǐ shìjiè fēicháng měilì.", vi: "→ Thế giới dưới đáy biển rất đẹp." }]
        ]
    },

    18: {
        title: "手机与科技发展",
        listTitle: "科技异世界",

        readings: [
            { no: 4, text: "现在手机不但价格降低了，而且作用也越来越大，打电话、发短信已经成了人们普遍使用的联系方法。除此以外，你还可以用它来听音乐、看电影、阅读、玩儿游戏、付款购物等，这大大方便了人们的生活。举一个例子，迷路时，只要用手机地图查一下地址，马上就能知道怎么去那个地点。现在的手机更像是一部可以拿在手中的电脑，现代人的生活已经越来越离不开手机了。" },
            { no: 5, text: "21世纪，我们的生活发生了巨大变化。几千公里以外的国家，以前坐船需要几个月，现在乘坐飞机不过十几个小时。原来寄信需要好几天，现在连邮局都不用去，只要在家里上网发个电子邮件，用不了一分钟，远处的朋友就能收到，比写信封用的时间都短。以前外地的新闻要几天后才能知道，现在只要打开网站，任何信息都可以在第一时间获得。现代科学技术的发展让世界变得越来越小，所以现在人们都把地球叫作地球村。" }
        ],

        vocab: [
            ["手机", "shǒujī", "[Thủ Cơ]", "n", "Điện thoại", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["价格", "jiàgé", "[Giá Cách]", "n", "Giá cả", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["降低", "jiàngdī", "[Giáng Đê]", "v", "Giảm xuống", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["作用", "zuòyòng", "[Tác Dụng]", "n", "Tác dụng", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["发短信", "fā duǎnxìn", "[Phát Đoản Tín]", "v", "Gửi tin nhắn", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["普遍", "pǔbiàn", "[Phổ Biến]", "a", "Phổ biến", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["联系", "liánxì", "[Liên Hệ]", "v", "Liên lạc", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["付款", "fùkuǎn", "[Phó Khoản]", "v", "Thanh toán", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["购物", "gòuwù", "[Cấu Vật]", "v", "Mua sắm", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["迷路", "mílù", "[Mê Lộ]", "v", "Lạc đường", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["地址", "dìzhǐ", "[Địa Chỉ]", "n", "Địa chỉ", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["地点", "dìdiǎn", "[Địa Điểm]", "n", "Địa điểm", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["电脑", "diànnǎo", "[Điện Não]", "n", "Máy tính", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["世纪", "shìjì", "[Thế Kỷ]", "n", "Thế kỷ", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["巨大", "jùdà", "[Cự Đại]", "a", "To lớn", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["变化", "biànhuà", "[Biến Hóa]", "n / v", "Thay đổi", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["乘坐", "chéngzuò", "[Thừa Tọa]", "v", "Đi bằng", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["寄信", "jì xìn", "[Ký Tín]", "v", "Gửi thư", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["邮局", "yóujú", "[Bưu Cục]", "n", "Bưu điện", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["电子邮件", "diànzǐ yóujiàn", "[Điện Tử Bưu Kiện]", "n", "Email", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["信封", "xìnfēng", "[Tín Phong]", "n", "Phong bì", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["网站", "wǎngzhàn", "[Võng Trạm]", "n", "Trang web", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["信息", "xìnxī", "[Tín Tức]", "n", "Thông tin", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["获得", "huòdé", "[Hoạch Đắc]", "v", "Nhận được", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["科学技术", "kēxué jìshù", "[Khoa Học Kỹ Thuật]", "n", "Khoa học kỹ thuật", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }],
            ["地球村", "dìqiú cūn", "[Địa Cầu Thôn]", "n", "Làng toàn cầu", { ex: "手机方便了我们的生活。", py: "Shǒujī fāngbiàn le wǒmen de shēnghuó.", vi: "→ Điện thoại làm cuộc sống của chúng ta thuận tiện hơn." }]
        ]
    },

    19: {
        title: "租房与运动",
        listTitle: "生活的味道",

        readings: [
            { no: 4, text: "马克去年租的房子离马路很近，对面有大大小小的商店，周围环境非常吵。所以，房子还没到期，马克就开始着急换房子了。有一天，他在小区门口看到一个租房子的广告。广告上说房子交通方便，周围很安静，厨房很大。总的来说，这套房子他很满意，于是他就记下了房东的手机号码。可回家后打电话，电话总是占线。第二天，他路过小区门口时，又仔细看了一下广告，原来在记号码的时候写错了一个数字。" },
            { no: 5, text: "很多外国人认为所有中国人都会功夫和乒乓球，其实只是喜爱这两项运动的中国人比较多。中国人特别喜欢打乒乓球，在中国你会发现到处都有乒乓球桌。像乒乓球、羽毛球、跑步等运动对条件要求不高，所以它们都成为人们运动不错的选择。人们常说生命在于运动，所以很多人一到周末就会到体育馆打几场球。乒乓球这个名字也很有意思，乒和乓就是打球时发出的声音。在看乒乓球比赛时，尤其是在运动员发球的时候，观众要安静，禁止大声讲话或者离开座位随便走动。" }
        ],

        vocab: [
            ["租房子", "zū fángzi", "[Tô Phòng Tử]", "v", "Thuê nhà", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["周围", "zhōuwéi", "[Chu Vi]", "n", "Xung quanh", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["环境", "huánjìng", "[Hoàn Cảnh]", "n", "Môi trường", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["到期", "dàoqī", "[Đáo Kỳ]", "v", "Đến hạn", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["广告", "guǎnggào", "[Quảng Cáo]", "n", "Quảng cáo", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["交通", "jiāotōng", "[Giao Thông]", "n", "Giao thông", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["满意", "mǎnyì", "[Mãn Ý]", "a", "Hài lòng", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["房东", "fángdōng", "[Phòng Đông]", "n", "Chủ nhà", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["占线", "zhànxiàn", "[Chiếm Tuyến]", "v", "Máy bận", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["数字", "shùzì", "[Số Tự]", "n", "Chữ số", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["功夫", "gōngfu", "[Công Phu]", "n", "Kungfu", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["乒乓球", "pīngpāngqiú", "[Ping Pang Cầu]", "n", "Bóng bàn", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["羽毛球", "yǔmáoqiú", "[Vũ Mao Cầu]", "n", "Cầu lông", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["条件", "tiáojiàn", "[Điều Kiện]", "n", "Điều kiện", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["体育馆", "tǐyùguǎn", "[Thể Dục Quán]", "n", "Nhà thi đấu", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["运动员", "yùndòngyuán", "[Vận Động Viên]", "n", "Vận động viên", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["观众", "guānzhòng", "[Quan Chúng]", "n", "Khán giả", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }],
            ["禁止", "jìnzhǐ", "[Cấm Chỉ]", "v", "Cấm", { ex: "我喜欢打乒乓球。", py: "Wǒ xǐhuan dǎ pīngpāngqiú.", vi: "→ Tôi thích chơi bóng bàn." }]
        ]
    },

    20: {
        title: "南北差异与旅行",
        listTitle: "路上的风景",

        readings: [
            { no: 4, text: "中国南北距离约5500公里，因此南北气候有很大区别。每年三四月份的时候，如果从北方坐火车到南方去旅游，一路上你会发现，不同的地方有不同的风景：窗外的树一棵一棵地变绿，北方也许还下着雪，南方却已经到处都是绿色了。南方菜很有特点，特别是汤，味道鲜美，很多北方人都喜欢喝。另外，南方和北方的语言也有很大不同。比如你跟上海人对话时，会发现上海话听起来就像外语一样。虽然上海人也会讲普通话，可是仔细听，还是有上海味儿。" },
            { no: 5, text: "一个人有时间一定要去旅行，旅行不仅能丰富一个人的经历，而且是很好的减压方法。但对我来说，最重要的是旅行能让我有机会尝到各地有名的小吃。放假的时候，我会收拾好行李，带上地图，买张火车票，向目的地出发。说起吃的东西，给我印象最深的是湖南菜。湖南菜的特点就是辣，与其他地方的辣不同，湖南菜的辣主要是咸辣、香辣和酸辣。虽然全国各地都有湖南饭馆儿，但最好还是直接去那里尝一尝。每次旅行结束后，我都会精神百倍地开始我的工作。" }
        ],

        vocab: [
            ["距离", "jùlí", "[Cự Ly]", "n", "Khoảng cách", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["气候", "qìhòu", "[Khí Hậu]", "n", "Khí hậu", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["区别", "qūbié", "[Khu Biệt]", "n", "Khác biệt", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["风景", "fēngjǐng", "[Phong Cảnh]", "n", "Phong cảnh", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["鲜美", "xiānměi", "[Tiên Mỹ]", "a", "Tươi ngon", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["语言", "yǔyán", "[Ngữ Ngôn]", "n", "Ngôn ngữ", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["对话", "duìhuà", "[Đối Thoại]", "v / n", "Đối thoại", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["普通话", "pǔtōnghuà", "[Phổ Thông Thoại]", "n", "Tiếng phổ thông", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["旅行", "lǚxíng", "[Lữ Hành]", "v / n", "Du lịch", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["丰富", "fēngfù", "[Phong Phú]", "v", "Làm phong phú", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["经历", "jīnglì", "[Kinh Lịch]", "n", "Trải nghiệm", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["减压", "jiǎnyā", "[Giảm Áp]", "v", "Giảm áp lực", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["小吃", "xiǎochī", "[Tiểu Ngật]", "n", "Đồ ăn vặt", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["行李", "xíngli", "[Hành Lý]", "n", "Hành lý", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["目的地", "mùdìdì", "[Mục Đích Địa]", "n", "Điểm đến", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["出发", "chūfā", "[Xuất Phát]", "v", "Xuất phát", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["印象", "yìnxiàng", "[Ấn Tượng]", "n", "Ấn tượng", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["特点", "tèdiǎn", "[Đặc Điểm]", "n", "Đặc điểm", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["尝一尝", "cháng yì cháng", "[Thường Nhất Thường]", "v", "Nếm thử", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }],
            ["精神百倍", "jīngshén bǎibèi", "[Tinh Thần Bách Bội]", "a", "Tràn đầy năng lượng", { ex: "旅行能丰富我们的经历。", py: "Lǚxíng néng fēngfù wǒmen de jīnglì.", vi: "→ Du lịch làm phong phú trải nghiệm của chúng ta." }]
        ]
    }

};
