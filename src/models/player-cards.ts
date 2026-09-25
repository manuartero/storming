import { NewCard } from "./new-card";

/**
 * Already calculated set of Player Cards
 */
export const PLAYER_CARDS: Record<PlayerType, ActionCard[]> = {
  player: [
    NewCard({ type: "build", player: "player" }),
    NewCard({ type: "move", player: "player" }),
    NewCard({ type: "move", player: "player" }),
    NewCard({ type: "recruit", player: "player" }),
    NewCard({ type: "diplo", player: "player" }), // TODO: remove this
  ],
  enemy1: [
    NewCard({ type: "build", player: "enemy1" }),
    NewCard({ type: "move", player: "enemy1" }),
    NewCard({ type: "move", player: "enemy1" }),
    NewCard({ type: "recruit", player: "enemy1" }),
    NewCard({ type: "diplo", player: "enemy1" }), // TODO: remove this
  ],
  enemy2: [
    NewCard({ type: "build", player: "enemy2" }),
    NewCard({ type: "move", player: "enemy2" }),
    NewCard({ type: "move", player: "enemy2" }),
    NewCard({ type: "recruit", player: "enemy2" }),
    NewCard({ type: "diplo", player: "enemy2" }), // TODO: remove this
  ],
  enemy3: [
    NewCard({ type: "build", player: "enemy3" }),
    NewCard({ type: "move", player: "enemy3" }),
    NewCard({ type: "move", player: "enemy3" }),
    NewCard({ type: "recruit", player: "enemy3" }),
    NewCard({ type: "diplo", player: "enemy3" }), // TODO: remove this
  ],
};
