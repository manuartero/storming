import { createContext, useContext, useState } from "react";
import { useBoard, emptyBoard } from "./board/use-board";
import { emptyTimeline, useTimeline } from "./timeline/use-timeline";

const GameContext = createContext<GameContext>({
  phase: "setup",
  board: emptyBoard,
  timeline: emptyTimeline,
  activeCard: undefined,
  activePlayer: undefined,
  buildInTile: () => {},
  movePiece: () => {},
  tmp: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function GameContextProvider({ children }: Props): JSX.Element {
  console.debug("<GameContextProvider />");

  const [phase, setPhase] = useState<Phase>("planification"); // will be setup
  const { board, buildInTile, movePiece } = useBoard();
  const { timeline, nextCard, planCard } = useTimeline();

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
    if (timeline.next.length === 0) {
      console.debug(
        "GameContext.resolveActionCard(): no more cards to resolve this turn"
      );
      changePhase();
    } else {
      nextCard();
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
        buildInTile: (obj: BuidInTile) => {
          buildInTile(obj);
          resolveActionCard();
        },
        movePiece: (obj: MovePiece) => {
          movePiece(obj);
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
