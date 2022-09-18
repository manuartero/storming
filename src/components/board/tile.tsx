import c from "classnames";
import { useState } from "react";
import { ReactComponent as ForestSvg } from "./assets/forest.svg";
import { ReactComponent as HexagonSvg } from "./assets/hexagon.svg";
import { ReactComponent as LakeSvg } from "./assets/lake.svg";
import { ReactComponent as MountainSvg } from "./assets/mountain.svg";
import tileId from "./tile-id";

import "./tile.scss";

interface Props {
  id: TileIdStr;
  terrain?: "field" | "mountain" | "lake" | "forest";
  status?: "idle" | "available" | "forbidden" | "selected";
  onClick?: (tileID: TileID) => void;
  children?: React.ReactNode;
}

function Tile({ id, terrain, status, children, onClick }: Props): JSX.Element {
  // console.debug(`render <Tile id="${id}" />`)
  const tileID = tileId(id);

  return (
    <div className="tile">
      {terrain === "mountain" && (
        <MountainSvg className={c("tile__terrain", "tile__terrain-mountain")} />
      )}
      {terrain === "forest" && (
        <ForestSvg className={c("tile__terrain", "tile__terrain--forest")} />
      )}
      {terrain === "lake" && (
        <LakeSvg className={c("tile__terrain", "tile__terrain--lake")} />
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
