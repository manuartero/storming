import { useReducer } from "react";
import Board from "./board";
import { boardReducer, initialBoard } from "./state";
import boardModel from "models/board";

function BoardController(): JSX.Element {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoard
  );

  const board = boardModel(boardState);

  const onTileClick = ({ str }: Coordinates) => {
    console.debug("onTileClick()");
    if (board.hasAnySelectedPiece()) {
      const selectedTileId = board.getSelectedTile();
      return dispatchBoardAction({
        type: "move-piece",
        from: selectedTileId,
        to: str,
      });
    }
    return dispatchBoardAction({ type: "select-tile", tile: str });
  };

  return <Board state={boardState} onTileClick={onTileClick} />;
}

export default BoardController;
