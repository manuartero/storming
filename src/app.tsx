import {
  Board,
  CurrentPhase,
  Marketplace,
  Menu,
  PlayerHand,
  RoundSummary,
  TimeLine,
} from "components";
import { GameContextProvider } from "game-context";
import { StrictMode } from "react";

import "./styles/colors.css";
import "./styles/animations.css";
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
          <RoundSummary />
          <PlayerHand />
        </GameContextProvider>
      </main>
    </StrictMode>
  );
}
