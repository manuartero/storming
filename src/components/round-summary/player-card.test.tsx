import { fireEvent, render, screen, within } from "@testing-library/react";
import { PlayerCard } from "./player-card.component";

describe("<PlayerCard />", () => {
  const playerStatus = {
    player: "player" as const,
    points: 3,
    greatestEmpirePoint: false,
  };

  test("shows the avatar and the points", () => {
    render(<PlayerCard player={playerStatus} onClick={() => {}} />);

    const playerCard = screen.getByRole("article", { name: "player summary" });
    within(playerCard).getByRole("img", { name: "player avatar" });
    expect(playerCard).toHaveTextContent("3pts");
    expect(playerCard).not.toHaveAttribute("aria-current");
  });

  test("an active player card is aria-current", () => {
    render(<PlayerCard player={playerStatus} active onClick={() => {}} />);

    expect(
      screen.getByRole("article", { name: "player summary" })
    ).toHaveAttribute("aria-current", "true");
  });

  test("while clickable, clicking it calls onClick with the player", () => {
    const onClick = jest.fn();
    render(<PlayerCard player={playerStatus} clickable onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: "player summary" }));

    expect(onClick).toHaveBeenCalledWith(playerStatus);
  });
});
