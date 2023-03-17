import { empireSize } from "game-logic/empire-size";
import { isConquering, isCreatingGreatesEmpire } from "game-logic/score-check";
import { createContext, useContext, useState } from "react";
import { logRender } from "utils/console";
import { emptyBoard } from "./empty-board";
import { useBoard } from "./use-board";
import usePlayers from "./use-players";
import { emptyTimeline, useTimeline } from "./use-timeline";

const GameContext = createContext<GameContext>({
  phase: "setup",
  board: emptyBoard,
  timeline: emptyTimeline,
  activeCard: undefined,
  activePlayer: undefined,
  players: [],
  build: () => {},
  move: () => {},
  recruit: () => {},
  plan: () => {},
  firstPlayer: () => {},
  skip: () => {},
  loadSavegame: () => {},
});

interface Props {
  children: React.ReactNode;
}

function defineActivePlayer(
  phase: PhaseType,
  timeline: Timeline,
  players: PlayerStatus[]
) {
  if (phase === "planification") {
    // [ . . . . ]  playerOrder[0]    0, 4
    // [ . ]        playerOrder[1]    1, 5
    // [ . . ]      playerOrder[2]    2, 6
    return players[timeline.next.length % 4].player;
  }
  if (phase === "action") {
    return timeline.current?.cardType === "actionCard"
      ? timeline.current.owner
      : undefined;
  }
  return undefined;
}

export function GameContextProvider({ children }: Props): JSX.Element {
  logRender("GameContextProvider");

  const [phase, setPhase] = useState<PhaseType>("planification"); // will be setup
  const { board, buildOnTile, movePiece, recruitOnTile, _overrideBoard } =
    useBoard();
  const { timeline, nextCard, planification, newTurn, _overrideTimeline } =
    useTimeline();
  const {
    players,
    firstPlayer,
    scorePoint,
    declareGreatestEmpire,
    _overridePlayers,
  } = usePlayers();

  /* derived state */
  const activeCard = timeline.current;
  const activePlayer = defineActivePlayer(phase, timeline, players);

  /* API */
  const overrideGameContext = ({
    phase,
    board,
    timeline,
    players,
  }: GameContext) => {
    setPhase(phase);
    _overrideBoard(board);
    _overrideTimeline(timeline);
    _overridePlayers(players);
  };

  const changePhase = () => {
    let nextPhase: PhaseType;
    switch (phase) {
      case "setup":
        nextPhase = "planification";
        break;
      case "planification":
        nextPhase = "action";
        nextCard(); // XXX
        break;
      case "action":
        nextPhase = "planification";
        break;
    }
    console.info(`GameContext.changePhase() (${phase} -> ${nextPhase})`);
    if (nextPhase === "planification") {
      newTurn();
    }
    setPhase(nextPhase);
  };

  const resolveActionCard = () => {
    nextCard();
    if (timeline.next.length === 0) {
      console.info(
        "GameContext.resolveActionCard(): no more cards to resolve this turn"
      );
      changePhase();
    }
  };

  return (
    <GameContext.Provider
      value={{
        phase,
        board,
        timeline,
        activeCard,
        activePlayer,
        players,

        build(action: BuildAction) {
          if (
            isCreatingGreatesEmpire({ ...action, empires: empireSize(board) })
          ) {
            declareGreatestEmpire(action.building.owner);
          }
          buildOnTile(action);
          resolveActionCard();
        },

        move(action: MoveAction) {
          const player = action.piece.owner;
          if (isConquering({ player, targetTile: board[action.to] })) {
            scorePoint(player);
          }
          movePiece(action);
          resolveActionCard();
        },

        recruit(action: RecruitAction) {
          recruitOnTile(action);
          resolveActionCard();
        },

        firstPlayer(player: PlayerType) {
          firstPlayer(player);
          resolveActionCard();
        },

        plan(action: PlanAction) {
          const { next } = planification(action);
          if (next.length % 4 === 0) {
            changePhase();
          }
        },

        skip() {
          resolveActionCard();
        },

        loadSavegame(gameContext: GameContext) {
          overrideGameContext(gameContext);
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
