import { initialBoard } from "game-context/initial-board";
import { NewCard } from "models/new-card";
import { inferVisualBoardFromGameContext } from "./infer-visual-board";

const tilesWithStatus = (board: VisualBoard) =>
  Object.fromEntries(
    Object.entries(board)
      .filter(([, tile]) => tile.status)
      .map(([tileId, tile]) => [tileId, tile.status])
  );

describe("inferVisualBoardFromGameContext()", () => {
  test("marks the tiles the active card can act on as available, and only those", () => {
    const board = inferVisualBoardFromGameContext({
      board: initialBoard,
      activeCard: NewCard({ type: "build", player: "player" }),
    });

    // the only settlement of player
    expect(tilesWithStatus(board)).toEqual({ "-4,0": "available" });
    expect(board["-4,0"]).toMatchObject(initialBoard["-4,0"]);
  });

  test("marks the selected tile as selected", () => {
    const board = inferVisualBoardFromGameContext({
      board: initialBoard,
      activeCard: NewCard({ type: "move", player: "player" }),
      selectedTile: "-3,0",
    });

    expect(board["-3,0"].status).toBe("selected");
  });

  test("with no active card, the board comes back unchanged", () => {
    expect(
      inferVisualBoardFromGameContext({
        board: initialBoard,
        activeCard: undefined,
      })
    ).toBe(initialBoard);
  });
});
