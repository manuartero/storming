import { tilesInRange } from "./tiles";

describe("tilesInRange()", () => {
  /**
   *     [ ] [X] [X]
   *   [ ] [X] [.] [X]
   * [ ] [ ] [X] [X] [ ]
   *
   */
  it("returns tilesID[] in range 1 from origin tile", () => {
    const got = tilesInRange("1,-2", { range: 1 });
    expect(got).toEqual(["1,-3", "2,-3", "0,-2", "2,-2", "1,-1", "2,-1"]);
  });
});
