import { isConquering, isCreatingGreatestEmpire } from "./score-check";

describe("isConquering()", () => {
  test("is true when the player moves onto an opponent settlement", () => {
    const targetTile: Tile = {
      building: { owner: "enemy1", type: "tower" },
      piece: undefined,
    };

    expect(isConquering({ targetTile, player: "player" })).toEqual(true);
    expect(isConquering({ targetTile, player: "enemy1" })).toEqual(false);
  });
});

describe("isCreatingGreatestEmpire()", () => {
  test("is true when a new settlement gives the player more than anybody else (3 or more)", () => {
    const empires = {
      player: 2,
      enemy1: 0,
      enemy2: 1,
      enemy3: 2,
    };

    expect(
      isCreatingGreatestEmpire({
        empires,
        building: {
          owner: "player",
          type: "tower",
        },
      })
    ).toEqual(true);
    expect(
      isCreatingGreatestEmpire({
        empires,
        building: {
          owner: "enemy1",
          type: "tower",
        },
      })
    ).toEqual(false);
    expect(
      isCreatingGreatestEmpire({
        empires,
        building: {
          owner: "enemy2",
          type: "tower",
        },
      })
    ).toEqual(false);
    expect(
      isCreatingGreatestEmpire({
        empires,
        building: {
          owner: "enemy3",
          type: "tower",
        },
      })
    ).toEqual(true);
  });
});
