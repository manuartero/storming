import {
  Board,
  CurrentPhase,
  GameOver,
  Menu,
  PlayerHand,
  RoundSummary,
  TimeLine,
} from "components";
import { GameContextProvider } from "game-context";

import styles from "./app.module.css";

export function App() {
  return (
    <main className={styles.app}>
      <GameContextProvider>
        <CurrentPhase />
        <TimeLine />
        <Menu />
        <Board />
        <RoundSummary />
        <PlayerHand />
        <GameOver />
      </GameContextProvider>
    </main>
  );
}
