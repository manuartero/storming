import { TILES } from "models/tiles";

/**
 * just a valid ts BoardState for new GameContext.
 * Will be overriden with initialBoard.
 */
export const emptyBoard: Board = TILES.reduce((acc, key) => {
  acc[key] = {
    terrain: "field",
    piece: undefined,
    building: undefined,
  };
  return acc;
}, {} as Record<TileID, Tile>);
