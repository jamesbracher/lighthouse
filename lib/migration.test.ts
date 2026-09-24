import { test } from "node:test";
import assert from "node:assert/strict";
import { roomsFromMigrations } from "./test-db.ts";
import { buildWorld } from "./world.ts";

test("the migrations create five rooms, with the Cellar under the Kitchen", () => {
  const world = buildWorld(roomsFromMigrations());
  assert.deepEqual(world.grid, [
    ["stair", "lamp"],
    ["kitchen", "rocks"],
    ["cellar", null],
  ]);
  assert.equal(world.rooms.cellar.name, "Cellar");
  assert.equal(world.start, "rocks");
  assert.equal(world.rooms.lamp.name, "Lamp Room");
  assert.equal(world.rooms.kitchen.name, "Keeper's Kitchen");
});

test("the rooms' doors match the original game", () => {
  const { rooms } = buildWorld(roomsFromMigrations());
  assert.deepEqual(rooms.rocks.exits, { north: "lamp", west: "kitchen" });
  assert.deepEqual(rooms.stair.exits, { south: "kitchen", east: "lamp" });
  assert.deepEqual(rooms.kitchen.exits, { north: "stair", south: "cellar", east: "rocks" });
  assert.deepEqual(rooms.cellar.exits, { north: "kitchen" });
  assert.equal(rooms.rocks.blocked.south, "The sea is far too rough to wade into.");
});
