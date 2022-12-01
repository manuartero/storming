import { getAvailableTilesForActionCard } from "./available-tiles";
import board from "contexts/game-context/initial-board";

const recruitScenarios: { activeCard: ActionCard; expectedTiles: TileID[] }[] =
  [
    {
      activeCard: {
        owner: "player",
        action: "recruit",
        cardType: "actionCard",
        cardId: "player_recruit_A",
      },
      expectedTiles: ["-4,0"],
    },
    {
      activeCard: {
        owner: "enemy1",
        action: "recruit",
        cardType: "actionCard",
        cardId: "enemy1_recruit_A",
      },
      expectedTiles: ["0,-3"],
    },
    {
      activeCard: {
        owner: "enemy2",
        action: "recruit",
        cardType: "actionCard",
        cardId: "enemy2_recruit_A",
      },
      expectedTiles: ["3,0"],
    },
    {
      activeCard: {
        owner: "enemy3",
        action: "recruit",
        cardType: "actionCard",
        cardId: "enemy3_recruit_A",
      },
      expectedTiles: ["0,3"],
    },
  ];

recruitScenarios.forEach(({ activeCard, expectedTiles }) => {
  test("getAvailableTilesForActionCard() returns empty villages for 'recruit' action", () => {
    const got = getAvailableTilesForActionCard({ board, activeCard });
    expect(got).toEqual(expectedTiles);
  });
});

test.todo("getAvailableTilesForActionCard() returns building spots for 'building' action")
test.todo("getAvailableTilesForActionCard() returns tiles in range for 'move' action")

