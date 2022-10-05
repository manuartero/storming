import { createContext, useContext, useState } from "react";

const CurrentCardContext = createContext<CurrentCardContext | undefined>({
  currentCard: undefined,
  setCurrentCard: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function CurrentCardProvider({ children }: Props): JSX.Element {
  const [currentCard, setCurrentCard] = useState<Card | undefined>();
  return (
    <CurrentCardContext.Provider
      value={{
        currentCard,
        setCurrentCard,
      }}
    >
      {children}
    </CurrentCardContext.Provider>
  );
}

export function useCurrentCard() {
  return useContext(CurrentCardContext);
}
