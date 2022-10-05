import { useCurrentCard } from "contexts";
import { useEffect } from "react";
import { useTimeline } from "./hooks";
import Timeline from "./timeline";

function TimelineController(): JSX.Element {
  const { timelineState, dispatchTimelineAction } = useTimeline();
  const currentCard = useCurrentCard();

  useEffect(() => {
    if (timelineState.current) {
      currentCard?.setCurrentCard(timelineState.current);
    }
  }, [timelineState.current]);

  return <Timeline state={timelineState} />;
}

export default TimelineController;
