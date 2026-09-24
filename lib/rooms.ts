export type Direction = "north" | "south" | "east" | "west";

/** Room ids come from the database, so any string is possible */
export type RoomId = string;

export interface Room {
  id: RoomId;
  name: string;
  /** short label for the map */
  short: string;
  /** one-line mood shown under the name */
  mood: string;
  description: string;
  exits: Partial<Record<Direction, RoomId>>;
  blocked: Partial<Record<Direction, string>>;
}

export const keyToDirection: Record<string, Direction> = {
  ArrowUp: "north",
  ArrowDown: "south",
  ArrowLeft: "west",
  ArrowRight: "east",
};

/** Must match the .view transition in globals.css */
export const FADE_MS = 250;

export function isReachable(from: Room, to: RoomId): boolean {
  return Object.values(from.exits).includes(to);
}
