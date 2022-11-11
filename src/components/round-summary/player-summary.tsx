import c from "classnames";
import starPng from "./assets/star.png";

import "./player-summary.scss";

interface Props {
  player: PlayerStatus;
  active?: boolean;
  clickable?: boolean;
  onClick: (player: PlayerStatus) => void;
}

function PlayerSummary({
  player,
  active,
  clickable,
  onClick,
}: Props): JSX.Element {
  return (
    <div
      onClick={() => clickable && onClick(player)}
      className={c(
        "player-summary",
        clickable && `player-summary--clickable`,
        active && `player-summary--active`
      )}
    >
      <div className="player-summary__info">
        <div
          className={c(
            "player-summary__info__avatar",
            `player-summary__info__avatar--${player.player}`
          )}
        />
        <div className="player-summary__info__points">
          {player.points}
          <img src={starPng} />
        </div>
      </div>
      <div className="player-summary__extra">
        <div className="player-summary__extra__greatest-empire">
          {player.greatestEmpirePoint ? "GREATEST EMPIRE" : ""}
        </div>
      </div>
    </div>
  );
}

export default PlayerSummary;
