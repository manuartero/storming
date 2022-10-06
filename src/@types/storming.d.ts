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

/* available */
interface HighlightTilesAction {
  type: "highlight-tiles";
  tiles: TileID[];
}

interface BuildInTileAction {
  type: "build-in-tile";
  tile: TileID;
}

type BoardStateAction =
  | BuildInTileAction
  | HighlightTilesAction
  | MovePieceAction
  | SelectTileAction;

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
  // TODO Consider EventCards (!MVP)
}

// --------------
// TIMELINE
// --------------

type TimelineState = {
  current: Card | undefined;
  next: Card[];
  future: Card[];
};

interface PlanificationAction {
  type: "planification";
  card: Card;
}

interface ResolveAction {
  type: "resolve";
  card: Card;
}

type TimelineAction = PlanificationAction | ResolveAction;

// --------------
// Contexts
// --------------

interface ActionLog {
  player?: Owner; // TODO? make 'player' mandatory field
  msg: string;
}

interface GameLogContext {
  actions: ActionLog[];
  log(action: ActionLog): void;
}

// --------------
// GameContext
// --------------

type Phase = "setup" | "planification" | "action";

interface GameContext {
  phase: Phase;
  activeCard: Card | undefined;
  activePlayer: Owner | undefined;

  changePhase(): void;
  setActiveCard(card: Card | undefined): void;
  setActivePlayer(player: Owner | undefined): void;
}
