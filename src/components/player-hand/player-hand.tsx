import Card from "components/cards/card";
import { logRender } from "utils/console";

import "./player-hand.scss";

interface Props {
  isActive: boolean;
  player: Player | undefined;
  cards: PlayerHand;
  onClick: (actionCard: ActionCard) => void;
}

function PlayerHand({ isActive, player, cards, onClick }: Props): JSX.Element {
  logRender("PlayerHand");

  const considerOnClickIfActive = (card: ActionCard) => {
    isActive && onClick(card);
  };

  return (
    <div className="player-hand">
      {player &&
        cards.map(({ action, status }, i) => {
          const card: ActionCard = {
            cardType: "actionCard",
            owner: player,
            action,
          };
          return (
            <Card
              key={`card-${action}-${i}`}
              status={status}
              card={card}
              onClick={() => considerOnClickIfActive(card)}
            ></Card>
          );
        })}
    </div>
  );
}

export default PlayerHand;
