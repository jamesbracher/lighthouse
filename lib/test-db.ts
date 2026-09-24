import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { RoomRow } from "./world.ts";

/**
 * Test helper: apply every SQL file in migrations/ to an in-memory SQLite
 * database, the same engine D1 runs on, and return the room rows.
 */
export function roomsFromMigrations(dir = join(process.cwd(), "migrations")): RoomRow[] {
  const db = new DatabaseSync(":memory:");
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  if (files.length === 0) throw new Error(`No migrations found in ${dir}`);
  for (const file of files) db.exec(readFileSync(join(dir, file), "utf8"));
  return db.prepare("SELECT * FROM rooms ORDER BY row, col").all() as unknown as RoomRow[];
}
