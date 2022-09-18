function tileId(str: TileIdStr) {
  const [x, y] = str.split(",").map(Number);
  return {
    x,
    y,
    str,
  };
}

export default tileId;
