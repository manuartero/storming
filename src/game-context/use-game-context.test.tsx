import { act, renderHook } from "@testing-library/react";
import { emptyBoard } from "./empty-board";
import { GameContextProvider, useGameContext } from "./use-game-context";

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
