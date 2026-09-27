import { NewCard, _resetCardId } from "./new-card";

describe("NewCard()", () => {
  beforeEach(_resetCardId);

  test("creates an ActionCard{}", () => {
    const card = NewCard({ type: "build", player: "enemy1" });
    expect(card).toEqual({
      cardType: "actionCard",
      action: "build",
      owner: "enemy1",
      cardId: "enemy1_build_1",
    });
  });

  test("creates an EventCard{}", () => {
    const card = NewCard({ type: "event3", player: "enemy1" });
    expect(card).toEqual({
      cardType: "eventCard",
      event: "event3",
      playedBy: "enemy1",
      cardId: "enemy1_event3_1",
    });
  });

  test("numbers the cardId per player and type", () => {
    const ids = [
      NewCard({ type: "move", player: "enemy1" }),
      NewCard({ type: "move", player: "enemy1" }),
      NewCard({ type: "move", player: "enemy2" }),
      NewCard({ type: "build", player: "enemy1" }),
      NewCard({ type: "move", player: "enemy2" }),
    ].map(({ cardId }) => cardId);

    expect(ids).toEqual([
      "enemy1_move_1",
      "enemy1_move_2",
      "enemy2_move_1",
      "enemy1_build_1",
      "enemy2_move_2",
    ]);
  });
});
