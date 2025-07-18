import { useGameContext } from "game-context";
import { Timeline } from "./timeline";

export function TimelineController() {
  const gameContext = useGameContext();

  return <Timeline next={gameContext.next} future={gameContext.future} />;
}
