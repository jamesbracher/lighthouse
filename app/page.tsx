import Game from "@/components/Game";
import { loadWorld } from "@/lib/db";

// Rooms are read from the database on every request
export const dynamic = "force-dynamic";

export default async function Home() {
  const world = await loadWorld();
  return <Game world={world} />;
}
