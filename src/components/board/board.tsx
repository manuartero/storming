import c from "classnames";
import { TILES, coordinates } from "models/tiles";
import { logRender } from "utils/console";
import { Tile, Piece } from "elements";

import styles from "./board.module.css";

type Props = {
  state: VisualBoard;
  activePlayer?: PlayerType;
  onTileClick: (titleID: Coordinates) => void;
};

export function Board({ state, activePlayer, onTileClick }: Props) {
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
          activePlayer={activePlayer}
          onClick={onTileClick}
        >
          {s.piece && <Piece type={s.piece.type} owner={s.piece.owner} />}
        </Tile>
      );
    });

  return (
    <section className={styles.board} role="board" aria-label="game board">
      <div
        className={c(styles.row, styles.row3ToEquator)}
        role="row"
        aria-label="board row -3"
      >
        {renderRow(-3)}
      </div>
      <div
        className={c(styles.row, styles.row2ToEquator)}
        role="row"
        aria-label="board row -2"
      >
        {renderRow(-2)}
      </div>
      <div
        className={c(styles.row, styles.row1ToEquator)}
        role="row"
        aria-label="board row -1"
      >
        {renderRow(-1)}
      </div>
      <div className={c(styles.row)} role="row" aria-label="board row 0">
        {renderRow(0)}
      </div>
      <div
        className={c(styles.row, styles.row1ToEquator)}
        role="row"
        aria-label="board row 1"
      >
        {renderRow(1)}
      </div>
      <div
        className={c(styles.row, styles.row2ToEquator)}
        role="row"
        aria-label="board row 2"
      >
        {renderRow(2)}
      </div>
      <div
        className={c(styles.row, styles.row3ToEquator)}
        role="row"
        aria-label="board row 3"
      >
        {renderRow(3)}
      </div>
    </section>
  );
}

function row(n: -3 | -2 | -1 | 0 | 1 | 2 | 3): TileID[] {
  return TILES.filter((id) => coordinates(id).y === n);
}
