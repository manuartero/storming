import {
  boardAfterBuild,
  boardAfterMove,
  boardAfterWallsDestroyed,
  boardAfterRecruit,
} from "game-logic/board.transitions";
import { useState } from "react";
import { initialBoard } from "./initial-board";

/**
 * plain react state + named update methods
 *
 * - **direct update on the board; no validity check**
 * - **no game logic**
 * - **no console.log**
 * - **no inconsistent state**
 */
export function useBoard() {
  const [board, setBoard] = useState(initialBoard);

  const buildOnTile = (action: { tile: TileID; building: Building }) => {
    setBoard((currentBoard) =>
      boardAfterBuild({ board: currentBoard, ...action })
    );
  };

  const movePiece = (action: { piece: Piece; from: TileID; to: TileID }) => {
    setBoard((currentBoard) =>
      boardAfterMove({ board: currentBoard, ...action })
    );
  };

  const destroyWalls = (tile: TileID) => {
    setBoard((currentBoard) =>
      boardAfterWallsDestroyed({ board: currentBoard, tile })
    );
  };

  const recruitOnTile = (action: { tile: TileID; piece: Piece }) => {
    setBoard((currentBoard) =>
      boardAfterRecruit({ board: currentBoard, ...action })
    );
  };

  return {
    board,
    buildOnTile,
    movePiece,
    destroyWalls,
    recruitOnTile,
    _overrideBoard: setBoard,
  };
}
