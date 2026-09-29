// mulberry32: its whole state is one 32-bit integer, so `state()` fed back to
// `createRandom()` resumes the exact same sequence (e.g. after a savegame load).
export function createRandom(seed: number) {
  let state = seed >>> 0;

  function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function int(max: number) {
    return Math.floor(next() * max);
  }

  function pick<T>(list: readonly T[]) {
    if (list.length === 0) {
      throw new RangeError("cannot pick from an empty list");
    }
    return list[int(list.length)];
  }

  function shuffle<T>(list: readonly T[]) {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = int(i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  return { next, int, pick, shuffle, state: () => state };
}

export type Random = ReturnType<typeof createRandom>;
