import { useReducer } from "react";
import Board from "./board";
import { boardStateReducer, initialBoardState } from "./state";
import boardModel from "../../models/board";

function BoardController(): JSX.Element {
  const [boardState, dispatchBoardAction] = useReducer(
    boardStateReducer,
    initialBoardState
  );

  const board = boardModel(boardState);

  const onTileClick = (tileID: Coordinates) => {
    console.debug("onTileClick()");
    if (board.hasASelectedPiece() && !boardState[tileID.str].piece) {
      const selectedTileId = board.getSelectedTileID();
      return dispatchBoardAction({
        type: "move-piece",
        from: selectedTileId,
        to: tileID.str,
      });
    }
    if (boardState[tileID.str].piece) {
      return dispatchBoardAction({ type: "select-piece", tile: tileID.str });
    }
  };

  return <Board state={boardState} onTileClick={onTileClick} />;
}

export default BoardController;
