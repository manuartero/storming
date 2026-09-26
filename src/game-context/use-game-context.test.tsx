import { act, renderHook } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { emptyBoard } from "./empty-board";
import { initialBoard } from "./initial-board";
import { GameContextProvider, useGameContext } from "./use-game-context";
import { initialPlayerStatus } from "./use-players";

describe("useGameContext()", () => {
  test("outside the provider, the phase matches the provider's initial phase", () => {
    const { result: outside } = renderHook(() => useGameContext());
    const { result: inside } = renderHook(() => useGameContext(), {
      wrapper: GameContextProvider,
    });

    expect(outside.current.phase).toBe(inside.current.phase);
    expect(outside.current.activeCard).toBe(inside.current.activeCard);
    expect(outside.current.next).toEqual(inside.current.next);
    expect(outside.current.future).toEqual(inside.current.future);
  });
});

describe("<GameContextProvider /> move()", () => {
  const moveCard = (cardId: CardId): ActionCard => ({
    cardType: "actionCard",
    action: "move",
    owner: "player",
    cardId,
  });
  const soldier: Piece = { owner: "player", type: "soldier" };
  const enemyTower: Building = {
    owner: "enemy1",
    type: "tower",
    hasWalls: true,
  };

  function renderWalledAttack() {
    const { result } = renderHook(() => useGameContext(), {
      wrapper: GameContextProvider,
    });
    act(() =>
      result.current.loadSavegame({
        phase: "action",
        winner: undefined,
        activeCard: moveCard("player_move_1"),
        next: [{ card: moveCard("player_move_2"), commited: true }],
        future: [],
        board: {
          ...emptyBoard,
          "0,0": { piece: soldier },
          "1,0": { building: enemyTower },
        },
        players: result.current.players,
      })
    );
    return result;
  }

  const points = (result: { current: GameContext }) =>
    result.current.players.find(({ player }) => player === "player")?.points;

  test("attacking a walled enemy settlement destroys the wall and the troop stays", () => {
    const result = renderWalledAttack();
    const pointsBefore = points(result);

    act(() =>
      result.current.move({ piece: soldier, from: "0,0", to: "1,0" })
    );

    expect(result.current.board["0,0"].piece).toEqual(soldier);
    expect(result.current.board["1,0"]).toEqual({
      building: { ...enemyTower, hasWalls: false },
    });
    expect(points(result)).toEqual(pointsBefore);
    expect(result.current.activeCard).toEqual(moveCard("player_move_2"));
  });

  test("the next attack conquers the settlement as usual", () => {
    const result = renderWalledAttack();
    const pointsBefore = points(result) ?? 0;

    act(() =>
      result.current.move({ piece: soldier, from: "0,0", to: "1,0" })
    );
    act(() =>
      result.current.move({ piece: soldier, from: "0,0", to: "1,0" })
    );

    expect(result.current.board["0,0"].piece).toBeUndefined();
    expect(result.current.board["1,0"]).toEqual({
      piece: soldier,
      building: { owner: "player", type: "tower", hasWalls: false },
    });
    expect(points(result)).toEqual(pointsBefore + 1);
  });
});

describe("<GameContextProvider /> game over", () => {
  const knight: Piece = { type: "knight", owner: "player" };

  /* the player's knight at "0,-2" is about to move with the active card */
  const loadActionPhase = ({
    board,
    players = initialPlayerStatus,
  }: {
    board: Board;
    players?: PlayerStatus[];
  }) => {
    const { result } = renderHook(() => useGameContext(), {
      wrapper: GameContextProvider,
    });
    act(() => {
      result.current.loadSavegame({
        phase: "action",
        winner: undefined,
        activeCard: NewCard({ type: "move", player: "player" }),
        next: [
          {
            card: NewCard({ type: "recruit", player: "enemy1" }),
            commited: true,
          },
        ],
        future: [],
        board: {
          ...board,
          "0,-2": { piece: knight },
        },
        players,
      });
    });
    return result;
  };

  test("conquering an opponent's last settlement ends the game", () => {
    const result = loadActionPhase({
      board: {
        ...emptyBoard,
        "0,-3": { building: { owner: "enemy1", type: "tower" } },
        "2,-3": { building: { owner: "player", type: "tower" } },
      },
    });

    act(() => {
      result.current.move({ piece: knight, from: "0,-2", to: "0,-3" });
    });

    expect(result.current.phase).toBe("ended");
    expect(result.current.winner).toBe("player");
    expect(result.current.activeCard).toBe(undefined);
  });

  test("reaching 7 victory points ends the game", () => {
    const result = loadActionPhase({
      board: {
        ...emptyBoard,
        "0,-3": { building: { owner: "enemy1", type: "tower" } },
        "2,-3": { building: { owner: "enemy1", type: "tower" } },
      },
      players: initialPlayerStatus.map((status) =>
        status.player === "player" ? { ...status, points: 6 } : status
      ),
    });

    act(() => {
      result.current.move({ piece: knight, from: "0,-2", to: "0,-3" });
    });

    expect(result.current.phase).toBe("ended");
    expect(result.current.winner).toBe("player");
  });

  test("a conquest below 7 points goes on to the next card", () => {
    const result = loadActionPhase({
      board: {
        ...emptyBoard,
        "0,-3": { building: { owner: "enemy1", type: "tower" } },
        "2,-3": { building: { owner: "enemy1", type: "tower" } },
      },
    });

    act(() => {
      result.current.move({ piece: knight, from: "0,-2", to: "0,-3" });
    });

    expect(result.current.phase).toBe("action");
    expect(result.current.winner).toBe(undefined);
    expect(result.current.activeCard).toMatchObject({ owner: "enemy1" });
  });

  test("once ended, no more actions can be taken", () => {
    const result = loadActionPhase({
      board: {
        ...emptyBoard,
        "0,-3": { building: { owner: "enemy1", type: "tower" } },
      },
    });
    act(() => {
      result.current.move({ piece: knight, from: "0,-2", to: "0,-3" });
    });
    const boardAtTheEnd = result.current.board;

    act(() => {
      result.current.recruit({
        tile: "2,-3",
        piece: { type: "soldier", owner: "enemy1" },
      });
    });

    expect(result.current.phase).toBe("ended");
    expect(result.current.board).toBe(boardAtTheEnd);
  });

  test("newGame() starts over from the initial state", () => {
    const result = loadActionPhase({
      board: {
        ...emptyBoard,
        "0,-3": { building: { owner: "enemy1", type: "tower" } },
      },
    });
    act(() => {
      result.current.move({ piece: knight, from: "0,-2", to: "0,-3" });
    });

    act(() => {
      result.current.newGame();
    });

    expect(result.current.phase).toBe("planification");
    expect(result.current.winner).toBe(undefined);
    expect(result.current.board).toEqual(initialBoard);
    expect(result.current.players).toEqual(initialPlayerStatus);
  });
});
