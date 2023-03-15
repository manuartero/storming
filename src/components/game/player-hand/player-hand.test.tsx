import { render } from "@testing-library/react";
import PlayerHand from "./player-hand";

describe("<PlayerHand />", () => {
  test("render: match snapshot", () => {
    const { asFragment } = render(
      <PlayerHand cards={playerHand} onClick={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

const playerHand: PlayerHand = [
  {
    card: {
      cardType: "actionCard",
      action: "move",
      owner: "player",
      cardId: "player_move_A",
    },
    status: "available",
  },
  {
    card: {
      cardType: "actionCard",
      action: "move",
      owner: "player",
      cardId: "player_move_B",
    },
    status: "available",
  },
  {
    card: {
      cardType: "actionCard",
      action: "build",
      owner: "player",
      cardId: "player_build_A",
    },
    status: "available",
  },
];
