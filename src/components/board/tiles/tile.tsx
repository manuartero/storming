import c from "classnames";
import { coordinates } from "models/tiles";
import { tileAssets } from "./assets";

import styles from "./tile.module.css";

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

  return (
    <button
      key={`tile(${id})`}
      className={c(
        styles.tile,
        status && styles[status],
        owner && styles[owner],
        owner && activePlayer && owner === activePlayer && styles.activePlayer
      )}
      aria-label={`tile ${id}`}
      aria-disabled={status === "forbidden"}
      type="button"
      onClick={() => onClick(coordinates(id))}
    >
      <div className={styles.strokeLayer} />

      <div className={styles.innerLayer}>
        {terrain && <Terrain variant={terrain} />}
        {debugTileID && <span className={styles.tileId}>{id}</span>}
        {children && <div className={styles.content}>{children}</div>}
      </div>

      {building && owner && <Building variant={building} owner={owner} />}
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
