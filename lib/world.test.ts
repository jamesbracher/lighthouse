import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWorld, type RoomRow } from "./world.ts";

function row(partial: Partial<RoomRow> & Pick<RoomRow, "id" | "col" | "row">): RoomRow {
  return {
    name: partial.id,
    short: partial.id,
    mood: "",
    description: "",
    start: 0,
    blocked_north: null,
    blocked_south: null,
    blocked_east: null,
    blocked_west: null,
    ...partial,
  };
}

// An L-shaped world: a and b on the top row, c under a, nothing under b
const rows: RoomRow[] = [
  row({ id: "a", col: 0, row: 0, blocked_north: "A wall." }),
  row({ id: "b", col: 1, row: 0 }),
  row({ id: "c", col: 0, row: 1, start: 1 }),
];

test("exits are worked out from which rooms sit next to each other", () => {
  const world = buildWorld(rows);
  assert.deepEqual(world.rooms.a.exits, { east: "b", south: "c" });
  assert.deepEqual(world.rooms.b.exits, { west: "a" });
  assert.deepEqual(world.rooms.c.exits, { north: "a" });
});

test("blocked messages come from the row and the grid keeps empty cells", () => {
  const world = buildWorld(rows);
  assert.equal(world.rooms.a.blocked.north, "A wall.");
  assert.equal(world.rooms.b.blocked.south, undefined);
  assert.deepEqual(world.grid, [
    ["a", "b"],
    ["c", null],
  ]);
});

test("the start room is the row flagged as the start", () => {
  assert.equal(buildWorld(rows).start, "c");
});
