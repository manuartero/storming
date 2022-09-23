import { Board, Hand, TimeLine } from "./components";

function App() {
  return (
    <div className="root">
      <main className="game">
        <TimeLine />
        <Board />
        <Hand />
      </main>
    </div>
  );
}

export default App;
