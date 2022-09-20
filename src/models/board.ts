import { rangeTiles as tilesInRange } from "./tiles";

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

    getAvailableMovements(tile: TileID) {
      return tilesInRange(tile).filter(
        (candidateTile) =>
          /* valid options: */
          !b[candidateTile].piece ||
          b[candidateTile].piece?.owner !== b[tile].piece?.owner
      );
    },
  };
}

export default boardModel;
