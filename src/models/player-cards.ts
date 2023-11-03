import { NewCard } from "./new-card";

/**
 * Already calculated set of Player Cards
 */
export const PLAYER_CARDS: Record<PlayerType, ActionCard[]> = {
  player: [
    NewCard("build", "player"),
    NewCard("move", "player"),
    NewCard("move", "player"),
    NewCard("recruit", "player"),
    NewCard("diplo", "player"), // TODO: remove this
  ],
  enemy1: [
    NewCard("build", "enemy1"),
    NewCard("move", "enemy1"),
    NewCard("move", "enemy1"),
    NewCard("recruit", "enemy1"),
    NewCard("diplo", "enemy1"), // TODO: remove this
  ],
  enemy2: [
    NewCard("build", "enemy2"),
    NewCard("move", "enemy2"),
    NewCard("move", "enemy2"),
    NewCard("recruit", "enemy2"),
    NewCard("diplo", "enemy2"), // TODO: remove this
  ],
  enemy3: [
    NewCard("build", "enemy3"),
    NewCard("move", "enemy3"),
    NewCard("move", "enemy3"),
    NewCard("recruit", "enemy3"),
    NewCard("diplo", "enemy3"), // TODO: remove this
  ],
};
