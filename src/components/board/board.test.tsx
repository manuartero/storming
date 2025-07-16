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
    status: "available",
  },
  "-1,-3": {
    status: "available",
  },
  "0,-3": {
    building: { owner: "enemy1", type: "castle" },
    status: "available",
  },
  "1,-3": {
    status: "available",
  },
  "2,-3": {
    status: "available",
  },
  "-3,-2": {
    status: "available",
  },
  "-2,-2": {
    status: "available",
  },
  "-1,-2": {
    piece: { owner: "enemy1", type: "soldier" },
    status: "available",
  },
  "0,-2": {
    status: "available",
  },
  "1,-2": {
    status: "available",
  },
  "2,-2": {
    status: "available",
  },
  "-3,-1": {
    status: "available",
  },
  "-2,-1": {
    status: "available",
  },
  "-1,-1": {
    terrain: "lake",
    status: "available",
  },
  "0,-1": {
    status: "available",
  },
  "1,-1": {
    status: "available",
  },
  "2,-1": {
    status: "available",
  },
  "3,-1": {
    status: "available",
  },
  "-4,0": {
    building: { owner: "player", type: "castle" },
    status: "available",
  },
  "-3,0": {
    piece: { owner: "player", type: "soldier" },
    status: "available",
  },
  "-2,0": {
    status: "available",
  },
  "-1,0": {
    status: "available",
  },
  "0,0": {
    status: "available",
  },
  "1,0": {
    status: "available",
  },
  "2,0": {
    piece: { owner: "enemy2", type: "soldier" },
    status: "available",
  },
  "3,0": {
    building: { owner: "enemy2", type: "castle" },
    status: "available",
  },
  "-3,1": {
    status: "available",
  },
  "-2,1": {
    status: "available",
  },
  "-1,1": {
    status: "available",
  },
  "0,1": {
    status: "available",
  },
  "1,1": {
    terrain: "lake",
    status: "available",
  },
  "2,1": {
    status: "available",
  },
  "3,1": {
    status: "available",
  },
  "-3,2": {
    status: "available",
  },
  "-2,2": {
    status: "available",
  },
  "-1,2": {
    status: "available",
  },
  "0,2": {
    piece: { owner: "enemy3", type: "soldier" },
    status: "available",
  },
  "1,2": {
    status: "available",
  },
  "2,2": {
    status: "available",
  },
  "-2,3": {
    status: "available",
  },
  "-1,3": {
    status: "available",
  },
  "0,3": {
    building: { owner: "enemy3", type: "castle" },
    status: "available",
  },
  "1,3": {
    status: "available",
  },
  "2,3": {
    status: "available",
  },
};
