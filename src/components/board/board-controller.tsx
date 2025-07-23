import { useGameContext } from "game-context";
import { NewBuilding, upgradeBuilding } from "models/new-building";
import { useState } from "react";
import { warnInconsistentState } from "utils/console";
import { Board } from "./board";
import { BuildDialog } from "./build-dialog";
import { inferVisualBoardFromGameContext } from "./infer-visual-board";
import { RecruitDialog } from "./recruit-dialog";

type SelectedTile =
  | { tile: TileID; mode: "selected" | "building" }
  | { tile: TileID; mode: "recruiting"; knightsUnlocked: boolean };

/**
 * Defines visual board from GameContext:
 *  - selected, available and forbidden tiles
 *  - `onTileClick()`
 *
 *  => state validation before changing GameContext <=
 */
export function BoardController() {
  const gameContext = useGameContext();
  const [selectedTile, setSelectedTile] = useState<SelectedTile>();

  const board = inferVisualBoardFromGameContext(
    gameContext,
    selectedTile?.mode === "selected" ? selectedTile.tile : undefined
  );

  const settleOnTile = (tile: TileID) => {
    const piece = board[tile].piece;
    if (!piece) {
      warnInconsistentState(
        `trying to settle on ${tile} but no soldier found`,
        { tile: board[tile] }
      );
      return;
    }

    setSelectedTile(undefined);
    gameContext.build({ tile, building: NewBuilding({ owner: piece.owner }) });
  };

  const upgradeBuildingOnTile = (tile: TileID) => {
    const building = board[tile].building;
    if (!building) {
      warnInconsistentState(
        `trying to upgrade building on ${tile} but no building found`,
        { tile: board[tile] }
      );
      return;
    }

    setSelectedTile(undefined);
    gameContext.build({ tile, building: upgradeBuilding(building) });
  };

  const buildWallsOnTile = (tile: TileID) => {
    const building = board[tile].building;
    if (!building) {
      warnInconsistentState(
        `trying to build walls on ${tile} but no building found`,
        { tile: board[tile] }
      );
      return;
    }

    setSelectedTile(undefined);
    gameContext.build({ tile, building: { ...building, hasWalls: true } });
  };

  const discardOptionDialog = () => {
    setSelectedTile(undefined);
  };

  const moveFromTile = (tile: TileID) => {
    if (selectedTile?.mode === "selected") {
      const piece = board[selectedTile.tile].piece;
      if (!piece) {
        setSelectedTile({ tile, mode: "selected" });
        return;
      }
      if (piece.owner === gameContext.activePlayer) {
        setSelectedTile(undefined);
        return gameContext.move({
          piece,
          from: selectedTile.tile,
          to: tile,
        });
      }
    }
    setSelectedTile({ tile, mode: "selected" });
  };

  const recruitOnTile = (tile: TileID, piece: PieceType) => {
    const building = board[tile].building;
    if (!building) {
      warnInconsistentState(
        `trying to recruit ${piece} on ${tile} but no building found`,
        { tile: board[tile] }
      );
      return;
    }

    setSelectedTile(undefined);
    return gameContext.recruit({
      tile,
      piece: { type: piece, owner: building.owner },
    });
  };

  const resolveRecruitOnTile = (tile: TileID) => {
    if (board[tile].piece) {
      warnInconsistentState(
        `trying to recruit on ${tile} but piece already found`,
        { tile: board[tile] }
      );
      return;
    }

    const building = board[tile].building;
    if (!building) {
      warnInconsistentState(
        `trying to recruit on ${tile} but no building found`,
        { tile: board[tile] }
      );
      return;
    }

    setSelectedTile({
      tile,
      mode: "recruiting",
      knightsUnlocked: building.type !== "tower",
    });
  };

  const resolveBuildOnTile = (tile: TileID) => {
    if (!board[tile].building && board[tile].piece?.type === "soldier") {
      return settleOnTile(tile);
    }

    if (board[tile].building?.hasWalls) {
      return upgradeBuildingOnTile(tile);
    }

    setSelectedTile({ tile, mode: "building" });
  };

  const resolveActionOnTile = (tile: TileID) => {
    if (gameContext.activeCard?.cardType !== "actionCard") {
      warnInconsistentState(
        `trying to resolve an action on ${tile} while no action card`,
        { tile: board[tile] }
      );
      return;
    }

    switch (gameContext.activeCard.action) {
      case "build":
        return resolveBuildOnTile(tile);
      case "move":
        return moveFromTile(tile);
      case "recruit":
        return resolveRecruitOnTile(tile);
    }
  };

  const onTileClick = ({ str: tile }: Coordinates) => {
    if (board[tile].status === "available") {
      return resolveActionOnTile(tile);
    }
    setSelectedTile({ tile, mode: "selected" });
  };

  return (
    <>
      <Board
        state={board}
        activePlayer={gameContext.activePlayer}
        onTileClick={onTileClick}
      />

      {selectedTile?.mode === "building" && (
        <BuildDialog
          onWallOption={() => {
            buildWallsOnTile(selectedTile.tile);
          }}
          onUpgradeOption={() => {
            upgradeBuildingOnTile(selectedTile.tile);
          }}
          onClose={() => {
            discardOptionDialog();
          }}
        />
      )}

      {selectedTile?.mode === "recruiting" && (
        <RecruitDialog
          player={gameContext.activePlayer}
          recruitSoldier={() => {
            recruitOnTile(selectedTile.tile, "soldier");
          }}
          recruitKnight={
            selectedTile.knightsUnlocked
              ? () => {
                  recruitOnTile(selectedTile.tile, "knight");
                }
              : undefined
          }
          close={() => {
            discardOptionDialog();
          }}
        />
      )}
    </>
  );
}
