import { useReducer } from "react";
import Board from "./board";
import { boardStateReducer, initialBoardState } from "./state";
import BoardModel from "./state/board-model";

function BoardController(): JSX.Element {
  const [boardState, dispatchBoardAction] = useReducer(
    boardStateReducer,
    initialBoardState
  );

  const board = BoardModel(boardState);

  const onTileClick = (tileID: TileID) => {
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
