import { useReducer } from "react";
import { initialTimeline, timelineReducer } from "./state";
import Timeline from "./timeline";

function TimelineController(): JSX.Element {
  const [timelineState, dispatchTimelineAction] = useReducer(
    timelineReducer,
    initialTimeline
  );
  return <Timeline state={timelineState} />;
}

export default TimelineController;
