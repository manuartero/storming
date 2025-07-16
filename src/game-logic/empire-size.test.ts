import { empireSize } from "./empire-size";

const board = {
  "-2,3": {
    terrain: undefined,
    building: { owner: "player", type: "tower" },
    piece: undefined,
  },
  "-1,3": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "0,3": {
    terrain: undefined,
    building: { owner: "enemy3", type: "tower" },
    piece: undefined,
  },
  "1,3": {
    terrain: undefined,
    building: { owner: "enemy3", type: "castle" },
    piece: undefined,
  },
  "2,3": {
    terrain: undefined,
    building: { owner: "enemy1", type: "castle" },
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
