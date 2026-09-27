import { fireEvent, render, screen, within } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { PlayerHand } from "./player-hand";

const cards: PlayerHand = [
  {
    card: NewCard({ type: "move", player: "player" }),
    status: "available",
  },
  {
    card: NewCard({ type: "move", player: "player" }),
    status: "available",
  },
  {
    card: NewCard({ type: "build", player: "player" }),
    status: "available",
  },
];

describe("<PlayerHand />", () => {
  test("shows one card button per card inside the player hand", () => {
    render(<PlayerHand cards={cards} player="player" onClick={jest.fn()} />);

    const playerHand = screen.getByRole("region", { name: "player hand" });
    expect(
      within(playerHand)
        .getAllByRole("button")
        .map((card) => card.getAttribute("aria-label"))
    ).toEqual(["player Move card", "player Move card", "player Build card"]);
  });

  const mockHover = (canHover: boolean) => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: canHover });
  };
  const buildCard = () =>
    screen.getByRole("button", { name: "player Build card" });

  afterEach(() => {
    // @ts-expect-error jsdom has no matchMedia
    delete window.matchMedia;
  });

  test("click with hover: plays the card", () => {
    mockHover(true);
    const onClick = jest.fn();
    render(
      <PlayerHand cards={cards} player="player" isActive onClick={onClick} />
    );

    fireEvent.click(buildCard());

    expect(onClick).toHaveBeenCalledWith(cards[2].card.cardId);
  });

  test("click while not active: does nothing", () => {
    mockHover(true);
    const onClick = jest.fn();
    render(<PlayerHand cards={cards} player="player" onClick={onClick} />);

    fireEvent.click(buildCard());

    expect(onClick).not.toHaveBeenCalled();
  });

  test("click on touch: the first tap lifts the card, the second plays it", () => {
    mockHover(false);
    const onClick = jest.fn();
    render(
      <PlayerHand cards={cards} player="player" isActive onClick={onClick} />
    );

    fireEvent.click(buildCard());
    expect(onClick).not.toHaveBeenCalled();
    expect(buildCard()).toHaveClass("inspected");

    fireEvent.click(buildCard());
    expect(onClick).toHaveBeenCalledWith(cards[2].card.cardId);
    expect(buildCard()).not.toHaveClass("inspected");
  });
});
