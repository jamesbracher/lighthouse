import type { Direction, Room, RoomId } from "./rooms.ts";

/** One row of the `rooms` table, exactly as D1 returns it */
export interface RoomRow {
  id: string;
  name: string;
  short: string;
  mood: string;
  description: string;
  col: number;
  row: number;
  /** 1 for the room the player starts in */
  start: number;
  blocked_north: string | null;
  blocked_south: string | null;
  blocked_east: string | null;
  blocked_west: string | null;
}

/** Everything the client needs to play: rooms with their doors, the map, the start */
export interface World {
  rooms: Record<RoomId, Room>;
  /** map layout, top row first; null where there is no room */
  grid: (RoomId | null)[][];
  start: RoomId;
}

const neighbours: Record<Direction, { dc: number; dr: number }> = {
  north: { dc: 0, dr: -1 },
  south: { dc: 0, dr: 1 },
  east: { dc: 1, dr: 0 },
  west: { dc: -1, dr: 0 },
};

/**
 * Turn database rows into a playable world. A room's exits are whichever
 * rooms sit directly next to it on the grid, so adding a row adds its doors.
 */
export function buildWorld(rows: RoomRow[]): World {
  if (rows.length === 0) throw new Error("The world has no rooms");

  const byCell = new Map<string, RoomRow>();
  for (const r of rows) byCell.set(`${r.col},${r.row}`, r);

  const rooms: Record<RoomId, Room> = {};
  for (const r of rows) {
    const exits: Partial<Record<Direction, RoomId>> = {};
    for (const dir of Object.keys(neighbours) as Direction[]) {
      const { dc, dr } = neighbours[dir];
      const next = byCell.get(`${r.col + dc},${r.row + dr}`);
      if (next) exits[dir] = next.id;
    }
    const blocked: Partial<Record<Direction, string>> = {};
    if (r.blocked_north) blocked.north = r.blocked_north;
    if (r.blocked_south) blocked.south = r.blocked_south;
    if (r.blocked_east) blocked.east = r.blocked_east;
    if (r.blocked_west) blocked.west = r.blocked_west;

    rooms[r.id] = {
      id: r.id,
      name: r.name,
      short: r.short,
      mood: r.mood,
      description: r.description,
      exits,
      blocked,
    };
  }

  const cols = Math.max(...rows.map((r) => r.col)) + 1;
  const rowCount = Math.max(...rows.map((r) => r.row)) + 1;
  const grid: (RoomId | null)[][] = [];
  for (let row = 0; row < rowCount; row++) {
    const line: (RoomId | null)[] = [];
    for (let col = 0; col < cols; col++) line.push(byCell.get(`${col},${row}`)?.id ?? null);
    grid.push(line);
  }

  const start = rows.find((r) => r.start === 1)?.id ?? rows[0].id;
  return { rooms, grid, start };
}
