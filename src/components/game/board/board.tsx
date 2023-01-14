import { row } from "models/tiles";
import { logRender } from "utils/console";
import { Piece } from "./piece";
import { Tile } from "./tile";

import "./board.scss";

interface Props {
  state: VisualBoard;
  onTileClick: (titleID: Coordinates) => void;
}

function Board({ state, onTileClick }: Props): JSX.Element {
  logRender("Board");

  const renderRow = (n: -3 | -2 | -1 | 0 | 1 | 2 | 3) =>
    row(n).map((tileId) => {
      const s = state[tileId];
      return (
        <Tile
          id={tileId}
          key={tileId}
          status={s.status}
          terrain={s.terrain}
          building={s.building?.type}
          owner={s.building?.owner || s.piece?.owner}
          onClick={onTileClick}
        >
          {s.piece && <Piece type={s.piece.type} owner={s.piece.owner} />}
        </Tile>
      );
    });

  return (
    <div className="board">
      <div className="board__row board__row--3-to-equator">{renderRow(-3)}</div>
      <div className="board__row board__row--2-to-equator">{renderRow(-2)}</div>
      <div className="board__row board__row--1-to-equator">{renderRow(-1)}</div>
      <div className="board__row">{renderRow(0)}</div>
      <div className="board__row board__row--1-to-equator">{renderRow(1)}</div>
      <div className="board__row board__row--2-to-equator">{renderRow(2)}</div>
      <div className="board__row board__row--3-to-equator">{renderRow(3)}</div>
    </div>
  );
}

export default Board;
