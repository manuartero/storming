import c from "classnames";
import { useGameContext } from "contexts";
import "./round-summary.scss";

function PlayerSummary({
  player,
  active,
}: {
  player: Player;
  active: boolean;
}): JSX.Element {
  return (
    <div
      className={c(
        "player-summary",
        `player-summary--${player}`,
        active && `player-summary--${player}--active`
      )}
    ></div>
  );
}

function RoundSummary(): JSX.Element {
  console.debug("<RoundSummary />");
  const { playerOrder, activePlayer } = useGameContext();

  return (
    <div className="round-summary">
      {playerOrder.map((player) => (
        <PlayerSummary
          key={`summary-${player}`}
          player={player}
          active={player === activePlayer}
        />
      ))}
    </div>
  );
}

export default RoundSummary;
