import c from "classnames";
import { useState } from "react";
import { ReactComponent as ForestSvg } from "./forest.svg";
import { ReactComponent as HexagonSvg } from "./hexagon.svg";
import { ReactComponent as MountainSvg } from "./mountain.svg";

import "./tile.scss";

interface Props {
  terrain?: "field" | "mountain" | "lake" | "forest";
}

function Cell({ terrain }: Props): JSX.Element {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="tile">
      {terrain === "mountain" && <MountainSvg className="tile__terrain" />}
      {terrain === "forest" && <ForestSvg className="tile__terrain" />}

      <HexagonSvg
        className={c("tile__hexagon", isSelected && "tile__hexagon--selected")}
      />

      <div
        className="pointer-area"
        onClick={() => {
          setIsSelected(!isSelected);
        }}
      />
    </div>
  );
}

export default Cell;
