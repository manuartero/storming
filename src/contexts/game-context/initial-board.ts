const initialBoard: Board = {
  "-2,-3": {
    terrain: "field",
    piece: undefined,
  },
  "-1,-3": {
    terrain: "field",
    piece: { owner: "player", type: "soldier" }, //XXX
  },
  "0,-3": {
    terrain: "field",
    piece: undefined,
  },
  "1,-3": {
    terrain: "field",
    piece: undefined,
  },
  "2,-3": {
    terrain: "field",
    piece: undefined,
  },
  "-3,-2": {
    terrain: "field",
    piece: undefined,
  },
  "-2,-2": {
    terrain: "field",
    piece: undefined,
  },
  "-1,-2": {
    terrain: "field",
    piece: { owner: "enemy1", type: "soldier" }, // XXX
  },
  "0,-2": {
    terrain: "field",
    piece: undefined,
  },
  "1,-2": {
    terrain: "field",
    piece: undefined,
  },
  "2,-2": {
    terrain: "field",
    piece: undefined,
  },
  "-3,-1": {
    terrain: "field",
    piece: undefined,
  },
  "-2,-1": {
    terrain: "field",
    piece: undefined,
  },
  "-1,-1": {
    terrain: "field",
    piece: undefined,
  },
  "0,-1": {
    terrain: "field",
    piece: undefined,
  },
  "1,-1": {
    terrain: "field",
    piece: { owner: "player", type: "soldier" },
  },
  "2,-1": {
    terrain: "field",
    piece: { owner: "player", type: "soldier" },
  },
  "3,-1": {
    terrain: "field",
    piece: { owner: "enemy2", type: "soldier" },
  },
  "-4,0": {
    terrain: "field",
    piece: { owner: "player", type: "soldier" },
  },
  "-3,0": {
    terrain: "field",
    piece: { owner: "enemy3", type: "soldier" },
  },
  "-2,0": {
    terrain: "field",
    piece: undefined,
  },
  "-1,0": {
    terrain: "field",
    piece: undefined,
  },
  "0,0": {
    terrain: "field",
    piece: undefined,
  },
  "1,0": {
    terrain: "mountain", // XXX
    piece: undefined,
  },
  "2,0": {
    terrain: "forest", // XXX
    piece: undefined,
  },
  "3,0": {
    terrain: "lake", // XXX
    piece: undefined,
  },
  "-3,1": {
    terrain: "field",
    piece: undefined,
  },
  "-2,1": {
    terrain: "field",
    piece: undefined,
  },
  "-1,1": {
    terrain: "field",
    piece: undefined,
  },
  "0,1": {
    terrain: "field",
    piece: undefined,
  },
  "1,1": {
    terrain: "field",
    piece: undefined,
    building: {
      owner: "enemy3",
      type: "town",
    },
  },
  "2,1": {
    terrain: "field",
    piece: undefined,
  },
  "3,1": {
    terrain: "field",
    piece: undefined,
  },
  "-3,2": {
    terrain: "field",
    piece: undefined,
  },
  "-2,2": {
    terrain: "field",
    piece: undefined,
  },
  "-1,2": {
    terrain: "field",
    piece: undefined,
  },
  "0,2": {
    terrain: "field",
    piece: undefined,
  },
  "1,2": {
    terrain: "field",
    piece: undefined,
  },
  "2,2": {
    terrain: "field",
    piece: undefined,
  },
  "-2,3": {
    terrain: "field",
    piece: undefined,
  },
  "-1,3": {
    terrain: "field",
    piece: undefined,
  },
  "0,3": {
    terrain: "field",
    piece: undefined,
  },
  "1,3": {
    terrain: "field",
    piece: undefined,
  },
  "2,3": {
    terrain: "field",
    piece: undefined,
  },
};

export default initialBoard;
