/*
 * using local storage for now (up to 5MB)
 * check if i need to use Indexed DB instead
 *
 * Keys are namespaced and versioned (storming:v1:<createdAt>): other apps on
 * the same origin are ignored, and so are saves from an older shape.
 */

import { empireSize } from "game-logic/empire-size";
import { warnInconsistentState } from "utils/console";

const KEY_PREFIX = "storming:v1:";

export function savegame(gameContext: GameContext) {
  const { phase, activeCard, next, future, board, players } = gameContext;
  const item: Savegame = {
    createdAt: Date.now().toString(),
    playerEmpireSize: empireSize(board).player,
    state: { phase, activeCard, next, future, board, players },
  };
  try {
    window.localStorage.setItem(
      `${KEY_PREFIX}${item.createdAt}`,
      JSON.stringify(item)
    );
  } catch (e) {
    warnInconsistentState(`error while saving game context: ${e}`);
    return undefined;
  }
  return item.createdAt;
}

/** the createdAt of every savegame, oldest first */
export function listSavegames() {
  try {
    return Object.keys(window.localStorage)
      .filter((key) => key.startsWith(KEY_PREFIX))
      .map((key) => key.slice(KEY_PREFIX.length))
      .sort();
  } catch (e) {
    warnInconsistentState(`error while listing savegames: ${e}`);
    return [];
  }
}

export function loadSavegame(createdAt: string): Savegame | undefined {
  try {
    const raw = window.localStorage.getItem(`${KEY_PREFIX}${createdAt}`);
    if (!raw) {
      warnInconsistentState(`no savegame found for ${createdAt}`);
      return undefined;
    }
    const savegame: unknown = JSON.parse(raw);
    if (!isSavegame(savegame)) {
      warnInconsistentState(`savegame ${createdAt} has an unknown shape`);
      return undefined;
    }
    return savegame;
  } catch (e) {
    warnInconsistentState(`error while loading game context: ${e}`);
    return undefined;
  }
}

function isSavegame(value: unknown): value is Savegame {
  if (typeof value !== "object" || value === null || !("state" in value)) {
    return false;
  }
  const { state } = value as { state: unknown };
  return (
    typeof state === "object" &&
    state !== null &&
    ["phase", "next", "future", "board", "players"].every((key) => key in state)
  );
}
