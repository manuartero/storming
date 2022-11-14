import { render, screen, fireEvent } from "@testing-library/react";
import usePlayers from "./use-players";

function TestingComponent() {
  const { players, firstPlayer } = usePlayers();
  return (
    <>
      <ul>
        {players.map((player, i) => (
          <li key={`player-#${i}`}>{player.player}</li>
        ))}
      </ul>
      <button onClick={() => firstPlayer("enemy2")} />
    </>
  );
}

const getPlayerList = () =>
  Array.from(screen.getByRole("list").children).map((li) => li.textContent);

describe("game-context", () => {
  test("usePlayers() returns players[]", () => {
    render(<TestingComponent />);
    expect(getPlayerList()).toEqual(["player", "enemy1", "enemy2", "enemy3"]);
  });

  test("usePlayers() returns firstPlayer()", () => {
    render(<TestingComponent />);
    fireEvent.click(screen.getByRole("button"));
    expect(getPlayerList()).toEqual(["enemy2", "player", "enemy1", "enemy3"]);
  });
});
