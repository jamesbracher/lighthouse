export type Direction = "north" | "south" | "east" | "west";

export type RoomId = "stair" | "lamp" | "kitchen" | "rocks";

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

// 2x2 grid:
//   Spiral Stair     | Lamp Room
//   Keeper's Kitchen | Rocks
export const rooms: Record<RoomId, Room> = {
  stair: {
    id: "stair",
    name: "Spiral Stair",
    short: "Stair",
    mood: "Cold, echoing, and damp.",
    description:
      "Iron steps wind upward through a narrow stone shaft, slick with salt damp. A cold draught carries the smell of oil and the far-off boom of the sea.",
    exits: { east: "lamp", south: "kitchen" },
    blocked: {
      north: "The stair ends at a rusted hatch bolted shut from the other side.",
      west: "The curved wall is solid granite, cold under your palm.",
    },
  },
  lamp: {
    id: "lamp",
    name: "Lamp Room",
    short: "Lamp",
    mood: "Warm brass, dust, and waiting.",
    description:
      "A great brass lamp squats inside a cage of glass, its lens dark and dusty. Beyond the panes, fog presses in from every side.",
    exits: { west: "stair", south: "rocks" },
    blocked: {
      north: "Only the glass and the fog lie that way, and a long drop beneath.",
      east: "The gallery door is jammed shut by years of rust.",
    },
  },
  kitchen: {
    id: "kitchen",
    name: "Keeper's Kitchen",
    short: "Kitchen",
    mood: "Quiet, left mid-meal.",
    description:
      "A blackened stove sits cold beside a table set for one, the tea long since gone. A logbook lies open, its last entry unfinished.",
    exits: { north: "stair", east: "rocks" },
    blocked: {
      south: "A low door leads to a coal cellar flooded with black water.",
      west: "The pantry shelves are bare and the wall behind them is solid.",
    },
  },
  rocks: {
    id: "rocks",
    name: "Rocks",
    short: "Rocks",
    mood: "Wind, spray, and grey light.",
    description:
      "Black rocks slick with weed rise from the surf at the foot of the tower. Above you the lighthouse stands dark against a low grey sky.",
    exits: { north: "lamp", west: "kitchen" },
    blocked: {
      south: "The sea is far too rough to wade into.",
      east: "The rocks drop sheer into deep, churning water.",
    },
  },
};

/** Map layout, top row first */
export const grid: RoomId[][] = [
  ["stair", "lamp"],
  ["kitchen", "rocks"],
];

export const startRoom: RoomId = "rocks";

export const directions: Direction[] = ["north", "south", "east", "west"];

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
