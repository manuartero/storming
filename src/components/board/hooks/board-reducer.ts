import boardModel from "models/board";

function boardReducer(state: BoardState, action: BoardStateAction): BoardState {
  console.debug(`boardStateReducer(${action.type})`);

  const board = boardModel(state);
  switch (action.type) {
    case "highlight-tiles":
      action.tiles.forEach((availableTile) => {
        state[availableTile].status = "available";
      });
      return { ...state };

    case "select-tile": {
      if (!action.tile) {
        console.warn(
          'Inconsistent state: "select-tile" action requires "tile"'
        );
        return { ...state };
      }

      if (board.hasAnySelectedTile()) {
        const prevSelectedTile = board.getSelectedTile();
        state[prevSelectedTile].status = "idle";
      }
      const tile = state[action.tile];
      tile.status = "selected";

      // if (tile.piece && tile.piece?.type === "soldier") {
      //   const { available, forbidden } = board.getInRangeMovements(action.tile);
      //   available.forEach((availableTile) => {
      //     state[availableTile].status = "available";
      //   });
      //   forbidden.forEach((forbiddenTile) => {
      //     state[forbiddenTile].status = "forbidden";
      //   });
      // }

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
        board.getSelectionableTiles().forEach((availableTile) => {
          state[availableTile].status = "idle";
        });
        return { ...state };
      }

      state[action.from].piece = undefined;
      state[action.from].status = "idle";
      state[action.to].piece = piece;
      board.getSelectionableTiles().forEach((availableTile) => {
        state[availableTile].status = "idle";
      });
      return {
        ...state,
      };
    }

    case "build-in-tile": {
      if (!action.tile) {
        console.warn(
          'Inconsistent state: "build-in-tile" action requires "tile"'
        );
        return { ...state };
      }

      const piece = state[action.tile].piece;
      if (!piece) {
        console.warn(
          'Inconsistent state: "build-in-tile" action requires a piece in the tile'
        );
        return { ...state };
      }

      state[action.tile].building = {
        type: "town",
        owner: piece.owner,
      };
      state[action.tile].status = "idle";

      return { ...state };
    }
  }
}

export default boardReducer;
