import { TILES, coordinates } from "models/tiles";
import { logRender } from "lib/console";
import { Tile, Piece } from "elements";

import styles from "./board.module.css";

type Props = {
  state: VisualBoard;
  activePlayer?: PlayerType;
  onTileClick: (tileID: Coordinates) => void;
};

export function Board({ state, activePlayer, onTileClick }: Props) {
  logRender("Board");

  const renderRow = (n: RowNumber) =>
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
      {ROWS.map((n) => (
        <div
          key={n}
          className={styles.row}
          role="row"
          aria-label={`board row ${n}`}
        >
          {renderRow(n)}
        </div>
      ))}
    </section>
  );
}

const ROWS = [-3, -2, -1, 0, 1, 2, 3] as const;

type RowNumber = (typeof ROWS)[number];

function row(n: RowNumber) {
  return TILES.filter((id) => coordinates(id).y === n);
}
