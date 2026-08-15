// Complete Tarot Deck (78 Cards: 22 Major Arcana + 56 Minor Arcana)
// 融入荣格潜意识原型分析、投射心理反思提示、正逆位象征意义

export const TAROT_SPREADS = [
  {
    id: 'single',
    name: '单牌启示 / 潜意识镜映',
    cardsCount: 1,
    desc: '抽取单张牌，观照当前心灵深处的潜意识焦点或今日灵感指引。',
    positions: ['当下心灵焦点 / 潜意识指引']
  },
  {
    id: 'time_flow',
    name: '时空之流 (过去 - 现在 - 潜能)',
    cardsCount: 3,
    desc: '洞察心路历程的起因、当下困境与潜意识推动的未来走向。',
    positions: ['过往起因 / 潜意识基石', '当下状态 / 核心挑战', '潜在未来 / 突破契机']
  },
  {
    id: 'triangle',
    name: '关系圣三角 (自我 - 他者 - 连接)',
    cardsCount: 3,
    desc: '深度剖析双方心理投射、潜意识互动模式与破局建议。',
    positions: ['我的内心投射', '对方的潜在状态', '关系能量焦点与指引']
  },
  {
    id: 'celtic_cross',
    name: '凯尔特十字深度推演 (10张完整牌阵)',
    cardsCount: 10,
    desc: '全方位透视心理深层动机、潜意识阴影、外界阻力与终极整合。',
    positions: [
      '1. 核心现状',
      '2. 阻碍/交叉挑战',
      '3. 意识层面/目标',
      '4. 潜意识根基',
      '5. 过往影响',
      '6. 即将到来的能量',
      '7. 自我心态与态度',
      '8. 外在环境与他人',
      '9. 希望与恐惧',
      '10. 终极整合与结局'
    ]
  }
];

