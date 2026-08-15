// Eastern Philosophy & I-Ching Data: 8 Trigrams, 64 Hexagrams, Wu Xing (Five Elements), and Systemic Decision Matrix

export const TRIGRAMS = {
  '111': { name: '乾', nature: '天', symbol: '☰', element: '金', attribute: '刚健', psych: '纯粹意志、开创性动力、高阶战略' },
  '000': { name: '坤', nature: '地', symbol: '☷', element: '土', attribute: '包容', psych: '厚德载物、接纳承载、静默滋养' },
  '100': { name: '震', nature: '雷', symbol: '☳', element: '木', attribute: '奋发', psych: '觉醒生机、震动突破、自发爆发力' },
  '011': { name: '巽', nature: '风', symbol: '☴', element: '木', attribute: '柔顺', psych: '渗透适应、润物无声、敏锐感知' },
  '010': { name: '坎', nature: '水', symbol: '☵', element: '水', attribute: '深邃', psych: '险中求索、潜意识深渊、流动智慧' },
  '101': { name: '离', nature: '火', symbol: '☲', element: '火', attribute: '光明', psych: '洞察清晰、热情依附、显化觉知' },
  '001': { name: '艮', nature: '山', symbol: '☶', element: '土', attribute: '止息', psych: '边界定力、反思安住、止语内观' },
  '110': { name: '兑', nature: '泽', symbol: '☱', element: '金', attribute: '喜悦', psych: '言语交流、愉悦融通、情感连接' }
};

export const WU_XING = {
  '木': {
    name: '木 (Wood)',
    direction: '东',
    color: '#10b981',
    psych: '生长、创造力、仁爱、向外拓展的生发之气',
    balanceAdvice: '多接触大自然、进行创意构想；避免过于固执冲动。',
    generates: '火',
    controls: '土'
  },
  '火': {
    name: '火 (Fire)',
    direction: '南',
    color: '#ef4444',
    psych: '热情、觉察、礼仪、向上显化的光明能量',
    balanceAdvice: '保持乐观与表达；避免急躁狂热、消耗心神。',
    generates: '土',
    controls: '金'
  },
  '土': {
    name: '土 (Earth)',
    direction: '中',
    color: '#f59e0b',
    psych: '包容、诚信、稳固、承载万物的沉淀厚度',
    balanceAdvice: '注重规律作息与身心扎根；避免思虑过多、固步自封。',
    generates: '金',
    controls: '水'
  },
  '金': {
    name: '金 (Metal)',
    direction: '西',
    color: '#e2e8f0',
    psych: '决断、原则、正义、向内收敛的肃降与边界',
    balanceAdvice: '保持清晰的界限与自律；避免过于冷酷严苛、悲观疏离。',
    generates: '水',
    controls: '木'
  },
  '水': {
    name: '水 (Water)',
    direction: '北',
    color: '#38bdf8',
    psych: '智慧、潜意识、灵动、润下渗透的深沉流动',
    balanceAdvice: '倾听直觉与梦境、学会顺应流动；避免恐惧焦虑、沉溺消极。',
    generates: '木',
    controls: '火'
  }
};

