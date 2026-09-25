import { initialBoard } from "game-context/initial-board";
import { NewCard } from "models/new-card";
import { inferVisualBoardFromGameContext } from "./infer-visual-board";

describe("inferVisualBoardFromGameContext()", () => {
  test("marks the tiles the active card can act on as available", () => {
    const board = inferVisualBoardFromGameContext({
      board: initialBoard,
      activeCard: NewCard({ type: "build", player: "player" }),
    });

    /* only settlement of player at "-4,0" */
    expect(board["-4,0"]).toEqual({
      status: "available",
      building: { owner: "player", type: "tower" },
      piece: undefined,
      terrain: undefined,
    });
  });
});
