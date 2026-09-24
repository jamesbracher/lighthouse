import type { ReactElement } from "react";
import type { RoomId } from "@/lib/rooms";

/* Hand-drawn room scenes, carried over from prototype/index.html.
   All share the #rough filter defined in RoughFilter.tsx. */

const scenes: Record<RoomId, ReactElement> = {
  stair: (
    <svg className="scene" viewBox="0 0 320 180" role="img" aria-label="A spiral staircase inside a stone shaft">
      <g filter="url(#rough)">
      <path d="M58 8 Q54 90 60 172"/>
      <path d="M262 8 Q266 90 260 172"/>
      <path className="thin" d="M62 30 l14 -8 M62 60 l16 -9 M62 95 l14 -8 M62 130 l15 -8 M62 160 l13 -7"/>
      <path className="thin" d="M258 45 l-14 -8 M258 80 l-16 -9 M258 115 l-14 -8 M258 150 l-15 -8"/>
      <path d="M159 8 Q163 90 158 172"/>
      <path d="M158 28 L60 44 M158 52 L60 68 M158 76 L60 92 M158 100 L60 116 M158 124 L60 140 M158 148 L60 164"/>
      <path className="thin" d="M60 44 l0 8 M100 38 l0 8 M130 33 l0 8"/>
      <path className="thin" d="M60 92 l0 8 M100 86 l0 8 M130 81 l0 8"/>
      <path className="thin" d="M60 140 l0 8 M100 134 l0 8 M130 129 l0 8"/>
      <path d="M160 40 L260 24 M160 64 L260 48 M160 88 L260 72 M160 112 L260 96 M160 136 L260 120 M160 160 L260 144"/>
      <path className="thin" d="M260 48 l0 8 M220 55 l0 8 M190 60 l0 8"/>
      <path className="thin" d="M260 96 l0 8 M220 103 l0 8 M190 108 l0 8"/>
      <path className="thin" d="M260 144 l0 8 M220 151 l0 8 M190 156 l0 8"/>
      <path className="thin" d="M70 20 Q120 34 158 20 Q210 6 254 22"/>
      <rect x="84" y="50" width="12" height="34" rx="6"/>
      <path className="glow thin" d="M96 60 l40 14 M96 70 l38 22 M96 80 l34 30" strokeDasharray="4 5"/>
      </g>
    </svg>
  ),
  lamp: (
    <svg className="scene" viewBox="0 0 320 180" role="img" aria-label="A brass lamp inside a glass cage under a dome">
      <g filter="url(#rough)">
      <path className="thin" d="M8 60 q12 -8 24 0 t24 0 M6 100 q12 -8 24 0 t20 0 M10 140 q12 -8 24 0 t22 0"/>
      <path className="thin" d="M268 70 q12 -8 24 0 t20 0 M270 110 q12 -8 24 0 t18 0 M266 150 q12 -8 24 0 t22 0"/>
      <path d="M24 162 Q160 168 296 162"/>
      <path d="M70 162 L72 72 M250 162 L248 72 M130 160 L131 74 M190 160 L189 74"/>
      <path d="M60 72 Q160 64 260 72"/>
      <path d="M62 124 Q160 128 258 124"/>
      <path d="M60 72 Q160 -14 260 72"/>
      <path className="thin" d="M100 44 Q160 20 220 44"/>
      <path d="M160 30 L160 12"/>
      <circle cx="160" cy="9" r="4"/>
      <path d="M142 162 L150 128 L170 128 L178 162"/>
      <path className="thin" d="M136 162 L184 162"/>
      <circle cx="160" cy="100" r="24"/>
      <circle cx="160" cy="100" r="11"/>
      <path className="thin" d="M144 84 Q160 78 176 84 M144 116 Q160 122 176 116"/>
      <path className="glow thin" d="M186 92 l28 -8 M188 104 l30 4 M184 116 l26 14" strokeDasharray="5 6"/>
      <path className="glow thin" d="M134 92 l-28 -8 M132 104 l-30 4 M136 116 l-26 14" strokeDasharray="5 6"/>
      </g>
    </svg>
  ),
  kitchen: (
    <svg className="scene" viewBox="0 0 320 180" role="img" aria-label="A cold stove, a table set for one and an open logbook">
      <g filter="url(#rough)">
      <path className="thin" d="M10 140 Q160 143 310 140 M10 156 Q160 153 310 156 M10 172 Q160 175 310 172"/>
      <path className="thin" d="M80 140 l0 16 M200 156 l0 16 M250 140 l0 16"/>
      <rect x="30" y="82" width="74" height="58" rx="4"/>
      <rect x="42" y="98" width="26" height="30" rx="3"/>
      <path className="thin" d="M46 104 l18 0 M46 112 l18 0 M46 120 l18 0"/>
      <ellipse cx="86" cy="90" rx="9" ry="3"/>
      <ellipse cx="50" cy="90" rx="9" ry="3"/>
      <path d="M34 140 l0 8 M100 140 l0 8"/>
      <path d="M78 82 L78 44 L96 44 L96 18"/>
      <path d="M70 82 L86 82"/>
      <rect x="196" y="22" width="56" height="44" rx="2"/>
      <path className="thin" d="M224 22 L224 66 M196 44 L252 44"/>
      <path className="thin" d="M206 30 l-3 8 M236 50 l-3 8 M214 54 l-3 8 M242 28 l-3 8"/>
      <path d="M136 110 Q214 106 292 110"/>
      <path className="thin" d="M140 118 Q214 114 288 118"/>
      <path d="M148 118 L146 166 M282 118 L284 166"/>
      <path d="M172 92 L174 108 L190 108 L192 92 Z"/>
      <path d="M192 96 q10 2 0 10"/>
      <ellipse cx="182" cy="110" rx="14" ry="3"/>
      <path className="solid" d="M214 100 L250 94 L254 108 L218 114 Z"/>
      <path className="solid" d="M254 108 L250 94 L288 98 L290 112 Z"/>
      <path className="thin" d="M222 104 l22 -4 M224 108 l20 -3 M258 101 l24 3 M260 106 l14 2"/>
      <path d="M112 90 L110 166 M128 90 L128 166 M112 92 L128 92 M112 102 L128 102"/>
      <path d="M108 128 L140 126"/>
      </g>
    </svg>
  ),
  rocks: (
    <svg className="scene" viewBox="0 0 320 180" role="img" aria-label="A dark lighthouse tower above wet rocks and surf">
      <g filter="url(#rough)">
      <path className="thin" d="M20 40 q14 -6 28 0 M230 30 q12 -6 24 0 t22 0"/>
      <path className="thin" d="M40 62 q5 -6 10 0 q5 -6 10 0 M262 74 q4 -5 8 0 q4 -5 8 0"/>
      <path d="M132 124 L142 30 L178 30 L188 124"/>
      <path d="M128 30 L192 30"/>
      <path className="thin" d="M136 34 Q160 38 184 34"/>
      <rect x="148" y="12" width="24" height="18"/>
      <path className="thin" d="M156 12 L156 30 M164 12 L164 30"/>
      <path d="M144 12 L160 2 L176 12"/>
      <path className="thin" d="M139 56 Q160 60 181 56 M137 74 Q160 78 183 74"/>
      <path className="thin" d="M141 58 l-2 14 M149 60 l-1 14 M157 61 l0 14 M165 61 l0 14 M173 60 l1 14 M180 58 l2 14"/>
      <path className="thin" d="M135 96 Q160 100 185 96 M133 114 Q160 118 187 114"/>
      <path className="thin" d="M137 98 l-2 14 M147 100 l-1 14 M157 101 l0 14 M167 101 l0 14 M177 100 l1 14 M184 98 l2 14"/>
      <path d="M154 124 L154 112 Q160 106 166 112 L166 124"/>
      <path className="thin" d="M0 148 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
      <path className="thin" d="M0 160 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
      <path className="solid" d="M0 180 L22 144 L52 152 L82 126 L120 142 L152 120 L200 136 L242 118 L282 142 L320 130 L320 180 Z"/>
      <path className="thin" d="M30 160 l14 8 M60 150 l16 10 M92 140 l12 12 M130 146 l14 8 M170 138 l12 10 M212 140 l14 8 M252 136 l12 10 M290 148 l12 8"/>
      <path className="thin" d="M82 126 L96 148 M152 120 L160 142 M242 118 L236 140"/>
      <path className="thin" d="M8 138 q4 -8 8 0 M300 124 q4 -8 8 0"/>
      </g>
    </svg>
  ),
};

export default function Scene({ room }: { room: RoomId }) {
  return scenes[room];
}
