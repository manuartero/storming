import {
  Board,
  Hand,
  LogPanel,
  Marketplace,
  RoundSummary,
  TimeLine,
} from "components";
import { GameContextProvider, GameLogProvider } from "contexts";
import { StrictMode } from "react";

import "./app.scss";

function App() {
  return (
    <StrictMode>
      <main className="game">
        <GameContextProvider>
          <TimeLine />
          <RoundSummary />
          <Board />
          <Marketplace />
          <Hand />
          <LogPanel />
        </GameContextProvider>
      </main>
    </StrictMode>
  );
}

export default App;
