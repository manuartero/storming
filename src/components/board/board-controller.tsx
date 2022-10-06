import { useGameContext } from "contexts";
import boardModel from "models/board";
import cardModel from "models/card";
import { useEffect } from "react";
import Board from "./board";
import { useBoard } from "./hooks";

function BoardController(): JSX.Element {
  const { boardState, dispatchBoardAction } = useBoard();
  const gameContext = useGameContext();

  const board = boardModel(boardState);

  useEffect(() => {
    const card = cardModel(gameContext.activeCard);
    console.debug(`Effect: <BoardController /> (activeCard: ${card})`);

    if (
      gameContext.activeCard &&
      gameContext.activeCard.cardType === "actionCard"
    ) {
      const tiles = board.getAvailableTilesForActionCard(
        gameContext.activeCard
      );
      dispatchBoardAction({ type: "highlight-tiles", tiles });
      return;
    }
  }, [gameContext.activeCard]);

  const dispatchBoardActionOnSelectionableTile = (tile: TileID) => {
    // ts check
    if (gameContext.activeCard?.cardType !== "actionCard") {
      return;
    }

    switch (gameContext.activeCard.action) {
      case "build":
        dispatchBoardAction({ type: "build-in-tile", tile });
        gameContext.setActiveCard(undefined); // next()
        break;

      default:
        break;
    }
  };

  const onTileClick = ({ str: tile }: Coordinates) => {
    console.debug(`onTileClick(${tile}): `, boardState[tile]);

    if (gameContext.activeCard?.cardType === "actionCard") {
      const selectionableTiles = board.getSelectionableTiles();
      console.debug({ selectionableTiles, tile });
      if (selectionableTiles.includes(tile)) {
        dispatchBoardActionOnSelectionableTile(tile);
      } else {
        dispatchBoardAction({ type: "select-tile", tile });
      }
    }

    // if (board.hasAnySelectedPiece()) {
    //   const selectedTileId = board.getSelectedTile();
    //   if (selectedTileId !== tile) {
    //     const piece = boardState[selectedTileId].piece;
    //     dispatchBoardAction({
    //       type: "move-piece",
    //       from: selectedTileId,
    //       to: tile,
    //     });
    //     log({
    //       player: piece?.owner,
    //       msg: `Move ${piece?.type} from ${selectedTileId} to ${tile}`,
    //     });
    //   }
    // }
  };

  return <Board state={boardState} onTileClick={onTileClick} />;
}

export default BoardController;
