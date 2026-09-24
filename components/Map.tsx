import { isReachable, type Room, type RoomId } from "@/lib/rooms";
import type { World } from "@/lib/world";

interface Props {
  world: World;
  current: Room;
  onSelect: (id: RoomId) => void;
}

/** Small map in the panel corner. Clicking a reachable room travels there. */
export default function Map({ world, current, onSelect }: Props) {
  const columns = world.grid[0]?.length ?? 1;
  return (
    <nav className="map" aria-label="Map" style={{ gridTemplateColumns: `repeat(${columns}, 58px)` }}>
      {world.grid.flat().map((id, i) => {
        if (!id) return <span key={`empty-${i}`} aria-hidden="true" />;
        const here = id === current.id;
        const reachable = isReachable(current, id);
        return (
          <button
            key={id}
            type="button"
            className={[here && "here", reachable && "reachable"].filter(Boolean).join(" ")}
            disabled={here}
            aria-current={here ? "location" : undefined}
            onClick={() => onSelect(id)}
          >
            {world.rooms[id].short}
          </button>
        );
      })}
    </nav>
  );
}
