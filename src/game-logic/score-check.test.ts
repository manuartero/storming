import {
  greatestEmpireHolder,
  greatestEmpireTaker,
  isConquering,
} from "./score-check";

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

  test("#93: doesn't log", () => {
    jest.mocked(console.info).mockClear();

    isConquering({
      targetTile: { building: { owner: "enemy1", type: "tower" } },
      player: "player",
    });

    expect(console.info).not.toHaveBeenCalled();
  });
});

describe("greatestEmpireHolder()", () => {
  (
    [
      {
        name: "strictly the most settlements takes the point",
        empires: { player: 3, enemy1: 2, enemy2: 1 },
        current: undefined,
        expected: "player",
      },
      {
        name: "there is no minimum size",
        empires: { player: 1, enemy1: 0 },
        current: undefined,
        expected: "player",
      },
      {
        name: "the point moves to a new strict leader",
        empires: { player: 3, enemy1: 1 },
        current: "enemy1",
        expected: "player",
      },
      {
        name: "a tie leaves the point with its holder",
        empires: { player: 2, enemy1: 2 },
        current: "enemy1",
        expected: "enemy1",
      },
      {
        name: "a tie gives the point to nobody",
        empires: { player: 2, enemy1: 2, enemy2: 1 },
        current: undefined,
        expected: undefined,
      },
      {
        name: "a tie between others leaves the point with its holder",
        empires: { player: 3, enemy1: 3, enemy2: 2 },
        current: "enemy2",
        expected: "enemy2",
      },
    ] as const
  ).forEach(({ name, empires, current, expected }) => {
    test(name, () => {
      expect(greatestEmpireHolder({ empires, current })).toBe(expected);
    });
  });
});

describe("greatestEmpireTaker()", () => {
  const board = {
    "-4,0": { building: { owner: "player", type: "tower" } },
    "0,-3": { building: { owner: "player", type: "castle" } },
    "1,0": { building: { owner: "enemy1", type: "tower" } },
  } as Board;
  const holding = (holder: PlayerType) =>
    (["player", "enemy1"] as const).map((player) => ({
      player,
      points: 0,
      greatestEmpirePoint: player === holder,
    }));

  (
    [
      { holder: "enemy1", expected: "player", why: "the point moves" },
      { holder: "player", expected: undefined, why: "the holder keeps it" },
    ] as const
  ).forEach(({ holder, expected, why }) => {
    test(`${holder} holds the point, 2 settlements to 1: ${why}`, () => {
      expect(greatestEmpireTaker({ board, players: holding(holder) })).toBe(
        expected
      );
    });
  });
});
