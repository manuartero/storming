interface TileID {
  x: number;
  y: number;
  str: TileIdStr;
}

type TileIdStr =
  // 1st row
  | "-2,-3"
  | "-1,-3"
  | "0,-3"
  | "1,-3"
  | "2,-3"
  // 2nd row
  | "-3,-2"
  | "-2,-2"
  | "-1,-2"
  | "0,-2"
  | "1,-2"
  | "2,-2"
  // 3rd row
  | "-3,-1"
  | "-2,-1"
  | "-1,-1"
  | "0,-1"
  | "1,-1"
  | "2,-1"
  | "3,-1"
  // 4th row
  | "-4,0"
  | "-3,0"
  | "-2,0"
  | "-1,0"
  | "0,0"
  | "1,0"
  | "2,0"
  | "3,0"
  // 5th row
  | "-3,1"
  | "-2,1"
  | "-1,1"
  | "0,1"
  | "1,1"
  | "2,1"
  | "3,1"
  // 6th row
  | "-3,2"
  | "-2,2"
  | "-1,2"
  | "0,2"
  | "1,2"
  | "2,2"
  // 7th row
  | "-2,3"
  | "-1,3"
  | "0,3"
  | "1,3"
  | "2,3";

interface TileState {
  status: "idle" | "available" | "forbidden" | "selected";
  terrain: "field" | "mountain" | "lake" | "forest";
  piece?: {
    type: "soldier";
    owner: "player" | "enemy";
  };
}

type BoardState = Record<TileIdStr, TileState>;

interface BoardStateAction {
  type: "move-piece" | "select-piece";
  from?: TileIdStr;
  to?: TileIdStr;
  tile?: TileIdStr;
  tiles?: TileIdStr[];
}
