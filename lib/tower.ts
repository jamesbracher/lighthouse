import type { RoomId } from "./rooms.ts";

/**
 * Geometry for the isometric lighthouse drawing (components/Tower.tsx).
 * The drawing uses a 320 x 240 viewBox. SVG y grows downwards.
 */
export const TOWER_VIEWBOX = { width: 320, height: 240 };

export interface PinSpot {
  /** where the pin's tip touches */
  x: number;
  y: number;
}

/** Where the pin sits for each room: beside the tower, at that room's height */
const pins: Record<string, PinSpot> = {
  lamp: { x: 200, y: 48 }, // beside the glass cage
  stair: { x: 202, y: 112 }, // halfway up the shaft
  kitchen: { x: 208, y: 168 }, // ground floor, beside the base
  rocks: { x: 230, y: 186 }, // out on the rocks
};

/** Pin position for a room; unknown rooms are shown out on the rocks */
export function pinFor(room: RoomId): PinSpot {
  return pins[room] ?? pins.rocks;
}
