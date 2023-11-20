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

  const buildOnTile = ({
    tile,
    building,
  }: {
    tile: TileID;
    building: Building;
  }) => {
    setBoard((currentBoard) => {
      return {
        ...currentBoard,
        [tile]: {
          ...currentBoard[tile],
          building,
        },
      };
    });
  };

  const movePiece = ({
    piece,
    from,
    to,
  }: {
    piece: Piece;
    from: TileID;
    to: TileID;
  }) => {
    setBoard((currentBoard) => {
      const targetTile: Tile = {
        ...currentBoard[to],
        piece,
      };
      if (targetTile.building) {
        targetTile.building = {
          ...targetTile.building,
          owner: piece.owner,
        };
      }
      return {
        ...currentBoard,
        [from]: {
          ...currentBoard[from],
          piece: undefined,
        },
        [to]: targetTile,
      };
    });
  };

  const recruitOnTile = ({ tile, piece }: { tile: TileID; piece: Piece }) => {
    setBoard((currentBoard) => {
      const newTile: Tile = {
        ...currentBoard[tile],
        piece,
      };
      return {
        ...currentBoard,
        [tile]: newTile,
      };
    });
  };

  return {
    board,
    buildOnTile,
    movePiece,
    recruitOnTile,
    _overrideBoard: setBoard,
  };
}
