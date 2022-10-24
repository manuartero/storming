import { tiles } from "models/tiles";
import { useState } from "react";
import initialBoard from "./initial-board";

export function useBoard() {
  const [board, setBoard] = useState(initialBoard);

  const buildInTile = ({ tile, building, owner }: BuidInTile) => {
    console.debug(
      `GameContext.buildInTile({tile: ${tile}, building: ${building}, owner: ${owner}})`
    );
    setBoard((currentBoard) => {
      const newTile: Tile = {
        ...currentBoard[tile],
        building: { type: building, owner },
      };
      return {
        ...currentBoard,
        [tile]: newTile,
      };
    });
  };

  const movePiece = ({ piece, from, to }: MovePiece) => {
    console.debug(
      `GameContext.movePiece({ from:  ${from}, to:  ${to}, piece: ${piece.type},}`
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

  return { board, buildInTile, movePiece };
}

/**
 * just a valid ts BoardState for new GameContext.
 * Will be overriden with initialBoard.
 */
export const emptyBoard: Board = tiles.reduce((acc, key) => {
  acc[key] = {
    status: "idle",
    terrain: "field",
    piece: undefined,
  };
  return acc;
}, {} as any);
