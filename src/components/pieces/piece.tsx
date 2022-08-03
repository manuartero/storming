import "./piece.scss";
import c from "classnames";

interface Props {
  type?: "soldier" | "knight" | "ballista";
  owner?: "player" | "enemy";
}

function Piece(props: Props): JSX.Element {
  const { type, owner } = { type: "soldier", owner: "player", ...props };

  return (
    <div
      className={c(
        "piece",
        `piece--${type}`,
        owner === "enemy" && "piece--enemy"
      )}
    ></div>
  );
}

export default Piece;
