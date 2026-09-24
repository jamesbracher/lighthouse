-- Add the Cellar directly below the Keeper's Kitchen (column 0, row 2).
-- Its doors are derived from position: north to the Kitchen, nothing else.
-- INSERT OR IGNORE keeps this idempotent, because the same row was first
-- added to the remote database by hand on 2026-09-24.
INSERT OR IGNORE INTO rooms
  (id, name, short, mood, description, col, row, start,
   blocked_north, blocked_south, blocked_east, blocked_west)
VALUES
  ('cellar', 'Cellar', 'Cellar', 'Black water, and something dripping.',
   'Stone steps drop into a coal cellar half drowned in black water that laps at the bottom stair. Somewhere in the dark, a slow drip keeps time.',
   0, 2, 0,
   NULL,
   'The water is deeper than it looks, and colder.',
   'The far wall is lost in the flood.',
   'Coal heaps slump against the wall, going nowhere.');
