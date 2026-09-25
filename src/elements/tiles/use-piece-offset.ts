import { useState } from "react";
import type { ReactNode } from "react";

/* % of the tile width, from the left or the right edge */
const PIECE_OFFSET = "30%";

/**
 * add a minor random positioning offset to the piece to simulate pieces on a board
 */
export function usePieceOffset({
  children,
  disableChildrenOffset,
}: {
  children: ReactNode;
  disableChildrenOffset?: boolean;
}) {
  // picked once per tile, whether or not it holds a piece yet
  const [side] = useState<"left" | "right">(() =>
    Math.random() > 0.5 ? "left" : "right"
  );

  if (disableChildrenOffset) {
    return undefined;
  }

  return children ? { [side]: PIECE_OFFSET } : undefined;
}
