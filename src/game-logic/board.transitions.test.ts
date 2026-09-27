import { emptyBoard } from "game-context/empty-board";
import {
  withBuilding,
  withMove,
  withoutWalls,
  withRecruit,
} from "./board.transitions";

const soldier: Piece = { type: "soldier", owner: "enemy3" };
const tower: Building = { type: "tower", owner: "enemy1", hasWalls: true };

describe("withBuilding()", () => {
  test("places the building and keeps the rest of the tile", () => {
    const board = withRecruit({
      board: emptyBoard,
      tile: "1,2",
      piece: soldier,
    });

    const next = withBuilding({ board, tile: "1,2", building: tower });

    expect(next["1,2"]).toEqual({ ...board["1,2"], building: tower });
    expect(board["1,2"].building).toBeUndefined();
  });
});

describe("withMove()", () => {
  const board = withRecruit({ board: emptyBoard, tile: "0,2", piece: soldier });

  test("moves the piece to the target tile", () => {
    const next = withMove({ board, piece: soldier, from: "0,2", to: "1,2" });

    expect(next["0,2"].piece).toBeUndefined();
    expect(next["1,2"].piece).toEqual(soldier);
    expect(board["0,2"].piece).toEqual(soldier);
  });

  test("takes over the building on the target tile", () => {
    const withTower = withBuilding({ board, tile: "1,2", building: tower });

    const next = withMove({
      board: withTower,
      piece: soldier,
      from: "0,2",
      to: "1,2",
    });

    expect(next["1,2"].building).toEqual({ ...tower, owner: "enemy3" });
    expect(withTower["1,2"].building).toEqual(tower);
  });
});

describe("withoutWalls()", () => {
  test("removes the walls and keeps the building", () => {
    const board = withBuilding({
      board: emptyBoard,
      tile: "1,2",
      building: tower,
    });

    const next = withoutWalls({ board, tile: "1,2" });

    expect(next["1,2"].building).toEqual({ ...tower, hasWalls: false });
    expect(board["1,2"].building).toEqual(tower);
  });

  test("returns the same board when there is no building", () => {
    expect(withoutWalls({ board: emptyBoard, tile: "1,2" })).toBe(emptyBoard);
  });
});

describe("withRecruit()", () => {
  test("places the piece and keeps the building", () => {
    const board = withBuilding({
      board: emptyBoard,
      tile: "0,3",
      building: tower,
    });

    const next = withRecruit({ board, tile: "0,3", piece: soldier });

    expect(next["0,3"]).toEqual({ ...board["0,3"], piece: soldier });
    expect(board["0,3"].piece).toBeUndefined();
  });
});
