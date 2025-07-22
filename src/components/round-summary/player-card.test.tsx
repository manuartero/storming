import { render, screen } from "@testing-library/react";
import { PlayerCard } from "./player-card";

describe("<PlayerCard />", () => {
  it("render: article role", () => {
    const playerStatus = {
      player: "player" as const,
      points: 3,
      greatestEmpirePoint: false,
    };
    render(<PlayerCard player={playerStatus} onClick={() => {}} />);

    const playerCard = screen.getByRole("article", { name: "player summary" });
    expect(playerCard).toMatchSnapshot();
  });
});
