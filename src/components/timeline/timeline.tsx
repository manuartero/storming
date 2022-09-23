import "./timeline.scss";

interface Props {
  state: TimelineState;
}

function Timeline({ state }: Props): JSX.Element {
  return <div className="timeline">{state.current?.cardType}</div>;
}

export default Timeline;
