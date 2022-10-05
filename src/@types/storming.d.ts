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

type TileStatus = "idle" | "available" | "forbidden" | "selected";
type Terrain = "field" | "mountain" | "lake" | "forest";

interface TileState {
  status: TileStatus;
  terrain: Terrain;
  piece?: {
    type: "soldier";
    owner: Owner;
  };
  building?: {
    type: "village" | "town" | "city";
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
  action: ActionCardType;
  owner: Owner;
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

// --------------
// Contexts
// --------------

interface ActionLog {
  player?: Owner; // TODO mandatory player
  msg: string;
}

interface GameLogContext {
  actions: ActionLog[];
  log(action: ActionLog): void;
}
