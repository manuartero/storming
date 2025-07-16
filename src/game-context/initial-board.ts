export const initialBoard: Board = {
  // row 1
  "-2,-3": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-1,-3": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "0,-3": {
    terrain: undefined,
    building: { owner: "enemy1", type: "tower" },
    piece: undefined,
  },
  "1,-3": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "2,-3": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  // row 2
  "-3,-2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-2,-2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-1,-2": {
    terrain: undefined,
    building: undefined,
    piece: { owner: "enemy1", type: "soldier" },
  },
  "0,-2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "1,-2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "2,-2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  // row 3
  "-3,-1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-2,-1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-1,-1": {
    terrain: "lake",
    building: undefined,
    piece: undefined,
  },
  "0,-1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "1,-1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "2,-1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "3,-1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  // row 4
  "-4,0": {
    terrain: undefined,
    building: { owner: "player", type: "tower" },
    piece: undefined,
  },
  "-3,0": {
    terrain: undefined,
    building: undefined,
    piece: { owner: "player", type: "soldier" },
  },
  "-2,0": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-1,0": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "0,0": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "1,0": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "2,0": {
    terrain: undefined,
    building: undefined,
    piece: { owner: "enemy2", type: "soldier" },
  },
  "3,0": {
    terrain: undefined,
    building: { owner: "enemy2", type: "tower" },
    piece: undefined,
  },
  // row 5
  "-3,1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-2,1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-1,1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "0,1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "1,1": {
    terrain: "lake",
    building: undefined,
    piece: undefined,
  },
  "2,1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "3,1": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  // row 6
  "-3,2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-2,2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "-1,2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "0,2": {
    terrain: undefined,
    building: undefined,
    piece: { owner: "enemy3", type: "soldier" },
  },
  "1,2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  "2,2": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
  // row 7
  "-2,3": {
    terrain: undefined,
    building: undefined,
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
    building: undefined,
    piece: undefined,
  },
  "2,3": {
    terrain: undefined,
    building: undefined,
    piece: undefined,
  },
};
