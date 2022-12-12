type PieceMovementInfo = {
  range: number;
  validTerrain: Terrain[];
};

export const pieces: Record<PieceType, PieceMovementInfo> = {
  soldier: {
    range: 1,
    validTerrain: ["field", "forest", "mountain"],
  },
  knight: {
    range: 2,
    validTerrain: ["field"],
  },
};
