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

type TileStatus = "idle" | "selected" | "available" | "forbidden";
type Terrain = "field" | "mountain" | "lake" | "forest";
type Building = "village" | "town" | "city";
type Piece = "soldier" | "knight";

interface TileState {
  status: TileStatus;
  terrain: Terrain;
  piece?: {
    type: Piece;
    owner: Owner;
  };
  building?: {
    type: Building;
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

type EventCardType = "even1" | "event2" | "event3";

interface EventCard {
  cardType: "eventCard";
  event: EventCardType;
  playedBy: Owner;
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

interface ResolveAction {
  type: "resolve";
}

type TimelineAction = PrepareAction | ResolveAction;

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

interface CurrentCardContext {
  currentCard: Card | undefined;
  setCurrentCard(card: Card): void;
}
