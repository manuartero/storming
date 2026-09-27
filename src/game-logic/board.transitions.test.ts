import { emptyBoard } from "game-context/empty-board";
import {
  boardAfterBuild,
  boardAfterMove,
  boardAfterWallsDestroyed,
  boardAfterRecruit,
} from "./board.transitions";

const soldier: Piece = { type: "soldier", owner: "enemy3" };
const tower: Building = { type: "tower", owner: "enemy1", hasWalls: true };

describe("boardAfterBuild()", () => {
  test("places the building and keeps the rest of the tile", () => {
    const board = boardAfterRecruit({
      board: emptyBoard,
      tile: "1,2",
      piece: soldier,
    });

    const next = boardAfterBuild({ board, tile: "1,2", building: tower });

    expect(next["1,2"]).toEqual({ ...board["1,2"], building: tower });
    expect(board["1,2"].building).toBeUndefined();
  });
});

describe("boardAfterMove()", () => {
  const board = boardAfterRecruit({
    board: emptyBoard,
    tile: "0,2",
    piece: soldier,
  });

  test("moves the piece to the target tile", () => {
    const next = boardAfterMove({
      board,
      piece: soldier,
      from: "0,2",
      to: "1,2",
    });

    expect(next["0,2"].piece).toBeUndefined();
    expect(next["1,2"].piece).toEqual(soldier);
    expect(board["0,2"].piece).toEqual(soldier);
  });

  test("takes over the building on the target tile", () => {
    const withTower = boardAfterBuild({ board, tile: "1,2", building: tower });

    const next = boardAfterMove({
      board: withTower,
      piece: soldier,
      from: "0,2",
      to: "1,2",
    });

    expect(next["1,2"].building).toEqual({ ...tower, owner: "enemy3" });
    expect(withTower["1,2"].building).toEqual(tower);
  });
});

describe("boardAfterWallsDestroyed()", () => {
  test("removes the walls and keeps the building", () => {
    const board = boardAfterBuild({
      board: emptyBoard,
      tile: "1,2",
      building: tower,
    });

    const next = boardAfterWallsDestroyed({ board, tile: "1,2" });

    expect(next["1,2"].building).toEqual({ ...tower, hasWalls: false });
    expect(board["1,2"].building).toEqual(tower);
  });

  test("returns the same board when there is no building", () => {
    expect(boardAfterWallsDestroyed({ board: emptyBoard, tile: "1,2" })).toBe(
      emptyBoard
    );
  });
});

describe("boardAfterRecruit()", () => {
  test("places the piece and keeps the building", () => {
    const board = boardAfterBuild({
      board: emptyBoard,
      tile: "0,3",
      building: tower,
    });

    const next = boardAfterRecruit({ board, tile: "0,3", piece: soldier });

    expect(next["0,3"]).toEqual({ ...board["0,3"], piece: soldier });
    expect(board["0,3"].piece).toBeUndefined();
  });
});
