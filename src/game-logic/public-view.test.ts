import { NewCard } from "models/new-card";
import { publicView } from "./public-view";

const playerBuild = NewCard({ type: "build", player: "player" });
const playerMove = NewCard({ type: "move", player: "player" });
const redRecruit = NewCard({ type: "recruit", player: "enemy1" });
const blueDiplo = NewCard({ type: "diplo", player: "enemy2" });
const playerEvent = NewCard({ type: "event1", player: "player" });

const board = {
  "0,3": { building: { owner: "enemy1", type: "tower" } },
} as Board;

const players: PlayerStatus[] = [
  { player: "player", points: 1, greatestEmpirePoint: false },
  { player: "enemy1", points: 2, greatestEmpirePoint: false },
];

const committed = (card: Card) => ({ card, commited: true });

const gameState = (state: Partial<GameState>): GameState => ({
  phase: "planification",
  winner: undefined,
  activeCard: undefined,
  next: [],
  future: [],
  board,
  players,
  ...state,
});

describe("publicView()", () => {
  test("round.1 hides other players' cards on PRESENT and FUTURE, and keeps the owner", () => {
    const state = gameState({
      next: [committed(playerBuild), committed(redRecruit)],
      future: [committed(blueDiplo), { card: playerMove, commited: false }],
    });

    expect(publicView({ state, viewer: "player" })).toEqual({
      ...state,
      next: [
        committed(playerBuild),
        { card: { cardType: "hidden", owner: "enemy1" }, commited: true },
      ],
      future: [
        { card: { cardType: "hidden", owner: "enemy2" }, commited: true },
        { card: playerMove, commited: false },
      ],
    });
  });

  [
    {
      viewer: "player" as const,
      expected: [
        committed(playerBuild),
        { card: { cardType: "hidden", owner: "enemy1" }, commited: true },
      ],
    },
    {
      viewer: "enemy1" as const,
      expected: [
        { card: { cardType: "hidden", owner: "player" }, commited: true },
        committed(redRecruit),
      ],
    },
  ].forEach(({ viewer, expected }) => {
    test(`round.1 ${viewer} sees their own planned card only`, () => {
      const state = gameState({
        future: [committed(playerBuild), committed(redRecruit)],
      });

      expect(publicView({ state, viewer }).future).toEqual(expected);
    });
  });

  test("present.1 keeps the PRESENT pile face up while resolving it, FUTURE stays hidden", () => {
    const state = gameState({
      phase: "action",
      activeCard: blueDiplo,
      next: [committed(redRecruit)],
      future: [committed(redRecruit)],
    });

    expect(publicView({ state, viewer: "player" })).toEqual({
      ...state,
      future: [
        { card: { cardType: "hidden", owner: "enemy1" }, commited: true },
      ],
    });
  });

  test("round.6 hides a face-down event from everyone, even who played it", () => {
    const state = gameState({ future: [committed(playerEvent)] });

    expect(publicView({ state, viewer: "player" }).future).toEqual([
      { card: { cardType: "hidden" }, commited: true },
    ]);
  });

  test("does not change the state it reads", () => {
    const state = gameState({ next: [committed(redRecruit)] });

    publicView({ state, viewer: "player" });

    expect(state.next).toEqual([committed(redRecruit)]);
  });
});
