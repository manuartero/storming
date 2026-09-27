import { NewCard } from "models/new-card";
import { activePlayer, isPlanningComplete } from "./active-player";

const status = (player: PlayerType): PlayerStatus => ({
  player,
  points: 0,
  greatestEmpirePoint: false,
});

const fourPlayers = (["player", "enemy1", "enemy2", "enemy3"] as const).map(
  status
);
const threePlayers = fourPlayers.slice(0, 3);
const playersOf = (count: number) => fourPlayers.slice(0, count);

const card = (commited: boolean): TimelineCard => ({
  card: NewCard({ type: "build", player: "player" }),
  commited,
});

const cards = ({
  committed,
  pending = 0,
}: {
  committed: number;
  pending?: number;
}) => [
  ...Array.from({ length: committed }, () => card(true)),
  ...Array.from({ length: pending }, () => card(false)),
];

describe("activePlayer()", () => {
  describe("planification", () => {
    (
      [
        { count: 2, committed: 0, expected: "player" },
        { count: 2, committed: 1, expected: "enemy1" },
        { count: 2, committed: 2, expected: "player" },
        { count: 3, committed: 0, expected: "player" },
        { count: 3, committed: 2, expected: "enemy2" },
        { count: 3, committed: 3, expected: "player" },
        { count: 4, committed: 0, expected: "player" },
        { count: 4, committed: 3, expected: "enemy3" },
        { count: 4, committed: 4, expected: "player" },
        { count: 4, committed: 6, expected: "enemy2" },
      ] as const
    ).forEach(({ count, committed, expected }) => {
      test(`with ${count} players and ${committed} committed cards, it's ${expected}'s turn`, () => {
        expect(
          activePlayer({
            phase: "planification",
            activeCard: undefined,
            next: cards({ committed }),
            players: playersOf(count),
          })
        ).toBe(expected);
      });
    });

    test("ignores the card being planned", () => {
      expect(
        activePlayer({
          phase: "planification",
          activeCard: undefined,
          next: cards({ committed: 1, pending: 1 }),
          players: threePlayers,
        })
      ).toBe("enemy1");
    });

    test("counts the FUTURE cards carried over from the previous round", () => {
      expect(
        activePlayer({
          phase: "planification",
          activeCard: undefined,
          next: cards({ committed: 4 + 1 }),
          players: fourPlayers,
        })
      ).toBe("enemy1");
    });
  });

  test("in the action phase, it's the owner of the active action card", () => {
    expect(
      activePlayer({
        phase: "action",
        activeCard: NewCard({ type: "move", player: "enemy2" }),
        next: [],
        players: fourPlayers,
      })
    ).toBe("enemy2");
  });

  test("an active event card has no active player", () => {
    expect(
      activePlayer({
        phase: "action",
        activeCard: NewCard({ type: "event1", player: "enemy2" }),
        next: [],
        players: fourPlayers,
      })
    ).toBeUndefined();
  });

  (["setup", "ended"] as const).forEach((phase) => {
    test(`${phase} has no active player`, () => {
      expect(
        activePlayer({
          phase,
          activeCard: NewCard({ type: "move", player: "enemy2" }),
          next: cards({ committed: 1 }),
          players: fourPlayers,
        })
      ).toBeUndefined();
    });
  });
});

describe("isPlanningComplete()", () => {
  [
    { count: 2, length: 2, expected: true },
    { count: 2, length: 3, expected: false },
    { count: 3, length: 2, expected: false },
    { count: 3, length: 3, expected: true },
    { count: 3, length: 6, expected: true },
    { count: 4, length: 3, expected: false },
    { count: 4, length: 4, expected: true },
    { count: 4, length: 7, expected: false },
    { count: 4, length: 8, expected: true },
  ].forEach(({ count, length, expected }) => {
    test(`with ${count} players and ${length} cards on NEXT: ${expected}`, () => {
      expect(
        isPlanningComplete({
          next: cards({ committed: length - 1, pending: 1 }),
          players: playersOf(count),
        })
      ).toBe(expected);
    });
  });

  test("an empty NEXT is not complete", () => {
    expect(isPlanningComplete({ next: [], players: fourPlayers })).toBe(false);
  });
});
