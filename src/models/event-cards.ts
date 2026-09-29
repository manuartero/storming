import { NewCard } from "./new-card";

// rules: the table order of rule-book/cards/events.md#general-events
export const GENERAL_EVENTS = [
  "full-moon",
  "mercenaries",
  "good-harvest",
  "troubled-times",
  "fair-winds",
  "famine",
  "war-drums",
  "earthquake",
  "class-struggle",
  "fire",
  "truce",
  "torrential-rain",
  "fortune-favours-the-bold",
  "drought",
  "depopulation",
  "quagmire",
  "warlord",
  "plague",
  "order-of-chivalry",
  "material-shortage",
  "trade-boom",
  "embargo",
  "chaos",
  "arms-supply",
  "damp-powder",
  "patronage",
  "prosperity",
  "uprising",
] as const;

// The "1 JUGADOR (4p)" set is left out: q.event-4p-set
export const COLOUR_AIMED_EVENTS = [
  "assassination",
  "corruption",
  "insurrection",
] as const;

export type _GeneralEventType = (typeof GENERAL_EVENTS)[number];
export type _ColourAimedEventType = (typeof COLOUR_AIMED_EVENTS)[number];

/**
 * rules: setup.6 the general events, one of each
 */
export const GENERAL_EVENT_CARDS: readonly EventCard[] = GENERAL_EVENTS.map(
  (type) => NewCard({ type })
);
