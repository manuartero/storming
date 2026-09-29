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

  test("creates an EventCard{} nobody has played yet", () => {
    const card = NewCard({ type: "full-moon" });
    expect(card).toEqual({
      cardType: "eventCard",
      event: "full-moon",
      cardId: "event_full-moon_1",
    });
  });

  test("creates a played EventCard{}", () => {
    const card = NewCard({ type: "full-moon", player: "enemy1" });
    expect(card).toEqual({
      cardType: "eventCard",
      event: "full-moon",
      playedBy: "enemy1",
      cardId: "event_full-moon_1",
    });
  });

  test("event.2 creates a colour-aimed EventCard{} with its target", () => {
    const card = NewCard({ type: "assassination", target: "enemy2" });
    expect(card).toEqual({
      cardType: "eventCard",
      event: "assassination",
      target: "enemy2",
      cardId: "event_assassination_1",
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
