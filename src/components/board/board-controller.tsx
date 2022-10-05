import { useCurrentCard, useGameLog } from "contexts";
import boardModel from "models/board";
import { useEffect } from "react";
import Board from "./board";
import { useBoard } from "./hooks";

function BoardController(): JSX.Element {
  const { boardState, dispatchBoardAction } = useBoard();
  const { log } = useGameLog();
  const currentCard = useCurrentCard();

  const board = boardModel(boardState);

  // FIXME useEffect modifying boardState?
  useEffect(() => {
    if (
      currentCard &&
      currentCard.currentCard &&
      currentCard.currentCard.cardType === "actionCard"
    )
      board
        .getAvailableTilesForActionCard(currentCard.currentCard)
        .forEach((tile) => {
          boardState[tile].status = "available";
        });
  }, [currentCard]);

  const onTileClick = ({ str: tile }: Coordinates) => {
    console.debug("onTileClick()");
    if (board.hasAnySelectedPiece()) {
      const selectedTileId = board.getSelectedTile();
      if (selectedTileId !== tile) {
        const piece = boardState[selectedTileId].piece;
        dispatchBoardAction({
          type: "move-piece",
          from: selectedTileId,
          to: tile,
        });
        log({
          player: piece?.owner,
          msg: `Move ${piece?.type} from ${selectedTileId} to ${tile}`,
        });
      }
    }

    return dispatchBoardAction({ type: "select-tile", tile });
  };

  return <Board state={boardState} onTileClick={onTileClick} />;
}

export default BoardController;
