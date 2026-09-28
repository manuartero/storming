import { useGameContext } from "game-context";
import { buildOptions, recruitOptions } from "game-logic/build-options";
import { useState } from "react";
import { warnInconsistentState } from "lib/console";
import { Board } from "./board.component";
import { BuildDialog } from "./build-dialog.component";
import { inferVisualBoardFromGameContext } from "./infer-visual-board";
import { RecruitDialog } from "./recruit-dialog.component";

type SelectedTile = {
  tile: TileID;
  mode: "selected" | "building" | "recruiting";
};

/**
 * Defines visual board from GameContext:
 *  - selected, available and forbidden tiles
 *  - `onTileClick()`
 *
 *  => state validation before changing GameContext <=
 */
export function BoardController() {
  const gameContext = useGameContext();
  // a selection belongs to the card being resolved: a new card starts clean
  const activeCardId = gameContext.activeCard?.cardId;
  const [selection, setSelection] = useState<
    SelectedTile & { cardId: CardId | undefined }
  >();
  const selectedTile =
    selection?.cardId === activeCardId ? selection : undefined;
  const setSelectedTile = (tile: SelectedTile | undefined) =>
    setSelection(tile && { ...tile, cardId: activeCardId });

  const board = inferVisualBoardFromGameContext({
    board: gameContext.board,
    activeCard: gameContext.activeCard,
    selectedTile:
      selectedTile?.mode === "selected" ? selectedTile.tile : undefined,
  });

  const buildOnTile = ({
    tile,
    building,
  }: {
    tile: TileID;
    building: Building;
  }) => {
    setSelectedTile(undefined);
    gameContext.build({ tile, building });
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

  const recruitOnTile = ({ tile, piece }: { tile: TileID; piece: Piece }) => {
    setSelectedTile(undefined);
    gameContext.recruit({ tile, piece });
  };

  const resolveRecruitOnTile = (tile: TileID) => {
    if (recruitOptions({ board: gameContext.board, tile }).length === 0) {
      warnInconsistentState(`trying to recruit on ${tile} but can't`, {
        tile: board[tile],
      });
      return;
    }
    setSelectedTile({ tile, mode: "recruiting" });
  };

  const resolveBuildOnTile = (tile: TileID) => {
    const options = buildOptions({ board: gameContext.board, tile });
    if (options.length === 0) {
      warnInconsistentState(`trying to build on ${tile} but can't`, {
        tile: board[tile],
      });
      return;
    }
    if (options.length === 1) {
      return buildOnTile({ tile, building: options[0].building });
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

  const buildChoices =
    selectedTile?.mode === "building"
      ? buildOptions({ board: gameContext.board, tile: selectedTile.tile })
      : [];
  const walls = buildChoices.find((option) => option.kind === "walls");
  const upgrade = buildChoices.find((option) => option.kind === "upgrade");

  const recruitChoices =
    selectedTile?.mode === "recruiting"
      ? recruitOptions({ board: gameContext.board, tile: selectedTile.tile })
      : [];
  const soldier = recruitChoices.find((piece) => piece.type === "soldier");
  const knight = recruitChoices.find((piece) => piece.type === "knight");

  return (
    <>
      <Board
        state={board}
        activePlayer={gameContext.activePlayer}
        onTileClick={onTileClick}
      />

      {selectedTile?.mode === "building" && (
        <BuildDialog
          player={gameContext.activePlayer}
          buildWalls={
            walls &&
            (() =>
              buildOnTile({
                tile: selectedTile.tile,
                building: walls.building,
              }))
          }
          upgradeBuilding={
            upgrade &&
            (() =>
              buildOnTile({
                tile: selectedTile.tile,
                building: upgrade.building,
              }))
          }
          close={discardOptionDialog}
        />
      )}

      {selectedTile?.mode === "recruiting" && soldier && (
        <RecruitDialog
          player={gameContext.activePlayer}
          recruitSoldier={() =>
            recruitOnTile({ tile: selectedTile.tile, piece: soldier })
          }
          recruitKnight={
            knight &&
            (() => recruitOnTile({ tile: selectedTile.tile, piece: knight }))
          }
          close={discardOptionDialog}
        />
      )}
    </>
  );
}
