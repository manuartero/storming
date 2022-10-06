import { useReducer } from "react";
import initialTimeline from "./initial-timeline";
import timelineReducer from "./timeline-reducer";

export function useTimeline() {
  
  const [timelineState, dispatchTimelineAction] = useReducer(
    timelineReducer,
    initialTimeline
  );

  return { timelineState, dispatchTimelineAction };
}
