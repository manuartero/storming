import Piece from "../pieces/piece";
import "./board.scss";
import Tile from "./tile";

const row1: TileIdStr[] = ["-2,-3", "-1,-3", "0,-3", "1,-3", "2,-3"];
const row2: TileIdStr[] = ["-3,-2", "-2,-2", "-1,-2", "0,-2", "1,-2", "2,-2"];
const row3: TileIdStr[] = [
  "-3,-1",
  "-2,-1",
  "-1,-1",
  "0,-1",
  "1,-1",
  "2,-1",
  "3,-1",
];
const row4: TileIdStr[] = [
  "-4,0",
  "-3,0",
  "-2,0",
  "-1,0",
  "0,0",
  "1,0",
  "2,0",
  "3,0",
];
const row5: TileIdStr[] = ["-3,1", "-2,1", "-1,1", "0,1", "1,1", "2,1", "3,1"];
const row6: TileIdStr[] = ["-3,2", "-2,2", "-1,2", "0,2", "1,2", "2,2"];
const row7: TileIdStr[] = ["-2,3", "-1,3", "0,3", "1,3", "2,3"];

interface Props {
  state: BoardState;
  onTileClick: (titleID: TileID) => void;
}

/**
 * 5+6+7+8+7+6+5
 */
function Board({ state, onTileClick }: Props): JSX.Element {
  const renderRow = (row: TileIdStr[]) =>
    row.map((tileId) => {
      const s = state[tileId];
      return (
        <Tile
          key={tileId}
          id={tileId}
          terrain={s.terrain}
          status={s.status}
          onClick={onTileClick}
        >
          {s.piece && <Piece type={s.piece.type} owner={s.piece.owner} />}
        </Tile>
      );
    });

  return (
    <div className="board">
      <div className="board__row board__row--3-to-equator">
        {renderRow(row1)}
      </div>
      <div className="board__row board__row--2-to-equator">
        {renderRow(row2)}
      </div>
      <div className="board__row board__row--1-to-equator">
        {renderRow(row3)}
      </div>
      <div className="board__row">{renderRow(row4)}</div>
      <div className="board__row board__row--1-to-equator">
        {renderRow(row5)}
      </div>
      <div className="board__row board__row--2-to-equator">
        {renderRow(row6)}
      </div>
      <div className="board__row board__row--3-to-equator">
        {renderRow(row7)}
      </div>
    </div>
  );
}

export default Board;
