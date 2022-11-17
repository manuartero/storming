// --------------
// PLAYERS
// --------------

type Player =
  | "player"
  | "enemy1" /* red */
  | "enemy2" /* blue */
  | "enemy3" /* green */;

type PlayerHandCardStatus = "available" | "selected" | "played";

/**
 * ```ts
 * [ { action: "build", status: "available" }, ... ]
 * ```
 */
type PlayerHand = { action: ActionCardType; status: PlayerHandCardStatus }[];

// --------------
// BOARD, TILES & PIECES
// --------------

declare type TileID = import("models/tiles")._TileID;

interface Coordinates {
  x: number;
  y: number;
  str: TileID;
}

type Board = Record<TileID, Tile>;

type Building = {
  type: BuildingType;
  owner: Player;
};

type Piece = {
  type: PieceType;
  owner: Player;
}

type Terrain = "field" | "mountain" | "lake" | "forest";
type BuildingType = "village" | "town" | "city";
type PieceType = "soldier" | "knight";

interface Tile {
  terrain: Terrain;
  piece?: Piece;
  building?: Building;
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
  owner: Player;
}

type EventCardType = "even1" | "event2" | "event3";

interface EventCard {
  cardType: "eventCard";
  event: EventCardType;
  playedBy: Player;
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
  player?: Player; // TODO? make 'player' mandatory field
  msg: string;
}

interface GameLogContext {
  actions: ActionLog[];
  log(action: ActionLog): void;
}

// --------------
// GameContext
// --------------

type PhaseType = "setup" | "planification" | "action";

interface BuildAction {
  tile: TileID;
  building: Building;
}

interface MoveAction {
  from: TileID;
  to: TileID;
  piece: Piece;
}

interface RecruitAction {
  tile: TileID;
  piece: Piece;
}

interface PlanAction {
  player: Player;
  nextCard: ActionCard;
  futureCard: ActionCard;
  eventCard?: EventCard; // TODO !MVP
}

interface PlayerStatus {
  player: Player;
  points: number;
  greatestEmpirePoint: boolean;
}

interface GameContext {
  phase: PhaseType;
  board: Board;
  timeline: Timeline;
  activeCard: Card | undefined;
  activePlayer: Player | undefined;
  players: PlayerStatus[];

  build(action: BuildAction): void;
  move(action: MoveAction): void;
  recruit(action: RecruitAction): void;
  plan(action: PlanAction): void;
  firstPlayer(player: Player): void;
  skip(): void;
}
