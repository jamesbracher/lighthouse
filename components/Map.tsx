import { grid, isReachable, rooms, type Room, type RoomId } from "@/lib/rooms";

interface Props {
  current: Room;
  onSelect: (id: RoomId) => void;
}

/** 2x2 map in the panel corner. Clicking a reachable room travels there. */
export default function Map({ current, onSelect }: Props) {
  return (
    <nav className="map" aria-label="Map">
      {grid.flat().map((id) => {
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
            {rooms[id].short}
          </button>
        );
      })}
    </nav>
  );
}
