import { CurrentCardProvider, GameLogProvider } from "contexts";
import {
  Board,
  Hand,
  LogPanel,
  RoundSummary,
  TimeLine,
  Marketplace,
} from "components";

import "./app.scss";

function App() {
  return (
    <main className="game">
      <GameLogProvider>
        <CurrentCardProvider>
          <TimeLine />
          <RoundSummary />
          <Board />
          <Marketplace />
          <Hand />
          <LogPanel />
        </CurrentCardProvider>
      </GameLogProvider>
    </main>
  );
}

export default App;
