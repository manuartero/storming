import c from "classnames";
import { useGameContext } from "contexts";
import "./round-summary.scss";

function PlayerSummary({
  player,
  active,
  clickable,
  onClick,
}: {
  player: Player;
  active: boolean;
  clickable: boolean;
  onClick: (player: Player) => void;
}): JSX.Element {
  return (
    <div
      onClick={() => onClick(player)}
      className={c(
        "player-summary",
        `player-summary--${player}`,
        clickable && `player-summary--clickable`,
        active && `player-summary--${player}--active`
      )}
    ></div>
  );
}

/**
 * Renders depends on:
 *  - useGameContext()
 */
function RoundSummary(): JSX.Element {
  console.debug("<RoundSummary />");
  const gameContext = useGameContext();

  const isResolvingDiploAction = (player: Player) => {
    return (
      gameContext.activePlayer === player &&
      gameContext.activeCard?.cardType === "actionCard" &&
      gameContext.activeCard.action === "diplo"
    );
  };

  const onPlayerSummaryClick = (player: Player) => {
    if (isResolvingDiploAction(player)) {
      gameContext.firstPlayer(player);
    }
  };

  return (
    <div className="round-summary">
      {gameContext.playerOrder.map((player) => (
        <PlayerSummary
          key={`summary-${player}`}
          player={player}
          active={player === gameContext.activePlayer}
          clickable={isResolvingDiploAction(player)}
          onClick={onPlayerSummaryClick}
        />
      ))}
    </div>
  );
}

export default RoundSummary;
