import c from "classnames";
import type { PropsWithChildren } from "react";
import { coordinates } from "models/tiles";
import { tileAssets } from "./assets";
import { usePieceOffset } from "./use-piece-offset";

import styles from "./tile.module.css";

type _BaseProps = PropsWithChildren<{
  status?: TileStatus;
  terrain?: TerrainType;
  building?: BuildingType;
  hasWalls?: boolean;
  owner?: PlayerType;
  activePlayer?: PlayerType;
  disableChildrenOffset?: boolean;
}>;

type _TileProps = _BaseProps & {
  id: TileID;
  onClick: (tileID: Coordinates) => void;
};

type _FakeTile = _BaseProps & {
  id: null;
  onClick?: undefined;
};

type Props = _TileProps | _FakeTile;

export function Tile({
  id,
  terrain,
  building,
  hasWalls = false,
  owner,
  activePlayer,
  status,
  children,
  disableChildrenOffset = false,
  onClick,
}: Props) {
  const pieceStyle = usePieceOffset({ children, disableChildrenOffset });
  // a fake tile only illustrates (a card silhouette): not a control
  const Element = id ? "button" : "div";

  return (
    <Element
      className={c(
        styles.tile,
        status && styles[status],
        owner && styles[owner],
        owner && styles.controlled,
        hasWalls && owner && styles.walled,
        terrain && styles[terrain],
        status === "available" && activePlayer && styles[activePlayer]
      )}
      {...(id
        ? {
            "aria-label": `tile ${id}`,
            "aria-disabled": status === "forbidden",
            type: "button" as const,
            onClick: () => onClick(coordinates(id)),
          }
        : { "aria-hidden": true })}
    >
      <div className={styles.strokeLayer} aria-hidden="true" />

      <div className={styles.innerLayer} aria-hidden="true">
        {terrain && <Terrain variant={terrain} />}
      </div>

      {hasWalls && owner && <Walls owner={owner} />}
      {building && owner && <Building variant={building} owner={owner} />}
      {children && (
        <div className={c(styles.piece)} style={pieceStyle}>
          {children}
        </div>
      )}
    </Element>
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

function Walls({ owner }: { owner: PlayerType }) {
  return (
    <div
      role="img"
      className={c(styles.walls)}
      aria-roledescription="game building"
      aria-label={`${owner} walls`}
      style={{ backgroundImage: `url(${tileAssets.walls[owner]})` }}
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
