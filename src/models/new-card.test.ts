import { NewCard, _resetCardId } from "./new-card";

describe("NewCard()", () => {
  beforeEach(_resetCardId);

  test("creates an ActionCard{}", () => {
    const card = NewCard("build", "enemy1");
    expect(card).toEqual({
      cardType: "actionCard",
      action: "build",
      owner: "enemy1",
      cardId: "enemy1_build_1",
    });
  });

  test("creates an EventCard{}", () => {
    const card = NewCard("event3", "enemy1");
    expect(card).toEqual({
      cardType: "eventCard",
      event: "event3",
      playedBy: "enemy1",
      cardId: "enemy1_event3_1",
    });
  });

  [
    {
      card: NewCard("move", "enemy1"),
      expectedId: "enemy1_move_1",
    },
    {
      card: NewCard("move", "enemy1"),
      expectedId: "enemy1_move_2",
    },
    {
      card: NewCard("move", "enemy2"),
      expectedId: "enemy2_move_1",
    },
    {
      card: NewCard("move", "enemy2"),
      expectedId: "enemy2_move_2",
    },
  ].forEach(({ card, expectedId }) => {
    test(`every Card{ } has a unique "cardId" (${expectedId})`, () => {
      expect(card.cardId).toEqual(expectedId);
    });
  });

});
