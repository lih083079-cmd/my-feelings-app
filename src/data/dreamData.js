// Dream Analysis (梦的解析) & Subconscious Archetypes
// 结合弗洛伊德 (Freud) 潜意识愿望理论与荣格 (Jung) 原型补偿理论

export const DREAM_THEORIES = {
  freud: {
    name: '西格蒙德·弗洛伊德 (Sigmund Freud)',
    title: '精神分析学派 · 欲望与压抑解构',
    coreConcept: '梦是通往潜意识的康庄大道 (Royal Road to the Unconscious)',
    keyMechanisms: [
      { term: '显梦与隐梦', desc: '显梦是醒来时回忆的表象剧情；隐梦是被压抑在潜意识底层的真实愿望与冲突。' },
      { term: '凝缩机制 (Condensation)', desc: '多个潜意识想法、多个人物特征被压缩进同一个梦境意象中。' },
      { term: '移置机制 (Displacement)', desc: '潜意识将强烈的情感转移到微不足道的小事或替罪羊意象上以规避心理审查。' },
      { term: '次级加工 (Secondary Revision)', desc: '意识在醒来后试图将离奇的梦编织成符合逻辑的故事。' }
    ]
  },
  jung: {
    name: '卡尔·荣格 (Carl Jung)',
    title: '分析心理学派 · 原型与自性补偿',
    coreConcept: '梦是心灵自性 (Self) 的前瞻性与补偿性自我调节',
    keyMechanisms: [
      { term: '心理补偿功能', desc: '梦在平衡意识态度的偏狭（如白天过度理性，夜晚梦见狂暴洪水以提醒情感需求）。' },
      { term: '原型与集体潜意识', desc: '梦中常浮现跨越文化的神话意象（英雄、智慧老人、阿尼玛、阴影怪物）。' },
      { term: '共时性 (Synchronicity)', desc: '梦境与现实事件之间非因果性的深层有意义连接。' },
      { term: '积极想象 (Active Imagination)', desc: '在清醒状态下与梦中意象展开主动对话，整合潜意识能量。' }
    ]
  }
};