export const MAJOR_ARCANA = [
  {
    id: 0,
    number: '0',
    name: '愚者',
    nameEn: 'The Fool',
    suit: 'major',
    element: '风',
    archetype: '纯真原人 / 自由旅者',
    keywords: ['初生', '纯真', '无限可能', '冒险', '自发性'],
    upright: '充满勇气地踏上未知旅程，放下执念与防备，信任宇宙的安排。',
    reversed: '冲动盲目、逃避现实责任、鲁莽行事或因过度恐惧未知而寸步难行。',
    projection: '你内心深处是否正渴望打破某种常规，开启一场属于自我的全新冒险？'
  },
  {
    id: 1,
    number: 'I',
    name: '魔术师',
    nameEn: 'The Magician',
    suit: 'major',
    element: '风 / 水星',
    archetype: '创造者 / 炼金术士',
    keywords: ['创造力', '资源整合', '意念显化', '专注', '沟通'],
    upright: '万事俱备，你拥有将内在构想转化为现实物质的一切能力与工具。',
    reversed: '才能未被充分利用、耍小聪明、欺骗虚荣或感到创造力枯竭。',
    projection: '你手中其实已经握有哪些尚未被激活的潜能与资源？'
  },
  {
    id: 2,
    number: 'II',
    name: '女祭司',
    nameEn: 'The High Priestess',
    suit: 'major',
    element: '水 / 月亮',
    archetype: '阿尼玛 / 潜意识守门人',
    keywords: ['直觉', '隐秘智慧', '内省', '潜意识', '静止'],
    upright: '倾听内在直觉与梦境呢喃，在静默中连接潜意识深处的无垠智慧。',
    reversed: '压抑直觉、情绪封闭、被表面现象蒙蔽或沉溺于幻想不可自拔。',
    projection: '你最近是否有意无意地忽略了来自直觉的警示或心灵的召唤？'
  },
  {
    id: 3,
    number: 'III',
    name: '皇后',
    nameEn: 'The Empress',
    suit: 'major',
    element: '土 / 金星',
    archetype: '大地母亲 / 丰盛女神',
    keywords: ['丰盛', '孕育', '母爱', '感官愉悦', '创造生命'],
    upright: '生命力丰盈充沛，善待自己的身体与感官，孕育新想法与爱的事业。',
    reversed: '过度控制、情感依赖、忽视自我关怀或陷入物质与创造力匮乏感。',
    projection: '你在多大程度上允许自己无条件地享受爱、美与身体的滋养？'
  },
  {
    id: 4,
    number: 'IV',
    name: '皇帝',
    nameEn: 'The Emperor',
    suit: 'major',
    element: '火 / 白羊座',
    archetype: '父神 / 秩序统治者',
    keywords: ['结构', '权威', '界限', '稳定', '自律'],
    upright: '建立清晰的边界与秩序，以坚定的意志和理智掌控局面，承担领导责任。',
    reversed: '专制暴政、死板僵化、丧失主导权或对失控产生极端焦虑。',
    projection: '在当前情境中，你需要建立怎样的规则与界限来守护内在秩序？'
  },
  {
    id: 5,
    number: 'V',
    name: '教皇',
    nameEn: 'The Hierophant',
    suit: 'major',
    element: '土 / 金牛座',
    archetype: '精神导师 / 传统圣哲',
    keywords: ['精神引导', '信念传承', '社会契约', '追随真理'],
    upright: '向智者与经典学习，探求更高的精神意义，融入志同道合的群体。',
    reversed: '教条主义、盲从权威、打破陈规或反思被强加的陈旧价值观。',
    projection: '你目前所恪守的信念，究竟来自你真实的体验，还是外界的灌输？'
  },
  {
    id: 6,
    number: 'VI',
    name: '恋人',
    nameEn: 'The Lovers',
    suit: 'major',
    element: '风 / 双子座',
    archetype: '阴阳合一 / 灵魂契约',
    keywords: ['结合', '内心抉择', '价值观共鸣', '真挚亲密'],
    upright: '面对重大的灵魂抉择，以真实爱意与核心价值观为准绳，实现内在平衡。',
    reversed: '关系失衡、价值观冲突、内心割裂或做出违背本心的妥协。',
    projection: '面对当下的十字路口，你的心究竟在渴望怎样的深度连接与抉择？'
  },
  {
    id: 7,
    number: 'VII',
    name: '战车',
    nameEn: 'The Chariot',
    suit: 'major',
    element: '水 / 巨蟹座',
    archetype: '英雄 / 意志征服者',
    keywords: ['决心', '意志力', '突破阻碍', '专注胜利'],
    upright: '驾驭内心对立的情感与冲动，目标坚定不移，势如破竹跨越障碍。',
    reversed: '失去方向、盲目好斗、意志受挫或被内在失衡的力量撕扯。',
    projection: '你内心有哪些对立的力量（如理智与情感）正等待着你去统筹与驾驭？'
  },
  {
    id: 8,
    number: 'VIII',
    name: '力量',
    nameEn: 'Strength',
    suit: 'major',
    element: '火 / 狮子座',
    archetype: '驯兽者 / 柔韧内在之光',
    keywords: ['以柔克刚', '包容本能', '耐心', '无畏慈悲'],
    upright: '用温柔与慈悲驯服内在狂暴的野性本能，展现强大而安详的内在韧性。',
    reversed: '自我怀疑、本能失控、软弱妥协或用蛮力压制脆弱情绪。',
    projection: '面对内在的恐惧或欲望之兽，你是在逃避它，还是试着用爱去接纳驯服？'
  },
  {
    id: 9,
    number: 'IX',
    name: '隐士',
    nameEn: 'The Hermit',
    suit: 'major',
    element: '土 / 处女座',
    archetype: '智者 / 孤峰求道者',
    keywords: ['独处', '内省', '自省反思', '追寻真理', '灵魂提灯'],
    upright: '远离喧嚣，回归内在静谧，在深刻的孤独中点亮指引灵魂的智慧之灯。',
    reversed: '孤立封闭、自我放逐、拒绝与外界沟通或过度沉迷于自怜。',
    projection: '你有多久没有给自己安排一段全然静默、不被打扰的独处时光了？'
  },
  {
    id: 10,
    number: 'X',
    name: '命运之轮',
    nameEn: 'Wheel of Fortune',
    suit: 'major',
    element: '火 / 木星',
    archetype: '命运织锦 / 宇宙流转',
    keywords: ['周期转折', '共时性', '契机', '业力因果', '随顺自然'],
    upright: '生命周期的重大转折点降临，顺应宇宙节律，抓住共时性带来的转机。',
    reversed: '遭遇阻滞、抗拒变革、过度执着于可控感或陷入恶性循环。',
    projection: '你是否能接纳生命中的起伏无常，并敏锐捕捉暗藏在变化中的新机遇？'
  },
  {
    id: 11,
    number: 'XI',
    name: '正义',
    nameEn: 'Justice',
    suit: 'major',
    element: '风 / 天秤座',
    archetype: '天平守护神 / 因果裁决者',
    keywords: ['公正', '真理', '因果责任', '清晰判断'],
    upright: '看清因果法则，客观看待事实，为自己的每个选择负起百分之百的责任。',
    reversed: '失衡不公、逃避责任、偏见武断或遭受不公正待遇。',
    projection: '在当前的事情中，你是否能做到不带偏见地客观看待所有事实？'
  },
  {
    id: 12,
    number: 'XII',
    name: '倒吊人',
    nameEn: 'The Hanged Man',
    suit: 'major',
    element: '水 / 海王星',
    archetype: '觉悟者 / 牺牲与蜕变',
    keywords: ['换位思考', '臣服', '顿悟', '放下执念', '精神觉醒'],
    upright: '暂停外在行动，换一个全新的颠倒视角看待世界，在臣服与等待中获得开悟。',
    reversed: '无谓牺牲、死要面子、拖延停滞或陷入受害者心态。',
    projection: '如果你试着完全放下当前的固执，从相反的视角看待问题，会发现什么？'
  },
  {
    id: 13,
    number: 'XIII',
    name: '死神',
    nameEn: 'Death',
    suit: 'major',
    element: '水 / 天蝎座',
    archetype: '蜕变重生 / 告别旧我',
    keywords: ['终结', '蜕变', '放下陈旧', '新生曙光'],
    upright: '彻底告别不再服务于生命成长的旧模式与旧身份，迎接重生的必然黎明。',
    reversed: '抗拒改变、对腐朽死抓不放、害怕未知或生活陷入僵死停滞。',
    projection: '为了迎来生命新的绽放，你必须彻底埋葬和告别什么？'
  },
  {
    id: 14,
    number: 'XIV',
    name: '节制',
    nameEn: 'Temperance',
    suit: 'major',
    element: '火 / 射手座',
    archetype: '大天使 / 灵魂调和者',
    keywords: ['调和', '中道', '疗愈', '炼金合成', '耐心'],
    upright: '将对立的两股力量巧妙融合，达到身心灵的最高和谐与身心自愈。',
    reversed: '极端失衡、过度消耗、急躁冒进或内在力量彼此冲突。',
    projection: '你的生活节奏或情绪状态，目前最需要在哪个维度进行调和与平衡？'
  },
  {
    id: 15,
    number: 'XV',
    name: '恶魔',
    nameEn: 'The Devil',
    suit: 'major',
    element: '土 / 摩羯座',
    archetype: '阴影自我 / 欲望枷锁',
    keywords: ['执念', '成瘾', '物质羁绊', '直视阴影'],
    upright: '直视潜意识中被压抑的欲望、恐惧与投射，看破虚妄枷锁，重获真正自由。',
    reversed: '打破心魔、重获自由、戒除成瘾或觉醒于精神奴役。',
    projection: '是什么无形的恐惧或执念在束缚你？那把锁其实是挂着的还是早已解开的？'
  },
  {
    id: 16,
    number: 'XVI',
    name: '高塔',
    nameEn: 'The Tower',
    suit: 'major',
    element: '火 / 火星',
    archetype: '雷霆震撼 / 虚假幻灭',
    keywords: ['突变', '幻象破灭', '觉醒契机', '彻底重构'],
    upright: '虚假的安全感被雷霆击碎，虽然痛苦，但它为你清除了不可持续的沙上之塔。',
    reversed: '勉强维持危局、逃避必然痛苦、深层恐惧突变或余震未消。',
    projection: '当虚假的防御被剥除后，你最真实、坚不可摧的生命内核是什么？'
  },
  {
    id: 17,
    number: 'XVII',
    name: '星星',
    nameEn: 'The Star',
    suit: 'major',
    element: '风 / 水瓶座',
    archetype: '希望女神 / 灵性泉源',
    keywords: ['希望', '灵感', '自愈', '宁静信念', '澄澈'],
    upright: '暴风雨后的澄澈夜空，星光指引希望，心灵得到深度洗涤与宇宙祝福。',
    reversed: '丧失希望、悲观失望、怀疑灵感或感到与内在神性断联。',
    projection: '在至暗时刻，是什么微小却纯粹的希望之光一直在支撑着你？'
  },
  {
    id: 18,
    number: 'XVIII',
    name: '月亮',
    nameEn: 'The Moon',
    suit: 'major',
    element: '水 / 双鱼座',
    archetype: '幻境迷雾 / 潜意识深渊',
    keywords: ['幻象', '潜意识恐惧', '直觉探索', '情绪迷雾'],
    upright: '穿越潜意识的幽暗迷雾，直面深层的焦虑与不安，不被虚幻影子所惑。',
    reversed: '迷雾散去、看清真相、战胜内在恐惧或情绪逐渐平复。',
    projection: '你当前所担心的灾难，有多少只是潜意识恐惧投射出的虚幻影子？'
  },
  {
    id: 19,
    number: 'XIX',
    name: '太阳',
    nameEn: 'The Sun',
    suit: 'major',
    element: '火 / 太阳',
    archetype: '神圣赤子 / 光明之源',
    keywords: ['喜悦', '成功', '活力', '纯真光明', '清晰'],
    upright: '全然的光明、成功与喜悦！充满赤子之心的生命力，前路一片坦途。',
    reversed: '暂时乌云遮日、过度自信、虚荣傲慢或暂时感到精力不足。',
    projection: '你今天可以做些什么来全然释放内在纯粹的快乐与热情？'
  },
  {
    id: 20,
    number: 'XX',
    name: '审判',
    nameEn: 'Judgement',
    suit: 'major',
    element: '火 / 冥王星',
    archetype: '天号吹响 / 灵魂复活',
    keywords: ['召唤', '重生', '灵魂觉醒', '重大决定', '原谅'],
    upright: '听见生命深处的神圣召唤，原谅过去，彻底放下旧罪业，迈向更高维度。',
    reversed: '怀疑自我使命、拒绝觉醒、自我谴责或沉溺于过去的后悔中。',
    projection: '如果抛开一切外界评判，你灵魂真正的使命与召唤是什么？'
  },
  {
    id: 21,
    number: 'XXI',
    name: '世界',
    nameEn: 'The World',
    suit: 'major',
    element: '土 / 土星',
    archetype: '自性圆满 / 宇宙大和谐',
    keywords: ['圆满', '完成', '整合', '自由自在', '新起点'],
    upright: '一个完整的生命大周期圆满达成，四元素齐聚，身心灵自性合一。',
    reversed: '尚未完成最后的闭环、缺少临门一脚、缺乏圆满感或害怕终结。',
    projection: '你生命中哪个重要的阶段正在画上圆满句号，准备迎接新的篇章？'
  }
];

