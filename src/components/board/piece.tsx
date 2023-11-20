import "./piece.scss";
import c from "classnames";
import { logRender } from "utils/console";

type Props = {
  type?: PieceType;
  owner?: PlayerType;
};

export function Piece({ type = "soldier", owner = "player" }: Props) {
  logRender("Piece");

  return (
    <div className={c("piece", "ignore-clicks", `piece--${type}-${owner}`)} />
  );
}
