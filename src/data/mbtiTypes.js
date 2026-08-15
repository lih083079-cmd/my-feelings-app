// 16 MBTI Personality Profiles & Jungian Cognitive Function Stacks
// 包含认知功能层级 (主导/辅助/第三/劣势), 荣格原型, 阴影/压力循环, 以及玄学对应图谱

export const MBTI_TYPES = {
  INTJ: {
    code: 'INTJ',
    title: '战略构想家 / 建筑师',
    tagline: '“站在未来回望现实，用纯粹意志构建新秩序。”',
    functions: ['Ni', 'Te', 'Fi', 'Se'],
    archetype: '智者 / 隐士 / 战略操盘手',
    tarotCard: '隐士 (The Hermit) & 魔术师 (The Magician)',
    astroSign: '天蝎座 / 摩羯座 (深邃洞察与宏伟野心)',
    ichingHexagram: '第1卦 乾为天 / 第20卦 风地观',
    philosophySchool: '理性主义 / 斯多葛主义',
    traits: [
      '极强的长远战略预见力与系统解构能力',
      '对自己与他人皆有极高标准，追求智识自洽',
      '表面冷峻理性，内在对纯粹道德与忠诚有着极深执念',
      '天然抗拒低效社交与无意义形式主义'
    ],
    growthPath: '学会在执行 Te 时倾听 Fi 内在价值观，并有意识激活 Se 接纳当下现实的不完美。',
    stressShadow: 'Se 劣势暴走：在极端压力下可能陷入暴饮暴食、感官放纵或对外界琐碎失控的焦虑。'
  },
  INTP: {
    code: 'INTP',
    title: '真理探索者 / 逻辑学者',
    tagline: '“解构宇宙的底层代码，在混沌中建立纯粹逻辑体系。”',
    functions: ['Ti', 'Ne', 'Si', 'Fe'],
    archetype: '学者 / 炼金术士 / 宇宙哲人',
    tarotCard: '女祭司 (The High Priestess)',
    astroSign: '水瓶座 / 双子座 (理性探究与抽象思维)',
    ichingHexagram: '第4卦 山水蒙 / 第56卦 火山旅',
    philosophySchool: '怀疑主义 / 认识论批判',
    traits: [
      '对事物底层运行逻辑拥有无止境的好奇心',
      '擅长跨领域发散思考，快速发现概念破绽',
      '极其尊重客观事实，对盲从权威充满本能怀疑',
      '内在思维宇宙极其宏大，但对外表达简练精辟'
    ],
    growthPath: '避免在 Ne 的无限可能性中陷入拖延，强化 Si 落地沉淀与 Fe 情感共鸣能力。',
    stressShadow: 'Fe 劣势暴走：突如其来的情绪失控，怀疑自身价值或过度敏感于他人的评价。'
  },
  ENTJ: {
    code: 'ENTJ',
    title: '领袖统帅 / 指挥官',
    tagline: '“将宏大愿景转化为现实版图，破除阻碍，决断前行。”',
    functions: ['Te', 'Ni', 'Se', 'Fi'],
    archetype: '君王 / 统帅 / 战车御者',
    tarotCard: '皇帝 (The Emperor)',
    astroSign: '白羊座 / 狮子座 (开创意志与王者气度)',
    ichingHexagram: '第14卦 火天大有 / 第7卦 地水师',
    philosophySchool: '实用主义 / 尼采超人意志',
    traits: [
      '强大的战略决断力与资源调配组织能力',
      '目标导向极其明确，天生的危机应对与领导核心',
      '善于整合 Ni 宏观洞见与 Se 敏捷行动',
      '追求卓越，敢于打破陈规推陈出新'
    ],
    growthPath: '深挖 Fi 内在共情力，避免将人工具化，学会倾听他人的情感诉求。',
    stressShadow: 'Fi 劣势爆发：感到孤立无援、情感脆弱崩溃，怀疑自身奋斗的真实意义。'
  },
  ENTP: {
    code: 'ENTP',
    title: '智慧辩者 / 灵感破局者',
    tagline: '“颠覆思维定势，在可能性的激流中玩味智慧。”',
    functions: ['Ne', 'Ti', 'Fe', 'Si'],
    archetype: '愚者 / 赫尔墨斯 / 创想顽童',
    tarotCard: '愚者 (The Fool) & 命运之轮 (Wheel of Fortune)',
    astroSign: '双子座 / 射手座 (自由敏锐与灵性开拓)',
    ichingHexagram: '第49卦 泽火革 / 第43卦 泽天夬',
    philosophySchool: '苏格拉底辩证法 / 解构主义',
    traits: [
      '思维跳跃如闪电，极具幽默感与犀利口才',
      '天生热衷挑战既有规则与思维盲区',
      '跨界连接不同学科与新奇概念的绝顶高手',
      '充满好奇与冒险精神，享受智力角逐'
    ],
    growthPath: '培养 Si 专注完成单一闭环，不要只停留在点子发散阶段。',
    stressShadow: 'Si 劣势陷阱：陷入琐碎焦虑、疑病倾向或对细节产生病态苛求。'
  },
  INFJ: {
    code: 'INFJ',
    title: '心灵先知 / 引路人',
    tagline: '“洞见灵魂的幽微光芒，默默守护人类的崇高理想。”',
    functions: ['Ni', 'Fe', 'Ti', 'Se'],
    archetype: '先知 / 精神导师 / 灵魂守护者',
    tarotCard: '女祭司 (The High Priestess) & 节制 (Temperance)',
    astroSign: '双鱼座 / 巨蟹座 (深邃灵性与博大同理心)',
    ichingHexagram: '第24卦 地雷复 / 第61卦 风泽中孚',
    philosophySchool: '唯心主义 / 存在主义人文关怀',
    traits: [
      '极强的超感洞察力与深层共情，能轻易看穿伪装',
      '怀揣深刻的理想主义，追求生命本真与心灵救赎',
      '言语温柔却有坚定不可动摇的内在原则',
      '兼具深刻哲思（Ni-Ti）与温暖疗愈力（Fe）'
    ],
    growthPath: '为自己的共情设立边界（防止能量耗竭），增强 Se 身体扎根与现实落地。',
    stressShadow: 'Se 劣势发作：在极端精神重压下沉溺感官刺激或强迫性整理物理空间。'
  },
  INFP: {
    code: 'INFP',
    title: '灵魂诗人 / 调停者',
    tagline: '“在繁芜世界中守候心灵的花园，用真诚疗愈万物。”',
    functions: ['Fi', 'Ne', 'Si', 'Te'],
    archetype: '治愈者 / 游侠 / 纯白之灵',
    tarotCard: '星星 (The Star) & 倒吊人 (The Hanged Man)',
    astroSign: '双鱼座 / 金牛座 (浪漫诗性与坚定初心)',
    ichingHexagram: '第11卦 地天泰 / 第22卦 山火贲',
    philosophySchool: '浪漫主义 / 现象学内在体验',
    traits: [
      '极其深邃纯粹的道德内核与审美敏锐度',
      '对弱小与痛苦有着天然同理心与治愈本能',
      '富有奇幻丰富的想象力与独特艺术创造力',
      '绝不妥协自身内在价值体系与真实性'
    ],
    growthPath: '将丰沛的灵感转化为 Te 现实行动，勇敢将内在光芒呈现给世界。',
    stressShadow: 'Te 劣势暴走：变得极具攻击性、挑剔指责他人或对效率产生绝望苛责。'
  },
  ENFJ: {
    code: 'ENFJ',
    title: '精神导师 / 主人公',
    tagline: '“以光热照亮同伴潜能，凝聚众心，共赴崇高使命。”',
    functions: ['Fe', 'Ni', 'Se', 'Ti'],
    archetype: '太阳神 / 传道者 / 精神领袖',
    tarotCard: '太阳 (The Sun) & 教皇 (The Hierophant)',
    astroSign: '狮子座 / 天秤座 (博爱光芒与平衡谐和)',
    ichingHexagram: '第13卦 天火同人 / 第37卦 风火家人',
    philosophySchool: '儒家仁爱 / 共同体主义',
    traits: [
      '极强的感染力与人际凝聚力，能鼓舞他人成长',
      '深刻理解人性的光明与幽暗，善于化解冲突',
      '将集体福祉与个人成长视为至高追求',
      '兼具战略前瞻性与真挚情感关怀'
    ],
    growthPath: '学会为自我留出独处空间，避免过度迎合他人而耗尽内在能量。',
    stressShadow: 'Ti 劣势陷阱：变得过分冷酷挑剔、过分反刍自责，陷入逻辑死胡同。'
  },
  ENFP: {
    code: 'ENFP',
    title: '灵性探索家 / 竞选者',
    tagline: '“在生命无限的可能性中起舞，唤醒世界沉睡的热情。”',
    functions: ['Ne', 'Fi', 'Te', 'Si'],
    archetype: '自由之翼 / 催化师 / 魔法精灵',
    tarotCard: '愚者 (The Fool) & 命运之轮 (Wheel of Fortune)',
    astroSign: '射手座 / 水瓶座 (热爱自由与灵性飞扬)',
    ichingHexagram: '第16卦 雷地豫 / 第57卦 巽为风',
    philosophySchool: '存在主义自由哲学 / 达达主义',
    traits: [
      '洋溢着对生命的狂热好奇心与充沛创造力',
      '能敏锐感知他人未被开发的才华并真诚鼓励',
      '讨厌教条约束，渴望真诚与深度的精神碰撞',
      '生活充满自发性、灵动与温暖戏剧感'
    ],
    growthPath: '学会筛选聚焦最重要的几项热情，建立 Si 日常秩序与习惯以保卫灵感。',
    stressShadow: 'Si 劣势陷阱：在压力下突然对细节病态焦虑、陷入过往失误的泥潭。'
  },
  ISTJ: {
    code: 'ISTJ',
    title: '秩序守护者 / 物流师',
    tagline: '“以笃定坚守契约与秩序，时间会证明踏实的力量。”',
    functions: ['Si', 'Te', 'Fi', 'Ne'],
    archetype: '守护者 / 正义天平 / 奠基磐石',
    tarotCard: '正义 (Justice) & 教皇 (The Hierophant)',
    astroSign: '金牛座 / 处女座 (稳固务实与精益求精)',
    ichingHexagram: '第2卦 坤为地 / 第15卦 地山谦',
    philosophySchool: '经验主义 / 康德义务论',
    traits: [
      '极高的责任感、诚信度与按部就班的专注力',
      '重视事实数据与历史经验，擅长守护系统稳定',
      '言出必行，做事严谨踏实，绝不弄虚作假',
      '内在感情深沉稳固，是值得托付的终身依靠'
    ],
    growthPath: '在面对突发变革时尝试 Ne 的开放性，接纳新尝试与不确定性。',
    stressShadow: 'Ne 劣势焦虑：在未知环境下产生灾难化联想，担心一切都会失控崩塌。'
  },
  ISFJ: {
    code: 'ISFJ',
    title: '温暖守望者 / 护卫者',
    tagline: '“润物细无声的守护，用细致温柔撑起人间安宁。”',
    functions: ['Si', 'Fe', 'Ti', 'Ne'],
    archetype: '慈母 / 守护天使 / 奉献者',
    tarotCard: '皇后 (The Empress)',
    astroSign: '巨蟹座 / 金牛座 (深情照拂与温暖包容)',
    ichingHexagram: '第31卦 泽山咸 / 第48卦 水风井',
    philosophySchool: '关怀伦理学 / 儒家孝悌与礼乐',
    traits: [
      '对身边人的实际需求与细微情绪具有惊人记忆力',
      '默默奉献，乐于承担繁复细致的幕后支持工作',
      '极具同理心与耐力，营造安全温馨的家庭/团队氛围',
      '忠诚可靠，尊重传统价值与深厚友谊'
    ],
    growthPath: '学会明确表达自身需求并学会拒绝，避免因过度自我牺牲而委屈内耗。',
    stressShadow: 'Ne 劣势爆发：对未来充满灾难性担忧，对各种未知的潜在危险杯弓蛇影。'
  },
  ESTJ: {
    code: 'ESTJ',
    title: '铁面执行官 / 总经理',
    tagline: '“建立高效秩序与清晰标准，推动组织使命无坚不摧。”',
    functions: ['Te', 'Si', 'Ne', 'Fi'],
    archetype: '执政官 / 秩序之神 / 建造者',
    tarotCard: '皇帝 (The Emperor) & 战车 (The Chariot)',
    astroSign: '摩羯座 / 白羊座 (钢铁意志与组织治理)',
    ichingHexagram: '第34卦 雷天大壮 / 第21卦 火雷噬嗑',
    philosophySchool: '功利主义 / 法家经世致用',
    traits: [
      '非凡的项目统筹执行力与雷厉风行的领导风范',
      '重视规则、条理与可衡量成果，信奉以结果说话',
      '善于在混乱局面中迅速建立高效运转的流程体系',
      '勇敢承担责任，坚决捍卫团队核心利益'
    ],
    growthPath: '发展 Fi 深度同理心，在管理中给予他人犯错与个性化发展的空间。',
    stressShadow: 'Fi 劣势爆发：情绪爆发、觉得所有人都在背叛或轻视自己的辛勤付出。'
  },
  ESFJ: {
    code: 'ESFJ',
    title: '温暖东道主 / 执政官',
    tagline: '“用热情与关怀连接每颗心灵，构筑彼此守望的港湾。”',
    functions: ['Fe', 'Si', 'Ne', 'Ti'],
    archetype: '欢聚之神 / 社区织网人 / 慈爱长者',
    tarotCard: '教皇 (The Hierophant) & 恋人 (The Lovers)',
    astroSign: '天秤座 / 巨蟹座 (融洽和乐与社交关怀)',
    ichingHexagram: '第19卦 地泽临 / 第45卦 泽地萃',
    philosophySchool: '社会契约论 / 仁爱互助哲学',
    traits: [
      '极其出色的社交情商与氛围调动能力',
      '体贴入微，总能在第一时间照顾到每个人的舒适感',
      '热衷参与社区建设，维系大家庭与集体的稳固和谐',
      '信守承诺，在人际交往中慷慨大方且极具亲和力'
    ],
    growthPath: '增强 Ti 批判性思维，在遭遇外界批评时保持客观，不被他人情绪所奴役。',
    stressShadow: 'Ti 劣势陷阱：陷入过分苛责与逻辑偏执，产生极度尖刻的防卫心理。'
  },
  ISTP: {
    code: 'ISTP',
    title: '硬核工匠 / 鉴赏家',
    tagline: '“冷眼洞悉机理，精准操控工具，在动静之间驾驭现实。”',
    functions: ['Ti', 'Se', 'Ni', 'Fe'],
    archetype: '游侠刺客 / 机关大师 / 孤勇者',
    tarotCard: '魔术师 (The Magician) & 节制 (Temperance)',
    astroSign: '天蝎座 / 水瓶座 (冷静机敏与精湛技艺)',
    ichingHexagram: '第40卦 雷水解 / 第29卦 坎为水',
    philosophySchool: '道家无为而治 / 禅宗即心即物',
    traits: [
      '冷静客观的分析大脑与超群的物理动手能力',
      '危机时刻心如止水，能瞬间找到最高效的破局解法',
      '热爱自由与个人空间，反感繁文缛节与情绪化勒索',
      '在专业技术领域拥有追求极致工匠精神的本领'
    ],
    growthPath: '适度发展 Fe 沟通技巧，向在乎的人主动传递温暖与安全感。',
    stressShadow: 'Fe 劣势失控：在长期压抑后突然爆发激烈情绪，或做出令人错愕的疏离举动。'
  },
  ISFP: {
    code: 'ISFP',
    title: '灵性艺术家 / 探险家',
    tagline: '“以全部生命体验纯粹美感，在静谧中谱写诗意存在。”',
    functions: ['Fi', 'Se', 'Ni', 'Te'],
    archetype: '森林之灵 / 自然吟游者 / 纯真匠人',
    tarotCard: '皇后 (The Empress) & 倒吊人 (The Hanged Man)',
    astroSign: '金牛座 / 双鱼座 (自然审美与随性自由)',
    ichingHexagram: '第52卦 艮为山 / 第58卦 兑为泽',
    philosophySchool: '美学现象学 / 道法自然',
    traits: [
      '极高的艺术感性与对当下美景的天然共振',
      '温和谦逊，尊重所有生命形态的自由与个性',
      '不爱争辩，习惯用作品、行动或无声的陪伴表达爱',
      '拥有纯粹真实的内心世界与随遇而安的生活态度'
    ],
    growthPath: '发展 Te 逻辑规划，为自己的艺术灵感与生活确立长期稳固的目标。',
    stressShadow: 'Te 劣势爆发：对自己极其苛刻，变得挑剔暴躁，感到被现实规则无情碾压。'
  },
  ESTP: {
    code: 'ESTP',
    title: '巅峰弄潮儿 / 企业家',
    tagline: '“生于浪潮之巅，敢于押注当下，在行动中撕开无限生机。”',
    functions: ['Se', 'Ti', 'Fe', 'Ni'],
    archetype: '角斗士 / 风暴追逐者 / 冒险王',
    tarotCard: '命运之轮 (Wheel of Fortune) & 战车 (The Chariot)',
    astroSign: '白羊座 / 射手座 (勇武果敢与冒险热忱)',
    ichingHexagram: '第51卦 震为雷 / 第55卦 雷火丰',
    philosophySchool: '生命哲学 / 实用行动主义',
    traits: [
      '无与伦比的现场观察力、胆识与敏锐的商机嗅觉',
      '善于把握当下机会，在风险与危机中如鱼得水',
      '直爽幽默，充满魅力，极具说服力与感染力',
      '务实解决问题，反感一切空洞无物的理论说教'
    ],
    growthPath: '发展 Ni 战略前瞻，考虑行动的长远后果，避免短期冲动决策。',
    stressShadow: 'Ni 劣势发作：产生悲观宿命论情绪，感到未来的阴霾无法驱散。'
  },
  ESFP: {
    code: 'ESFP',
    title: '光芒表演家 / 娱乐家',
    tagline: '“生命是一场盛大的庆典，以热情与欢乐点燃每一个瞬间。”',
    functions: ['Se', 'Fi', 'Te', 'Ni'],
    archetype: '太阳神使 / 狂欢缪斯 / 光之舞者',
    tarotCard: '太阳 (The Sun) & 星星 (The Star)',
    astroSign: '狮子座 / 双子座 (光芒四射与喜悦活力)',
    ichingHexagram: '第30卦 离为火 / 第16卦 雷地豫',
    philosophySchool: '享乐主义 (伊壁鸠鲁) / 生命美学',
    traits: [
      '天生的舞台焦点与气氛担当，洋溢着无限生机',
      '敏锐感知他人情绪并用真诚幽默带去欢笑与抚慰',
      '热爱生活的一切美妙细节（美食、时尚、音乐、艺术）',
      '脚踏实地，富有同情心，乐于与大家分享美好'
    ],
    growthPath: '培养 Ni 深度反思，在繁华热闹之余留出沉淀内在智慧的静修时刻。',
    stressShadow: 'Ni 劣势发作：感到被虚无感吞噬，对未来产生莫名的恐惧与焦虑。'
  }
};
