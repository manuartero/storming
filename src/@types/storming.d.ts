// --------------
// PLAYERS
// --------------

type Owner = "player" | "enemy1" | "enemy2" | "enemy3";

// --------------
// BOARD & TILES
// --------------

declare type TileID = import("models/tiles")._TileID;

interface Coordinates {
  x: number;
  y: number;
  str: TileID;
}

type Board = Record<TileID, Tile>;

type Terrain = "field" | "mountain" | "lake" | "forest";
type Building = "village" | "town" | "city";
type Piece = "soldier" | "knight";
interface Tile {
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

type VisualBoard = Record<TileID, TileWithStatus>;

type TileStatus = "idle" | "selected" | "available" | "forbidden";
interface TileWithStatus extends Tile {
  status: TileStatus;
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

type Timeline = {
  current: Card | undefined;
  next: Card[];
  future: Card[];
};

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

interface BuidInTile {
  tile: TileID;
  building: Building;
  owner: Owner;
}

interface MovePiece {
  piece: {
    type: Piece;
    owner: Owner;
  };
  from: TileID;
  to: TileID;
}

interface GameContext {
  phase: Phase;
  board: Board;
  timeline: Timeline;
  activeCard: Card | undefined;
  activePlayer: Owner | undefined;
  buildInTile(_: BuidInTile): void;
  movePiece(_: MovePiece): void;
  tmp(): void;
}
