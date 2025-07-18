type PieceMovementInfo = {
  range: number;
  specialTerrain: TerrainType[];
};

export const pieces: Record<PieceType, PieceMovementInfo> = {
  soldier: {
    range: 1,
    specialTerrain: ["forest", "mountain"],
  },
  knight: {
    range: 2,
    specialTerrain: [],
  },
};
