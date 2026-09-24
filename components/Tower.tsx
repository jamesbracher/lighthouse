import { isReachable, rooms, type Room, type RoomId } from "@/lib/rooms";
import { pinFor, TOWER_VIEWBOX } from "@/lib/tower";

interface Props {
  /** the room the player is in */
  current: Room;
  /** the room the pin should point at (the destination while travelling) */
  pinRoom: RoomId;
  onSelect: (id: RoomId) => void;
}

/** Hit areas for each room, drawn last so they sit on top */
const hitAreas: Record<RoomId, string> = {
  rocks: "M44 178 L160 140 L276 178 L160 216 Z",
  kitchen: "M122 194 L128 138 L192 138 L198 194 Z",
  stair: "M128 138 L136 64 L184 64 L192 138 Z",
  lamp: "M124 64 L124 26 L160 0 L196 26 L196 64 Z",
};

/**
 * Isometric, hand-drawn lighthouse with a pin beside the room the player is in.
 * Shares the #rough filter and .scene stroke style with the room scenes.
 */
export default function Tower({ current, pinRoom, onSelect }: Props) {
  const pin = pinFor(pinRoom);
  const { width, height } = TOWER_VIEWBOX;

  return (
    <svg
      className="scene tower"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="The lighthouse with a pin marking where you are"
    >
      <g filter="url(#rough)">
        {/* sea */}
        <path className="thin" d="M6 222 q16 -8 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0" />
        <path className="thin" d="M0 234 q16 -8 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0" />

        {/* rocks: top face, then the two visible sides */}
        <path className="solid" d="M44 178 L100 156 L160 140 L222 158 L276 178 L226 200 L160 216 L96 200 Z" />
        <path className="solid" d="M44 178 L44 190 L96 212 L160 228 L226 212 L276 190 L276 178 L226 200 L160 216 L96 200 Z" />
        <path className="thin" d="M70 186 l10 6 M118 200 l12 6 M190 204 l12 -6 M246 190 l10 -6 M90 172 l14 4 M212 166 l16 -4" />

        {/* base circle sitting on the rocks, drawn behind the shaft */}
        <ellipse cx="160" cy="178" rx="34" ry="13" />

        {/* shaft */}
        <path className="solid" d="M126 178 L138 62 L182 62 L194 178 A34 13 0 0 1 126 178 Z" />
        <path d="M126 178 L138 62 M194 178 L182 62" />
        <path d="M126 178 A34 13 0 0 0 194 178" />
        {/* bands with hatching between */}
        <path d="M129 150 A31 11 0 0 0 191 150 M132 120 A28 10 0 0 0 188 120 M135 92 A25 9 0 0 0 185 92" />
        <path className="thin" d="M134 156 l1 -13 M146 160 l1 -14 M160 161 l0 -14 M174 160 l-1 -14 M186 156 l-1 -13" />
        <path className="thin" d="M139 98 l1 -13 M149 102 l1 -14 M160 103 l0 -14 M171 102 l-1 -14 M181 98 l-1 -13" />
        {/* door and window slits */}
        <path d="M152 190 L152 176 Q160 168 168 176 L168 190" />
        <rect x="157" y="128" width="6" height="12" rx="3" />
        <rect x="157" y="104" width="6" height="12" rx="3" />

        {/* gallery */}
        <ellipse className="solid" cx="160" cy="62" rx="32" ry="11" />
        <path d="M128 62 A32 11 0 0 0 192 62 L192 67 A32 11 0 0 1 128 67 Z" className="solid" />
        <path className="thin" d="M136 70 l0 -12 M148 74 l0 -12 M160 76 l0 -12 M172 74 l0 -12 M184 70 l0 -12" />
        <path className="thin" d="M136 58 A30 9 0 0 0 184 58" />

        {/* lamp cage */}
        <path className="solid" d="M142 58 L142 32 L178 32 L178 58 A18 6.5 0 0 1 142 58 Z" />
        <path d="M142 58 A18 6.5 0 0 0 178 58" />
        <path className="thin" d="M151 36 L151 62 M160 37 L160 64 M169 36 L169 62" />
        <ellipse cx="160" cy="32" rx="18" ry="6.5" />
        {/* dome and finial */}
        <path className="solid" d="M142 32 Q160 2 178 32" />
        <path d="M160 16 L160 8" />
        <circle cx="160" cy="6" r="3" />

        {/* clickable rooms */}
        {(Object.keys(hitAreas) as RoomId[]).map((id) => {
          const here = id === current.id;
          const reachable = isReachable(current, id);
          const className = ["hit", here && "here", reachable && "reachable"]
            .filter(Boolean)
            .join(" ");
          return (
            <path
              key={id}
              className={className}
              d={hitAreas[id]}
              role="button"
              tabIndex={here ? -1 : 0}
              aria-label={here ? `${rooms[id].name}, you are here` : `Go to the ${rooms[id].name}`}
              aria-disabled={here || undefined}
              onClick={() => onSelect(id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(id);
                }
              }}
            />
          );
        })}
      </g>

      {/* the pin glides via a CSS transform transition; drawn outside the wobble
          filter so its motion stays smooth */}
      <g className="pin" style={{ transform: `translate(${pin.x}px, ${pin.y}px)` }}>
        <ellipse className="shadow" cx="0" cy="2" rx="7" ry="2.5" />
        <path d="M0 0 C-6 -10 -11 -14 -11 -22 A11 11 0 1 1 11 -22 C11 -14 6 -10 0 0 Z" />
        <circle cx="0" cy="-22" r="4" />
      </g>
    </svg>
  );
}
