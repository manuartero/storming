import c from "classnames";
import { useState } from "react";
import { ReactComponent as ForestSvg } from "./forest.svg";
import { ReactComponent as HexagonSvg } from "./hexagon.svg";
import { ReactComponent as MountainSvg } from "./mountain.svg";
import { ReactComponent as LakeSvg } from "./lake.svg";

import "./tile.scss";

interface Props {
  terrain?: "field" | "mountain" | "lake" | "forest";
  status?: "available" | "forbidden";
  children?: React.ReactNode;
}

function Cell({ terrain, status, children }: Props): JSX.Element {
  const [isSelected, setIsSelected] = useState(false);

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
          isSelected && "tile__hexagon--selected"
        )}
      />

      <div
        className="pointer-area"
        onClick={() => {
          setIsSelected(!isSelected);
        }}
      />
      {children && <div className="tile__content">{children}</div>}
    </div>
  );
}

export default Cell;
