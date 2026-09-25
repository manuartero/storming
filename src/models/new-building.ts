export function NewBuilding({ owner }: { owner: PlayerType }) {
  return {
    owner,
    type: "tower" as const,
    hasWalls: false,
  };
}

// annotated: without it `type` widens to string
export function upgradeBuilding(building: Building): Building {
  if (building.type === "tower") {
    return {
      ...building,
      type: "castle",
    };
  }
  if (building.type === "castle") {
    return {
      ...building,
      type: "citadel",
    };
  }
  return building;
}
