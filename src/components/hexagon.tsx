import "./hexagon.scss";
import { ReactComponent as HexagonSvg } from "./hexagon.svg";
import c from "classnames";

interface Props {
  selected?: boolean;
  onClick?: () => void;
}

function Hexagon({ selected, onClick }: Props): JSX.Element {
  return (
    <div
      className={c("hexagon", selected && "hexagon--selected")}
      onClick={onClick}
    >
      <HexagonSvg />
    </div>
  );
}

export default Hexagon;
