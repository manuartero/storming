import c from "classnames";
import CARD_TEXT from "./card-text.json";

import "./card-silhouette.scss";

type Props = {
  card:
    | "next"
    | "future"
    | "build-walls"
    | "upgrade-settlement"
    | "recruit-soldier"
    | "recruit-knight";
  onClick?: () => void;
};

export function CardSilhouette({ card, onClick }: Props) {
  return (
    <div
      key={`card-silhouette-${card}`}
      className={c("card", "card-silhouette", onClick && "clickable")}
      onClick={onClick}
      aria-disabled={!onClick}
    >
      <div className="card-silhouette__title">{card}</div>
      <div className="card-silhouette__text">{CARD_TEXT[card]}</div>
    </div>
  );
}
