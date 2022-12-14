import {
  Board,
  LogPanel,
  Marketplace,
  Menu,
  PlayerHand,
  RoundSummary,
  TimeLine,
} from "components";
import { GameContextProvider } from "contexts";
import { StrictMode } from "react";

import "./app.scss";

function App() {
  return (
    <StrictMode>
      <main className="game">
        <GameContextProvider>
          <TimeLine />
          <Menu />
          <RoundSummary />
          <Board />
          <Marketplace />
          <PlayerHand />
          <LogPanel />
        </GameContextProvider>
      </main>
    </StrictMode>
  );
}

export default App;
