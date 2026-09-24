import { loadWorld } from "@/lib/db";

// Always hit the database rather than serving a cached copy
export const dynamic = "force-dynamic";

/** GET /api/rooms: the rooms, their doors and the map, straight from D1 */
export async function GET() {
  return Response.json(await loadWorld());
}
