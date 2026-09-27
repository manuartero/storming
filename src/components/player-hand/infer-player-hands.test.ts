import { PLAYER_CARDS } from "models/player-cards";
import { inferPlayerHandsFromGameContext } from "./infer-player-hands";

const { player, enemy1, enemy2, enemy3 } = PLAYER_CARDS;
const committed = (card: ActionCard) => ({ card, commited: true });

const statuses = (hands: Record<PlayerType, PlayerHand>) =>
  Object.fromEntries(
    Object.entries(hands).map(([owner, hand]) => [
      owner,
      hand.map(({ status }) => status),
    ])
  );

describe("inferPlayerHandsFromGameContext()", () => {
  test("the cards on NEXT and FUTURE are played, the rest available", () => {
    const got = inferPlayerHandsFromGameContext({
      activeCard: undefined,
      next: [player[0], enemy1[1], enemy2[3], enemy3[1]].map(committed),
      future: [player[1], enemy1[2], enemy2[4], enemy3[0]].map(committed),
    });

    // each hand: build, move, move, recruit, diplo
    expect(statuses(got)).toEqual({
      player: ["played", "played", "available", "available", "available"],
      enemy1: ["available", "played", "played", "available", "available"],
      enemy2: ["available", "available", "available", "played", "played"],
      enemy3: ["played", "played", "available", "available", "available"],
    });
  });

  test("the active card is played", () => {
    const got = inferPlayerHandsFromGameContext({
      activeCard: player[3],
      next: [],
      future: [],
    });

    expect(statuses(got).player).toEqual([
      "available",
      "available",
      "available",
      "played",
      "available",
    ]);
  });
});
