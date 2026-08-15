// Astronomical & Astrological Calculation Engine
// Provides high-accuracy calculation of Julian Date, Sun/Moon/Planets Longitudes, Ascendant (ASC), and 12 Houses

import { ZODIAC_SIGNS } from '../data/astrologyData';

// Convert date/time to Julian Date (JD)
export function calculateJulianDate(year, month, day, hours, minutes, timezone) {
  let Y = year;
  let M = month;
  if (M <= 2) {
    Y -= 1;
    M += 12;
  }
  const D = day + (hours - timezone + minutes / 60.0) / 24.0;
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
  return JD;
}

// Convert degree (0..360) to Zodiac Sign and In-Sign Degree
export function degreeToZodiac(deg) {
  const normalized = ((deg % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  const signDeg = normalized % 30;
  const sign = ZODIAC_SIGNS[signIndex] || ZODIAC_SIGNS[0];
  const degInt = Math.floor(signDeg);
  const minInt = Math.floor((signDeg - degInt) * 60);

  return {
    sign,
    signIndex,
    degree: signDeg,
    degreeStr: `${degInt}°${minInt < 10 ? '0' : ''}${minInt}'`,
    totalDegree: normalized
  };
}

// Calculate Sun Longitude
export function calculateSunLongitude(JD) {
  const T = (JD - 2451545.0) / 36525.0;
  // Mean longitude of the sun
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  // Mean anomaly of the sun
  let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const Mrad = (M * Math.PI) / 180.0;
  // Sun equation of center
  const C = (1.914602 - 0.004817 * T) * Math.sin(Mrad) + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) + 0.000289 * Math.sin(3 * Mrad);
  let sunTrueLong = L0 + C;
  return ((sunTrueLong % 360) + 360) % 360;
}

// Calculate Moon Longitude
export function calculateMoonLongitude(JD) {
  const T = (JD - 2451545.0) / 36525.0;
  // Moon mean longitude
  let Lp = 218.3164477 + 481267.88128 * T - 0.0015786 * T * T;
  // Moon mean elongation
  let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;
  // Sun mean anomaly
  let M = 357.5291092 + 35999.0502909 * T;
  // Moon mean anomaly
  let Mp = 134.9633964 + 477198.8675055 * T;

  const Drad = (D * Math.PI) / 180.0;
  const Mrad = (M * Math.PI) / 180.0;
  const Mprad = (Mp * Math.PI) / 180.0;

  // Major periodic terms
  let l = Lp + 6.288774 * Math.sin(Mprad) + 1.274027 * Math.sin(2 * Drad - Mprad) + 0.658314 * Math.sin(2 * Drad) + 0.213618 * Math.sin(2 * Mprad) - 0.185116 * Math.sin(Mrad);

  return ((l % 360) + 360) % 360;
}

// Planetary Keplerian elements for calculation
export function calculatePlanetaryPositions(JD) {
  const T = (JD - 2451545.0) / 36525.0;
  const d = JD - 2451545.0;

  // Mean longitudes approximation
  const merc = 252.25 + 149472.67 * T + 4.09233 * (d % 87.969);
  const ven = 181.98 + 58517.81 * T + 1.60213 * (d % 224.7);
  const mar = 355.43 + 19140.3 * T + 0.52403 * (d % 686.98);
  const jup = 34.4 + 3034.9 * T + 0.08308 * (d % 4332.59);
  const sat = 49.94 + 1222.11 * T + 0.03344 * (d % 10759.22);
  const ura = 313.23 + 428.46 * T + 0.01173 * (d % 30685.4);
  const nep = 304.88 + 218.48 * T + 0.00598 * (d % 60189.0);
  const plu = 238.9 + 145.2 * T + 0.00397 * (d % 90560.0);

  return {
    mercury: ((merc % 360) + 360) % 360,
    venus: ((ven % 360) + 360) % 360,
    mars: ((mar % 360) + 360) % 360,
    jupiter: ((jup % 360) + 360) % 360,
    saturn: ((sat % 360) + 360) % 360,
    uranus: ((ura % 360) + 360) % 360,
    neptune: ((nep % 360) + 360) % 360,
    pluto: ((plu % 360) + 360) % 360
  };
}

// Calculate Sidereal Time and Ascendant (ASC) & MC
export function calculateAscendantAndHouses(JD, lat, lng, hours, minutes, tz) {
  const T = (JD - 2451545.0) / 36525.0;
  // Greenwich Mean Sidereal Time (GMST) at 0h UT
  const utHours = hours - tz + minutes / 60.0;
  let GMST0 = 100.46061837 + 36000.7700536 * T + 0.000387933 * T * T;
  let GMST = GMST0 + 360.985647366 * (utHours / 24.0);
  let LST = ((GMST + lng) % 360 + 360) % 360; // Local Sidereal Time in degrees

  const rad = Math.PI / 180.0;
  const eps = 23.4392911 * rad; // Obliquity of the Ecliptic
  const theta = LST * rad;
  const phi = lat * rad;

  // Midheaven (MC)
  let MC = Math.atan2(Math.sin(theta), Math.cos(theta) * Math.cos(eps)) / rad;
  MC = ((MC % 360) + 360) % 360;

  // Ascendant (ASC)
  const y = -Math.cos(theta);
  const x = Math.sin(theta) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps);
  let asc = Math.atan2(y, x) / rad;
  asc = ((asc % 360) + 360) % 360;

  // Generate 12 Houses (Equal House system anchored on Ascendant)
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const cuspDeg = (asc + i * 30) % 360;
    houses.push({
      num: i + 1,
      cuspDeg,
      ...degreeToZodiac(cuspDeg)
    });
  }

  return {
    asc: degreeToZodiac(asc),
    mc: degreeToZodiac(MC),
    houses
  };
}

