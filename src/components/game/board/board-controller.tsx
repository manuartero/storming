import { useGameContext } from "contexts";
import { useState } from "react";
import { warnInconsistentState } from "utils/console";
import Board from "./board";
import BuildDialog from "./build-dialog";
import { inferVisualBoardFromGameContext } from "./infer-visual-board";
import { RecruitDialog } from "./recruit-dialog";

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
  const [recruitingTile, setRecruitingTile] = useState<TileID | undefined>();

  /* derived state */
  const board = inferVisualBoardFromGameContext(gameContext, selectedTile);

  const settleOnTile = (tile: TileID) => {
    const piece = board[tile].piece;
    if (!piece) {
      return warnInconsistentState(
        `trying to settle on ${tile} but no soldier found`,
        { tile: board[tile] }
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
    const building = board[tile].building;
    if (!building) {
      return warnInconsistentState(
        `trying to upgrade building on ${tile} but no building found`,
        { tile: board[tile] }
      );
    }
    setSelectedTile(undefined);
    setBuildingTile(undefined);
    setRecruitingTile(undefined);
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
    const building = board[tile].building;
    if (!building) {
      return warnInconsistentState(
        `trying to build walls on ${tile} but no building found`,
        { tile: board[tile] }
      );
    }
    setSelectedTile(undefined);
    setBuildingTile(undefined);
    setRecruitingTile(undefined);
    gameContext.build({
      tile,
      building: {
        ...building,
        hasWalls: true,
      },
    });
  };

  const discardOptionDialog = () => {
    setSelectedTile(undefined);
    setBuildingTile(undefined);
    setRecruitingTile(undefined);
  };

  const moveFromTile = (tile: TileID) => {
    if (selectedTile) {
      const piece = board[selectedTile].piece;
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

  const recruitOnTile = (tile: TileID, piece: PieceType) => {
    const building = board[tile].building;
    if (!building) {
      return warnInconsistentState(
        `trying to recruit ${piece} on ${tile} but no building found`,
        { tile: board[tile] }
      );
    }

    setSelectedTile(undefined);
    setBuildingTile(undefined);
    setRecruitingTile(undefined);
    return gameContext.recruit({
      tile,
      piece: {
        type: piece,
        owner: building.owner,
      },
    });
  };

  const resolveRecruitOnTile = (tile: TileID) => {
    const building = board[tile].building;
    if (!building) {
      return warnInconsistentState(
        `trying to recruit on ${tile} but no building found`,
        { tile: board[tile] }
      );
    }
    if (board[tile].piece) {
      return warnInconsistentState(
        `trying to recruit on ${tile} but piece already found`,
        { tile: board[tile] }
      );
    }
    setRecruitingTile(tile);
  };

  const resolveBuildOnTile = (tile: TileID) => {
    if (!board[tile].building && board[tile].piece?.type === "soldier") {
      return settleOnTile(tile);
    }
    if (board[tile].building?.hasWalls) {
      return upgradeBuildingOnTile(tile);
    }
    setBuildingTile(tile);
  };

  const resolveActionOnTile = (tile: TileID) => {
    if (gameContext.activeCard?.cardType !== "actionCard") {
      return warnInconsistentState(
        `trying to resolve an action on ${tile} while no action card`,
        { tile: board[tile] }
      );
    }
    switch (gameContext.activeCard.action) {
      case "build":
        return resolveBuildOnTile(tile);
      case "move":
        return moveFromTile(tile);
      case "recruit":
        return resolveRecruitOnTile(tile);
      default:
        break;
    }
  };

  const onTileClick = ({ str: tile }: Coordinates) => {
    if (board[tile].status === "available") {
      return resolveActionOnTile(tile);
    }
    setSelectedTile(tile);
  };

  return (
    <>
      <Board state={board} onTileClick={onTileClick} />
      {buildingTile && (
        <BuildDialog
          onWallOption={() => {
            buildWallsOnTile(buildingTile);
          }}
          onUpgradeOption={() => {
            upgradeBuildingOnTile(buildingTile);
          }}
          onClose={() => {
            discardOptionDialog();
          }}
        />
      )}
      {recruitingTile && (
        <RecruitDialog
          onSoldierOption={() => {
            recruitOnTile(recruitingTile, "soldier");
          }}
          onKnightOption={() => {
            recruitOnTile(recruitingTile, "knight");
          }}
          onClose={() => {
            discardOptionDialog();
          }}
        />
      )}
    </>
  );
}

export default BoardController;
