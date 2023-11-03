// --------------
// PLAYERS
// --------------

type PlayerType =
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
type PlayerHand = { card: Card; status: PlayerHandCardStatus }[];

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
  owner: PlayerType;
  hasWalls?: boolean;
};

type Piece = {
  type: PieceType;
  owner: PlayerType;
};

type TerrainType = "field" | "mountain" | "lake" | "forest";
type BuildingType = "village" | "town" | "city";
type PieceType = "soldier" | "knight";

interface Tile {
  terrain: TerrainType;
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

type CardId = `${PlayerType}_${ActionCardType | EventCardType}_${number}`;

type ActionCardType = "build" | "diplo" | "move" | "recruit";

type Card = ActionCard | EventCard;

type ActionCard = {
  cardType: "actionCard";
  action: ActionCardType;
  owner: PlayerType;
  cardId: CardId;
};

type EventCardType = "event1" | "event2" | "event3";

type EventCard = {
  cardType: "eventCard";
  event: EventCardType;
  playedBy: PlayerType;
  cardId: CardId;
};

// --------------
// TIMELINE
// --------------

type TimelineCard = {
  card: Card;
  commited: boolean;
};

type Timeline = {
  current: Card | undefined;
  next: TimelineCard[];
  future: TimelineCard[];
};

// --------------
// Contexts
// --------------

interface ActionLog {
  player?: PlayerType; // TODO? make 'player' mandatory field
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
  player: PlayerType;
  nextCard: ActionCard;
  futureCard: ActionCard;
  eventCard?: EventCard; // TODO !MVP
}

interface PlayerStatus {
  player: PlayerType;
  points: number;
  greatestEmpirePoint: boolean;
}

type GameContext = {
  phase: PhaseType;
  board: Board;
  timeline: Timeline;
  activeCard: Card | undefined;
  activePlayer: PlayerType | undefined;
  players: PlayerStatus[];

  build(action: BuildAction): void;
  move(action: MoveAction): void;
  recruit(action: RecruitAction): void;
  plan(action: PlanAction): void;
  firstPlayer(player: PlayerType): void;
  skip(): void;

  loadSavegame(gameContext: GameContext): void;
};

// ----

type Savegame = {
  createdAt: string; // ms from Epoch
  playerEmpireSize: number;
  gameContext: GameContext;
};
