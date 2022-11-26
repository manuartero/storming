import { empireSize } from "./empire-size";

const board = {
  "-2,3": {
    terrain: "field",
    building: { owner: "player", type: "town" },
    piece: undefined,
  },
  "-1,3": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "0,3": {
    terrain: "field",
    building: { owner: "enemy3", type: "village" },
    piece: undefined,
  },
  "1,3": {
    terrain: "field",
    building: { owner: "enemy3", type: "city" },
    piece: undefined,
  },
  "2,3": {
    terrain: "field",
    building: { owner: "enemy1", type: "city" },
    piece: undefined,
  },
} as Board;

test("empireSize() returns number of buildings grouped by player", () => {
  expect(empireSize(board)).toEqual({
    player: 1,
    enemy1: 1,
    enemy2: 0,
    enemy3: 2,
  });
});
