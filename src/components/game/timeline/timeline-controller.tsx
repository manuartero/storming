import { useGameContext } from "contexts";
import { Timeline } from "./timeline";

/**
 * Renders depends on:
 *  - useGameContext()
 */
export function TimelineController(): JSX.Element {
  const gameContext = useGameContext();

  return <Timeline timeline={gameContext.timeline} />;
}
