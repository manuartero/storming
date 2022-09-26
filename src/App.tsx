import { GameLogProvider } from "contexts";
import { Board, Hand, LogPanel, RoundSummary, TimeLine } from "components";
import Marketplace from "components/marketplace/marketplace";

import "./app.scss";

function App() {
  return (
    <main className="game">
      <GameLogProvider>
        <TimeLine />
        <RoundSummary />
        <Board />
        <Marketplace />
        <Hand />
        <LogPanel />
      </GameLogProvider>
    </main>
  );
}

export default App;
