import { render } from "@testing-library/react";
import { Card } from "models/card";
import { Timeline } from "./timeline";

const timeline: Timeline = {
  current: Card("move", "player"),
  next: [
    {
      card: Card("move", "enemy1"),
      commited: true,
    },
    {
      card: Card("move", "enemy2"),
      commited: true,
    },
    {
      card: Card("move", "enemy3"),
      commited: true,
    },
  ],
  future: [],
};

describe("<Timeline />", () => {
  test("render: match snapshot", () => {
    const { asFragment } = render(<Timeline timeline={timeline} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
