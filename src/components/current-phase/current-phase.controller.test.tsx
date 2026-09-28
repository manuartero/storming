import { render, screen } from "@testing-library/react";
import { GameContextProvider } from "game-context";
import { CurrentPhaseController } from "./current-phase.controller";

describe("<CurrentPhaseController />", () => {
  test("shows Planning when a game starts", () => {
    render(
      <GameContextProvider>
        <CurrentPhaseController />
      </GameContextProvider>
    );
    const currentPhase = screen.getByRole("heading", { level: 1 });
    expect(currentPhase.textContent).toBe("Planning");
  });
});
