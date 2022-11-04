import { tiles } from "models/tiles";
import { useState } from "react";
import initialBoard from "./initial-board";

/**
 * plain react state + named update methods
 *
 * **no game logic here**
 */
export function useBoard() {
  const [board, setBoard] = useState(initialBoard);

  const buildOnTile = ({ tile, building }: BuildAction) => {
    console.info(
      `GameContext.buildOnTile({ tile: <${tile}>, building: ${building.type}(${building.owner}) })`
    );
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

  const movePiece = ({ piece, from, to }: MoveAction) => {
    console.info(
      `GameContext.movePiece({ from: <${from}>, to: <${to}>, piece: ${piece.type}(${piece.owner}) })`
    );
    setBoard((currentBoard) => {
      const fromTile: Tile = {
        ...currentBoard[from],
        piece: undefined,
      };
      const toTile: Tile = {
        ...currentBoard[to],
        piece,
      };
      return {
        ...currentBoard,
        [from]: fromTile,
        [to]: toTile,
      };
    });
  };

  const recruitOnTile = ({ tile, piece }: RecruitAction) => {
    console.info(
      `GameContext.recruitOnTile({ tile: <${tile}>, piece: ${piece.type}(${piece.owner}) })`
    );
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

  return { board, buildOnTile, movePiece, recruitOnTile };
}

/**
 * just a valid ts BoardState for new GameContext.
 * Will be overriden with initialBoard.
 */
export const emptyBoard: Board = tiles.reduce((acc, key) => {
  acc[key] = {
    terrain: "field",
    piece: undefined,
  };
  return acc;
}, {} as any);
