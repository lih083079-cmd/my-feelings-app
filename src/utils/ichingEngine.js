// I-Ching Divination & Hexagram Calculation Engine
// Simulates traditional three-coin casting method (三钱法) and calculates Primary Hexagram (本卦), Changing Lines (变爻), and Transformed Hexagram (变卦)

import { getHexagramByCode } from '../data/ichingData';

// Toss 3 coins once
// Heads (Yang) = 3, Tails (Yin) = 2
// Sums:
// 6 = 2+2+2: 老阴 (Old Yin, Changing)
// 7 = 3+2+2: 少阳 (Young Yang, Static)
// 8 = 3+3+2: 少阴 (Young Yin, Static)
// 9 = 3+3+3: 老阳 (Old Yang, Changing)
export function tossCoins() {
  const coins = [
    Math.random() > 0.5 ? 3 : 2,
    Math.random() > 0.5 ? 3 : 2,
    Math.random() > 0.5 ? 3 : 2
  ];
  const sum = coins[0] + coins[1] + coins[2];

  let name = '';
  let bit = 0; // 0 for Yin, 1 for Yang
  let isChanging = false;
  let changedBit = 0;
  let symbol = '';

  switch (sum) {
    case 6:
      name = '老阴 (变爻 ✕)';
      bit = 0;
      isChanging = true;
      changedBit = 1;
      symbol = '⚋ ➔ ⚊';
      break;
    case 7:
      name = '少阳 (静爻)';
      bit = 1;
      isChanging = false;
      changedBit = 1;
      symbol = '⚊';
      break;
    case 8:
      name = '少阴 (静爻)';
      bit = 0;
      isChanging = false;
      changedBit = 0;
      symbol = '⚋';
      break;
    case 9:
      name = '老阳 (变爻 ◯)';
      bit = 1;
      isChanging = true;
      changedBit = 0;
      symbol = '⚊ ➔ ⚋';
      break;
    default:
      name = '少阳';
      bit = 1;
      changedBit = 1;
      symbol = '⚊';
  }

  return {
    coins,
    sum,
    name,
    bit,
    isChanging,
    changedBit,
    symbol
  };
}

// Generate complete Hexagram from 6 lines (from Bottom line 1 to Top line 6)
export function compileHexagram(lines) {
  if (lines.length !== 6) return null;

  // Binary string for Primary Hexagram (line 1 to line 6)
  const primaryCode = lines.map(l => l.bit).join('');
  const changedCode = lines.map(l => l.changedBit).join('');
  const changingCount = lines.filter(l => l.isChanging).length;

  const primaryHexagram = getHexagramByCode(primaryCode);
  const transformedHexagram = changingCount > 0 ? getHexagramByCode(changedCode) : null;

  // Mutual Hexagram (互卦: lines 2,3,4 as lower, lines 3,4,5 as upper)
  const mutualCode = `${lines[1].bit}${lines[2].bit}${lines[3].bit}${lines[2].bit}${lines[3].bit}${lines[4].bit}`;
  const mutualHexagram = getHexagramByCode(mutualCode);

  return {
    lines,
    primaryCode,
    changedCode,
    changingCount,
    primaryHexagram,
    transformedHexagram,
    mutualHexagram
  };
}
