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

  const isConquering = ({
    piece,
    to,
  }: {
    to: TileID;
    piece: {
      type: Piece;
      owner: Player;
    };
  }) => {
    if (board[to].building && board[to].building?.owner !== piece.owner) {
      console.info(`GameContext.isConquering({ ... }): YES`);
      return true;
    }
    return false;
  };

  /** direct update on the board; no validity check */
  const movePiece = ({ piece, from, to }: MoveAction) => {
    console.info(
      `GameContext.movePiece({ from: <${from}>, to: <${to}>, piece: ${piece.type}(${piece.owner}) })`
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
      // is it better to use isConquering() ?
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

  return { board, buildOnTile, movePiece, recruitOnTile, isConquering };
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
