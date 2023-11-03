import { render } from "@testing-library/react";
import { Card } from "models/card";
import { PlayerHand } from "./player-hand";

const playerHand: PlayerHand = [
  {
    card: Card("move", "player"),
    status: "available",
  },
  {
    card: Card("move", "player"),
    status: "available",
  },
  {
    card: Card("build", "player"),
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
