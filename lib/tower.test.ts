import { test } from "node:test";
import assert from "node:assert/strict";
import { pinFor } from "./tower.ts";
import type { RoomId } from "./rooms.ts";

const all: RoomId[] = ["stair", "lamp", "kitchen", "rocks"];

test("every room has its own pin position on the tower", () => {
  const spots = all.map((id) => `${pinFor(id).x},${pinFor(id).y}`);
  assert.equal(new Set(spots).size, all.length, "pin positions must be distinct");
});

test("pins are stacked like a real lighthouse", () => {
  // SVG y grows downwards, so a smaller y is higher up the tower
  const y = (id: RoomId) => pinFor(id).y;
  assert.ok(y("lamp") < y("stair"), "the Lamp Room is above the Stair");
  assert.ok(y("stair") < y("kitchen"), "the Stair is above the Kitchen");
  assert.ok(y("kitchen") < y("rocks"), "the Kitchen is above the Rocks");
  assert.equal(Math.min(...all.map(y)), y("lamp"), "the Lamp Room pin is highest");
  assert.equal(Math.max(...all.map(y)), y("rocks"), "the Rocks pin is lowest");
});
