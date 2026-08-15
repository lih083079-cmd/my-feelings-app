// Jungian Cognitive Functions (荣格认知八维) & MBTI 题库与测验体系
// 覆盖 Ni(内倾直觉), Ne(外倾直觉), Si(内倾感觉), Se(外倾感觉), Ti(内倾思维), Te(外倾思维), Fi(内倾情感), Fe(外倾情感)

export const FUNCTION_DEFINITIONS = {
  Ni: {
    name: '内倾直觉 (Introverted Intuition)',
    short: '洞察本质 / 预见远景',
    archetype: '预言者 / 战略家',
    desc: '善于提炼底层逻辑与未来趋势，追求万事万物的深层终极模式。',
    color: '#8b5cf6'
  },
  Ne: {
    name: '外倾直觉 (Extraverted Intuition)',
    short: '发散联想 / 探索可能',
    archetype: '探险家 / 创想家',
    desc: '善于在看似无关的事物间建立新颖连接，热衷探索无限可能性与新奇点子。',
    color: '#ec4899'
  },
  Si: {
    name: '内倾感觉 (Introverted Sensing)',
    short: '经验沉淀 / 秩序守护',
    archetype: '守护者 / 史官',
    desc: '珍视过往经验与内在身心感知，强调细节精确、传统传承与可靠秩序。',
    color: '#3b82f6'
  },
  Se: {
    name: '外倾感觉 (Extraverted Sensing)',
    short: '当下临场 / 感官沉浸',
    archetype: '行动派 / 体验家',
    desc: '敏锐捕捉当下环境的物理细节与危机契机，享受具身行动与感官刺激。',
    color: '#f59e0b'
  },
  Ti: {
    name: '内倾思维 (Introverted Thinking)',
    short: '逻辑自洽 / 解构原理',
    archetype: '学者 / 架构师',
    desc: '构建精密的个人内在逻辑框架，追求真理与原理的无懈可击与极简。',
    color: '#06b6d4'
  },
  Te: {
    name: '外倾思维 (Extraverted Thinking)',
    short: '高效执行 / 系统组织',
    archetype: '指挥官 / 操盘手',
    desc: '注重客观事实、数据指标、行动效率与组织资源的落地优化。',
    color: '#10b981'
  },
  Fi: {
    name: '内倾情感 (Introverted Feeling)',
    short: '真实内核 / 道德纯粹',
    archetype: '理想家 / 诗人',
    desc: '坚守内在真实价值观与深沉情感体验，追求自我一致性与心灵纯粹。',
    color: '#f43f5e'
  },
  Fe: {
    name: '外倾情感 (Extraverted Feeling)',
    short: '群体共鸣 / 关系和谐',
    archetype: '外交家 / 疗愈者',
    desc: '敏锐共情他人情绪与群体氛围，注重人际连接、情感支持与社会价值和谐。',
    color: '#a855f7'
  }
};

