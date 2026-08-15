// Philosophy Schools, Life Credo Compass, and Philosophical Dilemmas Test
// 涵盖东西方主要哲学流派、先秦道儒禅、斯多葛、存在主义、荒谬主义、康德义务论与阳明心学

export const PHILOSOPHY_SCHOOLS = {
  stoicism: {
    id: 'stoicism',
    name: '斯多葛主义 (Stoicism)',
    representative: '马可·奥勒留 / 爱比克泰德 / 塞涅卡',
    coreMotto: '“接受不能改变的，改变能够改变的，并拥有区分二者的智慧。”',
    keywords: ['控制二分法', '内在从容', '理性自律', '与自然共生'],
    color: '#3b82f6',
    doctrine: '世界的外部事件不受个人意志支配，但我们对事件的判断与态度百分之百归我们自己掌控。不为外界动荡所乱，以坚韧理性保持心灵绝对安宁。',
    lifeAdvice: '当遭遇外界挫折或他人非议时，默念“这在我的控制之内吗？”。若不在，便泰然处之，专注于自己当下的操守与行动。'
  },
  existentialism: {
    id: 'existentialism',
    name: '存在主义 (Existentialism)',
    representative: '萨特 / 加缪 / 克尔凯郭尔 / 尼采',
    coreMotto: '“存在先于本质。你必须为自己定义生命的终极意义。”',
    keywords: ['自由意志', '自主抉择', '拒绝被定义', '向死而生'],
    color: '#ec4899',
    doctrine: '没有任何预设的剧本或神明来赋予人生意义。我们被抛入这个荒谬的世界，正是这种绝对的自由赋予了我们亲手创造自己本质的崇高权利与全部责任。',
    lifeAdvice: '拒绝随波逐流与外界标签。问自己：“如果这是我自主选择的人生，我愿意为此承担全部代价吗？”用每一次选择雕刻你的灵魂。'
  },
  taoism_zen: {
    id: 'taoism_zen',
    name: '道家与东方禅宗 (Taoism & Zen)',
    representative: '老子 / 庄子 / 六祖慧能 / 寒山',
    coreMotto: '“人法地，地法天，天法道，道法自然。上善若水。”',
    keywords: ['道法自然', '无为而治', '齐物逍遥', '空灵当下'],
    color: '#10b981',
    doctrine: '万物皆有其内在自发节律，过度的机巧与执念只会带来内耗。如水般顺应低洼、润泽万物而不争，在物我两忘中体会与宇宙浑然一体的至乐。',
    lifeAdvice: '学会从过度的目标焦虑中抽离，练习“当下即是”的觉察。放下对抗，顺势而为，看似不争，天下莫能与之争。'
  },
  yangming_heart: {
    id: 'yangming_heart',
    name: '阳明心学与古典儒家 (Mind Philosophy & Confucianism)',
    representative: '王阳明 / 孔子 / 孟子',
    coreMotto: '“心即理也，知行合一，致良知。此心光明，亦复何言。”',
    keywords: ['致良知', '知行合一', '心即是理', '事上磨炼'],
    color: '#f59e0b',
    doctrine: '真理不假外求，每个人内在原本具备纯洁无染的良知。知而不行只是未知，唯有在具体的现实困境与事务中淬炼磨砺，方能显发内在光芒。',
    lifeAdvice: '凡事不要只停留在头脑空想，直接在每一件小事上去行笃你的良知判断，事上练心，知行合一。'
  },
  absurdism: {
    id: 'absurdism',
    name: '荒谬主义与超人意志 (Absurdism & Nietzschean Will)',
    representative: '阿尔贝·加缪 / 弗里德里希·尼采',
    coreMotto: '“必须想象西西弗斯是幸福的。凡杀不死我的，必使我更强大。”',
    keywords: ['西西弗斯神话', '悲剧英雄', '热爱命运', '强韧创造'],
    color: '#ef4444',
    doctrine: '承认宇宙本身的冷漠与荒谬，但不陷入虚无放弃，而是以最强烈的热情向荒谬宣战！每一次推石上山，都是人对无意义世界的骄傲胜利。',
    lifeAdvice: '学会 Amor Fati (热爱命运)——无论生活给予你什么打击，都将其视为淬炼生命的燃料，纵情燃烧！'
  },
  kantian_rationalism: {
    id: 'kantian_rationalism',
    name: '康德理性主义与绝对命令 (Kantian Rationalism)',
    representative: '伊曼纽尔·康德 / 笛卡尔',
    coreMotto: '“唯有二者让我常怀敬畏：头顶璀璨的星空，与心中崇高的道德律。”',
    keywords: ['绝对命令', '人是目的而非工具', '道德纯粹', '严谨自律'],
    color: '#8b5cf6',
    doctrine: '人具有崇高的理性尊严，道德是不可动摇的内在自律法则。永远将自己与他人当作神圣的目的本身，而绝不沦为换取利益的工具。',
    lifeAdvice: '在做出重要决策时，设想如果全人类都像你这样行事，这个世界会变得更美好吗？恪守内心的崇高原则。'
  },
  epicureanism: {
    id: 'epicureanism',
    name: '伊壁鸠鲁主义 (Epicureanism & Simplicity)',
    representative: '伊壁鸠鲁 / 卢克莱修',
    coreMotto: '“真正的幸福在于身体的无痛苦与灵魂的无纷扰 (Ataraxia)。”',
    keywords: ['灵魂宁静', '极简生活', '真挚友谊', '消除恐惧'],
    color: '#06b6d4',
    doctrine: '摒弃对无休止权力与奢侈物质的盲目追逐，消除对死亡与神明的迷信恐惧。在几位知心好友、清茶一盏与哲思漫谈中获得最纯粹的宁静享受。',
    lifeAdvice: '给欲望做减法。珍视身边真诚的友谊，在简单的阳光、饮食与自由交谈中找回最踏实的幸福感。'
  }
};

