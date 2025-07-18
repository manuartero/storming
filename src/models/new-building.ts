export function NewBuilding({ owner }: { owner: PlayerType }): Building {
  const building = {
    owner,
    type: "tower" as const,
    hasWalls: false,
  };
  const toString = () => `Building{ ${building.type}, ${building.owner} }`;
  Object.setPrototypeOf(building, { toString });
  return building;
}

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
