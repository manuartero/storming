import c from "classnames";

import "./line-item.scss";

type Props = {
  card: ActionCard;
  commited: boolean;
};

export function ActionLineItem({ card, commited }: Props) {
  return (
    <div
      className={c(
        "line-item",
        card.owner === "player" &&
          "line-item--player" &&
          "player" &&
          "expansible",
        commited ? "line-item--commited" : "line-item--pending"
      )}
    >
      <div
        className={c("line-item__content", `line-item__content--${card.owner}`)}
      />
    </div>
  );
}
