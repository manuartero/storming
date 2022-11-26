import { useGameContext } from "contexts";
import { getAvailableTilesForActionCard } from "game-logic/available-tiles";
import { useState } from "react";
import { logInconsistentState } from "utils/console";

import Board from "./board";
import BuildDialog from "./build-dialog";

function createVisualBoardFromGameContext(
  { board, activeCard }: GameContext,
  selectedTile: TileID | undefined
): VisualBoard {
  const availableTiles =
    activeCard?.cardType === "actionCard"
      ? getAvailableTilesForActionCard({
          board,
          activeCard,
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
 *  - `useGameContext()`
 *
 * Defines visual board from GameContext:
 *  - selected, available and forbidden tiles
 *  - `onTileClick()`
 *
 *  => state validation before changing GameContext <=
 *
 */
function BoardController(): JSX.Element {
  const gameContext = useGameContext();
  const [selectedTile, setSelectedTile] = useState<TileID | undefined>();
  const [buildingTile, setBuildingTile] = useState<TileID | undefined>();

  const b = createVisualBoardFromGameContext(gameContext, selectedTile);

  const settleOnTile = (tile: TileID) => {
    const piece = b[tile].piece;
    if (!piece) {
      return logInconsistentState(
        `trying to settle on ${tile} but no soldier found`,
        { tile: b[tile] }
      );
    }
    setSelectedTile(undefined);
    gameContext.build({
      tile,
      building: {
        type: "village" as const,
        owner: piece.owner,
        hasWalls: false,
      },
    });
  };

  const upgradeBuildingOnTile = (tile: TileID) => {
    const building = b[tile].building;
    if (!building) {
      return logInconsistentState(
        `trying to upgrade building on ${tile} but no building found`,
        { tile: b[tile] }
      );
    }
    setSelectedTile(undefined);
    setBuildingTile(undefined);
    gameContext.build({
      tile,
      building: {
        ...building,
        type:
          building.type === "village" ? ("town" as const) : ("city" as const),
      },
    });
  };

  const buildWallsOnTile = (tile: TileID) => {
    const building = b[tile].building;
    if (!building) {
      return logInconsistentState(
        `trying to build walls on ${tile} but no building found`,
        { tile: b[tile] }
      );
    }
    setSelectedTile(undefined);
    setBuildingTile(undefined);
    gameContext.build({
      tile,
      building: {
        ...building,
        hasWalls: true,
      },
    });
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
      return logInconsistentState(
        `trying to recruit on ${tile} but no building found`,
        { tile: b[tile] }
      );
    }
    if (b[tile].piece) {
      return logInconsistentState(
        `trying to recruit on ${tile} but piece already found`,
        { tile: b[tile] }
      );
    }

    const piece: Piece =
      building.type === "city" // TODO show dialog for unit selection
        ? {
            type: "soldier",
            owner: building.owner,
          }
        : {
            type: "knight",
            owner: building.owner,
          };
    setSelectedTile(undefined);
    return gameContext.recruit({ tile, piece });
  };

  const resolveBuildOnTile = (tile: TileID) => {
    if (!b[tile].building && b[tile].piece?.type === "soldier") {
      return settleOnTile(tile);
    }
    if (b[tile].building?.hasWalls) {
      return upgradeBuildingOnTile(tile);
    }
    setBuildingTile(tile);
  };

  const resolveActionOnTile = (tile: TileID) => {
    if (gameContext.activeCard?.cardType !== "actionCard") {
      return logInconsistentState(
        `trying to resolve an action on ${tile} while no action card`,
        { tile: b[tile] }
      );
    }
    switch (gameContext.activeCard.action) {
      case "build":
        return resolveBuildOnTile(tile);
      case "move":
        return moveFromTile(tile);
      case "recruit":
        return recruitOnTile(tile);
      default:
        break;
    }
  };

  const onTileClick = ({ str: tile }: Coordinates) => {
    console.debug(`onTileClick(${tile})`, b[tile]);

    if (gameContext.activeCard?.cardType === "actionCard") {
      const availableTiles = getAvailableTilesForActionCard({
        board: b,
        selectedTile,
        activeCard: gameContext.activeCard,
      });
      if (availableTiles.includes(tile)) {
        return resolveActionOnTile(tile);
      }
    }

    setSelectedTile(tile);
  };

  return (
    <div>
      <Board state={b} onTileClick={onTileClick} />
      {buildingTile && (
        <BuildDialog
          onWallOption={() => {
            buildWallsOnTile(buildingTile);
          }}
          onUpgradeOption={() => {
            upgradeBuildingOnTile(buildingTile);
          }}
        />
      )}
    </div>
  );
}

export default BoardController;
