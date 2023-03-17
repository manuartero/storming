import { Card } from "components/game/cards/card";
import { logRender } from "utils/console";

import "./player-hand.scss";

interface Props {
  cards: PlayerHand;
  isActive?: boolean;
  player?: PlayerType;
  onClick: (cardId: string) => void;
}

function PlayerHand({
  cards,
  isActive = false,
  player = undefined,
  onClick,
}: Props): JSX.Element {
  logRender("PlayerHand");

  const considerOnClickIfActive = (cardId: string) => {
    isActive && onClick(cardId);
  };

  return (
    <div className="player-hand">
      {player &&
        cards.map(({ card, status }) => {
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
