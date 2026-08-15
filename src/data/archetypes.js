// Master Holographic Synthesis Engine (科学与玄学·全息灵心双镜综合引擎)
// Integrates MBTI/Jungian Functions, Astrology Big Three, Tarot Archetypes, I-Ching Hexagram, Dream Subconscious, and Philosophy

export function generateHolisticSoulReport({
  mbtiResult,
  natalChart,
  tarotCards = [],
  ichingResult,
  dreamResult,
  philosophyResult
}) {
  // Safe defaults if some tests are not yet performed
  const typeCode = mbtiResult?.typeCode || 'INFJ';
  const typeProfile = mbtiResult?.typeProfile || {
    title: '心灵先知 / 引路人',
    archetype: '先知 / 精神导师 / 灵魂守护者',
    tarotCard: '女祭司 & 节制',
    astroSign: '双鱼座 / 巨蟹座',
    ichingHexagram: '第24卦 地雷复'
  };

  const sunSign = natalChart?.planets?.find(p => p.id === 'sun')?.sign?.name || '天蝎座';
  const moonSign = natalChart?.planets?.find(p => p.id === 'moon')?.sign?.name || '双鱼座';
  const ascSign = natalChart?.asc?.sign?.name || '射手座';

  const primaryHex = ichingResult?.primaryHexagram || {
    name: '地天泰',
    keywords: ['通泰和谐', '阴阳交融'],
    image: '天地交，泰；后以财成天地之道。'
  };

  const primaryTarot = tarotCards.length > 0 ? tarotCards[0] : {
    name: '女祭司',
    archetype: '阿尼玛 / 潜意识守门人',
    keywords: ['直觉', '隐秘智慧', '内省']
  };

  const primaryPhil = philosophyResult?.primarySchool || {
    name: '存在主义 (Existentialism)',
    coreMotto: '“存在先于本质。你必须为自己定义生命的终极意义。”'
  };

  // Holographic Soul Archetype Matrix Title
  let soulMatrixTitle = '';
  let coreSoulPattern = '';

  if (typeCode.includes('NT')) {
    soulMatrixTitle = '普罗米修斯·深渊智者 (The Prometheus Architect)';
    coreSoulPattern = '以高维理性解构世界，在混沌中点燃真理之火。兼具冷彻的战略洞察与深刻的孤独担当。';
  } else if (typeCode.includes('NF')) {
    soulMatrixTitle = '灵性织梦者·灵魂引路人 (The Ethereal Alchemist)';
    coreSoulPattern = '穿行在现实与理想的界标之间，用真诚与同理心疗愈众生。潜意识充满奇幻诗意与崇高道德光芒。';
  } else if (typeCode.includes('SJ')) {
    soulMatrixTitle = '磐石守望者·秩序祭司 (The Sovereign Guardian)';
    coreSoulPattern = '时间的忠实守护者，用无私的责任与厚重的经验筑造安宁城堡。言出必行，稳如泰山。';
  } else {
    soulMatrixTitle = '风暴弄潮儿·自由游侠 (The Wild Catalyst)';
    coreSoulPattern = '在当下感官与行动的浪潮之巅狂舞，敏锐捕捉机遇，以纯粹生命力撕开一切僵死教条。';
  }

  // Resonance Index calculation based on elemental and functional alignments
  let resonanceScore = 88;
  if (typeCode.includes('N') && (sunSign.includes('水') || sunSign.includes('鱼') || sunSign.includes('瓶') || sunSign.includes('蝎'))) {
    resonanceScore += 6;
  }
  if (typeCode.includes('T') && (primaryPhil.name.includes('理性') || primaryPhil.name.includes('斯多葛'))) {
    resonanceScore += 4;
  }
  resonanceScore = Math.min(resonanceScore, 99);

  return {
    soulMatrixTitle,
    coreSoulPattern,
    resonanceScore,
    dimensions: {
      // 科学面具镜
      scienceMirror: {
        title: '科学心理镜像 (Cognitive Mechanics)',
        mbtiCode: typeCode,
        personalityTitle: typeProfile.title,
        dominantFunction: mbtiResult?.ranking?.[0]?.definition?.name || '内倾直觉 (Ni)',
        heroArchetype: typeProfile.archetype,
        stressTrigger: typeProfile.stressShadow || '在极端重压下容易陷入劣势认知功能的过激反应。',
        rationalGift: typeProfile.growthPath || '在保持核心优势的同时，平衡劣势短板。'
      },
      // 玄学能量镜
      mysticMirror: {
        title: '玄学灵魂图谱 (Metaphysical Blueprint)',
        bigThree: {
          sun: sunSign,
          moon: moonSign,
          rising: ascSign
        },
        tarotSoulCard: primaryTarot.name,
        tarotArchetype: primaryTarot.archetype || '潜意识原型',
        ichingLifeHex: primaryHex.name,
        ichingWisdom: primaryHex.image || primaryHex.judgement,
        wuXingHarmony: '木生火旺，水火既济'
      },
      // 哲学智慧镜
      philosophyMirror: {
        title: '灵魂哲学信条 (Philosophical Credo)',
        schoolName: primaryPhil.name,
        motto: primaryPhil.coreMotto,
        existentialAction: primaryPhil.lifeAdvice || '在不确定的世界中，以知行合一雕刻自性。'
      },
      // 梦境潜意识
      dreamMirror: {
        title: '潜意识回响 (Dream & Subconscious)',
        recentTone: dreamResult?.emotionTone || '澄澈探索与蜕变期盼',
        dominantSymbol: dreamResult?.dominantArchetype || '心灵城堡探索者',
        subconsciousGuidance: dreamResult?.subconsciousMessage || '潜意识正通过微小的情绪波动提醒你重构内在自性的平衡。'
      }
    },
    mentorEpiphany: `【灵心双镜·终极合一启示】\n你的灵魂底色如同“${soulMatrixTitle}”。现代心理学赋予你精密解构自我的【${typeCode}】认知工具，而古老的宇宙星象与周易八卦则向你揭示了【${sunSign}×${primaryHex.name}】的宏阔时空韵律。你无需在“纯理性”与“灵性直觉”之间做痛苦的二元割裂——科学是你行走人间的剑与盾，玄学与哲学是你漫游精神宇宙的羽翼与灯塔。遵循你的本真自性，天地自会与你共鸣！`
  };
}
