import { fireEvent, render, screen } from "@testing-library/react";
import { useBoard } from "./use-board";

function TestingComponent() {
  const { board, buildOnTile, movePiece, recruitOnTile } = useBoard();

  function TestingTile({ tileId }: { tileId: TileID }) {
    const tile = board[tileId];
    const buildingInfo = tile.building
      ? `${tile.building?.type} (${tile.building?.owner})`
      : "";
    const pieceInfo = tile.piece
      ? `${tile.piece?.type} (${tile.piece?.owner})`
      : "";

    return <div data-testid={`tile-${tileId}`}>{buildingInfo + pieceInfo}</div>;
  }

  return (
    <>
      <TestingTile tileId={"0,2"} />
      <TestingTile tileId={"1,2"} />
      <TestingTile tileId={"0,3"} />

      <button
        data-testid="move-piece-from-02-to12"
        onClick={() =>
          movePiece({
            piece: { owner: "enemy3", type: "soldier" },
            from: "0,2",
            to: "1,2",
          })
        }
      />
      <button
        data-testid="build-on-tile-12"
        onClick={() =>
          buildOnTile({
            building: { owner: "enemy3", type: "village" },
            tile: "1,2",
          })
        }
      />
      <button
        data-testid="recruit-on-tile-03"
        onClick={() =>
          recruitOnTile({
            piece: { owner: "enemy3", type: "soldier" },
            tile: "0,3",
          })
        }
      />
    </>
  );
}

const getTileInfo = (testId: string) => screen.getByTestId(testId).textContent;

describe("game-context", () => {
  test("useBoard() returns board{}", () => {
    render(<TestingComponent />);
    expect(getTileInfo("tile-0,2")).toEqual("soldier (enemy3)");
    expect(getTileInfo("tile-1,2")).toEqual("");
    expect(getTileInfo("tile-0,3")).toEqual("village (enemy3)");
  });

  test("useBoard() returns buildOnTile()", () => {
    render(<TestingComponent />);
    fireEvent.click(screen.getByTestId("build-on-tile-12"));
    expect(getTileInfo("tile-1,2")).toEqual("village (enemy3)");
  });

  test("useBoard() returns movePiece()", () => {
    render(<TestingComponent />);
    fireEvent.click(screen.getByTestId("move-piece-from-02-to12"));
    expect(getTileInfo("tile-0,2")).toEqual("");
    expect(getTileInfo("tile-1,2")).toEqual("soldier (enemy3)");
  });

  test("useBoard() returns recruitOnTile()", () => {
    render(<TestingComponent />);
    fireEvent.click(screen.getByTestId("recruit-on-tile-03"));
    expect(getTileInfo("tile-0,3")).toEqual("village (enemy3)soldier (enemy3)");
  });

  test.todo("useBoard() returns isConquering()");
});
