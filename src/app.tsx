import {
  Board,
  CurrentPhase,
  Marketplace,
  Menu,
  PlayerHand,
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
          <CurrentPhase />
          <TimeLine />
          <Menu />
          <Board />
          <Marketplace />
          <PlayerHand />
        </GameContextProvider>
      </main>
    </StrictMode>
  );
}

export default App;
