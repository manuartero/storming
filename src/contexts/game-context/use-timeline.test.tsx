import { fireEvent, render, screen } from "@testing-library/react";
import { useTimeline } from "./use-timeline";
import { Card } from "models/card";

function TestingComponent() {
  const { timeline, planification, nextCard, newTurn } = useTimeline();

  return (
    <>
      <div data-testid="current-action-card">
        {timeline.current?.cardType === "actionCard" && timeline.current.action}
      </div>

      <div data-testid="next-action-card">
        {timeline.next[0]?.card.cardType === "actionCard" &&
          timeline.next[0].card.action}
      </div>

      <div data-testid="future-action-card">
        {timeline.future[0]?.card.cardType === "actionCard" &&
          timeline.future[0].card.action}
      </div>

      <button
        data-testid="enemy3-planification"
        onClick={() =>
          planification({
            player: "enemy3",
            nextCard: Card("build", "enemy3"),
            futureCard: Card("recruit", "enemy3"),
          })
        }
      />
      <button data-testid="next-card" onClick={() => nextCard()} />
      <button data-testid="new-turn" onClick={() => newTurn()} />
    </>
  );
}

describe("game-context", () => {
  test("useTimeline() returns timeline{}", () => {
    render(<TestingComponent />);

    expect(screen.getByTestId("current-action-card")).toHaveTextContent("");
    expect(screen.getByTestId("next-action-card")).toHaveTextContent("");
    expect(screen.getByTestId("future-action-card")).toHaveTextContent("");
  });

  test("useTimeline() returns planification()", () => {
    render(<TestingComponent />);

    const planification = screen.getByTestId("enemy3-planification");
    fireEvent.click(planification);

    expect(screen.getByTestId("next-action-card")).toHaveTextContent("build");
    expect(screen.getByTestId("future-action-card")).toHaveTextContent(
      "recruit"
    );
  });

  test("useTimeline() returns nextCard()", () => {
    render(<TestingComponent />);

    const planification = screen.getByTestId("enemy3-planification");
    fireEvent.click(planification);

    const nextCard = screen.getByTestId("next-card");
    fireEvent.click(nextCard);

    expect(screen.getByTestId("current-action-card")).toHaveTextContent(
      "build"
    );
    expect(screen.getByTestId("next-action-card")).toHaveTextContent("");
    expect(screen.getByTestId("future-action-card")).toHaveTextContent(
      "recruit"
    );
  });

  test("useTimeline() returns newTurn()", () => {
    render(<TestingComponent />);

    const planification = screen.getByTestId("enemy3-planification");
    fireEvent.click(planification);

    const nextCard = screen.getByTestId("next-card");
    fireEvent.click(nextCard);

    const newTurn = screen.getByTestId("new-turn");
    fireEvent.click(newTurn);

    expect(screen.getByTestId("current-action-card")).toHaveTextContent("");
    expect(screen.getByTestId("next-action-card")).toHaveTextContent("recruit");
  });
});
