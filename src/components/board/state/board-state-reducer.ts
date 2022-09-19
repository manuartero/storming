import { getAvailableMovements } from "../utils/movements";

function boardStateReducer(
  state: BoardState,
  action: BoardStateAction
): BoardState {
  console.debug(`boardStateReducer(${action.type})`);
  switch (action.type) {
    case "select-piece": {
      if (!action.tile) {
        throw Error(
          'Inconsistent state: "select-piece" action requires "tile"'
        );
      }
      const t = state[action.tile];
      t.status = "selected";
      if (t.piece && t.piece?.type === "soldier") {
        getAvailableMovements(action.tile).forEach((availableTile) => {
          state[availableTile].status = "available";
        });
      }
      return {
        ...state,
      };
    }

    case "move-piece": {
      if (!action.from || !action.to) {
        console.warn(
          'Inconsistent state: "move-piece" action requires "from" and "to"'
        );
        return { ...state };
      }
      const piece = state[action.from].piece;

      if (!piece) {
        console.warn(
          'Inconsistent state: "move-piece" action requires a piece at "action.from"'
        );
        return { ...state };
      }
      state[action.from].piece = undefined;
      state[action.from].status = "idle"; // TODO cleanup every tile.status
      state[action.to].piece = piece;
      return {
        ...state,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default boardStateReducer;
