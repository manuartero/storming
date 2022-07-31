import { useState } from "react";
import "./cell.scss";
import Hexagon from "./hexagon";

interface Props {}

function Cell(): JSX.Element {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="cell">
      <Hexagon
        selected={isSelected}
        onClick={() => {
          setIsSelected(!isSelected);
        }}
      />
    </div>
  );
}

export default Cell;
