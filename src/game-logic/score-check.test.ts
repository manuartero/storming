import { isConquering, isCreatingGreatesEmpire } from "./score-check";

test("scoreCheck.isConquering() checks if player is scoring when moving to targetTile", () => {
  const targetTile: Tile = {
    terrain: "field",
    building: { owner: "enemy1", type: "village" },
    piece: undefined,
  };
  expect(isConquering({ targetTile, player: "player" })).toEqual(true);
  expect(isConquering({ targetTile, player: "enemy1" })).toEqual(false);
});

test("scoreCheck.isCreatingGreatestEmpire() checks if player would have more settlements than anybody else", () => {
  const empires = {
    player: 2,
    enemy1: 0,
    enemy2: 1,
    enemy3: 2,
  };

  expect(
    isCreatingGreatesEmpire({
      empires,
      building: {
        owner: "player",
        type: "village",
      },
    })
  ).toEqual(true);
  expect(
    isCreatingGreatesEmpire({
      empires,
      building: {
        owner: "enemy1",
        type: "village",
      },
    })
  ).toEqual(false);
  expect(
    isCreatingGreatesEmpire({
      empires,
      building: {
        owner: "enemy2",
        type: "village",
      },
    })
  ).toEqual(false);
  expect(
    isCreatingGreatesEmpire({
      empires,
      building: {
        owner: "enemy3",
        type: "village",
      },
    })
  ).toEqual(true);
});