export const DREAM_SYMBOLS = [
  {
    id: 'flight',
    category: '运动与状态',
    name: '飞翔 / 翱翔',
    freudView: '释放本能冲动、超越现实约束的愿望满足。',
    jungView: '精神升华、获得宏观视野的召唤；警惕过度脱离现实重力（伊卡洛斯情结）。',
    archetype: '羽翼之灵 / 超越者',
    reflection: '在现实生活中，你是否正渴望摆脱某种沉重的束缚，俯瞰人生的全局？'
  },
  {
    id: 'falling',
    category: '运动与状态',
    name: '坠落 / 失重',
    freudView: '失去道德自律或对潜意识本能失控的焦虑。',
    jungView: '意识自负被打破，心灵强制你回到大地母亲的根基；向潜意识深渊的降落。',
    archetype: '深渊考验 / 重归泥土',
    reflection: '你是否在某些事情上绷得太紧，害怕一旦松手便会失去所有掌控？'
  },
  {
    id: 'water_ocean',
    category: '自然与元素',
    name: '水域 / 大海 / 洪水',
    freudView: '回归母体子宫的安全渴望，或被压抑的原始情感洪流。',
    jungView: '潜意识母体与生命原初动力；清澈的水象征顿悟，浑浊汹涌的水象征未整合的情绪阴影。',
    archetype: '生命之源 / 潜意识汪洋',
    reflection: '当前梦中的水是宁静澄澈还是波涛汹涌？它在映射你怎样真实的情感状态？'
  },
  {
    id: 'chased',
    category: '情境与冲突',
    name: '被追逐 / 逃亡',
    freudView: '逃避惩罚恐惧、内疚感或被压抑的冲动。',
    jungView: '你在逃避的不是外界敌人，而是你自己未被接纳的“阴影 (Shadow)”。追逐者蕴藏着你急需的生命力。',
    archetype: '阴影追猎 / 待整合的异己',
    reflection: '如果你在梦中停下脚步转过身去直视追赶你的人/怪物，你想问它什么？'
  },
  {
    id: 'teeth_loss',
    category: '身体与自我',
    name: '掉牙 / 牙齿脱落',
    freudView: '象征力量感缺失、阉割焦虑或对衰老的深层恐惧。',
    jungView: '蜕变与成长仪式（如幼童换牙）；旧有防御机制瓦解，迎接新生阶段的过渡期。',
    archetype: '蜕变断乳 / 力量重构',
    reflection: '你最近是否在某种人际或职场沟通中感到自己丧失了威慑力或话语权？'
  },
  {
    id: 'house_rooms',
    category: '空间与建筑',
    name: '房屋 / 陌生房间 / 地下室',
    freudView: '房屋象征肉体与欲望的容器。',
    jungView: '房屋是心灵整体结构的象征！客厅是人格面具，阁楼是理性理想，而隐藏的地下室/暗门则是深层潜意识藏宝地。',
    archetype: '心灵城堡 / 藏宝密室',
    reflection: '在梦中的房屋里，你发现了哪些平日未曾注意到的神秘新房间？'
  },
  {
    id: 'snake_beast',
    category: '生灵与野性',
    name: '蛇 / 猛兽',
    freudView: '纯粹的性原动力与生殖象征。',
    jungView: '治愈与蜕变的古典图腾（蛇蜕皮）；智慧药神（阿斯克勒庇俄斯之杖），代表强大的内在生命力。',
    archetype: '衔尾蛇 / 转化守护兽',
    reflection: '你内心深处有哪些被你误认为是危险但其实充满生命能量的热情？'
  },
  {
    id: 'death_funeral',
    category: '生死与转化',
    name: '死亡 / 葬礼',
    freudView: '死本能 (Thanatos) 或对某段关系的终结愿望。',
    jungView: '死亡在梦中极少代表物理死亡，而是象征心理维度的“旧我彻底死去，新我涅槃破茧”。',
    archetype: '凤凰涅槃 / 终结与复生',
    reflection: '你生命中哪种陈旧的身份认同或思维死结，正在经历一场必然的告别？'
  },
  {
    id: 'naked_exam',
    category: '情境与冲突',
    name: '赤身裸体 / 突击考试',
    freudView: '展览癖欲望与被评判耻感。',
    jungView: '人格面具 (Persona) 被剥落后的真实自卑与冒充者心态；心灵在呼唤你放下伪装，坦诚做自己。',
    archetype: '无遮之镜 / 真实赤子',
    reflection: '你究竟在害怕外界看穿你的什么脆弱之处？如果坦然展现，真有那么可怕吗？'
  },
  {
    id: 'mirror_double',
    category: '空间与建筑',
    name: '镜子 / 分身双胞胎',
    freudView: '自恋投射与自我镜像认同。',
    jungView: '自性反思的最高意象。镜中的异样面孔正是你的“阿尼玛/阿尼姆斯”或“阴影”在试图与显意识沟通。',
    archetype: '灵魂双生 / 照见自性',
    reflection: '镜子里的倒影眼神向你传递了怎样的情绪——是愤怒、悲伤还是未尽的关切？'
  }
];

// 梦境智能解码器（根据用户输入的梦境描述与核心意象生成荣格+弗洛伊德双重解码分析）
export function analyzeDreamText({ dreamTitle, dreamContent, emotionTone, mainSymbols = [] }) {
  const matchedSymbols = DREAM_SYMBOLS.filter(s => 
    mainSymbols.includes(s.id) || 
    dreamContent.includes(s.name.split(' ')[0]) || 
    (s.id === 'water_ocean' && (dreamContent.includes('水') || dreamContent.includes('海') || dreamContent.includes('河') || dreamContent.includes('雨'))) ||
    (s.id === 'flight' && (dreamContent.includes('飞') || dreamContent.includes('飘'))) ||
    (s.id === 'falling' && (dreamContent.includes('掉') || dreamContent.includes('坠') || dreamContent.includes('跌'))) ||
    (s.id === 'chased' && (dreamContent.includes('追') || dreamContent.includes('逃') || dreamContent.includes('躲')))
  );

  const dominantArchetype = matchedSymbols.length > 0 ? matchedSymbols[0].archetype : '潜意识迷宫探索者';

  return {
    dreamTitle: dreamTitle || '未命名的潜意识密语',
    emotionTone: emotionTone || '神秘且充满张力',
    matchedSymbols: matchedSymbols.length > 0 ? matchedSymbols : [DREAM_SYMBOLS[0], DREAM_SYMBOLS[2]],
    dominantArchetype,
    subconsciousMessage: `这个梦境展现了你在【${emotionTone || '近期现实'}】层面的深层心理补偿。你的潜意识正通过具象化的隐喻，提醒你关注那些在白天被理性压抑的真实情感。`,
    activeImaginationPrompt: `今晚入睡前，闭上双眼，在脑海中重新重现这个梦境的最高潮画面。尝试在心灵剧场中向前走一步，问那个最引人注目的意象：“你为什么在此时来到我的梦中？你想带给我什么启示？”然后静候内心的第一声回应。`
  };
}
