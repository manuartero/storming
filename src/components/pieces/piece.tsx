import "./piece.scss";
import c from "classnames";

interface Props {
  type: "soldier" | "knight" | "ballista";
}

function Piece({ type }: Props): JSX.Element {
  return <div className={c("piece", `piece--${type}`)}></div>;
}

export default Piece;
