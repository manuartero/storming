import { render, screen } from "@testing-library/react";
import { GameContextProvider } from "game-context";
import { CurrentPhaseController } from "./current-phase-controller";

describe("<CurrentPhaseController />", () => {
  test("reads GameContext.phase", async () => {
    render(<CurrentPhaseController />, {
      wrapper: GameContextProvider,
    });
    const currentPhase = await screen.findByRole("heading");
    expect(currentPhase.textContent).toBe("planification");
  });
});
