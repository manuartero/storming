/*
 * using local storage for now (up to 5MB)
 * check if i need to use Indexed DB instead
 */

import { empireSize } from "game-logic/empire-size";
import { warnInconsistentState } from "utils/console";

export function savegame(gameContext: GameContext) {
  const createdAt = Date.now().toString();
  const playerEmpireSize = empireSize(gameContext.board).player;
  const item: Savegame = {
    createdAt,
    playerEmpireSize,
    gameContext,
  };
  try {
    window.localStorage.setItem(createdAt, JSON.stringify(item));
  } catch (e) {
    warnInconsistentState(`error while saving game context: ${e}`);
    return undefined;
  }
  return createdAt;
}

export function listSavegames() {
  return Object.keys(window.localStorage);
}

export function loadSavegame(date: string): Savegame | undefined {
  const raw = window.localStorage.getItem(date);
  if (!raw) {
    warnInconsistentState(
      `trying to load game context with key ${date} but no data found`
    );
    return undefined;
  }
  try {
    const a = JSON.parse(raw);
    console.debug("loadSavegame(): ", a);
    return a
  } catch (e) {
    warnInconsistentState(`error while loading game context: ${e}`);
    return undefined;
  }
}
