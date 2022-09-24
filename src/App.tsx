import { Board, Hand, TimeLine } from "./components";

function App() {
  return (
    <main className="game">
      <TimeLine />
      <Board />
      <Hand />
    </main>
  );
}

export default App;
