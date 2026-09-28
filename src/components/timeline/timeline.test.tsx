import { render, screen, within } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { Timeline } from "./timeline.component";

const next: TimelineCard[] = [
  { card: NewCard({ type: "move", player: "enemy1" }), commited: true },
  { card: NewCard({ type: "move", player: "enemy2" }), commited: true },
  { card: NewCard({ type: "move", player: "enemy3" }), commited: true },
];

const itemNames = (list: string) =>
  within(screen.getByRole("list", { name: list }))
    .queryAllByRole("listitem")
    .map((item) => item.getAttribute("aria-label"));

describe("<Timeline />", () => {
  test("lists the NEXT cards in order and an empty FUTURE", () => {
    render(<Timeline next={next} future={[]} />);

    expect(itemNames("NEXT")).toEqual([
      "enemy1 card",
      "enemy2 card",
      "enemy3 card",
    ]);
    expect(itemNames("FUTURE")).toEqual([]);
  });

  test("an uncommitted card is shown as pending", () => {
    render(
      <Timeline
        next={next}
        future={[
          {
            card: NewCard({ type: "move", player: "player" }),
            commited: false,
          },
        ]}
      />
    );

    expect(itemNames("FUTURE")).toEqual(["player card, pending"]);
  });

  test("event cards are not listed", () => {
    render(
      <Timeline
        next={[
          ...next,
          {
            card: NewCard({ type: "event1", player: "player" }),
            commited: true,
          },
        ]}
        future={[]}
      />
    );

    expect(itemNames("NEXT")).toHaveLength(3);
  });
});
