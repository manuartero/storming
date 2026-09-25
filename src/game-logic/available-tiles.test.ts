import { initialBoard } from "game-context/initial-board";
import { NewCard, _resetCardId } from "models/new-card";
import { getAvailableTilesForActionCard } from "./available-tiles";

const recruitScenarios: { activeCard: ActionCard; expectedTiles: TileID[] }[] =
  [
    {
      activeCard: NewCard({ type: "recruit", player: "player" }),
      expectedTiles: ["-4,0"],
    },
    {
      activeCard: NewCard({ type: "recruit", player: "enemy1" }),
      expectedTiles: ["0,-3"],
    },
    {
      activeCard: NewCard({ type: "recruit", player: "enemy2" }),
      expectedTiles: ["3,0"],
    },
    {
      activeCard: NewCard({ type: "recruit", player: "enemy3" }),
      expectedTiles: ["0,3"],
    },
  ];

describe("getAvailableTilesForActionCard()", () => {
  beforeEach(_resetCardId);

  test.each(recruitScenarios)(
    "returns empty villages for 'recruit' action ($activeCard.owner)",
    ({ activeCard, expectedTiles }) => {
      const got = getAvailableTilesForActionCard({
        activeCard,
        board: initialBoard,
      });
      expect(got).toEqual(expectedTiles);
    }
  );

  test.todo("returns building spots for 'building' action");
  test.todo("returns tiles in range for 'move' action");
});
