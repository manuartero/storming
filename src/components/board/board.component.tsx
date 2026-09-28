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

  const renderRow = (tileIds: readonly TileID[]) =>
    tileIds.map((tileId) => {
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
    <section className={styles.board} aria-label="game board">
      {ROWS.map(({ y, tileIds }) => (
        <div key={y} className={styles.row}>
          {renderRow(tileIds)}
        </div>
      ))}
    </section>
  );
}

/* the board never changes shape: split the tiles into rows once */
const ROWS = [-3, -2, -1, 0, 1, 2, 3].map((y) => ({
  y,
  tileIds: TILES.filter((id) => coordinates(id).y === y),
}));
