declare type TileID = import("models/tiles")._TileID;

interface Coordinates {
  x: number;
  y: number;
  str: TileID;
}

interface TileState {
  status: "idle" | "available" | "forbidden" | "selected";
  terrain: "field" | "mountain" | "lake" | "forest";
  piece?: {
    type: "soldier";
    owner: "player" | "enemy";
  };
}

type BoardState = Record<TileID, TileState>;

interface MovePieceAction {
  type: "move-piece";
  from: TileID;
  to: TileID;
}

interface SelectPieceAction {
  type: "select-piece";
  tile: TileID;
}

type BoardStateAction = MovePieceAction | SelectPieceAction;
