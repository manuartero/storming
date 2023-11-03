export function NewBuilding({ owner }: { owner: PlayerType }): Building {
  const building = {
    owner,
    type: "village" as const,
    hasWalls: false,
  };
  const toString = () => `Building{ ${building.type}, ${building.owner} }`;
  Object.setPrototypeOf(building, { toString });
  return building;
}