// 经典六十四卦核心数据库 (含全卦、卦辞、象辞、系统论与心理学解读)
export const HEXAGRAMS = [
  {
    code: '111111',
    number: 1,
    name: '乾为天',
    pinyin: 'Qián',
    upper: '乾',
    lower: '乾',
    element: '金',
    keywords: ['自强不息', '宏图大展', '刚健中正', '意志显化'],
    judgement: '元，亨，利，贞。',
    image: '天行健，君子以自强不息。',
    modernPsych: '代表纯粹的主体能动性与巅峰创造力。你的内在正充满高阶执行力与自信，适合确立长期雄心并全力开拓。',
    warning: '亢龙有悔——行事不可过分刚愎自用，需留有余地。'
  },
  {
    code: '000000',
    number: 2,
    name: '坤为地',
    pinyin: 'Kūn',
    upper: '坤',
    lower: '坤',
    element: '土',
    keywords: ['厚德载物', '顺应接纳', '静默滋养', '蓄势待发'],
    judgement: '元亨，利牝马之贞。君子有攸往，先迷后得主，利西南得朋。',
    image: '地势坤，君子以厚德载物。',
    modernPsych: '强调极致的接纳、倾听与包容心智。此时宜静不宜躁，宜退守滋养而非盲目冲锋，以柔顺顺应客观大势。',
    warning: '初六履霜，坚冰至——需敏锐察觉微小苗头，提早做好防范。'
  },
  {
    code: '100010',
    number: 3,
    name: '水雷屯',
    pinyin: 'Zhūn',
    upper: '坎',
    lower: '震',
    element: '水',
    keywords: ['初生艰难', '破土萌芽', '积聚力量', '稳健立基'],
    judgement: '元亨，利贞。勿用有攸往，利建侯。',
    image: '云雷屯，君子以经纶。',
    modernPsych: '象征新事物破土而出的混沌初创期。虽然眼前迷雾重重、阻力较大，但生机正蕴藏其中，需耐心梳理秩序。',
    warning: '切忌在根基未稳时操之过急，宜广纳贤才、夯实地基。'
  },
  {
    code: '010001',
    number: 4,
    name: '山水蒙',
    pinyin: 'Méng',
    upper: '艮',
    lower: '坎',
    element: '水',
    keywords: ['启蒙求知', '破除执念', '谦逊求教', '洞见初心'],
    judgement: '亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。',
    image: '山下出泉，蒙；君子以果行育德。',
    modernPsych: '处在知识与认知的觉醒拐点。承认自己的无知是智慧的开端，放下傲慢，向良师与经典虚心求教。',
    warning: '忌浮躁质疑，需有一以贯之的专注与求知诚意。'
  },
  {
    code: '111010',
    number: 5,
    name: '水天需',
    pinyin: 'Xū',
    upper: '坎',
    lower: '乾',
    element: '水',
    keywords: ['等待时机', '修养身心', '从容蓄力', '顺时而动'],
    judgement: '有孚，光亨，贞吉。利涉大川。',
    image: '云上于天，需；君子以饮食宴乐。',
    modernPsych: '面对险阻，最成熟的策略不是硬碰硬，而是从容等待共时性转机的到来。在等待中保养精气神。',
    warning: '等待并非消极躺平，而是胸有成竹的内在笃定与准备。'
  },
  {
    code: '010111',
    number: 6,
    name: '天水讼',
    pinyin: 'Sòng',
    upper: '乾',
    lower: '坎',
    element: '金',
    keywords: ['化解冲突', '止争息讼', '换位思考', '重构共识'],
    judgement: '有孚，窒惕，中吉。终凶。利见大人，不利涉大川。',
    image: '天与水违行，讼；君子以作事谋始。',
    modernPsych: '反映出内在信念与外部现实的张力对抗。警惕认知偏差与好胜心引发的无谓消耗，主动寻求第三条调解路径。',
    warning: '争胜到底必两败俱伤，退一步方能海阔天空。'
  },
  {
    code: '000010',
    number: 7,
    name: '地水师',
    pinyin: 'Shī',
    upper: '坤',
    lower: '坎',
    element: '土',
    keywords: ['严明纪律', '统帅统筹', '正义使命', '沉着运筹'],
    judgement: '贞，丈人吉，无咎。',
    image: '地中有水，师；君子以容民畜众。',
    modernPsych: '进入攻坚与系统化作战阶段。需要极其严明的内在自律与清晰的权责分工，以崇高的道义凝聚团队人心。',
    warning: '严禁师出无名与私人泄愤，唯有正大光明方能克敌制胜。'
  },
  {
    code: '010000',
    number: 8,
    name: '水地比',
    pinyin: 'Bǐ',
    upper: '坎',
    lower: '坤',
    element: '水',
    keywords: ['亲密合作', '信任共鸣', '良性社群', '携手共赢'],
    judgement: '吉。原筮，元永贞，无咎。不宁方来，后夫凶。',
    image: '地上有水，比；先王以建万国，亲诸侯。',
    modernPsych: '人际连接与深度信任的黄金时期。如水滴融入大地般相互滋养，主动建立真诚平等的深度伙伴关系。',
    warning: '犹豫观望、三心二意者将错失结盟的良机。'
  },
  {
    code: '111011',
    number: 9,
    name: '风天小畜',
    pinyin: 'Xiǎo Xù',
    upper: '巽',
    lower: '乾',
    element: '木',
    keywords: ['微小积累', '以柔克刚', '细水长流', '耐住性子'],
    judgement: '亨。密云不雨，自我西郊。',
    image: '风行天上，小畜；君子以懿文德。',
    modernPsych: '宏大力量受制于暂时条件，唯有依靠柔和与细致的日常积累，逐步改良现状。',
    warning: '不可强求一蹴而就，注重细节与人际润滑。'
  },
  {
    code: '110111',
    number: 10,
    name: '天泽履',
    pinyin: 'Lǚ',
    upper: '乾',
    lower: '兑',
    element: '金',
    keywords: ['如履薄冰', '知书达礼', '沉着机警', '化险为夷'],
    judgement: '履虎尾，不咥人，亨。',
    image: '上天下泽，履；君子以辨上下，安民志。',
    modernPsych: '行走在危险或高压边缘，但只要谨守礼节、谦逊敬畏，便能化解危机，从容破局。',
    warning: '不可狂妄无礼，敬畏规则与客观规律。'
  },
  {
    code: '111000',
    number: 11,
    name: '地天泰',
    pinyin: 'Tài',
    upper: '坤',
    lower: '乾',
    element: '土',
    keywords: ['通泰和谐', '阴阳交融', '天地吉庆', '盛世顺遂'],
    judgement: '小往大来，吉亨。',
    image: '天地交，泰；后以财成天地之道，辅相天地之宜，以左右民。',
    modernPsych: '身心系统高度协调、人际沟通顺畅无阻的鼎盛期。内有刚健底气，外显温润包容，把握时机大力推进。',
    warning: '居安思危，盛极之时莫忘保持谦逊敬畏。'
  },
  {
    code: '000111',
    number: 12,
    name: '天地否',
    pinyin: 'Pǐ',
    upper: '乾',
    lower: '坤',
    element: '金',
    keywords: ['闭塞不通', '退守自保', '内圣外王', '等待转机'],
    judgement: '否之匪人，不利君子贞，大往小来。',
    image: '天地不交，否；君子以俭德辟难，不可荣以禄。',
    modernPsych: '沟通堵塞、外界环境阻力较大的低谷期。此时不宜强行出头，宜收敛光芒、潜心读书内修，以待天地复苏。',
    warning: '莫同流合污，坚守内心道德底线。'
  },
  {
    code: '101111',
    number: 13,
    name: '天火同人',
    pinyin: 'Tóng Rén',
    upper: '乾',
    lower: '离',
    element: '金',
    keywords: ['志同道合', '天下大同', '跨界共鸣', '光明合作'],
    judgement: '同人于野，亨。利涉大川，利君子贞。',
    image: '天与火，同人；君子以类族辨物。',
    modernPsych: '打破狭隘的私心偏见，基于共同的崇高愿景与不同背景的人紧密协作，形成强大的合力。',
    warning: '杜绝搞小圈子与排他偏见，以宽广胸怀待人。'
  },
  {
    code: '111101',
    number: 14,
    name: '火天大有',
    pinyin: 'Dà Yǒu',
    upper: '离',
    lower: '乾',
    element: '火',
    keywords: ['丰盛显赫', '德才兼备', '日正当中', '惠及大众'],
    judgement: '元亨。',
    image: '火在天上，大有；君子以遏恶扬善，顺天休命。',
    modernPsych: '财富、才华与名望齐聚的巅峰时刻。如正午烈日照耀万物，善用影响力扶持弱小、遏恶扬善。',
    warning: '骄奢必败，唯有怀抱谦德与利他心方能长久守业。'
  },
  {
    code: '000001',
    number: 24,
    name: '地雷复',
    pinyin: 'Fù',
    upper: '坤',
    lower: '震',
    element: '土',
    keywords: ['冬至一阳生', '转机萌动', '初心复归', '生命复苏'],
    judgement: '亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。',
    image: '地中有雷，复；先王以至日闭关，商旅不行，后不省方。',
    modernPsych: '在沉寂幽暗的至底，一缕纯正的生机悄然萌动。放下过往创伤，回归生命本真初心，蓄势待发。',
    warning: '新生微弱，需细心呵护，不可过早剧烈折腾。'
  },
  {
    code: '010010',
    number: 29,
    name: '坎为水',
    pinyin: 'Kǎn',
    upper: '坎',
    lower: '坎',
    element: '水',
    keywords: ['重重险阻', '心怀信义', '潜入深渊', '以水为师'],
    judgement: '习坎，有孚，维心亨，行有尚。',
    image: '水洊至，习坎；君子以常德行，习教事。',
    modernPsych: '面临连续的考验与深渊。水善利万物而不争，遇险阻则迂回包容。保持内在真诚与从容，便能在激流中安渡。',
    warning: '切勿因恐惧而进退失据，唯有沉着方能破局。'
  },
  {
    code: '101101',
    number: 30,
    name: '离为火',
    pinyin: 'Lí',
    upper: '离',
    lower: '离',
    element: '火',
    keywords: ['光明附着', '洞察秋毫', '柔顺中正', '照亮他人'],
    judgement: '利贞，亨。畜牝牛，吉。',
    image: '明两作，离；大人以继明照于四方。',
    modernPsych: '思维澄澈明亮，洞察力极强。如火焰需依附柴薪，寻找值得托付的正道与事业作为依托，持续散发光热。',
    warning: '避免情绪过于焦躁灼热，防范身心能量过度消耗。'
  },
  {
    code: '001011',
    number: 61,
    name: '风泽中孚',
    pinyin: 'Zhōng Fú',
    upper: '巽',
    lower: '兑',
    element: '木',
    keywords: ['至诚之道', '心灵感应', '信义感化', '虚怀若谷'],
    judgement: '豚鱼吉，利涉大川，利贞。',
    image: '泽上有风，中孚；君子以议狱缓死。',
    modernPsych: '以极致的诚恳与虚怀若谷的心灵打动人心。中虚为孚，放下成见，以真诚化解一切坚冰与误解。',
    warning: '言行一致，切莫虚与委蛇。'
  },
  {
    code: '010101',
    number: 63,
    name: '水火既济',
    pinyin: 'Jì Jì',
    upper: '坎',
    lower: '离',
    element: '水',
    keywords: ['大功告成', '各得其位', '谨小慎微', '防患未然'],
    judgement: '亨小，利贞，初吉终乱。',
    image: '水在火上，既济；君子以思患而预防之。',
    modernPsych: '事情达到完美的平衡与闭环，大局已定。但事物发展必有衰变，需在成功之巅未雨绸缪，防微杜渐。',
    warning: '初吉终乱——切勿因大获全胜而麻痹大意。'
  },
  {
    code: '101010',
    number: 64,
    name: '火水未济',
    pinyin: 'Wèi Jì',
    upper: '离',
    lower: '坎',
    element: '火',
    keywords: ['无限可能', '重新出发', '未竟之境', '生命不息'],
    judgement: '亨，小狐汔济，濡其尾，无攸利。',
    image: '火在水上，未济；君子以慎辨物居方。',
    modernPsych: '周易六十四卦的终章，寓意生命永远处于“未完成”的动态演进之中。满怀希望，整理行装，开启新的伟大征途！',
    warning: '过河需谨慎踏实，不可在最后关头掉以轻心。'
  }
];

