import { useGameContext } from "contexts";
import Timeline from "./timeline";

/**
 * Renders depends on:
 *  - useGameContext()
 */
function TimelineController(): JSX.Element {
  const gameContext = useGameContext();

  const onClick = () => {
    gameContext.tmp();
  };
  return <Timeline state={gameContext.timeline} onClick={onClick} />;
}

export default TimelineController;
