import { createContext, useContext, useState } from "react";

const GameLogContext = createContext<GameLogContext>({
  actions: [],
  log: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function GameLogProvider({ children }: Props): JSX.Element {
  const [actions, setActions] = useState<ActionLog[]>([]);

  const log = (action: ActionLog) => {
    setActions([action, ...actions]);
  };

  return (
    <GameLogContext.Provider value={{ actions, log }}>
      {children}
    </GameLogContext.Provider>
  );
}

export function useGameLog() {
  return useContext(GameLogContext);
}
