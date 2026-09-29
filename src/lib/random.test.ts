import { createRandom } from "./random";

function firstThree(seed: number) {
  const random = createRandom(seed);
  return [random.next(), random.next(), random.next()];
}

function numerically(list: readonly number[]) {
  return [...list].sort((a, b) => a - b);
}

describe("createRandom()", () => {
  // Pinned on purpose: a savegame replays this exact sequence, so it must not
  // change silently.
  test("the seed 42 gives the mulberry32 sequence", () => {
    expect(firstThree(42)).toEqual([
      0.6011037519201636, 0.44829055899754167, 0.8524657934904099,
    ]);
  });

  [{ seed: 0 }, { seed: 42 }, { seed: 2 ** 32 - 1 }].forEach(({ seed }) => {
    test(`the seed ${seed} gives the same sequence every time`, () => {
      expect(firstThree(seed)).toEqual(firstThree(seed));
    });
  });

  test("different seeds give different sequences", () => {
    expect(firstThree(1)).not.toEqual(firstThree(2));
  });

  test("a generator created from state() resumes the same sequence", () => {
    const random = createRandom(42);
    random.next();
    const resumed = createRandom(random.state());

    expect([resumed.next(), resumed.next()]).toEqual([
      0.44829055899754167, 0.8524657934904099,
    ]);
  });

  test("int(6) returns integers in [0, 6)", () => {
    const random = createRandom(42);

    expect(Array.from({ length: 10 }, () => random.int(6))).toEqual([
      3, 2, 5, 4, 1, 3, 1, 3, 5, 2,
    ]);
  });

  test("pick() returns an element of the list", () => {
    expect(createRandom(42).pick(["red", "green", "blue"])).toEqual("green");
  });

  test("pick() throws on an empty list", () => {
    expect(() => createRandom(42).pick([])).toThrow(RangeError);
  });

  test("shuffle() reorders the list", () => {
    expect(createRandom(42).shuffle([1, 2, 3, 4, 5, 6, 7, 8])).toEqual([
      3, 8, 2, 1, 7, 6, 4, 5,
    ]);
  });

  [
    { name: "an empty deck", list: [] as number[] },
    { name: "a one-card deck", list: [1] },
    { name: "a 28-card deck", list: Array.from({ length: 28 }, (_, i) => i) },
  ].forEach(({ name, list }) => {
    test(`shuffle() keeps every element of ${name}`, () => {
      const shuffled = createRandom(9).shuffle(list);

      expect(numerically(shuffled)).toEqual(list);
    });
  });

  test("shuffle() does not mutate the list", () => {
    const list = [1, 2, 3, 4, 5];

    createRandom(42).shuffle(list);

    expect(list).toEqual([1, 2, 3, 4, 5]);
  });
});