export const PHILOSOPHY_DILEMMA_QUESTIONS = [
  {
    id: 1,
    title: '电车难题与道德锚点 (Trolley Dilemma)',
    scenario: '一辆失控的电车正驶向轨道上的5名无辜工人。你身旁有一个拉杆，拉动它电车将转向侧轨，但侧轨上有1名无辜工人。',
    options: [
      { text: '果断拉下拉杆：以1人换5人，追求总体伤害最小与最大多数福祉。', school: 'existentialism', weight: { existentialism: 2, stoicism: 1 } },
      { text: '绝不主动拉杆：杀戮无辜是绝对不可越过的道德底线，人不可被当作算术工具。', school: 'kantian_rationalism', weight: { kantian_rationalism: 3 } },
      { text: '静观因果：世界自有其复杂业力流转，顺应当下最直接的本能，不强求完美执念。', school: 'taoism_zen', weight: { taoism_zen: 3 } },
      { text: '承担决断并承担代价：无论怎么选都是悲剧，但作为人，我必须自主承担选择的痛苦。', school: 'absurdism', weight: { absurdism: 2, existentialism: 2 } }
    ]
  },
  {
    id: 2,
    title: '体验机器的终极抉择 (Experience Machine)',
    scenario: '科学家发明了一台“完美体验机器”，只要连上神经脑机，你将终身沉浸在无与伦比的美好梦境与绝对快乐中，且毫无副作用，但它不是真实世界。',
    options: [
      { text: '坚决拒绝：我宁愿在真实的世界中经历痛苦与破碎，也不愿在虚假的幻象中虚度。', school: 'existentialism', weight: { existentialism: 3, absurdism: 2 } },
      { text: '毫不犹豫进入：如果快乐是真实可感的，何必执着于外界所谓“客观真实”的虚名？', school: 'epicureanism', weight: { epicureanism: 3 } },
      { text: '此心即真实：真与假本一体两面，重点在于心体是否光明觉照，何处不可修行？', school: 'yangming_heart', weight: { yangming_heart: 3 } },
      { text: '泰然处之：真正的宁静来自内在对念头的掌控，机器内外皆为外物，不以此为喜悲。', school: 'stoicism', weight: { stoicism: 3 } }
    ]
  },
  {
    id: 3,
    title: '面对命运与无法改变的苦难',
    scenario: '当你遭遇突如其来的重大人生挫折、不可抗力的打击或疾病时，你的第一心灵本能是？',
    options: [
      { text: '控制二分法：痛苦已成事实，立刻将心神收拢到“我现在能做好的唯一一件事”上。', school: 'stoicism', weight: { stoicism: 3 } },
      { text: '像西西弗斯一样微笑：命运试图压垮我，而我的傲然站立就是对命运最伟大的反抗！', school: 'absurdism', weight: { absurdism: 3 } },
      { text: '水顺其道：苦难如寒冬枯木，顺应生命的节律，在静默休养中等待来年春风。', school: 'taoism_zen', weight: { taoism_zen: 3 } },
      { text: '事上磨炼：动心忍性，增益其所不能。一切苦难皆是上天交付给我淬炼良知的考场。', school: 'yangming_heart', weight: { yangming_heart: 3 } }
    ]
  },
  {
    id: 4,
    title: '生命的终极意义从何而来？',
    scenario: '在夜深人静仰望星空时，你认为人活一世的意义究竟是由什么决定的？',
    options: [
      { text: '宇宙本身毫无既定意义，意义是我用自己的热爱与勇气一笔一划创造出来的。', school: 'existentialism', weight: { existentialism: 3 } },
      { text: '万物同根，意义在于融入天道自然的运转，不争不执，活出本真天性。', school: 'taoism_zen', weight: { taoism_zen: 3 } },
      { text: '在于践行崇高的道德法则与义务，成为一个真正有尊严、值得被爱戴的理性存在。', school: 'kantian_rationalism', weight: { kantian_rationalism: 3 } },
      { text: '在于致良知、知行合一，用一颗纯正的光明心去照亮身边的人与世界。', school: 'yangming_heart', weight: { yangming_heart: 3 } }
    ]
  },
  {
    id: 5,
    title: '你理想中的至乐状态是怎样的？',
    scenario: '在没有任何现实压力的情况下，哪种生活方式最能让你体会到灵魂的充实？',
    options: [
      { text: '三五好友，闲居庭院，读好书，品清茗，无病无灾，心灵宁静无争 (Ataraxia)。', school: 'epicureanism', weight: { epicureanism: 3 } },
      { text: '投身于宏大壮丽的事业，迎着风暴创造奇迹，在巅峰与极限中燃烧生命。', school: 'absurdism', weight: { absurdism: 3 } },
      { text: '内省觉照，行知合一，在日常工作中洞彻万物之理，此心坦荡安详。', school: 'yangming_heart', weight: { yangming_heart: 2, stoicism: 2 } },
      { text: '纵浪大化中，不喜亦不惧。行到水穷处，坐看云起时。', school: 'taoism_zen', weight: { taoism_zen: 3 } }
    ]
  }
];

