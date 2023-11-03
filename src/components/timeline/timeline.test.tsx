import { render } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { Timeline } from "./timeline";

const timeline: Timeline = {
  current: NewCard("move", "player"),
  next: [
    {
      card: NewCard("move", "enemy1"),
      commited: true,
    },
    {
      card: NewCard("move", "enemy2"),
      commited: true,
    },
    {
      card: NewCard("move", "enemy3"),
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
