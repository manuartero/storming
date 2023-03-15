import { render } from "@testing-library/react";
import { Timeline } from "./timeline";

describe("<Timeline />", () => {
  test("render: match snapshot", () => {
    const { asFragment } = render(<Timeline timeline={timeline} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

const timeline: Timeline = {
  current: {
    cardType: "actionCard",
    action: "move",
    owner: "player",
    cardId: "player_move_A",
  },
  next: [
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy1",
      cardId: "enemy1_move_A",
    },
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy2",
      cardId: "enemy2_move_A",
    },
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy3",
      cardId: "enemy3_move_A",
    },
  ],
  future: [],
};
