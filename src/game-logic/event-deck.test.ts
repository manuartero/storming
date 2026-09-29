import { createRandom } from "lib/random";
import { GENERAL_EVENT_CARDS } from "models/event-cards";
import { newEventDeck } from "./event-deck";

const SEED = 42;

const events = (deck: readonly EventCard[]) => deck.map(({ event }) => event);

const sorted = (list: readonly string[]) => [...list].sort();

describe("newEventDeck()", () => {
  test("setup.6 the deck holds the 28 general events, one of each, and no colour-aimed card", () => {
    const deck = newEventDeck(createRandom(SEED));

    expect(sorted(events(deck))).toEqual([
      "arms-supply",
      "chaos",
      "class-struggle",
      "damp-powder",
      "depopulation",
      "drought",
      "earthquake",
      "embargo",
      "fair-winds",
      "famine",
      "fire",
      "fortune-favours-the-bold",
      "full-moon",
      "good-harvest",
      "material-shortage",
      "mercenaries",
      "order-of-chivalry",
      "patronage",
      "plague",
      "prosperity",
      "quagmire",
      "torrential-rain",
      "trade-boom",
      "troubled-times",
      "truce",
      "uprising",
      "war-drums",
      "warlord",
    ]);
  });

  test("setup.6 no card in the deck names a colour or has been played", () => {
    const deck = newEventDeck(createRandom(SEED));

    expect(deck.filter((card) => card.target || card.playedBy)).toEqual([]);
  });

  test("setup.6 the deck is shuffled", () => {
    const deck = newEventDeck(createRandom(SEED));

    expect(events(deck)).not.toEqual(events(GENERAL_EVENT_CARDS));
  });

  test("the same seed deals the same deck", () => {
    expect(events(newEventDeck(createRandom(SEED)))).toEqual(
      events(newEventDeck(createRandom(SEED)))
    );
  });

  test("different seeds deal different decks", () => {
    expect(events(newEventDeck(createRandom(1)))).not.toEqual(
      events(newEventDeck(createRandom(2)))
    );
  });
});
