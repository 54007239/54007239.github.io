/* 《问道长生》剧情数据 —— 第一章 · 凡尘问道 + 第二章 · 风起云涌 */
const GAME_DATA = {
  meta: {
    title: "问道长生",
    chapter: "第一章 · 凡尘问道"
  },
  initialAttrs: { 修为: 10, 心性: 5, 声望: 0, 机缘: 5, 杀戮: 0, 情缘: 0 },
  startEvent: "start",

  events: {
    /* ==================== 第一章 · 凡尘问道 ==================== */
    start: {
      title: "山村奇遇",
      scene: "清河县 · 小山村",
      text: "你本是山村放牛娃。这日黄昏，一位白发老者踏云而落，在你面前停下，掐指一算，眼中精光爆射：「竟是百年难遇的天灵根……娃娃，可愿随我修仙问道？」他自报家门——青云宗执事长老，道号玄尘子。",
      options: [
        { text: "纳头便拜，随老者上山", effects: { attr: { 心性: 2, 修为: 2 }, flags: ["青云候选"] }, next: "sect_entry" },
        { text: "婉拒：「我还想再看看这红尘」", effects: { attr: { 机缘: 2, 心性: 1 }, flags: ["红尘心"] }, next: "rogue_market" },
        { text: "假意应承，夜里偷看老者练气口诀", effects: { attr: { 修为: 3, 心性: -1 }, flags: ["偷学者"] }, next: "steal_path" }
      ]
    },

    sect_entry: {
      title: "山门考核",
      scene: "青云宗 · 山门前",
      text: "青云宗山门前，三千童子争渡。考核官冷淡宣布：「三日之内登上千级云梯者，方可入门。」你身边有人健步如飞，有人掏出灵丹贿赂执事。",
      options: [
        { text: "一步一个脚印，老实攀登", effects: { attr: { 心性: 3, 修为: 2 }, flags: ["勤勉"] }, next: "sect_master" },
        { text: "献出传家玉佩，请执事行个方便", effects: { attr: { 声望: 2, 心性: -2 }, flags: ["行贿"] }, next: "sect_master" },
        { text: "运转偷来的口诀，当众冲关震惊四座", cond: { flags: ["偷学者"] }, effects: { attr: { 修为: 4, 声望: 2, 杀戮: 1 }, flags: ["锋芒"] }, next: "sect_master" },
        { text: "运转粗浅功法，奋力冲关", cond: { notFlags: ["偷学者"] }, effects: { attr: { 修为: 3, 声望: 1 }, flags: ["锋芒"] }, next: "sect_master" }
      ]
    },

    sect_master: {
      title: "拜师入门",
      scene: "青云宗 · 外门",
      text: "云梯登顶，你被分入外门。玄尘子长老亲自来收徒，抚须打量你：「你天灵根之姿，他日必成大器。老夫收你为记名弟子。」他身旁立着一名清冷的少女，正静静望着你——那是你的师姐沈青萝，入门三年，已是外门公认的第一天才。",
      options: [
        { text: "恭敬下拜，从此尊师重道", effects: { attr: { 心性: 3, 声望: 1 }, flags: ["尊师", "同门情"] }, next: "sect_training" },
        { text: "嘴上应承，心里只当是往上爬的台阶", effects: { attr: { 心性: -1, 机缘: 1 }, flags: ["功利心"] }, next: "sect_training" },
        { text: "偷瞄师姐沈青萝，暗暗记住这个名字", effects: { attr: { 情缘: 1 }, flags: ["同门情"] }, next: "sect_training" }
      ]
    },

    sect_training: {
      title: "外门一年",
      scene: "青云宗 · 外门",
      text: "入门一年，你每日挑水劈柴、吐纳练气。师姐沈青萝总会在日落时分于后山练剑，你常在旁偷看。这日你无意间听到两位内门师兄密谈：后山禁地中藏着一株三百年血灵参，值守弟子每夜三更都会擅离岗位……",
      options: [
        { text: "不为所动，继续勤勉练气", effects: { attr: { 修为: 4, 心性: 2 } }, next: "fox_event" },
        { text: "巴结内门师兄，换取指点", effects: { attr: { 声望: 2, 修为: 1 }, flags: ["靠山"] }, next: "fox_event" },
        { text: "三更摸入禁地，盗取血灵参", effects: { attr: { 机缘: 3, 修为: 3, 杀戮: 1 }, flags: ["盗参"] }, next: "fox_event" },
        { text: "鼓起勇气，向师姐请教剑法", cond: { flags: ["同门情"] }, effects: { attr: { 情缘: 2, 修为: 2, 心性: 1 }, flags: ["青萝指点"] }, next: "fox_event" }
      ]
    },

    steal_path: {
      title: "东窗事发",
      scene: "小山村 · 后山",
      text: "你夜里躲在草垛后偷看口诀，不料老者早已察觉，拂尘一挥，你只觉天旋地转，已被定在原地。老者目光如电：「心术不正，本应废你根骨。念你年幼，给你一次机会。」",
      options: [
        { text: "跪地认错，痛改前非", effects: { attr: { 心性: 3 }, flags: ["青云候选"] }, next: "sect_entry" },
        { text: "趁老者不备，夺路而逃", effects: { attr: { 机缘: 1, 杀戮: 1 }, flags: ["逃亡者"] }, next: "rogue_market" },
        { text: "暴起偷袭，抢夺老者怀中功法玉简", effects: { attr: { 杀戮: 5, 心性: -3, 修为: 2 }, flags: ["弑师未遂", "魔种"] }, next: "demon_intro" }
      ]
    },

    rogue_market: {
      title: "坊市谋生",
      scene: "青石坊市",
      text: "坊市中人流如织，散修云集。你揣着仅有的几块碎灵石，站在路口：左边是正经功法摊，右边是喧嚣的赌石坊，前方镖局正在招募趟子手。",
      options: [
        { text: "买下《长春功》，正经修炼", effects: { attr: { 修为: 4, 机缘: -1, 心性: 1 }, flags: ["正道功法"] }, next: "rogue_cultivate" },
        { text: "赌石！一刀穷一刀富", effects: { attr: { 机缘: 3 }, flags: ["赌性"] }, next: "rogue_cultivate" },
        { text: "应募押镖，刀口舔血赚灵石", effects: { attr: { 声望: 2, 杀戮: 2, 修为: 1 }, flags: ["镖师"] }, next: "rogue_cultivate" }
      ]
    },

    rogue_cultivate: {
      title: "散修岁月",
      scene: "青石坊市 · 破庙",
      text: "三年散修生涯，风餐露宿。这日你在破庙打坐，忽然庙门外传来一个沙哑的声音：「小子，根骨不错。我血刀门正在广收门徒，入门即赐《血刀经》，杀人夺宝，快意恩仇——可有兴趣？」",
      options: [
        { text: "断然拒绝：「我修的是正道！」", effects: { attr: { 心性: 3 }, flags: ["血刀门记恨"] }, next: "fox_event" },
        { text: "虚与委蛇，先混进去看看", effects: { attr: { 机缘: 1, 心性: -1 }, flags: ["卧底"] }, next: "demon_mission" },
        { text: "欣然加入：「正合我意！」", effects: { attr: { 杀戮: 4, 心性: -2 }, flags: ["魔修"] }, next: "demon_mission" }
      ]
    },

    demon_intro: {
      title: "魔道之门",
      scene: "荒野 · 乱葬岗",
      text: "你夺简而逃，老者负伤叹息：「一念之差，堕入魔道……」当夜，一名黑袍人拦住你的去路，桀桀怪笑：「弑师夺宝，好胆色！我血刀门正缺你这样的狠人。」",
      options: [
        { text: "加入血刀门", effects: { attr: { 杀戮: 4 }, flags: ["魔修"] }, next: "demon_mission" },
        { text: "假意加入，暗中查明魔门底细", effects: { attr: { 心性: 1, 机缘: 1 }, flags: ["卧底"] }, next: "demon_mission" }
      ]
    },

    demon_mission: {
      title: "入门投名状",
      scene: "血刀门 · 分舵",
      text: "舵主扔给你一张画像：「此人是官府暗探，三日后路过黑风坳。杀了他，你便是我血刀门正式弟子。」画像上的男子面容忠厚，家中似乎还有妻小。",
      options: [
        { text: "提刀赴约，一击毙命", effects: { attr: { 杀戮: 5, 心性: -2, 声望: 1 }, flags: ["投名状"] }, next: "blood_test" },
        { text: "暗中放走暗探，伪造现场", effects: { attr: { 心性: 3 }, flags: ["违背门规", "救人"] }, next: "blood_test" },
        { text: "将情报密送青云宗", cond: { flags: ["卧底"] }, effects: { attr: { 声望: 3, 心性: 2 }, flags: ["双面谍"] }, next: "blood_test" }
      ]
    },

    blood_test: {
      title: "血池试炼",
      scene: "血刀门 · 血池",
      text: "血池翻涌，腥气冲天。舵主宣布：「入池者，活下来的就是核心弟子！」你望着池中哀嚎的前辈，忽然觉得这条路也许从一开始就错了——或者，对极了。",
      options: [
        { text: "纵身跃入血池", effects: { attr: { 杀戮: 4, 修为: 5, 心性: -2 }, flags: ["血池洗礼"] }, next: "final_prep" },
        { text: "趁夜逃离血刀门", cond: { flags: ["卧底"] }, effects: { attr: { 心性: 2, 声望: 2 }, flags: ["弃暗投明"] }, next: "final_prep" },
        { text: "趁夜逃离血刀门", cond: { notFlags: ["卧底"] }, effects: { attr: { 心性: 1 }, flags: ["血刀门追杀"] }, next: "final_prep" }
      ]
    },

    fox_event: {
      title: "月下白狐",
      scene: "山林 · 月夜",
      text: "月夜赶路，你忽闻草丛中传来呜咽。拨开一看，一只通体雪白的狐狸被捕兽夹所困，后腿鲜血淋漓。它望着你，眼中竟隐隐有泪光与人性化的哀求。",
      options: [
        { text: "为它疗伤，放归山林", effects: { attr: { 心性: 2, 情缘: 2 }, flags: ["狐妖之恩"] }, next: "market_conflict" },
        { text: "剥了狐皮，好歹换几块灵石", effects: { attr: { 杀戮: 3, 机缘: 1, 心性: -2 }, flags: ["狐族之仇"] }, next: "market_conflict" },
        { text: "视而不见，继续赶路", effects: { attr: { 心性: -1 } }, next: "market_conflict" }
      ]
    },

    market_conflict: {
      title: "黑虎帮之恶",
      scene: "青石坊市 · 街口",
      text: "坊市街口，黑虎帮修士正强抢一名老妪的摊位灵药，围观者敢怒不敢言。老妪哭喊着抱住了你的腿：「小仙长，求求您……」",
      options: [
        { text: "挺身而出，出手教训恶徒", effects: { attr: { 声望: 3, 杀戮: 2 }, flags: ["结怨黑虎帮"] }, next: [{ if: { flags: ["魔修"] }, go: "secret_realm" }, { if: { attr: { 修为: 18 } }, go: "secret_realm" }, { go: "final_prep" }] },
        { text: "掏出灵石替老妪解围", effects: { attr: { 心性: 2, 声望: 1 } }, next: [{ if: { attr: { 修为: 18 } }, go: "secret_realm" }, { go: "final_prep" }] },
        { text: "设局录下恶行，密报坊市执法队", effects: { attr: { 机缘: 2, 声望: 2 }, flags: ["智计"] }, next: [{ if: { attr: { 修为: 18 } }, go: "secret_realm" }, { go: "final_prep" }] }
      ]
    },

    secret_realm: {
      title: "秘境开启",
      scene: "苍澜秘境",
      text: "天现异象，三百年一开的苍澜秘境竟提前出世！入口光门仅维持一炷香。无数修士疯狂涌入，有人结伴，有人独行，更有人当场杀人夺宝。你深吸一口气——",
      options: [
        { text: "直闯核心区域，搏最大机缘", effects: { attr: { 机缘: 4, 修为: 3, 杀戮: 1 }, flags: ["秘境核心"] }, next: "final_prep" },
        { text: "外围捡漏，稳健发育", effects: { attr: { 机缘: 2, 心性: 1, 修为: 1 } }, next: "final_prep" },
        { text: "与同道结伴同行，互有照应", effects: { attr: { 情缘: 2, 声望: 1, 机缘: 1 }, flags: ["道友"] }, next: "final_prep" }
      ]
    },

    final_prep: {
      title: "筑基前夜",
      scene: "闭关洞府",
      text: "数年苦修，你终于触摸到炼气圆满的壁障。明日便是冲击筑基之日。洞府烛火摇曳，你最后一次检视自身——这一夜，你打算如何度过？",
      options: [
        { text: "闭关调息，稳固道基", effects: { attr: { 修为: 3, 心性: 1 } }, next: "chapter_end" },
        { text: "与红颜/知己彻夜论道", cond: { attr: { 情缘: 2 } }, effects: { attr: { 情缘: 2, 心性: 1 } }, next: "chapter_end" },
        { text: "向师父玄尘子叩别，聆听教诲", cond: { flags: ["尊师"] }, effects: { attr: { 心性: 3, 声望: 1 }, flags: ["师徒情深"] }, next: "chapter_end" },
        { text: "与师姐沈青萝同登后山，看一夜星", cond: { flags: ["青萝指点"] }, effects: { attr: { 情缘: 2, 心性: 1 }, flags: ["青萝情愫"] }, next: "chapter_end" },
        { text: "吞服禁药「燃血丹」强行冲关", effects: { attr: { 修为: 5, 杀戮: 2, 心性: -2 }, flags: ["燃血"] }, next: "chapter_end" }
      ]
    },

    chapter_end: {
      title: "天道一问",
      scene: "雷云之下",
      text: "筑基雷劫轰然落下！电光之中，你恍惚听见一个浩大的声音在问：「汝之道，为何？」——你的修仙之路，将由这一路走来的每一个选择作答。",
      options: [
        { text: "直面天劫，渡过筑基之劫", effects: {}, next: "__SETTLE_CH1__" }
      ]
    },

    /* ==================== 第二章 · 风起云涌 ==================== */
    ch2_start: {
      title: "筑基之后",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "洞府 · 雷劫之后",
      text: "雷云散尽，你内视丹田，道基已成。筑基修士寿元两百载，在凡俗眼中已是陆地神仙。但你清楚，仙路才真正开始。站在新的起点上，你决定——",
      options: [
        { text: "闭关三月，稳固道基再图进取", effects: { attr: { 修为: 2, 心性: 1 } }, next: [{ if: { flags: ["狐妖之恩"] }, go: "ch2_fox_grace" }, { if: { flags: ["狐族之仇"] }, go: "ch2_fox_revenge" }, { if: { flags: ["血刀门追杀"] }, go: "ch2_hunt" }, { if: { flags: ["盗参"] }, go: "ch2_investigate" }, { go: "ch2_sect_contest" }] },
        { text: "四处走动，打探这数年间天下大势", effects: { attr: { 机缘: 2 } }, next: [{ if: { flags: ["狐妖之恩"] }, go: "ch2_fox_grace" }, { if: { flags: ["狐族之仇"] }, go: "ch2_fox_revenge" }, { if: { flags: ["血刀门追杀"] }, go: "ch2_hunt" }, { if: { flags: ["盗参"] }, go: "ch2_investigate" }, { go: "ch2_sect_contest" }] },
        { text: "去寻那位一路相伴的红颜知己", cond: { attr: { 情缘: 3 } }, effects: { attr: { 情缘: 2 } }, next: [{ if: { flags: ["狐妖之恩"] }, go: "ch2_fox_grace" }, { if: { flags: ["狐族之仇"] }, go: "ch2_fox_revenge" }, { if: { flags: ["血刀门追杀"] }, go: "ch2_hunt" }, { go: "ch2_sect_contest" }] }
      ]
    },

    ch2_fox_grace: {
      title: "白狐报恩",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "山林 · 又是月夜",
      text: "月华如水，一道白影翩然而至。当年你救下的白狐已修成大道，化作一名白衣少女盈盈下拜：「恩公，青丘苏漓，特来还你一命之恩。」她眉间一点朱砂，眸光清亮，却藏着一丝不易察觉的落寞——原来她是青丘王族遗孤，因血统不纯而遭同族排挤，流落在外多年。",
      options: [
        { text: "欣然应允，结伴同行", effects: { attr: { 情缘: 3, 机缘: 2 }, flags: ["狐侣同行"] }, next: "ch2_fox_trial" },
        { text: "婉言谢绝：「举手之劳，不必挂怀」", effects: { attr: { 心性: 2, 机缘: 1 }, flags: ["婉拒苏漓"] }, next: "ch2_sect_contest" }
      ]
    },

    ch2_fox_trial: {
      title: "狐女心事",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "山林 · 又是月夜",
      text: "同行数日，苏漓渐渐敞开心扉。她自小被逐出青丘，人间冷暖尝尽，唯你当年那一把疗伤的草药，是她记得的唯一的温柔。这夜，她忽然停步：「恩公，青丘传来诏令，召我回去继位圣女。可若回去，只怕再也出不来了。」",
      options: [
        { text: "「随你的心，去留我都不强求」", effects: { attr: { 心性: 2, 情缘: 2 }, flags: ["苏漓抉择"] }, next: "ch2_sect_contest" },
        { text: "「留下吧，仙路漫漫，我陪你走」", effects: { attr: { 情缘: 3, 心性: 1 }, flags: ["苏漓抉择", "两心相许"] }, next: "ch2_sect_contest" },
        { text: "「回去继位，那才是你的前程」", effects: { attr: { 情缘: -1, 心性: 2 }, flags: ["苏漓抉择", "忍痛放手"] }, next: "ch2_sect_contest" }
      ]
    },

    ch2_fox_revenge: {
      title: "青丘索命",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "夜路 · 杀机",
      text: "夜宿荒庙，三道白影破门而入！为首狐妖目眦欲裂：「当年你剥我族妹之皮时，可曾想过今日？」狐爪寒光，直取咽喉——",
      options: [
        { text: "拔剑迎战，斩了这畜牲", effects: { attr: { 杀戮: 4, 修为: 2 }, flags: ["狐族死仇"] }, next: "ch2_sect_contest" },
        { text: "且战且退，逃入深山", effects: { attr: { 修为: -2, 机缘: 1 } }, next: "ch2_sect_contest" },
        { text: "弃剑跪地：「当年之错，愿以命偿」", effects: { attr: { 心性: 3, 杀戮: -1 }, flags: ["狐族和解"] }, next: "ch2_sect_contest" }
      ]
    },

    ch2_hunt: {
      title: "血色追杀令",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "官道 · 伏击",
      text: "血刀门的追杀令果然来了。五名血衣修士截断官道，为首者舔着刀锋：「叛徒，舵主有令——带回你的人头，赏中品灵石百块！」",
      options: [
        { text: "杀出血路，来一个斩一个", effects: { attr: { 杀戮: 4, 修为: 2 }, flags: ["血战成名"] }, next: "ch2_sect_contest" },
        { text: "且战且走，借坊市执法队之势脱身", effects: { attr: { 声望: 1, 机缘: 1 } }, next: "ch2_sect_contest" },
        { text: "设下圈套，反将杀手一网打尽", cond: { flags: ["智计"] }, effects: { attr: { 杀戮: 2, 机缘: 2, 声望: 1 }, flags: ["反杀"] }, next: "ch2_sect_contest" }
      ]
    },

    ch2_investigate: {
      title: "执法堂问话",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "青云宗 · 执法堂",
      text: "时隔数年，禁地血灵参失窃案再起波澜——有弟子供出当年曾见你三更出现在后山。执法长老拍案而起：「筑基了便想赖账？说！血灵参何处去了！」",
      options: [
        { text: "坦然认罪，愿以灵石加倍奉还", effects: { attr: { 声望: 2, 心性: 2 } }, next: "ch2_sect_contest" },
        { text: "矢口否认：「空口无凭！」", effects: { attr: { 杀戮: 1 }, flags: ["欺瞒宗门"] }, next: "ch2_sect_contest" },
        { text: "反咬死对头赵乾一口，祸水东引", effects: { attr: { 杀戮: 3, 心性: -3 }, flags: ["栽赃"] }, next: "ch2_sect_contest" }
      ]
    },

    ch2_sect_contest: {
      title: "大比风云",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "青云宗 · 演武场",
      text: "十年一度的宗门大比在即，胜者可得「金丹灵液」。然而大比前夜，执法堂突然从你丹房中搜出一册魔门功法！栽赃者正是你的劲敌——执法长老之侄赵乾。众目睽睽之下，唯有两个人站了出来：师父玄尘子挡在你身前，师姐沈青萝目光坚定地摇头：「他绝不会做这种事。」",
      options: [
        { text: "忍气吞声，自请面壁以证清白", effects: { attr: { 心性: 2, 声望: -1 }, flags: ["隐忍路线"] }, next: "ch2_cave" },
        { text: "当众对质：「敢问长老，搜魂术可敢一验？」", effects: { attr: { 声望: 3 }, flags: ["刚烈路线", "结怨长老"] }, next: "ch2_cave" },
        { text: "表面认罪，暗中搜集赵乾勾结魔门的铁证", effects: { attr: { 机缘: 2 }, flags: ["谋略路线", "赵乾罪证"] }, next: "ch2_cave" },
        { text: "请内门师兄出面斡旋", cond: { flags: ["靠山"] }, effects: { attr: { 声望: 1 }, flags: ["靠山出手"] }, next: "ch2_cave" },
        { text: "紧握师父的衣角，泪眼朦胧：「师父，您信我吗？」", cond: { flags: ["师徒情深"] }, effects: { attr: { 心性: 3, 情缘: 1 }, flags: ["师父护短"] }, next: "ch2_cave" }
      ]
    },

    ch2_cave: {
      title: "古修洞府",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "城外 · 崩山",
      text: "大比风波未平，城外忽然山崩地裂，露出一座上古修士的洞府！霞光冲天，各方修士蜂拥而至。传闻洞府深处藏着一卷《太玄真经》残页。",
      options: [
        { text: "独闯深处，直取真经", effects: { attr: { 机缘: 3, 修为: 3, 杀戮: 1 }, flags: ["古修传承"] }, next: "ch2_war" },
        { text: "与同门组队，稳扎稳打", effects: { attr: { 声望: 1, 情缘: 1, 机缘: 1 } }, next: "ch2_war" },
        { text: "将洞府消息卖给宗门，换取重赏", effects: { attr: { 声望: 2, 机缘: -1 } }, next: "ch2_war" },
        { text: "与苏漓携手探秘，心有灵犀", cond: { flags: ["狐侣同行"] }, effects: { attr: { 情缘: 3, 机缘: 3 }, flags: ["古修传承"] }, next: "ch2_war" }
      ]
    },

    ch2_war: {
      title: "魔焰滔天",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "青石坊市 · 火海",
      text: "是夜，血刀门勾结外魔夜袭青石坊市！火光冲天，凡民哭嚎，正道各宗驰援而至。这是数十年来最大的一场正魔之战，而你，就在战场中央。",
      options: [
        { text: "冲锋陷阵，斩魔卫道", effects: { attr: { 声望: 3, 杀戮: 3, 修为: 2 } }, next: "ch2_companion" },
        { text: "护送凡民撤离，救人第一", effects: { attr: { 心性: 3, 声望: 1 } }, next: "ch2_companion" },
        { text: "趁乱将魔门布防图送予正道盟", cond: { flags: ["双面谍"] }, effects: { attr: { 声望: 2, 机缘: 2 }, flags: ["大功"] }, next: "ch2_companion" },
        { text: "浑水摸鱼，大发战争财", effects: { attr: { 机缘: 3, 杀戮: 2, 心性: -2 }, flags: ["发战争财"] }, next: "ch2_companion" }
      ]
    },

    ch2_companion: {
      title: "道途之伴",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "战后 · 残阳如血",
      text: "大战落幕，坊市满目疮痍。残阳下，你忽然觉得这条仙路走得太久、太孤独。苏漓不知何时来到你身旁，递来一方沾血的手帕——方才乱战之中，她曾数次为你挡下魔修的暗箭。结丹在即，道心需要一处归所。",
      options: [
        { text: "与苏漓指月为誓，约定三生", cond: { flags: ["狐侣同行"] }, effects: { attr: { 情缘: 4 }, flags: ["仙侣"] }, next: "ch2_alchemy" },
        { text: "与秘境中结识的道友结为道侣", cond: { flags: ["道友"] }, effects: { attr: { 情缘: 3 }, flags: ["仙侣"] }, next: "ch2_alchemy" },
        { text: "回想师姐沈青萝当年后山看星的情意", cond: { flags: ["青萝情愫"] }, effects: { attr: { 情缘: 3, 心性: 1 }, flags: ["仙侣", "青萝之约"] }, next: "ch2_alchemy" },
        { text: "斩断情丝：「大道独行，何需伴侣」", effects: { attr: { 心性: 3, 情缘: -2 } }, next: "ch2_alchemy" },
        { text: "游戏红尘，及时行乐", effects: { attr: { 机缘: 1, 心性: -1 } }, next: "ch2_alchemy" }
      ]
    },

    ch2_alchemy: {
      title: "结丹之途",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "丹房 · 炉火",
      text: "筑基圆满，结丹之期指日可待。丹房内炉火正旺，但结丹之法各有其道——稳与险，正与邪，只在一念之间。",
      options: [
        { text: "按部就班，文火慢炼丹成上品", effects: { attr: { 修为: 3, 心性: 1 } }, next: "ch2_final_prep" },
        { text: "再服燃血丹，搏一个丹成极品", cond: { flags: ["燃血"] }, effects: { attr: { 修为: 4, 杀戮: 2, 心性: -2 }, flags: ["丹毒攻心"] }, next: "ch2_final_prep" },
        { text: "参悟古修洞府所得，走上古丹道", cond: { flags: ["古修传承"] }, effects: { attr: { 修为: 4, 机缘: 2 } }, next: "ch2_final_prep" },
        { text: "以杀证道，掠夺他人结丹灵药", effects: { attr: { 杀戮: 4, 修为: 3, 心性: -1 }, flags: ["魔道巨擘"] }, next: "ch2_final_prep" }
      ]
    },

    ch2_final_prep: {
      title: "金丹前夜",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "洞府 · 雷雨欲来",
      text: "天边已有雷云汇聚。金丹大劫，九死一生，比筑基雷劫凶险十倍。这一夜，是你此生最后的平静——",
      options: [
        { text: "静坐观心，迎接天劫", effects: { attr: { 心性: 2 } }, next: "ch2_end" },
        { text: "与道侣双修调息，阴阳相济", cond: { flags: ["仙侣"] }, effects: { attr: { 情缘: 2, 修为: 2 } }, next: "ch2_end" },
        { text: "祭炼本命法宝，以器御劫", effects: { attr: { 修为: 2, 声望: 1 } }, next: "ch2_end" }
      ]
    },

    ch2_end: {
      title: "金丹大劫",
      chapter: "第二章 · 风起云涌",
      realm: "筑基期",
      scene: "雷云中心",
      text: "九九八十一道雷劫接连劈落！你的道基、心性、这一路所有的善与恶，都将在雷光中被天道一一清算——",
      options: [
        { text: "直面天劫，凝结金丹", effects: {}, next: "__SETTLE_CH2__" }
      ]
    },

    /* ==================== 第三章 · 金丹问道 ==================== */
    ch3_start: {
      title: "金丹之后",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "洞府 · 丹成之日",
      text: "金丹大成，寿元五百载。你已跻身玄黄界一流强者之列。但站得越高，越能看清前路的迷雾——千年以来，竟无一人飞升。这背后究竟藏着什么？",
      options: [
        { text: "开坛讲道，广收门徒", effects: { attr: { 声望: 2 } }, next: [{ if: { flags: ["丹毒攻心"] }, go: "ch3_poison" }, { if: { flags: ["狐族死仇"] }, go: "ch3_foxwar" }, { if: { flags: ["魔道巨擘"] }, go: "ch3_demon" }, { if: { flags: ["赵乾罪证"] }, go: "ch3_zhao" }, { if: { flags: ["栽赃"] }, go: "ch3_zhao" }, { go: "ch3_faction" }] },
        { text: "云游四海，寻访海外仙山", effects: { attr: { 机缘: 2 } }, next: [{ if: { flags: ["丹毒攻心"] }, go: "ch3_poison" }, { if: { flags: ["狐族死仇"] }, go: "ch3_foxwar" }, { if: { flags: ["魔道巨擘"] }, go: "ch3_demon" }, { if: { flags: ["赵乾罪证"] }, go: "ch3_zhao" }, { if: { flags: ["栽赃"] }, go: "ch3_zhao" }, { go: "ch3_faction" }] },
        { text: "与道侣归隐双修，不问世事", cond: { flags: ["仙侣"] }, effects: { attr: { 情缘: 3, 心性: 1 } }, next: [{ if: { flags: ["丹毒攻心"] }, go: "ch3_poison" }, { if: { flags: ["狐族死仇"] }, go: "ch3_foxwar" }, { go: "ch3_faction" }] }
      ]
    },

    ch3_poison: {
      title: "丹毒攻心",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "洞府 · 月圆之夜",
      text: "月圆之夜，当年燃血丹埋下的丹毒终于爆发！心脉如万蚁噬咬，你疼得蜷缩在地——若再无解法，金丹都有溃散之危。",
      options: [
        { text: "远赴药王谷，低声下气求解药", effects: { attr: { 机缘: 2, 心性: 1 }, flags: ["丹毒得解"] }, next: "ch3_faction" },
        { text: "以毒攻毒，将丹毒炼入金丹为己用", effects: { attr: { 杀戮: 2, 修为: 4 }, flags: ["毒丹同体"] }, next: "ch3_faction" },
        { text: "强行压制，听天由命", effects: { attr: { 修为: -2, 心性: -2 } }, next: "ch3_faction" }
      ]
    },

    ch3_foxwar: {
      title: "青丘决战",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "青丘 · 狐族圣地",
      text: "狐族倾巢而出，在你洞府外布下九尾迷魂大阵。青丘大长老亲自压阵：「屠我族人者，血债血偿！」这一战，避无可避——或者，未必。",
      options: [
        { text: "杀上青丘，斩草除根", effects: { attr: { 杀戮: 6, 修为: 3 }, flags: ["屠狐"] }, next: "ch3_faction" },
        { text: "请正道盟出面调停，化干戈为玉帛", effects: { attr: { 声望: 1, 心性: 2 }, flags: ["青丘和解"] }, next: "ch3_faction" }
      ]
    },

    ch3_demon: {
      title: "魔门大典",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "血刀门 · 总坛",
      text: "血刀门门主寿元将尽，传位大典上，万魔齐聚。老门主当众宣布：「少主之位，能者居之！」数道不怀好意的目光落在你身上——你这个半路入门的「魔道巨擘」，挡了太多人的路。",
      options: [
        { text: "当众迎战群雄，坐上少主之位", effects: { attr: { 杀戮: 3, 声望: 1 }, flags: ["魔门少主"] }, next: "ch3_faction" },
        { text: "不屑一顾，杀出血刀门自立门户", effects: { attr: { 杀戮: 4, 心性: 1 }, flags: ["叛魔"] }, next: "ch3_faction" },
        { text: "里应外合，引正道盟覆灭血刀门", cond: { flags: ["双面谍"] }, effects: { attr: { 声望: 4, 心性: 2 }, flags: ["灭魔大功"] }, next: "ch3_faction" }
      ]
    },

    ch3_zhao: {
      title: "赵乾归来",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "青云宗 · 旧地",
      text: "被逐出师门的赵乾回来了。他投奔魔道，练成一身邪功，双目赤红地拦住你的去路：「当年你毁我前程！今日，我必杀你！」可你看见他眼底，除了仇恨，还有一丝被岁月磨出的疲惫——他本该也是青云宗的天才，却因一念嫉妒，堕落至此。",
      options: [
        { text: "迎战，了断这段恩怨", effects: { attr: { 杀戮: 3, 修为: 2 }, flags: ["诛赵"] }, next: "ch3_faction" },
        { text: "以道心点化，渡他回头", cond: { attr: { 心性: 25 } }, effects: { attr: { 心性: 3, 声望: 2 }, flags: ["渡魔"] }, next: "ch3_faction" },
        { text: "追问他这些年经历了什么，不急着动手", cond: { flags: ["同门情"] }, effects: { attr: { 心性: 2, 机缘: 1 }, flags: ["赵乾往事"] }, next: "ch3_faction" },
        { text: "避而不见，任他叫嚣", effects: { attr: { 声望: -1 } }, next: "ch3_faction" }
      ]
    },

    ch3_faction: {
      title: "势力抉择",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "青云山 · 群贤毕至",
      text: "金丹真人已是一方巨擘。青云宗邀你任客卿长老，散修联盟推你为盟主，凡间王朝愿奉你为国师……各方势力的请柬堆满了案头。",
      options: [
        { text: "自立门户，开宗立派", effects: { attr: { 声望: 3 }, flags: ["开宗立派"] }, next: [{ if: { flags: ["师徒情深"] }, go: "ch3_master_death" }, { if: { flags: ["尊师"] }, go: "ch3_master_death" }, { go: "ch3_travel" }] },
        { text: "出任青云宗客卿长老", effects: { attr: { 声望: 2, 心性: 1 }, flags: ["青云长老"] }, next: [{ if: { flags: ["师徒情深"] }, go: "ch3_master_death" }, { if: { flags: ["尊师"] }, go: "ch3_master_death" }, { go: "ch3_travel" }] },
        { text: "就任散修联盟盟主", effects: { attr: { 声望: 2, 机缘: 1 }, flags: ["散修盟主"] }, next: [{ if: { flags: ["师徒情深"] }, go: "ch3_master_death" }, { if: { flags: ["尊师"] }, go: "ch3_master_death" }, { go: "ch3_travel" }] },
        { text: "一概回绝，独来独往", effects: { attr: { 心性: 2 }, flags: ["独行者"] }, next: "ch3_travel" }
      ]
    },

    ch3_master_death: {
      title: "师父仙逝",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "青云宗 · 旧地",
      text: "一纸讣告，如晴天霹雳——师父玄尘子寿元已尽，坐化于青云山后崖。你赶到时，只余一炉余烬、一方蒲团。师姐沈青萝红着眼递给你一枚玉简：「师父临终前说，他这辈子最得意的，就是收了你这个徒弟。」玉简里，是玄尘子毕生道法的传承，还有一句遗言：「徒儿，破天之路艰险，为师先走一步，在九泉之下，为你祈福。」",
      options: [
        { text: "长跪不起，痛哭失声", effects: { attr: { 心性: 4, 情缘: 1 }, flags: ["师父遗志"] }, next: "ch3_travel" },
        { text: "强忍悲痛，接过传承，立志不负师恩", effects: { attr: { 心性: 3, 修为: 3 }, flags: ["师父遗志", "承师衣钵"] }, next: "ch3_travel" },
        { text: "闭关三月，将师父的道法与己道相融", effects: { attr: { 修为: 4, 心性: 2 }, flags: ["师父遗志", "融道"] }, next: "ch3_travel" }
      ]
    },

    ch3_travel: {
      title: "海外仙山",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "东海 · 蓬莱",
      text: "你跨海三万里，终于寻到传说中的蓬莱仙山。山中灵气化雾，仙草遍地，更有上古大能坐化的洞府。但仙山深处，隐约有令人心悸的气息……",
      options: [
        { text: "深入仙山核心，一探究竟", effects: { attr: { 机缘: 4, 修为: 3, 杀戮: 1 } }, next: "ch3_visit" },
        { text: "循《太玄真经》残页的指引前行", cond: { flags: ["古修传承"] }, effects: { attr: { 机缘: 4, 修为: 4 }, flags: ["太玄传承"] }, next: "ch3_visit" },
        { text: "只在山缘采药寻宝，见好就收", effects: { attr: { 心性: 1, 机缘: 1 } }, next: "ch3_visit" }
      ]
    },

    ch3_visit: {
      title: "故人来访",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "洞府 · 门前",
      text: "从蓬莱归来，洞府门前竟有故人等候多时。岁月流转，当年种下的因，如今结出了果。",
      options: [
        { text: "苏漓携青丘重宝来贺你丹成", cond: { flags: ["狐侣同行"] }, effects: { attr: { 情缘: 3, 机缘: 2 } }, next: "ch3_secret" },
        { text: "当年你放走的暗探已位极人臣，登门拜谢", cond: { flags: ["救人"] }, effects: { attr: { 声望: 2, 机缘: 1 }, flags: ["世俗善报"] }, next: "ch3_secret" },
        { text: "青云宗旧友来访，煮茶论道三日", cond: { flags: ["勤勉"] }, effects: { attr: { 心性: 2, 修为: 2 } }, next: "ch3_secret" },
        { text: "师姐沈青萝背着剑来，说要与你比一场", cond: { flags: ["青萝情愫"] }, effects: { attr: { 情缘: 2, 修为: 1 }, flags: ["青萝重逢"] }, next: "ch3_secret" },
        { text: "闭门谢客，清修为上", effects: { attr: { 心性: 1 } }, next: "ch3_secret" }
      ]
    },

    ch3_secret: {
      title: "天门之谜",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "藏书楼 · 禁卷",
      text: "你在一卷上古残简中发现了惊天秘密：千年无人飞升，并非后人无能——而是「天门」被上古大能联手封锁！破天门者，需集天时、地利、大功德于一身。残简最后一行字已被血污浸透：「破天者，九死无生。」",
      options: [
        { text: "立誓破天：「我命由我不由天！」", effects: { attr: { 修为: 3 }, flags: ["破天志"] }, next: "ch3_catastrophe" },
        { text: "半信半疑，暗中查证真伪", effects: { attr: { 机缘: 2 }, flags: ["查天门"] }, next: "ch3_catastrophe" },
        { text: "事不关己，飞升与我何干", effects: { attr: { 心性: 1 } }, next: "ch3_catastrophe" }
      ]
    },

    ch3_catastrophe: {
      title: "魔潮降临",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "玄黄界 · 幽冥裂缝",
      text: "天塌了。血刀门余孽勾结外域天魔，撕开了幽冥裂缝，魔潮如黑水般席卷玄黄！凡间赤地千里，修士死伤无数。天下英雄齐聚青云山，需要有人站出来——",
      options: [
        { text: "出任伐魔盟主，率天下修士迎战", cond: { attr: { 声望: 15 } }, effects: { attr: { 声望: 3, 杀戮: 3 }, flags: ["伐魔盟主"] }, next: "ch3_final_prep" },
        { text: "单枪匹马，直取魔首", effects: { attr: { 杀戮: 4, 修为: 3 }, flags: ["孤胆"] }, next: "ch3_final_prep" },
        { text: "反水魔潮，一统魔道与天魔共治", cond: { flags: ["魔门少主"] }, effects: { attr: { 杀戮: 5, 心性: -3 }, flags: ["魔道共主"] }, next: "ch3_final_prep" },
        { text: "不入局，只守一方百姓平安", effects: { attr: { 心性: 3, 声望: 1 }, flags: ["守土"] }, next: "ch3_final_prep" }
      ]
    },

    ch3_final_prep: {
      title: "元婴前夜",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "山巅 · 天地变色",
      text: "魔潮已平，而你的修为也到了金丹圆满的关口。元婴天劫，乃是凡俗与真仙的分水岭——碎丹成婴，九死一生。山巅之上，你俯瞰着这一路走来的万里河山。",
      options: [
        { text: "静坐观心，以不变应万变", effects: { attr: { 心性: 2 } }, next: "ch3_end" },
        { text: "与道侣最后论道一夜", cond: { flags: ["仙侣"] }, effects: { attr: { 情缘: 2, 心性: 1 } }, next: "ch3_end" },
        { text: "燃尽身家，炼制渡劫法宝", effects: { attr: { 修为: 3, 机缘: -1 } }, next: "ch3_end" }
      ]
    },

    ch3_end: {
      title: "元婴天劫",
      chapter: "第三章 · 金丹问道",
      realm: "金丹期",
      scene: "九天之上",
      text: "碎丹成婴的一刻，天穹裂开，紫色雷龙俯冲而下！你的一生——山村的牛背、宗门的云梯、坊市的血、青丘的月、天门前的誓言——都在雷光中一一闪现。这一劫过后，你将成为谁？",
      options: [
        { text: "直面天劫，凝结元婴", effects: {}, next: "__SETTLE_CH3__" }
      ]
    },

    /* ==================== 第四章 · 元婴纵横 ==================== */
    ch4_start: {
      title: "元婴之后",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "山巅 · 俯瞰山河",
      text: "元婴已成，寿元千载。你已是这方天地屈指可数的绝顶存在。可那道「天门被封锁」的阴影却越来越重——千年无人飞升，若不能破开天门，元婴期，便是一切修士的终点。你决定主动出击。",
      options: [
        { text: "重查天门真相，遍访上古遗迹", effects: { attr: { 机缘: 3 } }, next: [{ if: { flags: ["魔道共主"] }, go: "ch4_demon_final" }, { if: { flags: ["丹毒攻心"], notFlags: ["丹毒得解", "毒丹同体"] }, go: "ch4_poison" }, { if: { flags: ["狐族死仇"] }, go: "ch4_fox" }, { go: "ch4_truth" }] },
        { text: "闭关潜修，夯实根基再图进取", effects: { attr: { 修为: 5, 心性: 2 } }, next: [{ if: { flags: ["魔道共主"] }, go: "ch4_demon_final" }, { if: { flags: ["丹毒攻心"], notFlags: ["丹毒得解", "毒丹同体"] }, go: "ch4_poison" }, { if: { flags: ["狐族死仇"] }, go: "ch4_fox" }, { go: "ch4_truth" }] },
        { text: "与道侣云游四海，遍览人间", cond: { flags: ["仙侣"] }, effects: { attr: { 情缘: 3, 机缘: 2 } }, next: [{ if: { flags: ["魔道共主"] }, go: "ch4_demon_final" }, { if: { flags: ["丹毒攻心"], notFlags: ["丹毒得解", "毒丹同体"] }, go: "ch4_poison" }, { go: "ch4_truth" }] }
      ]
    },

    ch4_poison: {
      title: "丹毒反噬",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "洞府 · 危在旦夕",
      text: "元婴之躯本该百毒不侵，可当年燃血丹的旧毒竟随你一同「成婴」，如今成了心腹大患。每逢月圆，元婴都似被万蚁噬咬。若不解毒，连化神都成奢望——而你的仇敌们，似乎也嗅到了你虚弱的气息。",
      options: [
        { text: "远赴药王谷，以重诺换解药", effects: { attr: { 机缘: 2, 心性: 2 }, flags: ["丹毒根治"] }, next: "ch4_truth" },
        { text: "以元婴之力强行炼化丹毒", cond: { attr: { 修为: 40 } }, effects: { attr: { 修为: 4, 杀戮: 1 }, flags: ["毒婴"] }, next: "ch4_truth" },
        { text: "置之不理，赌一赌命", effects: { attr: { 心性: -3, 修为: -3 }, flags: ["毒入元神"] }, next: "ch4_truth" }
      ]
    },

    ch4_fox: {
      title: "青丘终局",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "青丘 · 云海之巅",
      text: "青丘狐族与你的仇怨已延续两百年。如今你已是元婴老祖，狐族大长老却仍不死不休，甚至唤醒了沉睡的青丘始祖妖仙——一尊修为深不可测的九尾天狐。这一战，凶险异常。",
      options: [
        { text: "以绝对实力碾压，彻底了断", cond: { attr: { 修为: 42 } }, effects: { attr: { 杀戮: 5, 修为: 3 }, flags: ["青丘覆灭"] }, next: "ch4_truth" },
        { text: "放下身段，倾尽全力求和", effects: { attr: { 心性: 4, 声望: 2 }, flags: ["青丘止戈"] }, next: "ch4_truth" },
        { text: "以神通点化始祖，了却因果", cond: { attr: { 心性: 30 } }, effects: { attr: { 心性: 3, 机缘: 2 }, flags: ["青丘止戈"] }, next: "ch4_truth" },
        { text: "仓皇迎战，力有不逮", cond: { notFlags: ["青丘止戈"] }, effects: { attr: { 修为: -4, 心性: -2 }, flags: ["重伤"] }, next: "ch4_truth" }
      ]
    },

    ch4_truth: {
      title: "天门真相",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "上古遗迹 · 天门残碑",
      text: "你终于集齐了上古残简，真相浮出水面：万年前，上界仙人忌惮下界修士飞升后挤占仙位，联手设下「绝天阵」，封锁了天门。要破阵，需集齐「天心玉、地脉鼎、人皇剑」三件上古信物，缺一不可。",
      options: [
        { text: "立誓集齐三信物，破天证道", cond: { notFlags: ["破天志"] }, effects: { attr: { 修为: 3 }, flags: ["破天志"] }, next: "ch4_artifact1" },
        { text: "当年在残简前已立下破天之志，今日更不迟疑", cond: { flags: ["破天志"] }, effects: { attr: { 修为: 4, 心性: 2 } }, next: "ch4_artifact1" },
        { text: "将此惊天真相昭告天下，集众之力", effects: { attr: { 声望: 4 }, flags: ["昭告天下"] }, next: "ch4_artifact1" },
        { text: "以《太玄真经》推演破阵之法", cond: { flags: ["太玄传承"] }, effects: { attr: { 机缘: 4, 修为: 3 }, flags: ["太玄破阵"] }, next: "ch4_artifact1" },
        { text: "半信半疑，先寻一件信物验明真伪", effects: { attr: { 机缘: 2 } }, next: "ch4_artifact1" }
      ]
    },

    ch4_artifact1: {
      title: "天心玉",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "北海 · 极寒之地",
      text: "第一件信物「天心玉」藏于北海万丈冰渊之下，由上古寒螭镇守。极寒连元婴修士都难以久留，寒螭更有上古龙族血脉，凶威滔天。临行前，苏漓执意同行：「破天是大事，我不能让你一个人去。」",
      options: [
        { text: "以绝强修为硬闯冰渊，斩杀寒螭", cond: { attr: { 修为: 45 } }, effects: { attr: { 修为: 5, 杀戮: 3 }, flags: ["得天心玉"] }, next: "ch4_artifact2" },
        { text: "以巧智引开寒螭，智取天心玉", cond: { attr: { 机缘: 20 } }, effects: { attr: { 机缘: 4, 修为: 2 }, flags: ["得天心玉"] }, next: "ch4_artifact2" },
        { text: "与苏漓联手，合二人之力破冰", cond: { flags: ["仙侣"] }, effects: { attr: { 情缘: 4, 机缘: 2 }, flags: ["得天心玉"] }, next: "ch4_artifact2" },
        { text: "以师父所传道法，御寒破冰", cond: { flags: ["融道"] }, effects: { attr: { 修为: 4, 心性: 2 }, flags: ["得天心玉"] }, next: "ch4_artifact2" },
        { text: "上界仙人暗中出手，天心玉唾手可得", cond: { flags: ["仙人庇佑"] }, effects: { attr: { 机缘: 5 }, flags: ["得天心玉"] }, next: "ch4_artifact2" },
        { text: "硬闯冰渊，险些命丧龙口", effects: { attr: { 修为: -5, 心性: -2 }, flags: ["重伤"] }, next: "ch4_artifact2" }
      ]
    },

    ch4_artifact2: {
      title: "地脉鼎",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "玄黄地脉 · 九幽深处",
      text: "第二件信物「地脉鼎」深埋于玄黄界地脉核心，汲取大地之力。地脉守护灵开出条件：「欲取地脉鼎，须留下一缕你的本源。」——本源一失，日后化神之路将更加凶险。",
      options: [
        { text: "留下本源，换取地脉鼎", effects: { attr: { 修为: -5, 心性: 3 }, flags: ["得地脉鼎", "本源有缺"] }, next: "ch4_artifact3" },
        { text: "强行夺取，与守护灵一战", cond: { attr: { 修为: 48 } }, effects: { attr: { 修为: 5, 杀戮: 3 }, flags: ["得地脉鼎"] }, next: "ch4_artifact3" },
        { text: "以「渡魔」功德感化守护灵", cond: { flags: ["渡魔"] }, effects: { attr: { 心性: 4, 机缘: 3 }, flags: ["得地脉鼎"] }, next: "ch4_artifact3" },
        { text: "上界仙人施压，守护灵被迫献鼎", cond: { flags: ["仙人庇佑"] }, effects: { attr: { 机缘: 5 }, flags: ["得地脉鼎"] }, next: "ch4_artifact3" },
        { text: "强夺失败，反被守护灵所伤", effects: { attr: { 修为: -5 }, flags: ["重伤"] }, next: "ch4_artifact3" }
      ]
    },

    ch4_artifact3: {
      title: "人皇剑",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "人间皇朝 · 太庙",
      text: "第三件信物「人皇剑」是凡间人皇的传国神剑，镇压一国气运。人皇剑断不可强取，否则气运反噬，凡间将生灵涂炭。",
      options: [
        { text: "向人皇陈明利害，请他借剑", cond: { attr: { 声望: 12 } }, effects: { attr: { 声望: 3, 心性: 2 }, flags: ["得人皇剑"] }, next: "ch4_demon_war" },
        { text: "以「世俗善报」的旧情相求", cond: { flags: ["世俗善报"] }, effects: { attr: { 声望: 4 }, flags: ["得人皇剑"] }, next: "ch4_demon_war" },
        { text: "深夜潜入太庙，盗取神剑", cond: { attr: { 机缘: 15 } }, effects: { attr: { 杀戮: 3, 心性: -3, 声望: -3 }, flags: ["得人皇剑", "窃剑"] }, next: "ch4_demon_war" },
        { text: "上界仙人降下法旨，人皇乖乖献剑", cond: { flags: ["仙人庇佑"] }, effects: { attr: { 机缘: 5 }, flags: ["得人皇剑"] }, next: "ch4_demon_war" },
        { text: "无计可施，人皇剑迟迟未得", effects: { attr: { 心性: -2 }, flags: ["重伤"] }, next: "ch4_demon_war" }
      ]
    },

    ch4_demon_final: {
      title: "魔主抉择",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "血刀门 · 幽冥总坛",
      text: "身为魔道共主，你却渐渐发现：所谓「魔」，不过是上界仙人设下「绝天阵」后，绝望的下界修士堕入的深渊。正魔之争的根源，竟都在那道被封死的大门上。",
      options: [
        { text: "醒悟！弃魔向道，为下界众生破天", effects: { attr: { 心性: 5, 修为: 6 }, flags: ["弃魔向道", "破天志"] }, next: "ch4_artifact1" },
        { text: "一不做二不休，助上界封锁者永绝飞升", effects: { attr: { 杀戮: 5, 修为: 8, 机缘: 5 }, flags: ["助纣为虐", "仙人庇佑"] }, next: "ch4_artifact1" }
      ]
    },

    ch4_demon_war: {
      title: "正魔决战",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "玄黄界 · 最终战场",
      text: "三信物在手，天门真相也已揭晓。可就在破天之前，正魔两道的千年宿怨终于全面爆发，波及整个玄黄界。这一战，关乎天下苍生，也关乎你的道途。",
      options: [
        { text: "以伐魔盟主之名，统率正道平定魔乱", cond: { flags: ["伐魔盟主"] }, effects: { attr: { 声望: 5, 杀戮: 3 }, flags: ["平定天下"] }, next: "ch4_prep" },
        { text: "以魔道共主之名，横扫正道一统乾坤", cond: { flags: ["魔道共主"] }, effects: { attr: { 杀戮: 5, 声望: 3 }, flags: ["一统乾坤"] }, next: "ch4_prep" },
        { text: "身负破天重任，超然物外，尽力救民", effects: { attr: { 心性: 4, 声望: 2 }, flags: ["破天者"] }, next: "ch4_prep" },
        { text: "趁机掠夺，坐收渔利", effects: { attr: { 杀戮: 3, 机缘: 4, 心性: -3 } }, next: "ch4_prep" }
      ]
    },

    ch4_prep: {
      title: "化神前夜",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "山巅 · 星垂平野",
      text: "天下大势已定，三信物已集齐。你终于要迈出那一步——化神。元婴化为元神，从此脱离肉身桎梏。但化神之劫，非天雷，而是「心魔」。你这一路的杀戮、亏欠、遗憾，将在此刻尽数归来。",
      options: [
        { text: "静坐内视，直面元神中的自己", effects: { attr: { 心性: 4 } }, next: [{ if: { flags: ["重伤"] }, go: "ch4_fail_weak" }, { go: "ch4_end" }] },
        { text: "与道侣共度最后的平静", cond: { flags: ["仙侣"] }, effects: { attr: { 情缘: 3, 心性: 2 } }, next: [{ if: { flags: ["重伤"] }, go: "ch4_fail_weak" }, { go: "ch4_end" }] },
        { text: "到师父坐化的后崖，上一炷香", cond: { flags: ["师父遗志"] }, effects: { attr: { 心性: 3, 情缘: 1 }, flags: ["告慰师恩"] }, next: [{ if: { flags: ["重伤"] }, go: "ch4_fail_weak" }, { go: "ch4_end" }] },
        { text: "以三信物之力护持元神", effects: { attr: { 修为: 4, 机缘: 2 } }, next: [{ if: { flags: ["重伤"] }, go: "ch4_fail_weak" }, { go: "ch4_end" }] }
      ]
    },

    ch4_fail_weak: {
      title: "道基崩裂",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "识海 · 濒临崩溃",
      text: "你的伤势太重了。三信物争夺战中积累的暗伤，在这一刻尽数爆发——元神将成未成之际，道基轰然崩裂！元婴之上遍布裂纹，仙路，就此断绝。",
      options: [
        { text: "道基崩裂，仙途陨落", effects: {}, next: "__FAIL__" }
      ]
    },

    ch4_end: {
      title: "化神心魔",
      chapter: "第四章 · 元婴纵横",
      realm: "元婴期",
      scene: "识海 · 心魔之门",
      text: "元婴碎裂，元神将成的刹那，无数心魔破门而入！——那不是别人，正是这一路走来，被你杀死的人、被你亏欠的人、你做出的每一个选择。它们狞笑着，要拉你坠入万劫不复。",
      options: [
        { text: "直面心魔，渡化神之劫", effects: {}, next: "__SETTLE_CH4__" }
      ]
    },

    /* ==================== 第五章 · 化神问道 ==================== */
    ch5_start: {
      title: "化神之后",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "云端 · 元神出窍",
      text: "心魔尽散，元神已成。你俯瞰众生，几近神明。但离飞升越近，你越能清晰地感知到那道「绝天阵」——它像一张天罗地网，罩在每一个修士头顶。破天之前，你还有一桩桩旧账要了。",
      options: [
        { text: "集结三信物，着手破阵", effects: { attr: { 修为: 4 } }, next: [{ if: { flags: ["本源有缺"] }, go: "ch5_source" }, { if: { flags: ["窃剑"] }, go: "ch5_karma" }, { if: { flags: ["助纣为虐"] }, go: "ch5_betray" }, { go: "ch5_demon_heart" }] },
        { text: "先了断前尘旧怨，再求飞升", effects: { attr: { 心性: 2 } }, next: [{ if: { flags: ["本源有缺"] }, go: "ch5_source" }, { if: { flags: ["窃剑"] }, go: "ch5_karma" }, { if: { flags: ["助纣为虐"] }, go: "ch5_betray" }, { go: "ch5_demon_heart" }] },
        { text: "与道侣共参破天之法", cond: { flags: ["仙侣"] }, effects: { attr: { 情缘: 3 } }, next: [{ if: { flags: ["本源有缺"] }, go: "ch5_source" }, { if: { flags: ["窃剑"] }, go: "ch5_karma" }, { go: "ch5_demon_heart" }] }
      ]
    },

    ch5_source: {
      title: "本源之缺",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "地脉 · 守护灵前",
      text: "当年换取地脉鼎时留下的一缕本源，如今成了化神之躯的破绽。心魔与天劫都会循着这缺口乘虚而入。若不能补全，飞升时必死无疑。",
      options: [
        { text: "重返地脉，以元神之力补全本源", cond: { attr: { 修为: 55 } }, effects: { attr: { 修为: 5, 心性: 3 }, flags: ["本源补全"] }, next: "ch5_demon_heart" },
        { text: "以杀伐之气强行填补缺口", effects: { attr: { 杀戮: 4, 修为: 3 }, flags: ["杀戮本源"] }, next: "ch5_demon_heart" },
        { text: "无力补全，听之任之", effects: { attr: { 修为: -3, 心性: -2 }, flags: ["本源残缺"] }, next: "ch5_demon_heart" }
      ]
    },

    ch5_karma: {
      title: "窃剑之报",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "人间皇朝 · 太庙前",
      text: "当年盗走人皇剑，如今报应临门——皇朝气运反噬，凡间连年灾祸，人皇携满朝文武跪在你的洞府外，求你还剑，以救苍生。",
      options: [
        { text: "归还神剑，自损一纪修为", effects: { attr: { 心性: 4, 修为: -5 }, flags: ["还剑"] }, next: "ch5_demon_heart" },
        { text: "袖手旁观，苍生与我何干", effects: { attr: { 心性: -4, 杀戮: 2 }, flags: ["冷血"] }, next: "ch5_demon_heart" }
      ]
    },

    ch5_betray: {
      title: "上界之约",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "云端 · 仙人降临",
      text: "一道仙光划破长空。上界仙人降临，对你抚掌而笑：「识时务者为俊杰。你既助我等封锁飞升，待我等大业一成，许你一个仙位，岂不美哉？」——而你的掌心，正握着三件破天信物。",
      options: [
        { text: "虚与委蛇，实则暗中破天", cond: { attr: { 心性: 30 } }, effects: { attr: { 心性: 3, 机缘: 3 }, flags: ["暗度陈仓"] }, next: "ch5_demon_heart" },
        { text: "俯首称臣，换取仙位", effects: { attr: { 心性: -4, 声望: -3 }, flags: ["仙人走狗"] }, next: "ch5_demon_heart" },
        { text: "当场翻脸，一剑斩向仙人", cond: { attr: { 修为: 55 } }, effects: { attr: { 杀戮: 5, 修为: 4 }, flags: ["斩仙"] }, next: "ch5_demon_heart" }
      ]
    },

    ch5_demon_heart: {
      title: "心魔具现",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "识海深处",
      text: "化神最后一关，心魔不再是虚影，而是「具现」为真实的存在——你这一生所有的恶行与善行，都在这里化成了一个个有血有肉的「人」。他们站在你面前，等着你给出答案。",
      options: [
        { text: "诛杀心魔，斩断一切因果", cond: { attr: { 修为: 55 } }, effects: { attr: { 杀戮: 5, 心性: -3 }, flags: ["斩心魔"] }, next: [{ if: { flags: ["屠狐"] }, go: "ch5_fox_shadow" }, { if: { flags: ["狐族死仇"] }, go: "ch5_fox_shadow" }, { if: { flags: ["投名状"] }, go: "ch5_demon_killer" }, { if: { flags: ["窃剑"] }, go: "ch5_demon_thief" }, { if: { flags: ["师父遗志"] }, go: "ch5_master_shadow" }, { if: { flags: ["仙侣"] }, go: "ch5_love_shadow" }, { go: "ch5_prep" }] },
        { text: "渡化心魔，与之和解共生", cond: { attr: { 心性: 35 } }, effects: { attr: { 心性: 5 }, flags: ["渡心魔"] }, next: [{ if: { flags: ["屠狐"] }, go: "ch5_fox_shadow" }, { if: { flags: ["狐族死仇"] }, go: "ch5_fox_shadow" }, { if: { flags: ["投名状"] }, go: "ch5_demon_killer" }, { if: { flags: ["窃剑"] }, go: "ch5_demon_thief" }, { if: { flags: ["师父遗志"] }, go: "ch5_master_shadow" }, { if: { flags: ["仙侣"] }, go: "ch5_love_shadow" }, { go: "ch5_prep" }] },
        { text: "心魔太强，你无力对抗", effects: { attr: { 修为: -4, 心性: -3 }, flags: ["心魔侵蚀"] }, next: "ch5_fail_demon" }
      ]
    },

    ch5_master_shadow: {
      title: "师恩如海",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "识海 · 太庙",
      text: "心魔深处，一道熟悉的身影缓缓浮现——白发苍苍，仙风道骨，正是坐化多年的师父玄尘子。他望着你，目光慈祥又复杂：「徒儿，为师把道统都传给了你，只问你一句——你走上这破天之路，可曾对得起你的道心？」",
      options: [
        { text: "跪拜师恩：「弟子此生，不负师门！」", effects: { attr: { 心性: 5, 情缘: 1 }, flags: ["师门无悔"] }, next: [{ if: { flags: ["仙侣"] }, go: "ch5_love_shadow" }, { go: "ch5_prep" }] },
        { text: "沉默不语，只觉肩上更重了几分", effects: { attr: { 心性: 3, 修为: 2 }, flags: ["师恩如枷"] }, next: [{ if: { flags: ["仙侣"] }, go: "ch5_love_shadow" }, { go: "ch5_prep" }] },
        { text: "「师父，破天九死一生，弟子……怕辜负您」", effects: { attr: { 情缘: 2, 心性: 2 }, flags: ["师恩如枷"] }, next: [{ if: { flags: ["仙侣"] }, go: "ch5_love_shadow" }, { go: "ch5_prep" }] }
      ]
    },

    ch5_love_shadow: {
      title: "情关难渡",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "识海 · 月夜",
      text: "心魔之中，她向你走来——是苏漓，是沈青萝，是那个与你立下三生之约的人。她眼中没有怨怼，只有无尽的温柔与一丝不易察觉的担忧：「破天之后，你飞升上界，我呢？你可曾想过，仙路尽头，我们是否还能同行？」",
      options: [
        { text: "执手相望：「破天之日，我带你一同飞升」", effects: { attr: { 情缘: 5, 心性: 1 }, flags: ["情坚"] }, next: "ch5_prep" },
        { text: "「大道在前，儿女情长……容后再议」", effects: { attr: { 情缘: -3, 心性: 2 }, flags: ["负心"] }, next: "ch5_prep" },
        { text: "紧紧抱住她：「没有你，长生又有何意义」", cond: { attr: { 情缘: 15 } }, effects: { attr: { 情缘: 5, 心性: 2 }, flags: ["情坚"] }, next: "ch5_prep" }
      ]
    },

    ch5_demon_killer: {
      title: "血影浮现",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "识海 · 黑风坳",
      text: "心魔之中，一道血影格外刺目——那是当年你递上投名状时，一击毙命的那个官府暗探。他至死都睁着眼，仿佛在问你：「我家中，还有妻小。」",
      options: [
        { text: "直面亡魂，承认这笔血债", effects: { attr: { 心性: 4 }, flags: ["悔悟"] }, next: [{ if: { flags: ["屠狐"] }, go: "ch5_fox_shadow" }, { go: "ch5_prep" }] },
        { text: "再杀一次，斩断这段因果", effects: { attr: { 杀戮: 4, 心性: -3 }, flags: ["执迷"] }, next: [{ if: { flags: ["屠狐"] }, go: "ch5_fox_shadow" }, { go: "ch5_prep" }] }
      ]
    },

    ch5_demon_thief: {
      title: "窃剑之影",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "识海 · 太庙",
      text: "心魔中，太庙的烛火忽明忽暗。你看见自己当年潜入太庙盗剑的身影，也看见了此后凡间连年灾祸、饿殍遍野的景象。那把剑，是气运，也是万千黎民的命。",
      options: [
        { text: "直面这一切，承认盗剑之过", effects: { attr: { 心性: 4 }, flags: ["悔悟"] }, next: [{ if: { flags: ["屠狐"] }, go: "ch5_fox_shadow" }, { go: "ch5_prep" }] },
        { text: "执迷不悟，视苍生为蝼蚁", effects: { attr: { 心性: -3, 杀戮: 2 }, flags: ["执迷"] }, next: [{ if: { flags: ["屠狐"] }, go: "ch5_fox_shadow" }, { go: "ch5_prep" }] }
      ]
    },

    ch5_fox_shadow: {
      title: "狐影浮现",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "识海 · 月夜",
      text: "众多心魔之中，有一道身影格外清晰——那是青丘覆灭时，最后一只望着你的小狐。它没有怨毒，只有无尽的悲悯，仿佛在问：「你，可曾后悔？」",
      options: [
        { text: "直面它，承认当年的错", effects: { attr: { 心性: 5 }, flags: ["悔悟"] }, next: "ch5_prep" },
        { text: "再杀一次，彻底抹去这段记忆", effects: { attr: { 杀戮: 4, 心性: -3 }, flags: ["执迷"] }, next: "ch5_prep" }
      ]
    },

    ch5_fail_demon: {
      title: "心魔噬神",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "识海 · 万劫不复",
      text: "心魔太强了。你这一生积攒的业障，在此刻化作滔天巨浪，将你的元神一点点吞噬。挣扎中，你看见自己杀过的每一个人，都伸出了手，要把你拖入永夜。",
      options: [
        { text: "元神溃散，道消身陨", effects: {}, next: "__FAIL__" }
      ]
    },

    ch5_prep: {
      title: "渡劫前夜",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "山巅 · 九霄雷动",
      text: "化神圆满，渡劫之期已至。这一次，不再是普通天劫，而是传说中的「九九天劫」——八十一道紫霄神雷，连上古大能都未必能安然渡过。",
      options: [
        { text: "以最强姿态，硬撼九九天劫", cond: { attr: { 修为: 60 } }, effects: { attr: { 修为: 5 } }, next: "ch5_end" },
        { text: "与道侣双修，合阴阳之力抗劫", cond: { flags: ["仙侣"] }, effects: { attr: { 情缘: 3, 修为: 3 } }, next: "ch5_end" },
        { text: "以三信物布下绝世大阵御劫", effects: { attr: { 修为: 5, 机缘: 2 } }, next: "ch5_end" },
        { text: "修为不足，强行渡劫", effects: { attr: { 修为: 2 }, flags: ["强渡天劫"] }, next: "ch5_fail_tribulation" }
      ]
    },

    ch5_fail_tribulation: {
      title: "雷劫殒命",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "九霄 · 灰飞烟灭",
      text: "你的修为终究差了一线。九九天劫落下，前三道尚能抵挡，第四道便已力竭。雷光中，你听见自己骨头碎裂的声音，然后，是一切的终结。",
      options: [
        { text: "身死道消，灰飞烟灭", effects: {}, next: "__FAIL__" }
      ]
    },

    ch5_end: {
      title: "九九天劫",
      chapter: "第五章 · 化神问道",
      realm: "化神期",
      scene: "九霄之上",
      text: "八十一道紫霄神雷倾泻而下！天地变色，万物噤声。这一劫，是凡俗与仙人的分界线。渡得过，便是飞升在望；渡不过，便是灰飞烟灭。",
      options: [
        { text: "直面九九天劫，冲击渡劫期", effects: {}, next: "__SETTLE_CH5__" }
      ]
    },

    /* ==================== 第六章 · 渡劫飞升 ==================== */
    ch6_start: {
      title: "渡劫之后",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "九霄 · 天门在望",
      text: "九九天劫渡过，你已是渡劫期大能，飞升只在一步之遥。抬头望去，那道被封死的天门，就悬在九天之上，沉默地俯视着芸芸众生。此刻，你终于要直面那个问题：是破天，还是顺天？",
      options: [
        { text: "集齐三信物，直上天门", effects: { attr: { 修为: 3 } }, next: [{ if: { flags: ["仙人走狗"] }, go: "ch6_betray" }, { if: { flags: ["助纣为虐"] }, go: "ch6_betray" }, { go: "ch6_choice" }] },
        { text: "先了断尘世牵挂", effects: { attr: { 心性: 2 } }, next: [{ if: { flags: ["仙人走狗"] }, go: "ch6_betray" }, { if: { flags: ["助纣为虐"] }, go: "ch6_betray" }, { go: "ch6_choice" }] }
      ]
    },

    ch6_betray: {
      title: "仙人索命",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门之外 · 仙云之上",
      text: "就在你准备飞升之际，上界仙人破空而来，满脸狰狞：「叛徒！你既为我等效力，就该永生永世做条狗。如今想飞升？做梦！」仙威如狱，压得你几乎跪倒。",
      options: [
        { text: "奋起反抗，逆斩仙人", cond: { attr: { 修为: 70 } }, effects: { attr: { 杀戮: 5, 修为: 5 }, flags: ["逆天斩仙"] }, next: "ch6_choice" },
        { text: "隐忍求饶，另寻时机", effects: { attr: { 心性: -3 }, flags: ["苟活"] }, next: "ch6_choice" }
      ]
    },

    ch6_choice: {
      title: "天门抉择",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门 · 三信物悬浮",
      text: "三件信物悬浮身前，天门近在咫尺。此时你终于明白——飞升有两条路：一条是「顺天」，向上界仙人屈服，求得一个仙位，安稳飞升；一条是「破天」，斩开绝天阵，为下界万万修士争一条活路，自己却九死无生。",
      options: [
        { text: "破天！为下界众生斩开绝天阵", effects: { attr: { 修为: 4 }, flags: ["破天证道"] }, next: [{ if: { flags: ["本源残缺"] }, go: "ch6_fail_source" }, { go: "ch6_break" }] },
        { text: "顺天，安稳飞升，各安天命", effects: { attr: { 心性: -3 }, flags: ["顺天飞升"] }, next: "ch6_fly" },
        { text: "先看看上界开出什么条件", effects: { attr: { 机缘: 3 } }, next: "ch6_condition" }
      ]
    },

    ch6_fail_source: {
      title: "本源崩散",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门 · 力不从心",
      text: "你全力催动三信物，却忘了那道缺失的本源。缺口在绝天阵的威压下骤然崩散，你的法力如决堤般倾泻而出——破天之举，成了你的催命符。",
      options: [
        { text: "本源崩散，道消身陨", effects: {}, next: "__FAIL__" }
      ]
    },

    ch6_condition: {
      title: "上界条件",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门 · 仙人传音",
      text: "天门之内，传来一个苍老的声音：「要飞升？可以。但须将你的三件破天信物尽数交予上界，并立下血誓，永世不得助下界修士破天。」——这是要让天门永锁。",
      options: [
        { text: "断然拒绝，破天证道", effects: { attr: { 心性: 3, 修为: 2 }, flags: ["破天证道"] }, next: [{ if: { flags: ["本源残缺"] }, go: "ch6_fail_source" }, { go: "ch6_break" }] },
        { text: "假意应承，伺机反杀", cond: { attr: { 机缘: 22 } }, effects: { attr: { 机缘: 4, 心性: 1 }, flags: ["暗度陈仓"] }, next: "ch6_break" },
        { text: "交信物，立血誓，求个仙位", effects: { attr: { 心性: -4 }, flags: ["顺天飞升", "交出信物"] }, next: "ch6_fly" }
      ]
    },

    ch6_break: {
      title: "破天之战",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门 · 绝天阵前",
      text: "你以三件信物为引，将毕生修为尽数注入，一剑斩向那封锁万年的「绝天阵」！阵纹崩裂，上界仙人震怒，无数道仙光如雨般落下——",
      options: [
        { text: "以一己之力，硬撼万仙", cond: { attr: { 修为: 75 } }, effects: { attr: { 修为: 6, 杀戮: 3 }, flags: ["破天证道"] }, next: [{ if: { flags: ["伐魔盟主"] }, go: "ch6_allies" }, { go: "ch6_break2" }] },
        { text: "与道侣并肩，共同破天", cond: { flags: ["仙侣"] }, effects: { attr: { 情缘: 5, 修为: 3 }, flags: ["破天证道"] }, next: [{ if: { flags: ["伐魔盟主"] }, go: "ch6_allies" }, { go: "ch6_break2" }] },
        { text: "修为不足，强行破天", effects: { attr: { 修为: 2 }, flags: ["强破天门"] }, next: "ch6_fail_break" }
      ]
    },

    ch6_allies: {
      title: "众志成城",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门 · 万军齐聚",
      text: "绝天阵前，你昔日的盟军从四方云集——正道的长老、散修的豪杰、被你渡化的赵乾、替你守着青丘之盟的苏漓、乃至青云山上那些当年与你并肩的同门。下界万万修士，今日与你并肩，共战上界！",
      options: [
        { text: "率众破天，势如破竹", effects: { attr: { 声望: 5, 修为: 4 }, flags: ["众望所归"] }, next: "ch6_break2" },
        { text: "以开宗立派之基，号令门下弟子共破天门", cond: { flags: ["开宗立派"] }, effects: { attr: { 声望: 5, 修为: 4 }, flags: ["众望所归"] }, next: "ch6_break2" },
        { text: "以太玄道统，布下绝世破天阵法", cond: { flags: ["太玄传承"] }, effects: { attr: { 机缘: 5, 修为: 5 }, flags: ["众望所归"] }, next: "ch6_break2" },
        { text: "以师父所传道法为引，号令青云一脉", cond: { flags: ["承师衣钵"] }, effects: { attr: { 声望: 5, 心性: 3 }, flags: ["众望所归", "师门荣光"] }, next: "ch6_break2" }
      ]
    },

    ch6_fail_break: {
      title: "破天身陨",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门 · 阵纹反噬",
      text: "绝天阵万年积累的威能岂是易与。你的修为终究不够，一剑斩出，阵纹却未裂，反而倒灌而回。仙光如海，瞬间将你淹没。",
      options: [
        { text: "破天不成，身死道消", effects: {}, next: "__FAIL__" }
      ]
    },

    ch6_break2: {
      title: "天门将开",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门 · 阵纹尽碎",
      text: "万年绝天阵，终于被生生斩开一道裂缝！仙光倾泻而下，那扇封锁无数修士的天门，正在缓缓开启。上界仙人惊恐的怒吼响彻云霄。",
      options: [
        { text: "迈入天门，迎接飞升", effects: {}, next: "ch6_end" }
      ]
    },

    ch6_fly: {
      title: "顺天飞升",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门 · 仙光接引",
      text: "你俯首顺天，天门内降下一道接引仙光。上界仙人满意地点头：「识时务者为俊杰。」仙光裹着你缓缓上升，而下方，下界修士们仰望的目光里，有羡慕，也有失望。",
      options: [
        { text: "踏入仙光，飞升上界", effects: {}, next: "ch6_end" }
      ]
    },

    ch6_end: {
      title: "飞升之际",
      chapter: "第六章 · 渡劫飞升",
      realm: "渡劫期",
      scene: "天门 · 仙光万丈",
      text: "你立于天门之前，回首望去，脚下是来时的万里河山，眼前是永生的仙途。这一刻，天地无声，只等你的最终抉择。",
      options: [
        { text: "踏出这最后一步，飞升证道", effects: {}, next: "ch7_ending" }
      ]
    },

    /* ==================== 第七章 · 飞升终章 ==================== */
    ch7_ending: {
      title: "飞升终章",
      chapter: "第七章 · 飞升终章",
      realm: "飞升",
      scene: "上界 · 南天门",
      text: "飞升之后，你回望这一生的所有选择，如走马灯般在眼前流转。师父玄尘子欣慰的笑容、师姐沈青萝后山的星、苏漓盈盈下拜的眉眼、赵乾放下屠刀的背影……每一个你救过的人、每一个你杀过的人，都在此刻有了各自的归宿。",
      options: [
        { text: "揭晓你最终的归宿", effects: {}, next: "__ENDING__" }
      ]
    }
  },

  /* ========== 第一章结算评价 ========== */
  endings: [
    { cond: { attr: { 杀戮: 12 } }, name: "魔星降世", desc: "雷光映血，你在杀伐中筑基。魔道巨擘纷纷侧目——玄黄界，要变天了。", tone: "demon" },
    { cond: { attr: { 心性: 14 } }, name: "赤子道心", desc: "雷劫加身，你道心澄澈如镜。天道有感，降下一缕紫气，你的道基万年难遇。", tone: "righteous" },
    { cond: { attr: { 声望: 8 } }, name: "少年英杰", desc: "筑基之日，四方来贺。你的名字已传遍青州，宗门与坊市都记住了这个少年。", tone: "fame" },
    { cond: { attr: { 机缘: 12 } }, name: "天运之子", desc: "雷云竟自行散去三分——连天道似乎都眷顾着你。你的机缘，才刚刚开始。", tone: "luck" },
    { cond: { attr: { 情缘: 6 } }, name: "情根深种", desc: "雷劫中你想起的却是那个身影。道途漫漫，或许有人同行，才是长生真意。", tone: "love" },
    { cond: { attr: { 修为: 26 } }, name: "苦修狂人", desc: "没有奇遇，没有靠山，你凭一身苦功硬撼天劫，筑就最扎实的道基。", tone: "normal" }
  ],
  defaultEnding: { name: "凡尘问道", desc: "雷劫过后，你顺利筑基。仙路漫漫，你的故事才刚刚翻开第一页。", tone: "normal" },

  /* ========== 终局结局（第二章末） ========== */
  finalEndings: [
    { cond: { flags: ["魔道巨擘"], attr: { 杀戮: 22 } }, name: "魔君临世", desc: "雷劫中你以杀止杀，硬生生劈开一条血路。金丹一成，魔焰滔天，血刀门奉你为少主，正道视你为大患。你的时代，以血开幕。", tone: "demon" },
    { cond: { flags: ["仙侣", "狐妖之恩"], attr: { 情缘: 10 } }, name: "狐仙眷侣", desc: "雷劫落下时，她为你挡下了最凶的那一道。金丹结成，你们十指相扣——世人皆道仙路孤独，唯有你们携手问长生。", tone: "love" },
    { cond: { flags: ["大功", "双面谍"] }, name: "无名英雄", desc: "正魔大战的转折点，是你递出的那张布防图。金丹结成之日，正道盟主亲自为你护法，却无人知晓你的名字。你不在乎。", tone: "righteous" },
    { cond: { attr: { 声望: 12 } }, name: "正道魁首", desc: "金丹一成，四方来朝。青云宗为你大开山门，年轻一代以你为旗帜。你站在山巅，身后是万丈霞光。", tone: "fame" },
    { cond: { attr: { 心性: 22 } }, name: "道心通玄", desc: "八十一道雷劫，你以不变应万变。丹成之日，你望向云海，心中无喜无悲——太上忘情，方是长生本色。", tone: "righteous" },
    { cond: { attr: { 机缘: 18 } }, name: "气运之子", desc: "雷劫中竟有上古真灵为你护法。你的每一步都似有天意，金丹之上，隐约已见元婴气象。", tone: "luck" },
    { cond: { attr: { 修为: 38 } }, name: "大道独行", desc: "无人为你护法，无宝为你挡劫。你凭一己之力硬撼八十一道天雷，丹成无瑕。这条路，你一个人走到了极致。", tone: "normal" }
  ],
  defaultFinalEnding: { name: "金丹真人", desc: "雷云散尽，金丹大成。从此天上地下，有你一席之地。第三章「金丹问道」，待续。", tone: "normal" },

  /* ========== 关键标记的结算文本 ========== */
  flagEpilogues: {
    "狐妖之恩": "【尾声】月夜里，一只白狐远远望着你的洞府，眼中神采奕奕——它已开灵智，来日必有报恩之期。",
    "狐族之仇": "【尾声】青丘深处，狐族长老捏碎了一枚染血的命牌：「找到那个剥皮的修士。」",
    "结怨黑虎帮": "【尾声】黑虎帮帮主将你的画像钉在堂前：「此子不除，我帮威严何在！」",
    "血刀门追杀": "【尾声】血刀门发布了血色追杀令，赏格高得惊人。",
    "弃暗投明": "【尾声】青云宗执法堂收到了你的密信，长老们对你的名字颇感兴趣。",
    "双面谍": "【尾声】你递出的情报让正道免遭一场浩劫，但血刀门内，一双眼睛已经开始怀疑你。",
    "燃血": "【尾声】燃血丹的药力未散，你的经脉隐隐作痛——速成的代价，或许在渡劫时才会显现。",
    "盗参": "【尾声】禁地失窃案震怒了执法长老，调查仍在继续……",
    "尊师": "【尾声】玄尘子望着你远去的背影，欣慰地抚了抚白须：「此子心性纯良，他日或可接过我的衣钵。」",
    "师徒情深": "【尾声】筑基前夕，师父将一枚护心玉佩塞进你手中：「渡劫凶险，为师帮不了你，只盼它替你挡一劫。」",
    "同门情": "【尾声】师姐沈青萝立在演武场上，目送你走入闭关洞府，久久未动。",
    "青萝情愫": "【尾声】后山的星子落了满天。沈青萝望着你的侧脸，忽然觉得，这条仙路，似乎也没那么孤独了。",
    "功利心": "【尾声】你把师门当作台阶，可当真正站在高处回望，才发觉那台阶上，早已落满了空。"
  },

  /* ========== 第三章结算评价（元婴，原金丹终局） ========== */
  ch3Endings: [
    { cond: { flags: ["魔道共主"] }, name: "幽冥魔尊", desc: "你亲手撕开了更大的幽冥裂缝，以魔制魔。元婴一成，万魔朝拜。正道的史书写你是千古罪人，而魔道尊你为——万古第一魔尊。", tone: "demon" },
    { cond: { flags: ["破天志"], attr: { 机缘: 24 } }, name: "破天者", desc: "元婴雷劫的最后一道，你没有躲，反而逆天而起，一剑斩向那道封锁千年的天门！天门颤动，万年以来第一次，漏下了一缕真正的仙光。", tone: "luck" },
    { cond: { flags: ["伐魔盟主"], attr: { 声望: 18 } }, name: "玄黄共主", desc: "伐魔之功，天下共仰。元婴大成之日，正魔两道、凡间万邦齐上尊号。你没有飞升，因为这方天地，已是你的道。", tone: "fame" },
    { cond: { flags: ["仙侣"], attr: { 情缘: 18 } }, name: "比翼飞升", desc: "天劫中两道身影相依相偎，雷光竟化作漫天花雨。元婴结成之日，你们在山巅许下宏愿：不求独登仙界，但求同生共死。", tone: "love" },
    { cond: { flags: ["渡魔"], attr: { 心性: 30 } }, name: "在世圣人", desc: "连不死不休的仇敌都被你渡化，天道亦为之动容。雷劫未落便自行散去——你的道心已超越境界，肉身成圣，只在朝夕。", tone: "righteous" },
    { cond: { flags: ["灭魔大功"] }, name: "正道丰碑", desc: "卧底魔门数十年，一朝覆灭血刀门。你的名字被刻在青云山英烈碑的最上方，尽管碑前无人知晓，那上面大半的功劳都属于你。", tone: "righteous" },
    { cond: { flags: ["独行者"], attr: { 修为: 48 } }, name: "孤峰绝巅", desc: "无门无派，无侣无徒。你一个人走到了这方天地的最高处。元婴雷劫过后，山巅只有一道孤影——但天地都记得。", tone: "normal" }
  ],
  defaultCh3Ending: { name: "元婴老祖", desc: "雷云散尽，元婴大成。千载寿元在手，天门之谜在心。破天之路，已然启程。", tone: "normal" },

  /* ========== 第四章结算评价（化神） ========== */
  ch4Endings: [
    { cond: { flags: ["青丘覆灭"] }, name: "铁血元婴", desc: "你以杀止杀，斩尽宿怨。元婴一成，天下修士见你皆俯首——敬你，更怕你。", tone: "demon" },
    { cond: { flags: ["青丘止戈"] }, name: "止戈真人", desc: "你放下了元婴老祖的架子，化百年仇怨为玉帛。元婴一成，青丘始祖亲自登门道贺。", tone: "righteous" },
    { cond: { flags: ["弃魔向道"] }, name: "浪子回头", desc: "魔道共主幡然醒悟，为众生弃魔向道。元婴一成，这段传奇成了正魔两道共同传颂的佳话。", tone: "righteous" },
    { cond: { flags: ["昭告天下"] }, name: "真相先觉", desc: "你把天门真相昭告天下，第一个吹响了破天的号角。元婴一成，下界修士开始仰望那扇门。", tone: "fame" },
    { cond: { flags: ["毒婴"] }, name: "万毒元婴", desc: "你将丹毒炼入元婴，成就万中无一的毒婴之体。元婴一成，百毒辟易，却也注定孤僻一生。", tone: "normal" },
    { cond: { attr: { 修为: 55 } }, name: "力破万法", desc: "你坚信一力降十会。元婴一成，凭绝强修为横扫诸敌，信物尽入囊中。", tone: "normal" }
  ],
  defaultCh4Ending: { name: "元婴老祖", desc: "雷云散尽，元婴大成。千载寿元在手，天门之谜在心，破天之路，已然启程。", tone: "normal" },

  /* ========== 第五章结算评价（化神） ========== */
  ch5Endings: [
    { cond: { flags: ["渡心魔"] }, name: "心魔已渡", desc: "你没有诛杀心魔，而是选择渡化它们，与之共生。化神一成，你的道心圆满无瑕，天地为之动容。", tone: "righteous" },
    { cond: { flags: ["悔悟"] }, name: "迷途知返", desc: "面对那只小狐的悲悯目光，你终于承认了当年的错。化神一成，你只觉肩上轻了许多。", tone: "righteous" },
    { cond: { flags: ["斩心魔"] }, name: "斩情证道", desc: "你亲手斩断一切因果心魔，大道独行。化神一成，你冷眼俯瞰众生，心无波澜。", tone: "normal" },
    { cond: { flags: ["执迷"] }, name: "执念入魔", desc: "你选择再杀一次，彻底抹去那段记忆。化神一成，你的道心却多了一道永远无法愈合的裂痕。", tone: "demon" },
    { cond: { flags: ["仙人走狗"] }, name: "上界鹰犬", desc: "你向上界俯首称臣。化神一成，你得到了许多，也失去了许多。", tone: "demon" },
    { cond: { flags: ["暗度陈仓"] }, name: "忍辱负重", desc: "你假意臣服，暗中积蓄破天之力。化神一成，上界仙人仍被蒙在鼓里。", tone: "righteous" },
    { cond: { flags: ["斩仙"] }, name: "逆天斩仙", desc: "你一剑斩向上界仙人。化神一成，你的名字让上界都为之震动。", tone: "demon" },
    { cond: { attr: { 修为: 65 } }, name: "修为通天", desc: "你的修为冠绝当代。化神一成，天下第一强者的名号，非你莫属。", tone: "normal" }
  ],
  defaultCh5Ending: { name: "化神真人", desc: "九九天劫渡过，元神大成。离那扇门，只剩最后一步。", tone: "normal" },

  /* ========== 失败结局（道消身陨） ========== */
  failEnding: {
    name: "道消身陨",
    desc: "仙路漫漫，终究不是人人都能走到尽头。你的故事，在一场劫难中戛然而止。可玄黄界不会忘记——曾经有一个从放牛娃走来的修士，走到了离天门最近的地方。",
    tone: "demon"
  },

  /* ========== 终局结局（第七章·飞升） ========== */
  ultimateEndings: [
    { cond: { flags: ["魔道共主", "助纣为虐"] }, name: "永恒牢笼", desc: "你助上界仙人永锁天门，飞升之后，你终于看清——那所谓的仙位，不过是另一座更大的牢笼。下界修士世世代代仰望的天门，从此再无人能开。", tone: "demon" },
    { cond: { flags: ["杀戮本源", "执迷"] }, name: "幽冥魔帝", desc: "你以杀证道，以魔成仙。飞升之后，你并没有去仙界，而是踏入了幽冥——那里，才配得上你的道。", tone: "demon" },
    { cond: { flags: ["破天证道", "众望所归"] }, name: "众仙之祖", desc: "破天之战，万军相随。飞升之后，下界飞升上来的修士，都尊你一声「老祖」。你是他们心中，永远的天门。", tone: "fame" },
    { cond: { flags: ["破天证道"], attr: { 声望: 30 } }, name: "开天圣人", desc: "你率下界万万修士，一剑斩开万年绝天阵！飞升之后，你的名讳被刻在天门之上，成为下界世世代代传颂的——开天圣人。", tone: "righteous" },
    { cond: { flags: ["破天证道", "仙侣"], attr: { 情缘: 18 } }, name: "比翼成仙", desc: "你与道侣并肩破天，同证大道。飞升之际，两道仙光并驾齐驱，直上九重天。仙界从此多了一对神仙眷侣。", tone: "love" },
    { cond: { flags: ["破天证道"], attr: { 修为: 125 } }, name: "逆天者", desc: "你以一人之力，逆天而起，斩碎绝天阵。飞升之后，上界仙人见你皆绕道而行——因为你，是那唯一一个斩开天门的人。", tone: "luck" },
    { cond: { flags: ["破天证道"] }, name: "破天仙人", desc: "你以一己之力斩开绝天阵，为下界众生争得一线生机。飞升之后，你的名字，成了下界修士口中代代相传的传奇。", tone: "luck" },
    { cond: { flags: ["顺天飞升", "交出信物"] }, name: "天门守墓人", desc: "你交出了信物，换来了仙位，却成了天门的守墓人。永生永世，你都要守在那扇紧闭的门前，看着下界修士一次次徒劳地仰望。", tone: "normal" },
    { cond: { flags: ["悔悟"], attr: { 心性: 40 } }, name: "至仁仙尊", desc: "你的一生并非无瑕，但你敢于直面每一段过错。飞升之后，你以仁心教化众生，仙界多了一位至仁仙尊。", tone: "righteous" },
    { cond: { flags: ["斩心魔"], attr: { 心性: 35 } }, name: "太上忘情", desc: "你斩尽一切情丝因果，飞升之后，成了仙界最冷漠也最强大的存在。万古之后，无人记得你的名字，只知「忘情仙尊」。", tone: "righteous" },
    { cond: { flags: ["顺天飞升"] }, name: "安分仙人", desc: "你顺从天命，安稳飞升。上界仙位到手，但你偶尔回望下界，总会想起那些仰望天门的眼睛——他们的门，还锁着。", tone: "normal" }
  ],
  defaultUltimateEnding: { name: "问道长生", desc: "你踏过天门，飞升上界。从此天上地下，多了一位仙人。而你的名字，与这一路的每一个选择，都将成为玄黄界最古老的传说。", tone: "normal" },

  flagEpiloguesFinal: {
    "仙侣": "【尾声】此后百年，玄黄界多了一对神仙眷侣的传说。",
    "丹毒攻心": "【尾声】金丹虽成，丹毒已浸入心脉——每逢月圆，锥心之痛如期而至。",
    "狐族死仇": "【尾声】青丘狐族立下血誓，与你不死不休。",
    "狐族和解": "【尾声】青丘长老收回了追杀令：「能直面己错者，可恕。」",
    "魔道巨擘": "【尾声】你的名字上了正道诛魔榜第三十七位，赏格万枚灵石。",
    "栽赃": "【尾声】赵乾被逐出师门那夜，在墙角刻下你的名字。这笔账，迟早要算。",
    "血战成名": "【尾声】官道一战后，血刀门杀手见了你的画像都要绕路走。",
    "赵乾罪证": "【尾声】赵乾勾结魔门的铁证在长老会上公开，执法长老当场气晕——大比灵液，非你莫属。",
    "狐侣同行": "【尾声】苏漓的青丘信物在你掌心微微发烫，似在回应着这段未了的情缘。",
    "苏漓抉择": "【尾声】苏漓终究还是收下了那枚青丘诏令，只是将它压在了箱底。",
    "两心相许": "【尾声】多年后苏漓忆起那夜你的话，仍会红了眼眶——「仙路漫漫，我陪你走」。",
    "忍痛放手": "【尾声】你放苏漓回了青丘。她临走前回头望了你一眼，那一眼，你记了一辈子。",
    "师父护短": "【尾声】玄尘子为你在长老会上拍案而起：「老夫的徒弟，老夫自己教！」",
    "青萝之约": "【尾声】沈青萝在后山种下一株桃花，年年花开，年年等你。",
    "婉拒苏漓": "【尾声】苏漓落寞地转身离去，那枚青丘信物，终究没能递到你手中。多年后，你在坊市听闻，青丘出了一位冷艳圣女，终生未嫁。"
  },

  /* ========== 终局尾声（第三章末） ========== */
  flagEpiloguesUltimate: {
    "屠狐": "【尾声】青丘一族自此除名。只是每逢月夜，你总会听见若有若无的狐鸣。",
    "青丘和解": "【尾声】青丘与你立下山海之盟，狐族女子再见到人族修士时，眼中少了几分戒备。",
    "毒丹同体": "【尾声】你的金丹泛着诡异的紫黑色——丹毒与道基融为一体，出手自带三分剧毒。",
    "丹毒得解": "【尾声】药王谷主收你为记名弟子，临终前传你半部《药王经》。",
    "魔门少主": "【尾声】血刀门旧部对你又敬又惧，魔门内部暗流涌动。",
    "叛魔": "【尾声】「叛魔者」三个字同时上了正道和魔道的两份榜单——也算一种传奇。",
    "渡魔": "【尾声】赵乾放下屠刀那日，在你洞府外长跪三日，后来成了你门下大弟子。",
    "诛赵": "【尾声】了断赵乾后，你在他尸身旁站了很久。恩怨已清，心头却空了一块。",
    "开宗立派": "【尾声】你的宗门香火渐盛，百年后，山中弟子已不知祖师爷当年只是个放牛娃。",
    "太玄传承": "【尾声】《太玄真经》全文在识海中缓缓展开，上古大能的道统，有了新的传人。",
    "伐魔盟主": "【尾声】伐魔盟的旗帜至今插在青云山巅，成为这方天地的定海神针。",
    "孤胆": "【尾声】你单骑取魔首的传说被编成评话，在凡间茶馆里讲了一代又一代。",
    "守土": "【尾声】你护下的那一方百姓为你立了生祠，香火千年不绝。",
    "师父遗志": "【尾声】玄尘子的遗愿，成了你破天路上最沉重也最坚定的力量。",
    "承师衣钵": "【尾声】你承了师父的衣钵，将青云一脉的道统，带上了破天之路。",
    "融道": "【尾声】师父的道与你的道相融，你在后崖闭关三月，终于悟出了自己的路。",
    "青萝重逢": "【尾声】那一场比试，你们各胜一局。沈青萝收剑时笑了：「你还是没变。」",
    "赵乾往事": "【尾声】原来赵乾当年是被执法长老逼着栽赃你的。真相大白那天，他望着你的背影，久久无言。"
  },

  /* ========== 第四章尾声（元婴） ========== */
  flagEpiloguesCh4: {
    "丹毒根治": "【尾声】药王谷主临终前传你半部《药王经》，你体内的旧毒，终被根除。",
    "毒婴": "【尾声】你的元婴泛着紫黑光泽，毒道已成，却也注定了此后的孤绝。",
    "毒入元神": "【尾声】你赌输了。丹毒侵入元神，每逢月圆，你的元神便如坠冰窟。",
    "青丘覆灭": "【尾声】青丘自此除名。只是每逢月夜，你耳边总似有狐鸣，挥之不去。",
    "青丘止戈": "【尾声】青丘与你立下山海之盟，两百年仇怨，终化玉帛。",
    "昭告天下": "【尾声】天门真相传遍玄黄界，无数修士第一次抬起了仰望天门的头。",
    "弃魔向道": "【尾声】你的幡然醒悟，成了正魔两道共同传颂的传奇。",
    "助纣为虐": "【尾声】你与上界仙人站在了同一边。下界修士看你的眼神，越来越冷。",
    "本源有缺": "【尾声】缺失的一缕本源，成了你化神路上的一处破绽。",
    "窃剑": "【尾声】人皇剑失窃，皇朝气运受损，凡间渐有灾祸之象。",
    "平定天下": "【尾声】正魔之战终平，天下重归太平，你的威名传遍玄黄。",
    "一统乾坤": "【尾声】正魔两道皆臣服于你，玄黄界迎来了一位铁腕共主。",
    "重伤": "【尾声】三信物争夺战中的暗伤，在你体内留下了隐患，迟早要还。",
    "告慰师恩": "【尾声】后崖的香炉里，你点起三炷香。山风呜咽，似有故人低语：「好孩子。」"
  },

  /* ========== 第五章尾声（化神） ========== */
  flagEpiloguesCh5: {
    "本源补全": "【尾声】本源补全，你的化神之躯再无破绽。",
    "杀戮本源": "【尾声】以杀伐填补的本源，让你的道心多了一抹血色。",
    "本源残缺": "【尾声】缺失的本源始终没有补全，它成了你飞升路上最大的隐患。",
    "还剑": "【尾声】你归还人皇剑，皇朝气运回升，凡间渐复繁荣。",
    "冷血": "【尾声】你弃苍生于不顾。从此，人间再无你的香火。",
    "暗度陈仓": "【尾声】你与上界虚与委蛇，暗中破天的计划，正一步步推进。",
    "仙人走狗": "【尾声】你成了上界的鹰犬，得到了许多，也失去了许多。",
    "斩仙": "【尾声】你一剑斩仙，上界震怒，却也记住了你的名字。",
    "斩心魔": "【尾声】你斩断一切因果，从此大道独行，心无波澜。",
    "渡心魔": "【尾声】你与心魔和解共生，道心圆满，天地动容。",
    "悔悟": "【尾声】你直面过往，承认己错。这份坦荡，比任何修为都珍贵。",
    "执迷": "【尾声】你选择遗忘，可那道心上的裂痕，再难愈合。",
    "师门无悔": "【尾声】师父的身影在心魔中化作点点星芒，散入你的元神——他从未离开过你。",
    "师恩如枷": "【尾声】师父的期望沉甸甸地压在你心头，化作你破天路上最执着的执念。",
    "情坚": "【尾声】心魔散尽，你与她的十指紧扣。这仙路，终究不再独行。",
    "负心": "【尾声】你在心魔中松开了她的手。此后漫长岁月，这份亏欠如影随形。"
  },

  /* ========== 终局尾声（第七章·飞升） ========== */
  flagEpiloguesEnding: {
    "破天证道": "【尾声】你斩开绝天阵的那一刻，下界万万修士的欢呼响彻九霄。",
    "顺天飞升": "【尾声】你安稳飞升，可那扇门，依旧为下界紧锁。",
    "众望所归": "【尾声】破天之战，你并非孤军。下界众生，与你同在。",
    "交出信物": "【尾声】你将三件信物交给了上界，天门永锁，再无开日。",
    "逆天斩仙": "【尾声】你逆天而起，斩仙破门，成了上界挥之不去的梦魇。",
    "开宗立派": "【尾声】你留下的宗门，在你飞升之后香火更盛，成了下界第一大宗。",
    "渡魔": "【尾声】被你渡化的赵乾，在你飞升后接掌了你的道统，教化一方。",
    "仙侣": "【尾声】你与道侣的传说，成了玄黄界最动人的故事，代代相传。",
    "狐妖之恩": "【尾声】当年你救下的白狐，在你飞升之后，替你看守着青丘的山海之盟。",
    "世俗善报": "【尾声】当年你放走的暗探，在你飞升后为你立了生祠，香火不绝。",
    "青丘止戈": "【尾声】青丘与你的和解，成了人族与妖族之间流传千年的美谈。",
    "师父遗志": "【尾声】玄尘子的衣钵，由你带到了上界。青云一脉的道统，从此在仙门也扎下了根。",
    "青萝情愫": "【尾声】沈青萝终其一生未嫁。她守着后山的桃花，年年花开，年年遥望你飞升的方向。",
    "师门荣光": "【尾声】你以师父所传之道破天证道，青云宗自此成为下界第一仙门，玄尘子的名讳，被刻在了宗门最显眼的石碑上。",
    "情坚": "【尾声】破天那日，她与你并肩而立。飞升的仙光里，两道身影紧紧相扣，再未分开。",
    "渡魔": "【尾声】被你渡化的赵乾，在你飞升后接掌了你的道统，教化一方，成了下界人人敬仰的大善人。"
  }
};
