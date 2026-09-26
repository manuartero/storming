import c from "classnames";
import { Piece, Tile } from "elements";

import fontStyles from "styles/fonts.module.css";
import styles from "./card.module.css";

type Props = {
  card:
    | "next"
    | "future"
    | "build-walls"
    | "upgrade-settlement"
    | "recruit-soldier"
    | "recruit-knight";
  player?: PlayerType;
  disabled?: boolean;
  onClick?: () => void;
};

export function CardSilhouette({
  card,
  player = "player",
  disabled = false,
  onClick,
}: Props) {
  const title = card.replace(/-/g, " ");
  // an option you can pick is a button; an empty plan slot is a plain article
  const Element = onClick ? "button" : "article";

  return (
    <Element
      className={c(
        styles.card,
        styles.silhouette,
        disabled && styles.disabled,
        onClick && styles.clickable
      )}
      aria-label={
        card === "next" || card === "future" ? `empty ${card} slot` : title
      }
      {...(onClick && { type: "button" as const, onClick, disabled })}
    >
      <span className={styles.heading}>
        <span className={c(styles.title, fontStyles.title)}>{title}</span>
      </span>
      <span className={styles.content}>
        {card === "recruit-soldier" && (
          <Tile id={null} disableChildrenOffset>
            <Piece owner={player} type="soldier" />
          </Tile>
        )}
        {card === "recruit-knight" && (
          <Tile id={null} disableChildrenOffset>
            <Piece owner={player} type="knight" />
          </Tile>
        )}
        {card === "build-walls" && (
          <Tile id={null} disableChildrenOffset>
            {/* TODO: include Walls assets */}
          </Tile>
        )}
        {card === "upgrade-settlement" && (
          <Tile
            id={null}
            disableChildrenOffset
            building="citadel"
            owner={player}
          ></Tile>
        )}
      </span>
    </Element>
  );
}
