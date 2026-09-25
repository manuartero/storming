import { fireEvent, render, screen } from "@testing-library/react";
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
  test("render: region role", () => {
    render(<PlayerHand cards={cards} player="player" onClick={jest.fn()} />);

    const playerHand = screen.getByRole("region", { name: "player hand" });
    expect(playerHand).toMatchSnapshot();
  });

  const mockHover = (canHover: boolean) => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: canHover });
  };
  const firstCard = () =>
    screen.getByRole("article", { name: `card ${cards[0].card.cardId}` });

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

    fireEvent.click(firstCard());

    expect(onClick).toHaveBeenCalledWith(cards[0].card.cardId);
  });

  test("click on touch: the first tap lifts the card, the second plays it", () => {
    mockHover(false);
    const onClick = jest.fn();
    render(
      <PlayerHand cards={cards} player="player" isActive onClick={onClick} />
    );

    fireEvent.click(firstCard());
    expect(onClick).not.toHaveBeenCalled();
    expect(firstCard()).toHaveClass("inspected");

    fireEvent.click(firstCard());
    expect(onClick).toHaveBeenCalledWith(cards[0].card.cardId);
    expect(firstCard()).not.toHaveClass("inspected");
  });
});
