import type { Random } from "lib/random";
import { GENERAL_EVENT_CARDS } from "models/event-cards";

/**
 * rules: setup.6 every event that does not name a player colour, shuffled
 */
export function newEventDeck(random: Random) {
  return random.shuffle(GENERAL_EVENT_CARDS);
}
