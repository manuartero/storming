import { tiles, tilesInRange } from "./tiles";

function* makeBoardIterable(b: BoardState) {
  // b is iterable in tile order
  for (const tileID of tiles) {
    yield b[tileID];
  }
}

function boardModel(b: BoardState) {
  return {
    hasAnySelectedTile() {
      return Object.values(b).some((tile) => tile.status === "selected");
    },

    hasAnyAvailableTile() {
      return Object.values(b).some((tile) => tile.status === "available");
    },

    hasAnySelectedPiece() {
      return Object.values(b).some(
        (tile) => tile.status === "selected" && tile.piece
      );
    },

    getSelectedTile() {
      const selectedTileID = Object.entries(b).find(
        ([, tile]) => tile.status === "selected"
      )?.[0];
      if (!selectedTileID) {
        throw new Error(
          'Inconsistent state: "getSelectedTileID" was unable to find any selected tile'
        );
      }
      return selectedTileID as TileID;
    },

    getInRangeMovements(tile: TileID): AvailableMovements {
      const tiles = tilesInRange(tile);
      return {
        available: tiles.filter(
          (candidateTile) =>
            /* valid options: */
            !b[candidateTile].piece ||
            b[candidateTile].piece?.owner !== b[tile].piece?.owner
        ),
        forbidden: tiles.filter(
          (candidateTile) =>
            /* valid options: */
            b[candidateTile].terrain === "lake"
        ),
      };
    },

    getSelectionableTiles(): TileID[] {
      return Object.entries(b)
        .filter(isAvailable())
        .map(asTileID);
    },

    getAvailableTilesForActionCard(card: ActionCard): TileID[] {
      if (card.action === "move") {
        return Object.entries(b)
          .filter(hasPieceFromSameOwner(card))
          .map(asTileID);
      }

      if (card.action === "build") {
        return Object.entries(b)
          .filter(hasSoldierFromSameOwner(card))
          .map(asTileID);
      }

      if (card.action === "recruit") {
        return Object.entries(b)
          .filter(hasBuildingFromSameOwner(card))
          .map(asTileID);
      }

      return [];
    },
  };
}

type _FilterPredicate = (_: [string, TileState]) => boolean;

function isAvailable(): _FilterPredicate {
  return ([_, tile]) => tile.status === "available";
}

function hasBuildingFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) => tile.building?.owner === card.owner;
}

function hasPieceFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) => tile.piece?.owner === card.owner;
}

function hasSoldierFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) =>
    tile.piece?.owner === card.owner && tile.piece?.type === "soldier";
}

function asTileID([t, _]: [string, TileState]): TileID {
  return t as TileID;
}

export default boardModel;
