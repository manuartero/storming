import { render, screen, fireEvent } from "@testing-library/react";
import usePlayers from "./use-players";

function TestingComponent() {
  const { players, firstPlayer, scorePoint } = usePlayers();
  return (
    <>
      <ul>
        {players.map((player, i) => (
          <li
            key={`player-#${i}`}
          >{`${player.player} - ${player.points} points`}</li>
        ))}
      </ul>
      <button data-testid="enemy1-scores-point" onClick={() => scorePoint("enemy1")} />
      <button
        data-testid="enemy2-first-player"
        onClick={() => firstPlayer("enemy2")}
      />
    </>
  );
}

const getPlayerList = () =>
  Array.from(screen.getByRole("list").children).map((li) => li.textContent);

describe("game-context", () => {
  test("usePlayers() returns players[]", () => {
    render(<TestingComponent />);
    expect(getPlayerList()).toEqual([
      "player - 0 points",
      "enemy1 - 0 points",
      "enemy2 - 0 points",
      "enemy3 - 0 points",
    ]);
  });

  test("usePlayers() returns scorePoint()", () => {
    render(<TestingComponent />);
    fireEvent.click(screen.getByTestId("enemy1-scores-point"));
    expect(getPlayerList()).toEqual([
      "player - 0 points",
      "enemy1 - 1 points",
      "enemy2 - 0 points",
      "enemy3 - 0 points",
    ]);
  });

  test("usePlayers() returns firstPlayer()", () => {
    render(<TestingComponent />);
    fireEvent.click(screen.getByTestId("enemy2-first-player"));
    expect(getPlayerList()).toEqual([
      "enemy2 - 0 points",
      "player - 0 points",
      "enemy1 - 0 points",
      "enemy3 - 0 points",
    ]);
  });
});
