import Card from "components/cards/card";
import { logRender } from "utils/console";

import "./player-hand.scss";

interface Props {
  isActive: boolean;
  player: Player | undefined;
  cards: PlayerHand;
  onClick: (cardId: string) => void;
}

function PlayerHand({ isActive, player, cards, onClick }: Props): JSX.Element {
  logRender("PlayerHand");

  const considerOnClickIfActive = (cardId: string) => {
    isActive && onClick(cardId);
  };

  return (
    <div className="player-hand">
      {player &&
        cards.map(({ card, status }, i) => {
          return (
            <Card
              key={card.cardId}
              status={status}
              card={card}
              onClick={() => considerOnClickIfActive(card.cardId)}
            ></Card>
          );
        })}
    </div>
  );
}

export default PlayerHand;