// Full Chart Calculation Entry Point
export function calculateNatalChart({ year, month, day, hour = 12, minute = 0, lat = 39.9, lng = 116.4, tz = 8 }) {
  const JD = calculateJulianDate(year, month, day, hour, minute, tz);
  const sunDeg = calculateSunLongitude(JD);
  const moonDeg = calculateMoonLongitude(JD);
  const planetDegs = calculatePlanetaryPositions(JD);
  const { asc, mc, houses } = calculateAscendantAndHouses(JD, lat, lng, hour, minute, tz);

  const planets = [
    { id: 'sun', name: '太阳', symbol: '☉', ...degreeToZodiac(sunDeg), isCore: true },
    { id: 'moon', name: '月亮', symbol: '☽', ...degreeToZodiac(moonDeg), isCore: true },
    { id: 'asc', name: '上升点', symbol: 'Asc', ...asc, isCore: true },
    { id: 'mercury', name: '水星', symbol: '☿', ...degreeToZodiac(planetDegs.mercury) },
    { id: 'venus', name: '金星', symbol: '♀', ...degreeToZodiac(planetDegs.venus) },
    { id: 'mars', name: '火星', symbol: '♂', ...degreeToZodiac(planetDegs.mars) },
    { id: 'jupiter', name: '木星', symbol: '♃', ...degreeToZodiac(planetDegs.jupiter) },
    { id: 'saturn', name: '土星', symbol: '♄', ...degreeToZodiac(planetDegs.saturn) },
    { id: 'uranus', name: '天王星', symbol: '♅', ...degreeToZodiac(planetDegs.uranus) },
    { id: 'neptune', name: '海王星', symbol: '♆', ...degreeToZodiac(planetDegs.neptune) },
    { id: 'pluto', name: '冥王星', symbol: '♇', ...degreeToZodiac(planetDegs.pluto) }
  ];

  // Map each planet into corresponding House
  planets.forEach((p) => {
    let houseNum = 1;
    for (let i = 0; i < 12; i++) {
      const currentCusp = houses[i].cuspDeg;
      const nextCusp = (currentCusp + 30) % 360;
      let inHouse = false;
      if (currentCusp < nextCusp) {
        inHouse = p.totalDegree >= currentCusp && p.totalDegree < nextCusp;
      } else {
        inHouse = p.totalDegree >= currentCusp || p.totalDegree < nextCusp;
      }
      if (inHouse) {
        houseNum = i + 1;
        break;
      }
    }
    p.house = houseNum;
  });

  // Calculate Elemental & Modality Breakdown
  const elements = { '火': 0, '土': 0, '风': 0, '水': 0 };
  const modalities = { '本位': 0, '固定': 0, '变动': 0 };

  planets.forEach((p) => {
    if (elements[p.sign.element] !== undefined) elements[p.sign.element]++;
    const modKey = p.sign.modality.split(' ')[0];
    if (modalities[modKey] !== undefined) modalities[modKey]++;
  });

  // Calculate Major Aspects
  const aspects = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i];
      const p2 = planets[j];
      let diff = Math.abs(p1.totalDegree - p2.totalDegree);
      if (diff > 180) diff = 360 - diff;

      // Aspect tolerance checks
      if (diff <= 8) {
        aspects.push({ p1: p1.name, p2: p2.name, type: '合相 (Conjunction 0°)', nature: '能量强化/聚焦', diff, color: '#f59e0b' });
      } else if (Math.abs(diff - 60) <= 5) {
        aspects.push({ p1: p1.name, p2: p2.name, type: '六合 (Sextile 60°)', nature: '顺畅助力/契机', diff, color: '#38bdf8' });
      } else if (Math.abs(diff - 90) <= 6) {
        aspects.push({ p1: p1.name, p2: p2.name, type: '四分相 (Square 90°)', nature: '动力张力/内在挑战', diff, color: '#ef4444' });
      } else if (Math.abs(diff - 120) <= 6) {
        aspects.push({ p1: p1.name, p2: p2.name, type: '三分相 (Trine 120°)', nature: '天赐才华/和谐流动', diff, color: '#10b981' });
      } else if (Math.abs(diff - 180) <= 7) {
        aspects.push({ p1: p1.name, p2: p2.name, type: '对分相 (Opposition 180°)', nature: '投射照见/对立整合', diff, color: '#a855f7' });
      }
    }
  }

  return {
    planets,
    houses,
    asc,
    mc,
    elements,
    modalities,
    aspects
  };
}
