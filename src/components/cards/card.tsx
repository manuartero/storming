import "./card.scss";
import BuildIcn from "./assets/build_1.png";
import DiploIcn from "./assets/diplo_1.png";
import MoveIcn from "./assets/move_1.png";
import RecruitIcn from "./assets/recruit_1.png";

const headingIcn = {
  build: BuildIcn,
  diplo: DiploIcn,
  move: MoveIcn,
  recruit: RecruitIcn,
};

interface Props {
  action: CardAction;
}

function Card({ action }: Props): JSX.Element {
  return (
    <div className="card">
      <div className="card__heading">
        <img
          src={headingIcn[action]}
          alt={`heading icon for ${action} action card`}
        />
        <h1 >{action}</h1>
      </div>
    </div>
  );
}

export default Card;
