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
      const selectedTile = Object.entries(b).find(
        ([, tile]) => tile.status === "selected"
      )?.[0];
      if (!selectedTile) {
        throw new Error(
          'Inconsistent state: "getSelectedTileID" was unable to find any selected tile'
        );
      }
      return selectedTile as TileID;
    },
  };
}

export default boardModel;
