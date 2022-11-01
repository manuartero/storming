import IconCard from "./icon-card";
import "./hand.scss";

function Hand(): JSX.Element {
  return (
    <div className="player-hand">
      <IconCard
        card={{
          cardType: "actionCard",
          owner: "player",
          action: "diplo",
        }}
      />
    </div>
  );
}

export default Hand;
