import { merge } from "./array";

test("array.merge() concat both arrays removing duplicates", () => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const b = [2, 3, 5, 7, 11, 13];

  expect(merge(a, b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13]);
});
