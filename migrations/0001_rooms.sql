-- Rooms of the lighthouse. Exits are not stored: a room's doors lead to
-- whichever rooms sit next to it on the grid, so one new row adds a room
-- and its doors. blocked_* hold the message shown when there is no room
-- in that direction; NULL falls back to a generic message.
CREATE TABLE rooms (
  id            TEXT    PRIMARY KEY,
  name          TEXT    NOT NULL,
  short         TEXT    NOT NULL,
  mood          TEXT    NOT NULL,
  description   TEXT    NOT NULL,
  col           INTEGER NOT NULL,
  row           INTEGER NOT NULL,
  start         INTEGER NOT NULL DEFAULT 0,
  blocked_north TEXT,
  blocked_south TEXT,
  blocked_east  TEXT,
  blocked_west  TEXT,
  UNIQUE (col, row)
);

-- 2x2 grid, top row first:
--   Spiral Stair (0,0) | Lamp Room (1,0)
--   Keeper's Kitchen (0,1) | Rocks (1,1)
INSERT INTO rooms
  (id, name, short, mood, description, col, row, start,
   blocked_north, blocked_south, blocked_east, blocked_west)
VALUES
  ('stair', 'Spiral Stair', 'Stair', 'Cold, echoing, and damp.',
   'Iron steps wind upward through a narrow stone shaft, slick with salt damp. A cold draught carries the smell of oil and the far-off boom of the sea.',
   0, 0, 0,
   'The stair ends at a rusted hatch bolted shut from the other side.',
   NULL, NULL,
   'The curved wall is solid granite, cold under your palm.'),

  ('lamp', 'Lamp Room', 'Lamp', 'Warm brass, dust, and waiting.',
   'A great brass lamp squats inside a cage of glass, its lens dark and dusty. Beyond the panes, fog presses in from every side.',
   1, 0, 0,
   'Only the glass and the fog lie that way, and a long drop beneath.',
   NULL,
   'The gallery door is jammed shut by years of rust.',
   NULL),

  ('kitchen', 'Keeper''s Kitchen', 'Kitchen', 'Quiet, left mid-meal.',
   'A blackened stove sits cold beside a table set for one, the tea long since gone. A logbook lies open, its last entry unfinished.',
   0, 1, 0,
   NULL,
   'A low door leads to a coal cellar flooded with black water.',
   NULL,
   'The pantry shelves are bare and the wall behind them is solid.'),

  ('rocks', 'Rocks', 'Rocks', 'Wind, spray, and grey light.',
   'Black rocks slick with weed rise from the surf at the foot of the tower. Above you the lighthouse stands dark against a low grey sky.',
   1, 1, 1,
   NULL,
   'The sea is far too rough to wade into.',
   'The rocks drop sheer into deep, churning water.',
   NULL);
