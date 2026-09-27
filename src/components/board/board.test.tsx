import { fireEvent, render, screen, within } from "@testing-library/react";
import { emptyBoard } from "game-context/empty-board";
import { TILES } from "models/tiles";
import { Board } from "./board";

jest.mock("elements/tiles/use-piece-offset");

const visualBoard: VisualBoard = {
  ...emptyBoard,
  "0,-3": {
    building: { owner: "enemy1", type: "castle" },
    status: "available",
  },
  "-1,-2": {
    piece: { owner: "enemy1", type: "soldier" },
    status: "selected",
  },
  "-1,-1": { terrain: "lake", status: "forbidden" },
};

const tile = (id: TileID) => screen.getByRole("button", { name: `tile ${id}` });

describe("<Board />", () => {
  test("shows one tile button per tile inside the game board", () => {
    render(<Board state={visualBoard} onTileClick={jest.fn()} />);

    const board = screen.getByRole("region", { name: "game board" });
    expect(within(board).getAllByRole("button")).toHaveLength(TILES.length);
  });

  test("shows each building, piece and terrain in its tile", () => {
    render(<Board state={visualBoard} onTileClick={jest.fn()} />);

    within(tile("0,-3")).getByRole("img", { name: "enemy1 castle" });
    within(tile("-1,-2")).getByRole("img", { name: "enemy1 soldier" });
    // the terrain sits in an aria-hidden layer
    within(tile("-1,-1")).getByRole("img", {
      name: "terrain lake",
      hidden: true,
    });
    expect(within(tile("0,0")).queryByRole("img")).toBeNull();
  });

  test("each tile shows its status", () => {
    render(<Board state={visualBoard} onTileClick={jest.fn()} />);

    expect(tile("-1,-2")).toHaveClass("selected");
    expect(tile("-1,-1")).toHaveAttribute("aria-disabled", "true");
    expect(tile("0,-3")).toHaveAttribute("aria-disabled", "false");
  });

  test("clicking a tile calls onTileClick with its coordinates", () => {
    const onTileClick = jest.fn();
    render(<Board state={visualBoard} onTileClick={onTileClick} />);

    fireEvent.click(tile("-1,-2"));

    expect(onTileClick).toHaveBeenCalledWith({ x: -1, y: -2, str: "-1,-2" });
  });
});
