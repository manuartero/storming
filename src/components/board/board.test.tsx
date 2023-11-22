import { render } from "@testing-library/react";
import { Board } from "./board";

describe("<Board />", () => {
  test("render: match snapshot", () => {
    const { asFragment } = render(
      <Board state={visualBoard} onTileClick={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

const visualBoard: VisualBoard = {
  "-2,-3": {
    terrain: "field",
    status: "available",
  },
  "-1,-3": {
    terrain: "field",
    status: "available",
  },
  "0,-3": {
    terrain: "field",
    building: { owner: "enemy1", type: "village" },
    status: "available",
  },
  "1,-3": {
    terrain: "field",
    status: "available",
  },
  "2,-3": {
    terrain: "field",
    status: "available",
  },
  "-3,-2": {
    terrain: "field",
    status: "available",
  },
  "-2,-2": {
    terrain: "field",
    status: "available",
  },
  "-1,-2": {
    terrain: "field",
    piece: { owner: "enemy1", type: "soldier" },
    status: "available",
  },
  "0,-2": {
    terrain: "field",
    status: "available",
  },
  "1,-2": {
    terrain: "field",
    status: "available",
  },
  "2,-2": {
    terrain: "field",
    status: "available",
  },
  "-3,-1": {
    terrain: "field",
    status: "available",
  },
  "-2,-1": {
    terrain: "field",
    status: "available",
  },
  "-1,-1": {
    terrain: "lake",
    status: "available",
  },
  "0,-1": {
    terrain: "field",
    status: "available",
  },
  "1,-1": {
    terrain: "field",
    status: "available",
  },
  "2,-1": {
    terrain: "field",
    status: "available",
  },
  "3,-1": {
    terrain: "field",
    status: "available",
  },
  "-4,0": {
    terrain: "field",
    building: { owner: "player", type: "village" },
    status: "available",
  },
  "-3,0": {
    terrain: "field",
    piece: { owner: "player", type: "soldier" },
    status: "available",
  },
  "-2,0": {
    terrain: "field",
    status: "available",
  },
  "-1,0": {
    terrain: "field",
    status: "available",
  },
  "0,0": {
    terrain: "field",
    status: "available",
  },
  "1,0": {
    terrain: "field",
    status: "available",
  },
  "2,0": {
    terrain: "field",
    piece: { owner: "enemy2", type: "soldier" },
    status: "available",
  },
  "3,0": {
    terrain: "field",
    building: { owner: "enemy2", type: "village" },
    status: "available",
  },
  "-3,1": {
    terrain: "field",
    status: "available",
  },
  "-2,1": {
    terrain: "field",
    status: "available",
  },
  "-1,1": {
    terrain: "field",
    status: "available",
  },
  "0,1": {
    terrain: "field",
    status: "available",
  },
  "1,1": {
    terrain: "lake",
    status: "available",
  },
  "2,1": {
    terrain: "field",
    status: "available",
  },
  "3,1": {
    terrain: "field",
    status: "available",
  },
  "-3,2": {
    terrain: "field",
    status: "available",
  },
  "-2,2": {
    terrain: "field",
    status: "available",
  },
  "-1,2": {
    terrain: "field",
    status: "available",
  },
  "0,2": {
    terrain: "field",
    piece: { owner: "enemy3", type: "soldier" },
    status: "available",
  },
  "1,2": {
    terrain: "field",
    status: "available",
  },
  "2,2": {
    terrain: "field",
    status: "available",
  },
  "-2,3": {
    terrain: "field",
    status: "available",
  },
  "-1,3": {
    terrain: "field",
    status: "available",
  },
  "0,3": {
    terrain: "field",
    building: { owner: "enemy3", type: "village" },
    status: "available",
  },
  "1,3": {
    terrain: "field",
    status: "available",
  },
  "2,3": {
    terrain: "field",
    status: "available",
  },
};
