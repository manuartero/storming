import { createContext, useContext, useState } from "react";
import { logRender } from "utils/console";
import { useBoard, emptyBoard } from "./use-board";
import usePlayerOrder from "./use-player-order";
import { emptyTimeline, useTimeline } from "./use-timeline";

const GameContext = createContext<GameContext>({
  phase: "setup",
  board: emptyBoard,
  timeline: emptyTimeline,
  activeCard: undefined,
  activePlayer: undefined,
  playerOrder: [],
  build: () => {},
  move: () => {},
  recruit: () => {},
  plan: () => {},
  firstPlayer: () => {},
  skip: () => {},
});

interface Props {
  children: React.ReactNode;
}

function defineActivePlayer(
  phase: Phase,
  timeline: Timeline,
  playerOrder: Player[]
) {
  if (phase === "planification") {
    // [ . . . . ]  playerOrder[0]    0, 4
    // [ . ]        playerOrder[1]    1, 5
    // []           playerOrder[2]    2, 6
    return playerOrder[timeline.next.length % 4];
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

  const [phase, setPhase] = useState<Phase>("planification"); // will be setup
  const { board, buildOnTile, movePiece, recruitOnTile } = useBoard();
  const { timeline, nextCard, planification, newTurn } = useTimeline();
  const { playerOrder, firstPlayer } = usePlayerOrder();

  /* derived state */
  const activeCard = timeline.current;
  const activePlayer = defineActivePlayer(phase, timeline, playerOrder);

  /* API */
  const changePhase = () => {
    let nextPhase: Phase;
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
        playerOrder,
        build: (action: BuildAction) => {
          buildOnTile(action);
          resolveActionCard();
        },
        move: (action: MoveAction) => {
          movePiece(action);
          resolveActionCard();
        },
        recruit: (action: RecruitAction) => {
          recruitOnTile(action);
          resolveActionCard();
        },
        firstPlayer: (player: Player) => {
          firstPlayer(player);
          resolveActionCard();
        },
        plan: (action: PlanAction) => {
          const { next } = planification(action);
          if (next.length % 4 === 0) {
            changePhase();
          }
        },
        skip: () => {
          resolveActionCard();
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
