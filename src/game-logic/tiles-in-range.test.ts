import { tilesInRange } from "./tiles-in-range";

describe("tilesInRange()", () => {
  /**
   *     [ ] [X] [X]
   *   [ ] [X] [.] [X]
   * [ ] [ ] [X] [X] [ ]
   *
   */
  it("returns tilesID[] in range 1 from origin tile", () => {
    const got = tilesInRange("1,-2", { range: 1 });
    const expected = ["1,-3", "2,-3", "0,-2", "2,-2", "1,-1", "2,-1"];
    expect(got.sort()).toEqual(expected.sort());
  });

  /**
   *       [ ] [ ] [X] [X] [X]
   *     [ ] [ ] [X] [X] [X] [X]
   *   [ ] [ ] [X] [X] [.] [X] [X]
   * [ ] [ ] [ ] [X] [X] [X] [X] [ ]
   *   [ ] [ ] [ ] [X] [X] [X] [ ]
   *     [ ] [ ] [ ] [ ] [ ] [ ]
   *       [ ] [ ] [ ] [ ] [ ]
   *
   */
  it("returns tilesID[] in range 2 from origin tile", () => {
    const got = tilesInRange("1,-1", { range: 2 });
    const expected = [
      "0,-3",
      "1,-3",
      "2,-3",
      "-1,-2",
      "0,-2",
      "1,-2",
      "2,-2",
      "-1,-1",
      "0,-1",
      "2,-1",
      "3,-1",
      "-1,0",
      "0,0",
      "1,0",
      "2,0",
      "0,1",
      "1,1",
      "2,1",
    ];
    expect(got.sort()).toEqual(expected.sort());
  });
});
