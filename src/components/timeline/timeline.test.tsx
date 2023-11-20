import { render } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { Timeline } from "./timeline";

const next: TimelineCard[] = [
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
];
const future: TimelineCard[] = [];

describe("<Timeline />", () => {
  test("render: match snapshot", () => {
    const { asFragment } = render(<Timeline next={next} future={future} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
