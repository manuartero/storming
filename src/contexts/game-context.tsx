import { createContext, useContext, useState } from "react";

const GameContext = createContext<GameContext>({
  phase: "action",
  activePlayer: undefined,
  activeCard: undefined,
  changePhase: () => {},
  setActivePlayer: () => {},
  setActiveCard: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function GameContextProvider({ children }: Props): JSX.Element {
  console.debug("<GameContextProvider>");

  const [phase, setPhase] = useState<Phase>("action"); // will be setup
  const [activePlayer, setActivePlayer] = useState<Owner | undefined>(
    undefined
  );
  const [activeCard, setActiveCard] = useState<Card | undefined>(undefined);

  const changePhase = () => {
    console.debug(`GameContext.changePhase() (${phase} -> ...)`);
    switch (phase) {
      case "setup":
        setPhase("planification");
        break;
      case "planification":
        setPhase("action");
        break;
      case "action":
        setPhase("planification");
        break;
    }
  };

  return (
    <GameContext.Provider
      value={{
        phase,
        activePlayer,
        activeCard,
        changePhase,
        setActivePlayer,
        setActiveCard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
