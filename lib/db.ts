import { getCloudflareContext } from "@opennextjs/cloudflare";
import { buildWorld, type RoomRow, type World } from "./world.ts";

/** Read every room from D1 and build the world. Called on every request. */
export async function loadWorld(): Promise<World> {
  const { env } = await getCloudflareContext({ async: true });
  const { results } = await env.DB.prepare("SELECT * FROM rooms ORDER BY row, col").all<RoomRow>();
  return buildWorld(results);
}
