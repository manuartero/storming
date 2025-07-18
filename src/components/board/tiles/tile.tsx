import c from "classnames";
import { coordinates } from "models/tiles";
import { tileAssets } from "./assets";

import styles from "./tile.module.css";
import { usePieceOffset } from "./use-piece-offset";

type Props = React.PropsWithChildren<{
  id: TileID;
  status?: TileStatus;
  terrain?: TerrainType;
  building?: BuildingType;
  owner?: PlayerType;
  activePlayer?: PlayerType;
  onClick: (tileID: Coordinates) => void;
}>;

export function Tile({
  id,
  terrain,
  building,
  owner,
  activePlayer,
  status,
  children,
  onClick,
}: Props) {
  /* debug: turn on debug ID */
  const debugTileID = false;

  const pieceStyle = usePieceOffset(children);

  return (
    <button
      key={`tile(${id})`}
      className={c(
        styles.tile,
        status && styles[status],
        owner && styles[owner],
        owner && styles.controlled,
        status === "available" && activePlayer && styles[activePlayer]
      )}
      aria-label={`tile ${id}`}
      aria-disabled={status === "forbidden"}
      type="button"
      onClick={() => onClick(coordinates(id))}
    >
      <div className={styles.strokeLayer} aria-hidden="true" />

      <div className={styles.innerLayer} aria-hidden="true">
        {terrain && <Terrain variant={terrain} />}
        {debugTileID && <span className={styles.tileId}>{id}</span>}
      </div>

      {building && owner && <Building variant={building} owner={owner} />}
      {children && (
        <div className={c(styles.piece)} style={pieceStyle}>
          {children}
        </div>
      )}
    </button>
  );
}

function Terrain({ variant }: { variant: TerrainType }) {
  const icon = tileAssets.terrain[variant];

  return (
    <div
      role="img"
      className={c(styles.terrain)}
      aria-roledescription="game terrain"
      aria-label={`terrain ${variant}`}
      style={{ backgroundImage: `url(${icon})` }}
    />
  );
}

function Building({
  variant,
  owner,
}: {
  variant: BuildingType;
  owner: PlayerType;
}) {
  const icon = tileAssets.buildings[variant][owner];

  return (
    <div
      role="img"
      className={c(styles.building)}
      aria-roledescription="game building"
      aria-label={`${owner} ${variant}`}
      style={{ backgroundImage: `url(${icon})` }}
    />
  );
}
