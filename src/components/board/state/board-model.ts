function BoardModel(b: BoardState) {
  return {
    hasASelectedPiece() {
      return Object.values(b).some(
        (tile) => tile.status === "selected" && tile.piece
      );
    },

    getSelectedTileID() {
      const selectedTileID = Object.entries(b).find(
        ([, tile]) => tile.status === "selected"
      )?.[0];
      if (!selectedTileID) {
        throw new Error(
          'Inconsistent state: "getSelectedTileID" was unable to find selected tile'
        );
      }
      return selectedTileID as TileIdStr;
    },
  };
}

export default BoardModel;
