import IconCard from "./icon-card";
import "./hand.scss";
import c from "classnames";

function Card({
  available,
  card,
}: {
  available: boolean;
  card: Card;
}): JSX.Element {
  return (
    <div className={c("card", available && "card--available")}>
      <IconCard card={card} />
    </div>
  );
}

interface Props {
  player: Player | undefined;
  cards: PlayerHand;
}

function Hand({ player, cards }: Props): JSX.Element {
  console.debug({ player, cards });
  return (
    <div className="player-hand">
      {player &&
        cards.map(({ action, available }, i) => (
          <Card
            key={`card-${action}-${i}`}
            available={available}
            card={{
              cardType: "actionCard",
              owner: player,
              action,
            }}
          ></Card>
        ))}
    </div>
  );
}

export default Hand;
