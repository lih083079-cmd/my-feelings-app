// MBTI & Jungian Cognitive Functions Calculation Engine

import { MBTI_TYPES } from '../data/mbtiTypes';
import { FUNCTION_DEFINITIONS } from '../data/mbtiQuestions';

// Calculate 8 cognitive function scores from question responses
// responses: array of numbers 1..5 (Strongly Disagree to Strongly Agree)
export function calculateCognitiveFunctions(questions, responses) {
  const scores = {
    Ni: 0,
    Ne: 0,
    Si: 0,
    Se: 0,
    Ti: 0,
    Te: 0,
    Fi: 0,
    Fe: 0
  };

  const counts = {
    Ni: 0,
    Ne: 0,
    Si: 0,
    Se: 0,
    Ti: 0,
    Te: 0,
    Fi: 0,
    Fe: 0
  };

  questions.forEach((q, idx) => {
    const val = responses[idx] || 3; // default neutral 3
    if (scores[q.func] !== undefined) {
      scores[q.func] += val;
      counts[q.func]++;
    }
  });

  // Normalize scores to percentage 0..100
  const normalized = {};
  Object.keys(scores).forEach(f => {
    const count = counts[f] || 1;
    const avg = scores[f] / count; // 1..5
    normalized[f] = Math.round(((avg - 1) / 4) * 100);
  });

  // Calculate 4 MBTI Dichotomies
  // E vs I: (Ne + Se + Te + Fe) vs (Ni + Si + Ti + Fi)
  const E_score = normalized.Ne + normalized.Se + normalized.Te + normalized.Fe;
  const I_score = normalized.Ni + normalized.Si + normalized.Ti + normalized.Fi;
  const letterEI = E_score >= I_score ? 'E' : 'I';

  // S vs N: (Si + Se) vs (Ni + Ne)
  const S_score = normalized.Si + normalized.Se;
  const N_score = normalized.Ni + normalized.Ne;
  const letterSN = N_score >= S_score ? 'N' : 'S';

  // T vs F: (Ti + Te) vs (Fi + Fe)
  const T_score = normalized.Ti + normalized.Te;
  const F_score = normalized.Fi + normalized.Fe;
  const letterTF = T_score >= F_score ? 'T' : 'F';

  // J vs P: Judging (Te/Fe dominant or auxiliary) vs Perceiving (Ne/Se dominant or auxiliary)
  const J_score = normalized.Te + normalized.Fe + normalized.Si + normalized.Ni;
  const P_score = normalized.Ti + normalized.Fi + normalized.Se + normalized.Ne;
  const letterJP = J_score >= P_score ? 'J' : 'P';

  const typeCode = `${letterEI}${letterSN}${letterTF}${letterJP}`;
  const typeProfile = MBTI_TYPES[typeCode] || MBTI_TYPES.INTJ;

  // Build sorted function ranking
  const ranking = Object.entries(normalized)
    .sort((a, b) => b[1] - a[1])
    .map(([func, score]) => ({
      func,
      score,
      definition: FUNCTION_DEFINITIONS[func]
    }));

  return {
    rawScores: scores,
    normalized,
    typeCode,
    typeProfile,
    ranking,
    dichotomies: {
      EI: { E: Math.round((E_score / (E_score + I_score)) * 100), I: Math.round((I_score / (E_score + I_score)) * 100), winner: letterEI },
      SN: { S: Math.round((S_score / (S_score + N_score)) * 100), N: Math.round((N_score / (S_score + N_score)) * 100), winner: letterSN },
      TF: { T: Math.round((T_score / (T_score + F_score)) * 100), F: Math.round((F_score / (T_score + F_score)) * 100), winner: letterTF },
      JP: { J: Math.round((J_score / (J_score + P_score)) * 100), P: Math.round((P_score / (J_score + P_score)) * 100), winner: letterJP }
    }
  };
}
