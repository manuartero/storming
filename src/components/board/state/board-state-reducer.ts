function boardStateReducer(
  state: BoardState,
  action: BoardStateAction
): BoardState {
  console.debug(action);
  switch (action.type) {
    case "mark-tile-as-available": {
      if (!action.tile) {
        throw Error(
          'Inconsistent state: "mark-tile-as-available" action requires "tile"'
        );
      }
      state[action.tile].status = "available";
      return {
        ...state,
      };
    }

    case "select-piece": {
      if (!action.tile) {
        throw Error(
          'Inconsistent state: "select-piece" action requires "tile"'
        );
      }
      state[action.tile].status = "selected";
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
      state[action.from].status = "idle";
      state[action.to].piece = piece;
      return {
        ...state,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default boardStateReducer;
