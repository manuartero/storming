import { isAttackingWalls } from "./walls";

describe("isAttackingWalls()", () => {
  test("is true when the player moves onto a walled opponent settlement", () => {
    const targetTile: Tile = {
      building: { owner: "enemy1", type: "tower", hasWalls: true },
    };

    expect(isAttackingWalls({ targetTile, player: "player" })).toEqual(true);
  });

  test("is false for the player's own walled settlement", () => {
    const targetTile: Tile = {
      building: { owner: "player", type: "tower", hasWalls: true },
    };

    expect(isAttackingWalls({ targetTile, player: "player" })).toEqual(false);
  });

  test("is false for an opponent settlement without walls", () => {
    const targetTile: Tile = {
      building: { owner: "enemy1", type: "tower", hasWalls: false },
    };

    expect(isAttackingWalls({ targetTile, player: "player" })).toEqual(false);
  });

  test("is false for a tile without a settlement", () => {
    const targetTile: Tile = { piece: { owner: "enemy1", type: "soldier" } };

    expect(isAttackingWalls({ targetTile, player: "player" })).toEqual(false);
  });
});
