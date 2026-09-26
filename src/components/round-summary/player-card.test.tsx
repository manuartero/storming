import { render, screen } from "@testing-library/react";
import { PlayerCard } from "./player-card";

describe("<PlayerCard />", () => {
  const playerStatus = {
    player: "player" as const,
    points: 3,
    greatestEmpirePoint: false,
  };

  it("render: article role", () => {
    render(<PlayerCard player={playerStatus} onClick={() => {}} />);

    const playerCard = screen.getByRole("article", { name: "player summary" });
    expect(playerCard).toMatchSnapshot();
  });

  it("render: button role while clickable", () => {
    render(<PlayerCard player={playerStatus} clickable onClick={() => {}} />);

    expect(
      screen.getByRole("button", { name: "player summary" })
    ).toBeInTheDocument();
  });
});
