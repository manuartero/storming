import c from "classnames";
import { ReactComponent as ForestSvg } from "./assets/forest.svg";
import { ReactComponent as HexagonSvg } from "./assets/hexagon.svg";
import { ReactComponent as LakeSvg } from "./assets/lake.svg";
import { ReactComponent as MountainSvg } from "./assets/mountain.svg";
import { coordinates } from "models/tiles";

import "./tile.scss";

interface Props {
  id: TileID;
  status?: TileStatus;
  terrain?: Terrain;
  building?: Building;
  owner?: Owner;
  onClick?: (tileID: Coordinates) => void;
  children?: React.ReactNode;
}

function Tile({
  id,
  terrain,
  building,
  owner,
  status,
  children,
  onClick,
}: Props): JSX.Element {
  // console.debug(`render <Tile id="${id}" />`)
  const tileID = coordinates(id);

  return (
    <div className="tile">
      {/* <span className="tile__id">{id}</span> */}
      {terrain === "mountain" && (
        <MountainSvg className={c("tile__terrain", "tile__terrain-mountain")} />
      )}
      {terrain === "forest" && (
        <ForestSvg className={c("tile__terrain", "tile__terrain--forest")} />
      )}
      {terrain === "lake" && (
        <LakeSvg className={c("tile__terrain", "tile__terrain--lake")} />
      )}
      {building === "town" && (
        <div
          className={c(
            "tile__building",
            "tile__building--town",
            `tile__building--${owner}`
          )}
        ></div>
      )}

      <HexagonSvg
        className={c(
          "tile__hexagon",
          status === "available" && "tile__hexagon--available",
          status === "forbidden" && "tile__hexagon--forbidden",
          status === "selected" && "tile__hexagon--selected"
        )}
      />

      <div
        className="pointer-area"
        onClick={() => {
          onClick && onClick(tileID);
        }}
      />
      {children && <div className="tile__content">{children}</div>}
    </div>
  );
}

export default Tile;
