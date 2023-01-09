import { initialBoard } from "contexts/game-context/initial-board";
import { inferVisualBoardFromGameContext } from "./infer-visual-board";

test("board/inferVisualBoardFromGameContext()", () => {
  const activeCard: Card = {
    action: "build",
    owner: "player",
    cardType: "actionCard",
    cardId: "player_build_A",
  };

  const board = inferVisualBoardFromGameContext({
    board: initialBoard,
    activeCard,
  });

  /* only settlement of player at "-4,0" */
  expect(board["-4,0"]).toEqual({
    status: "available",
    building: { owner: "player", type: "village" },
    piece: undefined,
    terrain: "field",
  });
});
