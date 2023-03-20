import { Card } from "./card";

/**
 * Already calculated set of Player Cards
 */
export const PLAYER_CARDS: Record<PlayerType, ActionCard[]> = {
  player: [
    Card("build", "player"),
    Card("move", "player"),
    Card("move", "player"),
    Card("recruit", "player"),
    Card("diplo", "player"), // TODO: remove this
  ],
  enemy1: [
    Card("build", "enemy1"),
    Card("move", "enemy1"),
    Card("move", "enemy1"),
    Card("recruit", "enemy1"),
    Card("diplo", "enemy1"), // TODO: remove this
  ],
  enemy2: [
    Card("build", "enemy2"),
    Card("move", "enemy2"),
    Card("move", "enemy2"),
    Card("recruit", "enemy2"),
    Card("diplo", "enemy2"), // TODO: remove this
  ],
  enemy3: [
    Card("build", "enemy3"),
    Card("move", "enemy3"),
    Card("move", "enemy3"),
    Card("recruit", "enemy3"),
    Card("diplo", "enemy3"), // TODO: remove this
  ],
};
