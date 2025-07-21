import { empireSize } from "game-logic/empire-size";
import { isConquering, isCreatingGreatesEmpire } from "game-logic/score-check";
import { createContext, useContext } from "react";
import { logRender, warnInconsistentState } from "utils/console";
import { emptyBoard } from "./empty-board";
import { useBoard } from "./use-board";
import { usePlayers } from "./use-players";
import { useTimeline } from "./use-timeline";

const GameContext = createContext<GameContext>({
  phase: "setup",
  activeCard: undefined,
  activePlayer: undefined,
  board: emptyBoard,
  next: [],
  future: [],
  players: [],
  build: () => {},
  move: () => {},
  recruit: () => {},
  skip: () => {},
  plan: () => {},
  submitPlanification: () => {},
  firstPlayer: () => {},
  loadSavegame: () => {},
});

type Props = { children: React.ReactNode };

/**
 * GameController
 *
 * game state
 *
 * ```
 * { useTimeline(), useBoard(), usePlayers() }
 * ```
 */
export function GameContextProvider({ children }: Props) {
  logRender("GameContextProvider");

  const { board, buildOnTile, movePiece, recruitOnTile, _overrideBoard } =
    useBoard();

  const timeline = useTimeline();

  const {
    players,
    nextFirstPlayer,
    scorePoint,
    declareGreatestEmpire,
    _overridePlayers,
  } = usePlayers();

  /* derived state */
  const activePlayer = defineActivePlayer(timeline, { players });

  /* API */

  const loadSavegame = ({
    phase,
    activeCard,
    next,
    future,
    board,
    players,
  }: {
    phase: PhaseType;
    activeCard: Card | undefined;
    next: TimelineCard[];
    future: TimelineCard[];
    board: Board;
    players: PlayerStatus[];
  }) => {
    _overrideBoard(board);
    timeline._overrideTimeline({ phase, activeCard, next, future });
    _overridePlayers(players);
  };

  const _resolveActionCard = () => {
    if (timeline.next.length === 0) {
      console.info("resolveActionCard(): no more cards, changing phase");
      timeline.startPlanningPhase();
    } else {
      console.info("resolveActionCard(): next card");
      timeline.nextActiveCard();
    }
  };

  const build = (action: { tile: TileID; building: Building }) => {
    if (timeline.phase !== "action") {
      return warnInconsistentState(
        `trying to build but not in "action" phase`,
        { phase: timeline.phase, action }
      );
    }
    console.info(
      `buildOnTile({ tile: <${action.tile}>, building: ${action.building} })`
    );
    if (isCreatingGreatesEmpire({ ...action, empires: empireSize(board) })) {
      declareGreatestEmpire(action.building.owner);
    }
    buildOnTile(action);
    _resolveActionCard();
  };

  const move = (action: { piece: Piece; from: TileID; to: TileID }) => {
    if (timeline.phase !== "action") {
      return warnInconsistentState(`trying to move but not in "action" phase`, {
        phase: timeline.phase,
        action,
      });
    }
    console.info(
      `movePiece({ from: <${action.from}>, to: <${action.to}>, piece: ${action.piece} })`
    );
    const player = action.piece.owner;
    if (isConquering({ player, targetTile: board[action.to] })) {
      scorePoint(player);
    }
    movePiece(action);
    _resolveActionCard();
  };

  const recruit = (action: { tile: TileID; piece: Piece }) => {
    if (timeline.phase !== "action") {
      return warnInconsistentState(
        `trying to recruit but not in "action" phase`,
        { phase: timeline.phase, action }
      );
    }
    console.info(
      `recruitOnTile({ tile: <${action.tile}>, piece: ${action.piece} })`
    );
    recruitOnTile(action);
    _resolveActionCard();
  };

  const firstPlayer = () => {
    nextFirstPlayer();
    _resolveActionCard();
  };

  const plan = (actions: Actions) => {
    console.info(
      `plan({ next: ${actions.nextActionCard}, future: ${actions.futureActionCard} })`
    );
    if (timeline.phase !== "planification") {
      return warnInconsistentState(
        `trying to plan action but phase is not "planification"`,
        { phase: timeline.phase, action: actions }
      );
    }

    timeline.planAction(actions);
  };

  const submitPlanification = () => {
    const { phase, activeCard, next, future } = timeline;
    if (phase !== "planification") {
      return warnInconsistentState(
        `trying to submit planification but phase is not "planification"`,
        { phase, activeCard, next, future }
      );
    }
    console.info("submitPlanification()");

    const pendingNextActions = next.filter((card) => !card.commited);
    if (pendingNextActions.length !== 1) {
      return warnInconsistentState(
        `trying to submit planification but there are ${pendingNextActions.length} pending actions`,
        { phase, activeCard, next, future }
      );
    }

    const pendingFutureActions = future.filter((card) => !card.commited);
    if (pendingFutureActions.length !== 1) {
      return warnInconsistentState(
        `trying to submit planification but there are ${pendingFutureActions.length} pending actions`,
        { phase, activeCard, next, future }
      );
    }

    timeline.submitPlanification();
    if (next[0] && next.length % 4 === 0) {
      timeline.startActionPhase();
    }
  };

  const skip = () => {
    const { phase, activeCard } = timeline;
    if (
      activeCard?.cardType !== "actionCard" ||
      activeCard?.owner !== activePlayer
    ) {
      return warnInconsistentState(
        `trying to skip action but active card is not an action card`,
        { phase, activeCard }
      );
    }
    _resolveActionCard();
  };

  return (
    <GameContext.Provider
      value={{
        phase: timeline.phase,
        activeCard: timeline.activeCard,
        activePlayer,
        next: timeline.next,
        future: timeline.future,
        board,
        players,
        build,
        move,
        recruit,
        skip,
        firstPlayer,
        plan,
        submitPlanification,
        loadSavegame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}

// TODO move to state
function defineActivePlayer(
  {
    activeCard,
    phase,
    next,
  }: { activeCard: Card | undefined; phase: PhaseType; next: TimelineCard[] },
  { players }: { players: PlayerStatus[] }
) {
  if (phase === "planification") {
    // [ . . . . ]  playerOrder[0]    0, 4
    // [ . ]        playerOrder[1]    1, 5
    // [ . . ]      playerOrder[2]    2, 6
    const committedActions = next.filter(
      (timelineCard) => timelineCard.commited
    );
    return players[committedActions.length % 4].player;
  }
  if (phase === "action") {
    if (activeCard && activeCard.cardType === "actionCard") {
      return activeCard.owner;
    }
  }
  return undefined;
}
