import { initialBoard } from "contexts/game-context/initial-board";
import { inferVisualBoardFromGameContext } from "./infer-visual-board";
import { Card } from "models/card";

test("inferVisualBoardFromGameContext()", () => {
  const board = inferVisualBoardFromGameContext({
    board: initialBoard,
    activeCard: Card("build", "player"),
  });

  /* only settlement of player at "-4,0" */
  expect(board["-4,0"]).toEqual({
    status: "available",
    building: { owner: "player", type: "village" },
    piece: undefined,
    terrain: "field",
  });
});