// 计算哲学流派倾向
export function calculatePhilosophyProfile(answers) {
  const scores = {
    stoicism: 0,
    existentialism: 0,
    taoism_zen: 0,
    yangming_heart: 0,
    absurdism: 0,
    kantian_rationalism: 0,
    epicureanism: 0
  };

  answers.forEach((ansIndex, qIndex) => {
    const question = PHILOSOPHY_DILEMMA_QUESTIONS[qIndex];
    if (question && question.options[ansIndex]) {
      const opt = question.options[ansIndex];
      if (opt.weight) {
        Object.entries(opt.weight).forEach(([school, weight]) => {
          if (scores[school] !== undefined) {
            scores[school] += weight;
          }
        });
      }
    }
  });

  // Sort schools by score
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primarySchoolKey = sorted[0][0];
  const secondarySchoolKey = sorted[1][0];

  return {
    scores,
    primarySchool: PHILOSOPHY_SCHOOLS[primarySchoolKey] || PHILOSOPHY_SCHOOLS.stoicism,
    secondarySchool: PHILOSOPHY_SCHOOLS[secondarySchoolKey] || PHILOSOPHY_SCHOOLS.taoism_zen,
    ranking: sorted.map(([k, score]) => ({
      school: PHILOSOPHY_SCHOOLS[k],
      score
    }))
  };
}
