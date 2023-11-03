import { render, screen } from "@testing-library/react";
import { CurrentPhaseController } from "./current-phase-controller";
import { GameContextProvider } from "contexts";

describe("<CurrentPhaseController />", () => {
  test("reads GameContext.phase", async () => {
    render(<CurrentPhaseController />, {
      wrapper: GameContextProvider,
    });
    const currentPhase = await screen.findByRole("heading");
    expect(currentPhase.textContent).toBe("planification");
  });
});
