import {
  Board,
  CurrentPhase,
  Marketplace,
  Menu,
  PlayerHand,
  TimeLine,
} from "components";
import { GameContextProvider } from "game-context";
import { StrictMode } from "react";

import "./app.scss";

export function App() {
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
