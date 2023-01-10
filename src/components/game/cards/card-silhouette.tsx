import c from "classnames";
import CARD_TEXT from "./card-text.json";

import "./card-silhouette.scss";

interface Props {
  card: "next" | "future" | "build-walls" | "upgrade-settlement";
  onClick?: () => void;
}

export function CardSilhouette({ card, onClick }: Props): JSX.Element {
  return (
    <div
      key={`card-silhouette-${card}`}
      className={c("card-silhouette", onClick && "clickable")}
      onClick={onClick}
    >
      <div className="card-silhouette__title">{card}</div>
      <div className="card-silhouette__text">{CARD_TEXT[card]}</div>
    </div>
  );
}
