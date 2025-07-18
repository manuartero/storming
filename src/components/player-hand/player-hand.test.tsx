import { render, screen } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { PlayerHand } from "./player-hand";

const cards: PlayerHand = [
  {
    card: NewCard("move", "player"),
    status: "available",
  },
  {
    card: NewCard("move", "player"),
    status: "available",
  },
  {
    card: NewCard("build", "player"),
    status: "available",
  },
];

describe("<PlayerHand />", () => {
  test("render: region role", () => {
    render(<PlayerHand cards={cards} player="player" onClick={jest.fn()} />);

    const playerHand = screen.getByRole("region", { name: "player hand" });
    expect(playerHand).toMatchSnapshot();
  });
});
