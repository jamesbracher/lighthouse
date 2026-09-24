import { test } from "node:test";
import assert from "node:assert/strict";
import { initialState, move } from "./game.ts";

test("the Lamp Room door stays locked until the Keeper's Kitchen is visited", () => {
  let state = initialState();
  assert.equal(state.room, "rocks", "the game starts on the Rocks");

  // At the start, up from the Rocks goes nowhere
  const locked = move(state, "north");
  assert.equal(locked.state.room, "rocks", "the player must stay on the Rocks");
  assert.equal(locked.message, "The lamp room door is locked.");

  // Visit the Keeper's Kitchen and come back
  state = move(locked.state, "west").state;
  assert.equal(state.room, "kitchen");
  state = move(state, "east").state;
  assert.equal(state.room, "rocks");

  // Now the door opens
  const opened = move(state, "north");
  assert.equal(opened.state.room, "lamp", "the player must reach the Lamp Room");
  assert.equal(opened.message, "");
});
