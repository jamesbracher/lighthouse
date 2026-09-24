import { isReachable, rooms, startRoom, type Direction, type RoomId } from "./rooms.ts";

/** Everything the game needs to remember. Plain data, no browser. */
export interface GameState {
  readonly room: RoomId;
  readonly visited: readonly RoomId[];
}

export interface MoveResult {
  readonly state: GameState;
  /** true when the player changed room */
  readonly moved: boolean;
  /** why the player stayed put, or "" */
  readonly message: string;
}

interface Lock {
  /** the room the player must have visited first */
  requires: RoomId;
  message: string;
}

/** Rooms that stay shut until another room has been visited. None at present. */
const locks: Partial<Record<RoomId, Lock>> = {};

export function initialState(): GameState {
  return { room: startRoom, visited: [startRoom] };
}

function stay(state: GameState, message: string): MoveResult {
  return { state, moved: false, message };
}

function enter(state: GameState, next: RoomId): MoveResult {
  const lock = locks[next];
  if (lock && !state.visited.includes(lock.requires)) return stay(state, lock.message);
  const visited = state.visited.includes(next) ? state.visited : [...state.visited, next];
  return { state: { room: next, visited }, moved: true, message: "" };
}

/** Arrow-key movement in a compass direction */
export function move(state: GameState, dir: Direction): MoveResult {
  const room = rooms[state.room];
  const next = room.exits[dir];
  if (!next) return stay(state, room.blocked[dir] ?? "You can't go that way.");
  return enter(state, next);
}

/** Map click: only rooms with a direct exit from here are reachable */
export function goTo(state: GameState, id: RoomId): MoveResult {
  if (id === state.room) return stay(state, "");
  if (!isReachable(rooms[state.room], id)) {
    return stay(state, `There's no direct way to the ${rooms[id].name} from here.`);
  }
  return enter(state, id);
}
