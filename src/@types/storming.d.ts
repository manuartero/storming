// --------------
// PLAYERS
// --------------

type Owner = "player" | "enemy1" | "enemy2" | "enemy3";

// --------------
// TILES
// --------------

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
    owner: Owner;
  };
}

// --------------
// BOARD
// --------------

type BoardState = Record<TileID, TileState>;

interface MovePieceAction {
  type: "move-piece";
  from: TileID;
  to: TileID;
}

interface SelectTileAction {
  type: "select-tile";
  tile: TileID;
}

type BoardStateAction = MovePieceAction | SelectTileAction;

interface AvailableMovements {
  available: TileID[];
  forbidden: TileID[];
}

// --------------
// CARDS
// --------------

type ActionCardType = "build" | "diplo" | "move" | "recruit";

type Card = ActionCard | EventCard;

interface ActionCard {
  cardType: "actionCard";
  owner: Owner;
  card: ActionCardType;
}

interface EventCard {
  cardType: "event";
  // TODO
}

// --------------
// TIMELINE
// --------------

interface TimelineState {
  current: Card | undefined;
  next: Card[];
  future: Card[];
}

interface PlanCardAction {
  type: "prepare";
  card: Card;
}

interface NextAction {
  type: "next";
}

type TimelineAction = PrepareAction | NextAction;
