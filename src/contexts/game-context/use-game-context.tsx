import { createContext, useContext, useState } from "react";
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
  firstPlayer: () => {},
  tmp: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function GameContextProvider({ children }: Props): JSX.Element {
  console.debug("<GameContextProvider />");

  const [phase, setPhase] = useState<Phase>("planification"); // will be setup
  const { board, buildOnTile, movePiece, recruitOnTile } = useBoard();
  const { timeline, nextCard, planCard } = useTimeline();
  const { playerOrder, firstPlayer } = usePlayerOrder();

  /* derived state */
  const activeCard = timeline.current;
  const activePlayer =
    timeline.current?.cardType === "actionCard"
      ? timeline.current.owner
      : undefined;

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
    console.debug(`GameContext.changePhase() (${phase} -> ${nextPhase})`);
    setPhase(nextPhase);
  };

  const resolveActionCard = () => {
    nextCard();
    if (timeline.next.length === 0) {
      console.debug(
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
        tmp: () => {
          changePhase();
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
