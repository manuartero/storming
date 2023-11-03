import { useState } from "react";
import { initialBoard } from "./initial-board";

/**
 * plain react state + named update methods
 *
 * **direct update on the board; no validity check**
 * **no game logic here**
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
    console.info(`buildOnTile({ tile: <${tile}>, building: ${building} })`);
    setBoard((currentBoard) => {
      const newTile: Tile = {
        ...currentBoard[tile],
        building,
      };
      return {
        ...currentBoard,
        [tile]: newTile,
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
    console.info(
      `movePiece({ from: <${from}>, to: <${to}>, piece: ${piece} })`
    );
    setBoard((currentBoard) => {
      const originTile: Tile = {
        ...currentBoard[from],
        piece: undefined,
      };
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
        [from]: originTile,
        [to]: targetTile,
      };
    });
  };

  const recruitOnTile = ({ tile, piece }: { tile: TileID; piece: Piece }) => {
    console.info(`recruitOnTile({ tile: <${tile}>, piece: ${piece}) })`);
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
