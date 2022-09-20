import boardModel from "models/board";

function boardStateReducer(
  state: BoardState,
  action: BoardStateAction
): BoardState {
  console.debug(`boardStateReducer(${action.type})`);

  const board = boardModel(state);
  switch (action.type) {
    case "select-tile": {
      if (!action.tile) {
        throw Error('Inconsistent state: "select-tile" action requires "tile"');
      }
      if (board.hasAnySelectedTile()) {
        state[board.getSelectedTile()].status = "idle";
      }
      const tile = state[action.tile];
      tile.status = "selected";

      if (tile.piece && tile.piece?.type === "soldier") {
        board.getAvailableMovements(action.tile).forEach((availableTile) => {
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

      if (state[action.to].status !== "available") {
        state[action.from].status = "idle";
        board.getAvailableTiles().forEach((availableTile) => {
          state[availableTile].status = "idle";
        });
        return { ...state };
      }

      state[action.from].piece = undefined;
      state[action.from].status = "idle";
      state[action.to].piece = piece;
      board.getAvailableTiles().forEach((availableTile) => {
        state[availableTile].status = "idle";
      });
      return {
        ...state,
      };
    }
  }
}

export default boardStateReducer;
