import { initialBoard } from "game-context/initial-board";
import { NewCard } from "models/new-card";
import { inferVisualBoardFromGameContext } from "./infer-visual-board";

test("inferVisualBoardFromGameContext()", () => {
  const board = inferVisualBoardFromGameContext({
    board: initialBoard,
    activeCard: NewCard("build", "player"),
  });

  /* only settlement of player at "-4,0" */
  expect(board["-4,0"]).toEqual({
    status: "available",
    building: { owner: "player", type: "village" },
    piece: undefined,
    terrain: "field",
  });
});
