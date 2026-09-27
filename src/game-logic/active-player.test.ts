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
    test.each([
      [2, 0, "player"],
      [2, 1, "enemy1"],
      [2, 2, "player"],
      [3, 0, "player"],
      [3, 2, "enemy2"],
      [3, 3, "player"],
      [3, 4, "enemy1"],
      [4, 0, "player"],
      [4, 3, "enemy3"],
      [4, 4, "player"],
      [4, 6, "enemy2"],
    ] as const)(
      "with %i players and %i committed cards, it's %s's turn",
      (count, committed, expected) => {
        expect(
          activePlayer({
            phase: "planification",
            activeCard: undefined,
            next: cards({ committed }),
            players: playersOf(count),
          })
        ).toBe(expected);
      }
    );

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
          next: cards({ committed: 3 + 1 }),
          players: threePlayers,
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

  test.each(["setup", "ended"] as const)("%s has no active player", (phase) => {
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

describe("isPlanningComplete()", () => {
  test.each([
    [2, 2, true],
    [2, 3, false],
    [3, 2, false],
    [3, 3, true],
    [3, 6, true],
    [4, 3, false],
    [4, 4, true],
    [4, 7, false],
    [4, 8, true],
  ] as const)(
    "with %i players and %i cards on NEXT: %s",
    (count, length, expected) => {
      expect(
        isPlanningComplete({
          next: cards({ committed: length - 1, pending: 1 }),
          players: playersOf(count),
        })
      ).toBe(expected);
    }
  );

  test("an empty NEXT is not complete", () => {
    expect(isPlanningComplete({ next: [], players: fourPlayers })).toBe(false);
  });
});
