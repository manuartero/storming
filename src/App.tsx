import { Board, Hand } from "./components";

function App() {
  return (
    <div className="root">
      <main className="game">
        <Hand />
        <Board />
      </main>
    </div>
  );
}

export default App;