// 小阿尔卡那精华牌库 (权杖火、圣杯水、宝剑风、星币土)
export const MINOR_ARCANA = [
  // 权杖组 (火象 / 行动与热情)
  { id: 22, name: '权杖王牌', nameEn: 'Ace of Wands', suit: 'wands', element: '火', keywords: ['新灵感', '生命火花', '创造冲动'], upright: '全新的热情与创造力爆发，抓住这股行动的冲劲。', reversed: '灵感受阻、缺乏行动力、冲动冒进。', projection: '你当下最想点燃的梦想是什么？' },
  { id: 23, name: '权杖三', nameEn: 'Three of Wands', suit: 'wands', element: '火', keywords: ['远见', '拓展', '开拓新版图'], upright: '站在高处远眺未来，之前播下的种子正在拓展成为更宽广的舞台。', reversed: '眼光局限、进展受阻、对未知缺乏准备。', projection: '你的长远愿景是否需要进一步扩大格局？' },
  { id: 24, name: '权杖六', nameEn: 'Six of Wands', suit: 'wands', element: '火', keywords: ['胜利', '荣誉', '获得认可'], upright: '付出得到外界的由衷认可与赞誉，自信凯旋。', reversed: '虚荣心过重、跌落神坛、缺乏自信。', projection: '你是否能坦然接受并庆祝自己的成就？' },
  { id: 25, name: '权杖十', nameEn: 'Ten of Wands', suit: 'wands', element: '火', keywords: ['重担', '过度负荷', '坚持到底'], upright: '承担了过多的责任与压力，但终点就在前方，需学会分担。', reversed: '不堪重负崩溃、学会放手与授权、卸下包袱。', projection: '哪些责任其实并不属于你，可以适时放手？' },
  { id: 26, name: '权杖骑士', nameEn: 'Knight of Wands', suit: 'wands', element: '火', keywords: ['充满激情', '大胆行动', '冒险'], upright: '充满冒险精神，毫不犹豫地向目标飞驰。', reversed: '鲁莽急躁、三分钟热度、脾气暴躁。', projection: '如何将无畏的热情转化为持久的行动？' },

  // 圣杯组 (水象 / 情感与直觉)
  { id: 27, name: '圣杯王牌', nameEn: 'Ace of Cups', suit: 'cups', element: '水', keywords: ['爱的源泉', '情感丰沛', '心灵觉醒'], upright: '心灵之杯满溢，一段纯洁真挚的爱意或深沉的情感连接正在开启。', reversed: '情感堵塞、封闭心扉、过度消耗他人。', projection: '你是否敞开了心灵，去接受并付出无条件的爱？' },
  { id: 28, name: '圣杯二', nameEn: 'Two of Cups', suit: 'cups', element: '水', keywords: ['灵魂契合', '平等交流', '深厚情谊'], upright: '彼此敞开心扉，在平等的爱与尊重中建立深刻的情感纽带。', reversed: '误解隔阂、沟通不良、关系失衡。', projection: '在关键关系中，你们是否实现了真正的灵魂对话？' },
  { id: 29, name: '圣杯三', nameEn: 'Three of Cups', suit: 'cups', element: '水', keywords: ['欢聚', '友谊庆典', '群体支持'], upright: '与挚友共享喜悦，在温暖的群体支持中体会生命的美好。', reversed: '流于表面应酬、群体八卦、被排挤或过度放纵。', projection: '谁是你生命中最值得举杯共庆的灵魂伴侣与挚友？' },
  { id: 30, name: '圣杯八', nameEn: 'Eight of Cups', suit: 'cups', element: '水', keywords: ['转身离去', '追寻真理', '超越平庸'], upright: '勇敢告别虽熟悉但已无法滋养心灵的过往，走向更高的精神追求。', reversed: '犹豫不决、害怕离去、沉溺在不满的现状中。', projection: '为了心灵的真正升华，你必须告别什么表面安逸的环境？' },
  { id: 31, name: '圣杯王后', nameEn: 'Queen of Cups', suit: 'cups', element: '水', keywords: ['极度共情', '慈悲抚慰', '直觉大师'], upright: '如海洋般包容一切的母性慈爱，深刻理解人性的所有痛苦。', reversed: '情绪内耗、过度牺牲、边界不清、被情绪吞噬。', projection: '你如何用温柔包容自己脆弱与敏感的一面？' },

  // 宝剑组 (风象 / 理智与真理)
  { id: 32, name: '宝剑王牌', nameEn: 'Ace of Swords', suit: 'swords', element: '风', keywords: ['真理之刃', '顿悟清晰', '突破迷雾'], upright: '理智如利剑出鞘，斩断一切虚伪与混乱，看清客观真相。', reversed: '言语伤人、思维混乱、执着偏见、残酷冷漠。', projection: '有哪些事实需要你鼓起勇气，用理智去客观直视？' },
  { id: 33, name: '宝剑三', nameEn: 'Three of Swords', suit: 'swords', element: '风', keywords: ['心碎', '痛苦释放', '接纳创伤'], upright: '经历痛苦的幻灭与心碎，但伤口正是光进入灵魂的地方。', reversed: '创伤愈合、走出阴霾、原谅与和解。', projection: '你是否愿意允许悲伤自然流淌，而不去强行压抑它？' },
  { id: 34, name: '宝剑六', nameEn: 'Six of Swords', suit: 'swords', element: '风', keywords: ['渡过难关', '疗愈之旅', '走向平静'], upright: '在向导的带领下缓缓驶出暴风雨水域，心灵正走向平稳与疗愈。', reversed: '困在旧痛、拒绝疗愈、旅途坎坷。', projection: '你正在驶向怎样一个更加平静安宁的心灵港湾？' },
  { id: 35, name: '宝剑八', nameEn: 'Eight of Swords', suit: 'swords', element: '风', keywords: ['自我设限', '思维囚笼', '虚假困境'], upright: '你以为自己被重重围困，但手中的绳索其实并未绑紧，解脱全在念头之间。', reversed: '挣脱束缚、看破心魔、重获自由。', projection: '哪些“我不行 / 我做不到”的信念，其实是你自己给心灵设下的囚笼？' },
  { id: 36, name: '宝剑国王', nameEn: 'King of Swords', suit: 'swords', element: '风', keywords: ['绝对理智', '公正权威', '真理守护'], upright: '以无可挑剔的逻辑、公平正义与冷彻决断力主导大局。', reversed: '专断残忍、冷酷无情、玩弄权术。', projection: '面对复杂抉择，如何保持公正与冷彻的洞察？' },

  // 星币组 (土象 / 物质与落地)
  { id: 37, name: '星币王牌', nameEn: 'Ace of Pentacles', suit: 'pentacles', element: '土', keywords: ['实质契机', '丰盛种子', '物质丰厚'], upright: '宇宙赠予你一枚坚实的物质与机遇种子，扎根大地即可长成参天大树。', reversed: '错失良机、过度贪婪、根基不稳。', projection: '你眼前出现了怎样一个值得认真深耕的实际机遇？' },
  { id: 38, name: '星币三', nameEn: 'Three of Pentacles', suit: 'pentacles', element: '土', keywords: ['匠心合作', '专业精益', '协同筑梦'], upright: '与各领域的专业伙伴齐心协作，凭借精湛技艺建造宏伟作品。', reversed: '缺乏团队配合、技能不足、偷工减料。', projection: '在你的项目中，如何更好地与他人协同，发挥彼此专长？' },
  { id: 39, name: '星币七', nameEn: 'Seven of Pentacles', suit: 'pentacles', element: '土', keywords: ['耐心等待', '评估收成', '长线沉淀'], upright: '辛勤耕耘后驻足审视收获，耐心等待果实自然成熟，不急功近利。', reversed: '急躁焦虑、半途而废、劳而无功。', projection: '你是否能耐得住寂寞，给予生命成长所需的充足时间？' },
  { id: 40, name: '星币九', nameEn: 'Nine of Pentacles', suit: 'pentacles', element: '土', keywords: ['独立丰盛', '自给自足', '优雅从容'], upright: '凭借自身努力赢得丰厚的物质与心灵自由，从容享受高品质生活。', reversed: '过度依赖、挥霍无度、表面光鲜内在空虚。', projection: '你如何体会并享受属于自己的独立价值与优雅人生？' },
  { id: 41, name: '星币十', nameEn: 'Ten of Pentacles', suit: 'pentacles', element: '土', keywords: ['家族基业', '终极稳定', '财富传承'], upright: '长久积累的财富、智慧与家族基业根深叶茂，福祉绵延。', reversed: '家族纠纷、财产损失、缺乏长远规划。', projection: '你期望为自己和后代留下怎样的物质与精神遗产？' }
];

export const ALL_TAROT_CARDS = [...MAJOR_ARCANA, ...MINOR_ARCANA];
