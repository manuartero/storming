import { useGameContext } from "game-context";
import { logRender } from "utils/console";
import PlayerSummary from "./player-summary";

import "./round-summary.scss";


function RoundSummary(): JSX.Element {
  logRender("RoundSummary");

  const gameContext = useGameContext();

  const isResolvingDiploAction = ({ player }: PlayerStatus) => {
    return (
      gameContext.activePlayer === player &&
      gameContext.activeCard?.cardType === "actionCard" &&
      gameContext.activeCard.action === "diplo"
    );
  };

  const onPlayerSummaryClick = (playerStatus: PlayerStatus) => {
    if (isResolvingDiploAction(playerStatus)) {
      gameContext.firstPlayer(playerStatus.player);
    }
  };

  return (
    <div className="round-summary">
      {gameContext.players.map((playerStatus) => (
        <PlayerSummary
          key={`player-summary-${playerStatus.player}`}
          player={playerStatus}
          active={playerStatus.player === gameContext.activePlayer}
          clickable={isResolvingDiploAction(playerStatus)}
          onClick={onPlayerSummaryClick}
        />
      ))}
    </div>
  );
}

export default RoundSummary;
