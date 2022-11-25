import { render, screen, fireEvent } from "@testing-library/react";
import usePlayers from "./use-players";

function TestingComponent() {
  const { players, firstPlayer, scorePoint, declareGreatestEmpire } =
    usePlayers();
  return (
    <>
      <ul>
        {players.map((player, i) => (
          <li key={`player-#${i}`}>{`${player.player} - ${
            player.points
          } points${player.greatestEmpirePoint ? "*" : ""}`}</li>
        ))}
      </ul>
      <button
        data-testid="enemy1-scores-point"
        onClick={() => scorePoint("enemy1")}
      />
      <button
        data-testid="enemy2-first-player"
        onClick={() => firstPlayer("enemy2")}
      />
      <button
        data-testid="player-first-player"
        onClick={() => firstPlayer("player")}
      />
      <button
        data-testid="enemy3-greatest-empire"
        onClick={() => declareGreatestEmpire("enemy3")}
      />
      <button
        data-testid="player-greatest-empire"
        onClick={() => declareGreatestEmpire("player")}
      />
    </>
  );
}

const getPlayerList = () =>
  Array.from(screen.getByRole("list").children).map((li) => li.textContent);

describe("gameContext.usePlayers()", () => {
  it("returns players[]", () => {
    render(<TestingComponent />);
    expect(getPlayerList()).toEqual([
      "player - 0 points",
      "enemy1 - 0 points",
      "enemy2 - 0 points",
      "enemy3 - 0 points",
    ]);
  });

  test("returns scorePoint()", () => {
    render(<TestingComponent />);
    fireEvent.click(screen.getByTestId("enemy1-scores-point"));
    expect(getPlayerList()).toEqual([
      "player - 0 points",
      "enemy1 - 1 points",
      "enemy2 - 0 points",
      "enemy3 - 0 points",
    ]);
    fireEvent.click(screen.getByTestId("enemy1-scores-point"));
    fireEvent.click(screen.getByTestId("enemy1-scores-point"));
    expect(getPlayerList()).toEqual([
      "player - 0 points",
      "enemy1 - 3 points",
      "enemy2 - 0 points",
      "enemy3 - 0 points",
    ]);
  });

  test("returns firstPlayer()", () => {
    render(<TestingComponent />);
    fireEvent.click(screen.getByTestId("enemy2-first-player"));
    expect(getPlayerList()).toEqual([
      "enemy2 - 0 points",
      "player - 0 points",
      "enemy1 - 0 points",
      "enemy3 - 0 points",
    ]);
    fireEvent.click(screen.getByTestId("player-first-player"));
    expect(getPlayerList()).toEqual([
      "player - 0 points",
      "enemy2 - 0 points",
      "enemy1 - 0 points",
      "enemy3 - 0 points",
    ]);
  });

  test("returns declareGreatesEmpire()", () => {
    render(<TestingComponent />);
    fireEvent.click(screen.getByTestId("enemy3-greatest-empire"));
    expect(getPlayerList()).toEqual([
      "player - 0 points",
      "enemy1 - 0 points",
      "enemy2 - 0 points",
      "enemy3 - 0 points*",
    ]);
    fireEvent.click(screen.getByTestId("player-greatest-empire"));
    expect(getPlayerList()).toEqual([
      "player - 0 points*",
      "enemy1 - 0 points",
      "enemy2 - 0 points",
      "enemy3 - 0 points",
    ]);
  });
});
