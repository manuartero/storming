import { isConquering, isCreatingGreatestEmpire } from "./score-check";

describe("isConquering()", () => {
  (
    [
      {
        name: "an opponent settlement",
        targetTile: { building: { owner: "enemy1", type: "tower" } },
        expected: true,
      },
      {
        name: "its own settlement",
        targetTile: { building: { owner: "player", type: "tower" } },
        expected: false,
      },
      { name: "an empty tile", targetTile: {}, expected: false },
    ] as const
  ).forEach(({ name, targetTile, expected }) => {
    test(`moving onto ${name}: ${expected}`, () => {
      expect(isConquering({ targetTile, player: "player" })).toBe(expected);
    });
  });
});

describe("isCreatingGreatestEmpire()", () => {
  const empires = { player: 2, enemy1: 0, enemy2: 1, enemy3: 2 };

  (
    [
      { owner: "player", expected: true, why: "reaches 3, more than anybody" },
      { owner: "enemy3", expected: true, why: "reaches 3, more than anybody" },
      { owner: "enemy2", expected: false, why: "only reaches 2" },
      { owner: "enemy1", expected: false, why: "only reaches 1" },
    ] as const
  ).forEach(({ owner, expected, why }) => {
    test(`a new settlement for ${owner}: ${expected} (${why})`, () => {
      expect(
        isCreatingGreatestEmpire({
          empires,
          building: { owner, type: "tower" },
        })
      ).toBe(expected);
    });
  });

  // #94 will revisit ties: this tests today's behaviour
  test("a tie is not the greatest empire", () => {
    expect(
      isCreatingGreatestEmpire({
        empires: { player: 2, enemy1: 3 },
        building: { owner: "player", type: "tower" },
      })
    ).toBe(false);
  });
});
