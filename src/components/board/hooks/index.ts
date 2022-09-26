import { useReducer } from "react";
import boardReducer from "./board-reducer";
import initialBoard from "./initial-board";

export function useBoard() {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoard
  );
  return { boardState, dispatchBoardAction };
}
