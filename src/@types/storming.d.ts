// --------------
// PLAYERS
// --------------

type PlayerType =
  | "player"
  | "enemy1" /* red */
  | "enemy2" /* blue */
  | "enemy3" /* green */;

type PlayerHandCardStatus = "selected" | "available" | "played" | "active";

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

type Coordinates = {
  x: number;
  y: number;
  str: TileID;
};

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

type TerrainType = "mountain" | "lake" | "forest";
type BuildingType = "tower" | "castle" | "citadel";
type PieceType = "soldier" | "knight";

type Tile = {
  terrain?: TerrainType;
  piece?: Piece;
  building?: Building;
};

type VisualBoard = Record<TileID, TileWithStatus>;

type TileStatus = "selected" | "available" | "forbidden";

type TileWithStatus = Tile & {
  status?: TileStatus;
};

// --------------
// CARDS
// --------------

type CardId =
  | `${PlayerType}_${ActionCardType}_${number}`
  | `event_${EventCardType}_${number}`;

type ActionCardType = "build" | "diplo" | "move" | "recruit";

type Card = ActionCard | EventCard;

type ActionCard = {
  cardType: "actionCard";
  action: ActionCardType;
  owner: PlayerType;
  cardId: CardId;
};

type GeneralEventType = import("models/event-cards")._GeneralEventType;
type ColourAimedEventType = import("models/event-cards")._ColourAimedEventType;
type EventCardType = GeneralEventType | ColourAimedEventType;

type EventCard = {
  cardType: "eventCard";
  event: EventCardType;
  target?: PlayerType; // the colour a colour-aimed event names: event.2
  playedBy?: PlayerType; // absent while in the deck or a hand
  cardId: CardId;
};

// --------------
// TIMELINE
// --------------

type PhaseType = "setup" | "planification" | "action" | "ended";

type TimelineCard = {
  card: Card;
  commited: boolean;
};

type Actions = {
  nextActionCard: ActionCard | undefined | null;
  futureActionCard: ActionCard | undefined | null;
};

// --------------
// GameContext
// --------------

type PlayerStatus = {
  player: PlayerType;
  points: number;
  greatestEmpirePoint: boolean; // deprecated
};

type GameContext = {
  phase: PhaseType;
  winner: PlayerType | undefined; // set when phase is "ended"
  activeCard: Card | undefined;
  activePlayer: PlayerType | undefined;
  next: TimelineCard[];
  future: TimelineCard[];
  board: Board;
  players: PlayerStatus[];

  // planning phase
  plan(action: Actions): void;
  submitPlanification(): void;

  // action phase
  build(action: { tile: TileID; building: Building }): void;
  move(action: { from: TileID; to: TileID; piece: Piece }): void;
  recruit(action: { tile: TileID; piece: Piece }): void;
  skip(): void;

  firstPlayer(player: PlayerType): void;

  // other
  newGame(): void;
  loadSavegame(state: GameState): void;
};

// ----

/* the part of GameContext that is data (what a savegame stores) */
type GameState = Pick<
  GameContext,
  "phase" | "winner" | "activeCard" | "next" | "future" | "board" | "players"
>;

/* a face-down card as another player sees it: no action, no cardId (it names the action) */
type HiddenCard = {
  cardType: "hidden";
  owner?: PlayerType; // absent on a face-down event: round.6 shuffles them
};

type PublicTimelineCard = {
  card: Card | HiddenCard;
  commited: boolean;
};

/* GameState as one player sees it */
type PublicGameState = Omit<GameState, "next" | "future"> & {
  next: PublicTimelineCard[];
  future: PublicTimelineCard[];
};

type Savegame = {
  createdAt: string; // ms from Epoch
  playerEmpireSize: number;
  state: GameState;
};
