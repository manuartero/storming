import { render, screen } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { Card } from "./card";

const actionCard = NewCard("build", "player");

describe("<Card />", () => {
  it("render: article role", () => {
    render(<Card card={actionCard} onClick={jest.fn()} />);

    const card = screen.getByRole("article", {
      name: `card ${actionCard.cardId}`,
    });
    expect(card).toMatchSnapshot();
  });
});
