const initialBoard: Board = {
  // row 1
  "-2,-3": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-1,-3": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "0,-3": {
    terrain: "field",
    building: { owner: "enemy1", type: "village" },
    piece: undefined,
  },
  "1,-3": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "2,-3": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  // row 2
  "-3,-2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-2,-2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-1,-2": {
    terrain: "field",
    building: undefined,
    piece: { owner: "enemy1", type: "soldier" },
  },
  "0,-2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "1,-2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "2,-2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  // row 3
  "-3,-1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-2,-1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-1,-1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "0,-1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "1,-1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "2,-1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "3,-1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  // row 4
  "-4,0": {
    terrain: "field",
    building: { owner: "player", type: "village" },
    piece: undefined,
  },
  "-3,0": {
    terrain: "field",
    building: undefined,
    piece: { owner: "player", type: "soldier" },
  },
  "-2,0": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-1,0": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "0,0": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "1,0": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "2,0": {
    terrain: "field",
    building: undefined,
    piece: { owner: "enemy2", type: "soldier" },
  },
  "3,0": {
    terrain: "field",
    building: { owner: "enemy2", type: "village" },
    piece: undefined,
  },
  // row 5
  "-3,1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-2,1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-1,1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "0,1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "1,1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "2,1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "3,1": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  // row 6
  "-3,2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-2,2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "-1,2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "0,2": {
    terrain: "field",
    building: undefined,
    piece: { owner: "enemy3", type: "soldier" },
  },
  "1,2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  "2,2": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
  // row 7
  "-2,3": {
    terrain: "field",
    building: undefined,
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
    building: undefined,
    piece: undefined,
  },
  "2,3": {
    terrain: "field",
    building: undefined,
    piece: undefined,
  },
};

export default initialBoard;
