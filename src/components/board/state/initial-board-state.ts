const initialBoardState: BoardState = {
  "-2,-3": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-1,-3": {
    status: "idle",
    terrain: "field",
    piece: { owner: "player", type: "soldier" }, //XXX
  },
  "0,-3": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "1,-3": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "2,-3": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-3,-2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-2,-2": {
    status: "available", // XXX
    terrain: "field",
    piece: undefined,
  },
  "-1,-2": {
    status: "idle",
    terrain: "field",
    piece: { owner: "enemy", type: "soldier" }, // XXX
  },
  "0,-2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "1,-2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "2,-2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-3,-1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-2,-1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-1,-1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "0,-1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "1,-1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "2,-1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "3,-1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-4,0": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-3,0": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-2,0": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-1,0": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "0,0": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "1,0": {
    status: "idle",
    terrain: "mountain", // XXX
    piece: undefined,
  },
  "2,0": {
    status: "forbidden", // XXX
    terrain: "forest", // XXX
    piece: undefined,
  },
  "3,0": {
    status: "idle",
    terrain: "lake", // XXX
    piece: undefined,
  },
  "-3,1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-2,1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-1,1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "0,1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "1,1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "2,1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "3,1": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-3,2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-2,2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-1,2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "0,2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "1,2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "2,2": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-2,3": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "-1,3": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "0,3": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "1,3": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
  "2,3": {
    status: "idle",
    terrain: "field",
    piece: undefined,
  },
};

export default initialBoardState;
