import {
  Board,
  CurrentPhase,
  GameOver,
  Marketplace,
  Menu,
  PlayerHand,
  RoundSummary,
  TimeLine,
  PlayerInventory,
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
        <Marketplace />
        <RoundSummary />
        <PlayerHand />
        <PlayerInventory />
        <GameOver />
      </GameContextProvider>
    </main>
  );
}
