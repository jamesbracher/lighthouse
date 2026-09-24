import type { Direction, Room } from "@/lib/rooms";

const keys: { dir: Direction; x: number; y: number; arrow: string }[] = [
  { dir: "north", x: 34, y: 2, arrow: "M48 23 L48 10 M42 16 L48 10 L54 16" },
  { dir: "west", x: 2, y: 34, arrow: "M23 48 L10 48 M16 42 L10 48 L16 54" },
  { dir: "south", x: 34, y: 34, arrow: "M48 41 L48 54 M42 48 L48 54 L54 48" },
  { dir: "east", x: 66, y: 34, arrow: "M73 48 L86 48 M80 42 L86 48 L80 54" },
];

/** Arrow-key sketch in the footer; keys with no exit from the room are dimmed */
export default function Keys({ room }: { room: Room }) {
  return (
    <svg className="keys" viewBox="-3 -3 102 70" aria-hidden="true">
      <g filter="url(#rough)">
        {keys.map(({ dir, x, y, arrow }) => (
          <g key={dir} className={dir in room.exits ? "key" : "key off"}>
            <rect x={x} y={y} width="28" height="28" rx="5" />
            <path className="glow" d={arrow} />
          </g>
        ))}
      </g>
    </svg>
  );
}
