import { tiles, tilesInRange } from "./tiles";

function* makeBoardIterable(b: BoardState) {
  // b is iterable in tile order
  for (const tileID of tiles) {
    yield b[tileID];
  }
}

function boardModel(b: BoardState) {
  return {
    hasAnySelectedTile() {
      return Object.values(b).some((tile) => tile.status === "selected");
    },

    hasAnySelectedPiece() {
      return Object.values(b).some(
        (tile) => tile.status === "selected" && tile.piece
      );
    },

    getSelectedTile() {
      const selectedTileID = Object.entries(b).find(
        ([, tile]) => tile.status === "selected"
      )?.[0];
      if (!selectedTileID) {
        throw new Error(
          'Inconsistent state: "getSelectedTileID" was unable to find any selected tile'
        );
      }
      return selectedTileID as TileID;
    },

    getInRangeMovements(tile: TileID): AvailableMovements {
      const tiles = tilesInRange(tile);
      return {
        available: tiles.filter(
          (candidateTile) =>
            /* valid options: */
            !b[candidateTile].piece ||
            b[candidateTile].piece?.owner !== b[tile].piece?.owner
        ),
        forbidden: tiles.filter(
          (candidateTile) =>
            /* valid options: */
            b[candidateTile].terrain === "lake"
        ),
      };
    },

    getAvailableTiles(): TileID[] {
      return Object.entries(b)
        .filter(([, tile]) => tile.status === "available")
        .map(([tileID]) => tileID as TileID);
    },
  };
}

export default boardModel;