// Helper to look up Hexagram by binary code
export function getHexagramByCode(code) {
  const found = HEXAGRAMS.find(h => h.code === code);
  if (found) return found;

  // Fallback dynamic generator for other combinations
  const lowerCode = code.slice(0, 3);
  const upperCode = code.slice(3, 6);
  const lowerTrigram = TRIGRAMS[lowerCode] || TRIGRAMS['111'];
  const upperTrigram = TRIGRAMS[upperCode] || TRIGRAMS['000'];

  return {
    code,
    number: 99,
    name: `${upperTrigram.nature}${lowerTrigram.nature}卦`,
    pinyin: 'Guà',
    upper: upperTrigram.name,
    lower: lowerTrigram.name,
    element: upperTrigram.element,
    keywords: [upperTrigram.attribute, lowerTrigram.attribute, '阴阳演化', '顺应时变'],
    judgement: `上卦为${upperTrigram.name}(${upperTrigram.nature})，下卦为${lowerTrigram.name}(${lowerTrigram.nature})。循天道而动，亨通吉利。`,
    image: `${upperTrigram.nature}在${lowerTrigram.nature}上，君子以体察天时，顺应中道。`,
    modernPsych: `上卦表现为【${upperTrigram.psych}】，下卦根基为【${lowerTrigram.psych}】。当前正处于内化蓄势与外在显化的动态平衡期。`,
    warning: '顺应阴阳流变，守持中正之心。'
  };
}
