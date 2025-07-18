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

import styles from "./app.module.css";

export function App() {
  return (
    <StrictMode>
      <main className={styles.app}>
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
