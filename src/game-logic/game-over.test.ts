import {
  findWinner,
  isConqueringLastSettlement,
  victoryPoints,
} from "./game-over";

const status = (
  player: PlayerType,
  points: number,
  greatestEmpirePoint = false
): PlayerStatus => ({ player, points, greatestEmpirePoint });

describe("victoryPoints()", () => {
  test("adds the rotating victory point to the permanent points", () => {
    expect(victoryPoints(status("player", 3))).toBe(3);
    expect(victoryPoints(status("player", 3, true))).toBe(4);
  });
});

describe("isConqueringLastSettlement()", () => {
  const empires = { player: 2, enemy1: 1, enemy2: 2, enemy3: 0 };

  test("is true when the target is an opponent's only settlement", () => {
    const targetTile: Tile = { building: { owner: "enemy1", type: "tower" } };

    expect(
      isConqueringLastSettlement({ targetTile, player: "player", empires })
    ).toBe(true);
  });

  test("is false when the opponent has more settlements", () => {
    const targetTile: Tile = { building: { owner: "enemy2", type: "tower" } };

    expect(
      isConqueringLastSettlement({ targetTile, player: "player", empires })
    ).toBe(false);
  });

  test("is false for the player's own settlement or an empty tile", () => {
    const ownTile: Tile = { building: { owner: "enemy1", type: "tower" } };

    expect(
      isConqueringLastSettlement({
        targetTile: ownTile,
        player: "enemy1",
        empires,
      })
    ).toBe(false);
    expect(
      isConqueringLastSettlement({ targetTile: {}, player: "player", empires })
    ).toBe(false);
  });
});

describe("findWinner()", () => {
  test("nobody wins below 7 victory points", () => {
    const players = [
      status("player", 6),
      status("enemy1", 5, true),
      status("enemy2", 0),
      status("enemy3", 0),
    ];

    expect(findWinner({ players })).toBe(undefined);
  });

  test("a player with 7 victory points wins", () => {
    const players = [
      status("player", 6),
      status("enemy1", 7),
      status("enemy2", 0),
      status("enemy3", 0),
    ];

    expect(findWinner({ players })).toBe("enemy1");
  });

  test("the rotating victory point counts towards the 7", () => {
    const players = [
      status("player", 6),
      status("enemy1", 6, true),
      status("enemy2", 0),
      status("enemy3", 0),
    ];

    expect(findWinner({ players })).toBe("enemy1");
  });

  test("conquering the last settlement wins, whatever the points", () => {
    const players = [
      status("player", 1),
      status("enemy1", 7),
      status("enemy2", 0),
      status("enemy3", 0),
    ];

    expect(findWinner({ players, conqueror: "player" })).toBe("player");
  });
});
