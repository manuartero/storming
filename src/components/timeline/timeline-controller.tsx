import { useGameContext } from "contexts";
import { useEffect } from "react";
import { useTimeline } from "./hooks";
import Timeline from "./timeline";

function TimelineController(): JSX.Element {
  console.log("<TimelineController>");
  const { timelineState, dispatchTimelineAction } = useTimeline();
  const gameContext = useGameContext();

  useEffect(() => {
    console.debug(
      `Effect: <TimelineController /> (activeCard: ${gameContext.activeCard})`
    );

    // if (gameContext.phase === "planification") {
    //   if (!gameContext.activeCard) {
    //     console.warn("gameContext status; planification needs a card", {
    //       gameContext,
    //     });
    //     return;
    //   }
    //   const card = gameContext.activeCard;
    //   dispatchTimelineAction({ type: "planification", card });
    //   return;
    // }

    if (gameContext.phase === "action") {
      if (!gameContext.activeCard) {
        const card = timelineState.next[0];
        gameContext.setActiveCard(card);
        dispatchTimelineAction({ type: "resolve", card });
        return;
      }
    }
  }, [gameContext.activeCard]);

  return <Timeline state={timelineState} />;
}

export default TimelineController;
