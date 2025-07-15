import c from "classnames";
import { coordinates } from "models/tiles";
import ForestSvg from "./assets/forest.svg?react";
import HexagonSvg from "./assets/hexagon.svg?react";
import LakeSvg from "./assets/lake.svg?react";
import MountainSvg from "./assets/mountain.svg?react";

import "./tile.scss";

type Props = {
  id: TileID;
  status?: TileStatus;
  terrain?: TerrainType;
  building?: BuildingType;
  owner?: PlayerType;
  activePlayer?: PlayerType;
  children?: React.ReactNode;
  onClick: (tileID: Coordinates) => void;
};

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
  const tileID = coordinates(id);

  /* debug: turn on debug ID */
  const debugTileID = false;

  return (
    <div
      className={c(
        "tile",
        status && `tile--${status}`,
        activePlayer && status === "available" && `tile--${activePlayer}`
      )}
    >
      {debugTileID && <span className="tile__id">{id}</span>}
      {terrain === "mountain" && (
        <MountainSvg className={c("tile__terrain", "tile__terrain-mountain")} />
      )}
      {terrain === "forest" && (
        <ForestSvg className={c("tile__terrain", "tile__terrain--forest")} />
      )}
      {terrain === "lake" && (
        <LakeSvg className={c("tile__terrain", "tile__terrain--lake")} />
      )}
      {building && (
        <div
          className={c(
            "tile__building",
            `tile__building--${building}`,
            `tile__building--${owner}`
          )}
        ></div>
      )}

      <HexagonSvg
        className={c(
          "tile__hexagon",
          status === "available" && owner && `tile--available__${owner}`,
          status === "forbidden" && "tile__hexagon--forbidden",
          status === "selected" && "tile__hexagon--selected",
          status === "selected" && owner && `tile__hexagon--selected-${owner}`
        )}
      />

      <div
        className={c("tile__hexagon__clickable-area", "clickable")}
        onClick={() => {
          onClick(tileID);
        }}
      />

      {children && <div className="tile__content">{children}</div>}
    </div>
  );
}
