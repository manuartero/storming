import Board from "./components/board/board";
import Piece from "./components/pieces/piece";

function App() {
  return (
    <div className="App">
      <Board />
      <Piece type="soldier" />
      <Piece type="knight" />
      <Piece type="ballista" />
    </div>
  );
}

export default App;
