import "./piece.scss";
import c from "classnames";

interface Props {
  type?: "soldier" | "knight" | "ballista";
  owner?: Owner;
}

function Piece(props: Props): JSX.Element {
  const { type, owner } = { type: "soldier", owner: "player", ...props };

  return (
    <div
      className={c(
        "piece",
        `piece--${type}`,
        owner !== "player" && "piece--enemy",
        `piece--${owner}`
      )}
    ></div>
  );
}

export default Piece;
