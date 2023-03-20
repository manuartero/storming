import "./piece.scss";
import c from "classnames";
import { logRender } from "utils/console";

interface Props {
  type?: PieceType;
  owner?: PlayerType;
}

export function Piece({
  type = "soldier",
  owner = "player",
}: Props): JSX.Element {
  logRender("Piece");

  return (
    <div className={c("piece", "ignore-clicks", `piece--${type}-${owner}`)} />
  );
}