export const MBTI_QUESTIONS = [
  // Ni 题目
  {
    id: 1,
    func: 'Ni',
    text: '我经常能在纷繁复杂的信息中突然“顿悟”出事物的核心走向或潜在结局。',
    dimension: '直觉洞察'
  },
  {
    id: 2,
    func: 'Ni',
    text: '相比于眼前正在发生的事情，我更常沉浸在对未来十年甚至终极意义的推演中。',
    dimension: '愿景推演'
  },
  {
    id: 3,
    func: 'Ni',
    text: '我常常坚信某种预感或直觉，哪怕当下还没有足够的具体证据来向他人证明。',
    dimension: '象征直觉'
  },

  // Ne 题目
  {
    id: 4,
    func: 'Ne',
    text: '一个概念往往能瞬间激发我大脑中迸发出数十个全新的点子和奇妙联想。',
    dimension: '发散思维'
  },
  {
    id: 5,
    func: 'Ne',
    text: '我喜欢不断探索未知领域或尝试新路线，重复旧方案会让我感到索然无味。',
    dimension: '开拓探索'
  },
  {
    id: 6,
    func: 'Ne',
    text: '我擅长在头脑风暴中充当灵感催化剂，连接看似毫不相干的两个领域。',
    dimension: '跨界碰撞'
  },

  // Si 题目
  {
    id: 7,
    func: 'Si',
    text: '我非常依赖过往验证过的成功经验，习惯在做事时保持条理与固定流程。',
    dimension: '经验法则'
  },
  {
    id: 8,
    func: 'Si',
    text: '我对细节与过往事件的记忆非常清晰（如当时的环境、日期、身体感受）。',
    dimension: '细节锚定'
  },
  {
    id: 9,
    func: 'Si',
    text: '稳定的可预期性与熟悉的环境能给我带来极大的安全感与踏实感。',
    dimension: '秩序守护'
  },

  // Se 题目
  {
    id: 10,
    func: 'Se',
    text: '在突发紧急事件面前，我能第一时间凭借敏锐的本能做出最直接有效的身体反应。',
    dimension: '临场决断'
  },
  {
    id: 11,
    func: 'Se',
    text: '我热衷于全身心沉浸在当下的感官世界中（如美食、极限运动、音乐现场、视觉盛宴）。',
    dimension: '当下沉浸'
  },
  {
    id: 12,
    func: 'Se',
    text: '与其空谈理论设想，我更倾向于挽起袖子直接动手去实操与体验。',
    dimension: '行动第一'
  },

  // Ti 题目
  {
    id: 13,
    func: 'Ti',
    text: '面对任何观点，我总是本能地去剖析其逻辑结构，寻找定义上的漏洞与矛盾。',
    dimension: '批判解构'
  },
  {
    id: 14,
    func: 'Ti',
    text: '我渴望搞清楚底层原理“它究竟是如何运转的”，即便这套知识暂时没有现实用处。',
    dimension: '原理追寻'
  },
  {
    id: 15,
    func: 'Ti',
    text: '在做决策时，我能非常冷彻地将情感因素剥离，仅依据客观因果关系进行推演。',
    dimension: '纯粹理性'
  },

  // Te 题目
  {
    id: 16,
    func: 'Te',
    text: '我极其看重效率、结果指标与落地执行力，反感无意义的内耗与拖延。',
    dimension: '目标达成'
  },
  {
    id: 17,
    func: 'Te',
    text: '我擅长为混乱的项目制定清晰的时间节点、责任分工和标准化衡量体系。',
    dimension: '系统架构'
  },
  {
    id: 18,
    func: 'Te',
    text: '当需要解决问题时，我会直奔最有效率的方案，即使手段显得有些直接硬朗。',
    dimension: '实干魄力'
  },

  // Fi 题目
  {
    id: 19,
    func: 'Fi',
    text: '对我而言，活得真实、忠于内心道德良知与自我认同，远比符合社会期望更重要。',
    dimension: '内在真诚'
  },
  {
    id: 20,
    func: 'Fi',
    text: '我拥有极其深沉而敏锐的情感世界，但通常只向极少数真正信任的人敞开。',
    dimension: '情感深度'
  },
  {
    id: 21,
    func: 'Fi',
    text: '我能深刻理解每个人独特的心灵痛苦，尊重每个个体独一无二的存在方式。',
    dimension: '个体共情'
  },

  // Fe 题目
  {
    id: 22,
    func: 'Fe',
    text: '我能瞬间觉察到房间里微妙的氛围流动以及身边每个人的情绪起伏。',
    dimension: '氛围共振'
  },
  {
    id: 23,
    func: 'Fe',
    text: '我乐于扮演调和者，主动照顾大家的情感需求，维护群体的融洽与彼此温暖。',
    dimension: '人际润滑'
  },
  {
    id: 24,
    func: 'Fe',
    text: '看到别人获得支持、安慰或由衷微笑，会让我产生强烈的自我价值感。',
    dimension: '利他奉献'
  }
];
