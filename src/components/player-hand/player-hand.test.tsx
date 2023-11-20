import { render } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { PlayerHand } from "./player-hand";

const playerHand: PlayerHand = [
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
  test("render: match snapshot", () => {
    const { asFragment } = render(
      <PlayerHand cards={playerHand} onClick={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
