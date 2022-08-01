import "./board.scss";
import Tile from "./tile";

interface Props {
  foo?: string;
}



/**
 * 5+6+7+8+7+6+5
 */
function Board({ foo }: Props): JSX.Element {
  return (
    <div className="board">
      <div className="board__row board__row--3-to-equator">
        <Tile key='-1 -3' />
        <Tile key='0, -3' terrain="mountain" />
        <Tile key='1, 3' terrain="forest" />
        <Tile />
        <Tile />
      </div>
      <div className="board__row board__row--2-to-equator">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
      <div className="board__row board__row--1-to-equator">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
      <div className="board__row">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
      <div className="board__row board__row--1-to-equator">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
      <div className="board__row board__row--2-to-equator">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
      <div className="board__row board__row--3-to-equator">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
    </div>
  );
}

export default Board;
