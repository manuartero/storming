import { useGameContext } from "contexts";
import { getAvailableTilesForActionCard } from "models/board";
import { useState } from "react";

import Board from "./board";

function createVisualBoardFromGameContext(
  { board, activeCard, activePlayer }: GameContext,
  selectedTile: TileID | undefined
): VisualBoard {
  const availableTiles =
    activeCard?.cardType === "actionCard"
      ? getAvailableTilesForActionCard({
          board,
          activeCard,
          activePlayer,
          selectedTile,
        })
      : [];

  const tileStatus = (tile: TileID) => {
    if (tile === selectedTile) {
      return "selected";
    }
    return availableTiles.includes(tile as TileID) ? "available" : "idle";
  };

  return Object.entries(board).reduce(
    (acc, [tile, tileState]) => ({
      ...acc,
      [tile]: {
        ...tileState,
        status: tileStatus(tile as TileID),
      },
    }),
    {} as VisualBoard
  );
}

/**
 * Renders depends on:
 *  - useGameContext()
 *
 * Defines visual board from GameContext: manages selected, available and forbidden tiles.
 * Manges onTileClick(), validates before changing GameContext.
 */
function BoardController(): JSX.Element {
  const gameContext = useGameContext();
  const [selectedTile, setSelectedTile] = useState<TileID | undefined>();

  const b = createVisualBoardFromGameContext(gameContext, selectedTile);

  const buildOnTile = (tile: TileID) => {
    const piece = b[tile].piece;
    if (!piece || piece.type !== "soldier") {
      console.warn(
        `Inconsistent state: trying to build on ${tile} but no soldier found`,
        { tile: b[tile] }
      );
      return;
    }
    const building = {
      type: "town" as const,
      owner: piece.owner,
    };
    setSelectedTile(undefined);
    gameContext.build({ tile, building });
  };

  const moveFromTile = (tile: TileID) => {
    if (selectedTile) {
      const piece = b[selectedTile].piece;
      if (!piece) {
        return setSelectedTile(tile);
      }
      if (piece.owner === gameContext.activePlayer) {
        setSelectedTile(undefined);
        return gameContext.move({
          piece,
          from: selectedTile,
          to: tile,
        });
      }
    }
    setSelectedTile(tile);
  };

  const recruitOnTile = (tile: TileID) => {
    const building = b[tile].building;
    if (!building) {
      console.warn(
        `Inconsistent state: trying to recruit on ${tile} but no building found`,
        { tile: b[tile] }
      );
      return;
    }
    const piece = {
      type: "soldier" as const,
      owner: building.owner,
    };
    setSelectedTile(undefined);
    return gameContext.recruit({ tile, piece });
  };

  const resolveActionOnTile = (tile: TileID) => {
    if (gameContext.activeCard?.cardType !== "actionCard") {
      console.warn(
        `Inconsistent state: trying to resolve an action on ${tile} while no action card`
      );
      return;
    }
    switch (gameContext.activeCard.action) {
      case "build":
        return buildOnTile(tile);
      case "move":
        return moveFromTile(tile);
      case "recruit":
        return recruitOnTile(tile);
      default:
        break;
    }
  };

  const onTileClick = ({ str: tile }: Coordinates) => {
    console.debug(`onTileClick(${tile}): %o`, b[tile]);

    if (gameContext.activeCard?.cardType === "actionCard") {
      const availableTiles = getAvailableTilesForActionCard({
        board: b,
        selectedTile,
        activeCard: gameContext.activeCard,
        activePlayer: gameContext.activePlayer,
      });
      if (availableTiles.includes(tile)) {
        return resolveActionOnTile(tile);
      }
    }

    setSelectedTile(tile);
  };

  return <Board state={b} onTileClick={onTileClick} />;
}

export default BoardController;
