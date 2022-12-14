/*
 * using local storage for now (up to 5MB)
 * check if i need to use Indexed DB instead
 */

import { empireSize } from "game-logic/empire-size";
import { warnInconsistentState } from "utils/console";

export function savegame(gameContext: GameContext) {
  const date = Date.now().toString();
  const playerEmpireSize = empireSize(gameContext.board).player;
  const item: Savegame = {
    date,
    empireSize: playerEmpireSize,
    gameContext,
  };
  try {
    window.localStorage.setItem(date, JSON.stringify(item));
  } catch (e) {
    warnInconsistentState(`error while saving game context: ${e}`);
    return undefined;
  }
  return date;
}

export function listSavegames() {
  return Object.keys(window.localStorage);
}

export function loadSavegame(date: string): Savegame | undefined {
  const raw = window.localStorage.getItem(date);
  if (!raw) {
    warnInconsistentState(
      `trying to load game context with key ${key} but no data found`
    );
    return undefined;
  }
  return JSON.parse(raw);
}
