import type { SSQTicket, SSQMultiple, SSQDantuo, RandomSource } from "./types";

const RED_MIN = 1;
const RED_MAX = 33;
const RED_COUNT = 6;

const BLUE_MIN = 1;
const BLUE_MAX = 16;

const defaultRng: RandomSource = () => Math.random();

/**
 * 随机整数 [min, max]
 */
function randomInt(min: number, max: number, rng: RandomSource): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/**
 * Fisher–Yates 洗牌
 */
function shuffle<T>(arr: T[], rng: RandomSource): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 组合函数：从数组中取 k 个
 */
function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];

  const result: T[][] = [];

  for (let i = 0; i <= arr.length - k; i++) {
    const head = arr[i];
    const tails = combinations(arr.slice(i + 1), k - 1);
    for (const tail of tails) {
      result.push([head, ...tail]);
    }
  }

  return result;
}

/**
 * 生成一注随机双色球
 */
export function generateSSQ(rng: RandomSource = defaultRng): SSQTicket {
  const redPool = Array.from({ length: RED_MAX }, (_, i) => i + 1);

  const reds = shuffle(redPool, rng)
    .slice(0, RED_COUNT)
    .sort((a, b) => a - b);

  const blue = randomInt(BLUE_MIN, BLUE_MAX, rng);

  return { reds, blue };
}

/**
 * 批量生成随机双色球
 */
export function generateSSQBatch(
  count: number,
  rng: RandomSource = defaultRng,
): SSQTicket[] {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error("count must be a positive integer");
  }

  const result: SSQTicket[] = [];
  for (let i = 0; i < count; i++) {
    result.push(generateSSQ(rng));
  }
  return result;
}

/**
 * 校验一注号码是否合法
 */
export function validateSSQ(ticket: SSQTicket): boolean {
  const { reds, blue } = ticket;

  if (reds.length !== RED_COUNT) return false;

  const redSet = new Set(reds);
  if (redSet.size !== RED_COUNT) return false;

  for (const r of reds) {
    if (r < RED_MIN || r > RED_MAX) return false;
  }

  if (blue < BLUE_MIN || blue > BLUE_MAX) return false;

  return true;
}

/**
 * 复式生成
 */
export function generateFromMultiple(multiple: SSQMultiple): SSQTicket[] {
  const reds = [...new Set(multiple.reds)].sort((a, b) => a - b);
  const blues = [...new Set(multiple.blues)];

  if (reds.length < 7 || reds.length > 20) {
    throw new Error("reds must be between 7 and 20");
  }

  if (blues.length < 1 || blues.length > 16) {
    throw new Error("blues must be between 1 and 16");
  }

  const redCombs = combinations(reds, 6);
  const result: SSQTicket[] = [];

  for (const red of redCombs) {
    for (const blue of blues) {
      result.push({ reds: red, blue });
    }
  }

  return result;
}

/**
 * 胆拖生成
 */
export function generateFromDantuo(dantuo: SSQDantuo): SSQTicket[] {
  const redDan = [...new Set(dantuo.redDan)].sort((a, b) => a - b);
  const redTuo = [...new Set(dantuo.redTuo)].sort((a, b) => a - b);

  if (redDan.length < 1 || redDan.length > 5) {
    throw new Error("redDan must be between 1 and 5");
  }

  if (redTuo.length < 2) {
    throw new Error("redTuo must have at least 2 numbers");
  }

  const needFromTuo = 6 - redDan.length;
  if (redTuo.length < needFromTuo) {
    throw new Error("not enough redTuo numbers");
  }

  const tuoCombs = combinations(redTuo, needFromTuo);

  let blues: number[];
  if (dantuo.blueDan !== undefined) {
    blues = [dantuo.blueDan];
  } else if (dantuo.blueTuo && dantuo.blueTuo.length > 0) {
    blues = [...new Set(dantuo.blueTuo)];
  } else {
    throw new Error("blueDan or blueTuo is required");
  }

  const result: SSQTicket[] = [];

  for (const tuo of tuoCombs) {
    const reds = [...redDan, ...tuo].sort((a, b) => a - b);
    for (const blue of blues) {
      result.push({ reds, blue });
    }
  }

  return result;
}
