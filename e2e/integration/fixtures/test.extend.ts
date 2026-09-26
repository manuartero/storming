// No `apiRoutes` fixture: the game has no backend to mock.
import { test as base } from "@playwright/test";
import { gamePage } from "../game.page";
import type { GamePage } from "../game.page";

type CustomFixtures = {
  gamePage: GamePage;
};

export const test = base.extend<CustomFixtures>({
  gamePage: async ({ page }, use) => {
    await use(gamePage(page));
  },
});

export { expect } from "@playwright/test";
