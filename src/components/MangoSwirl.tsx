import type { CSSProperties } from 'react'

// Hero brand moment: scattered documents spiral inward and become the mango.
// Plays once on load (globals.css .swirl-*), ~1.5s, never loops; nothing on
// the page waits for it. Reduced motion shows the finished mango.
//
// Each document is one CSS keyframe from `rotate(a) translateX(r)` to
// `rotate(a + spin) translateX(0)`: interpolating the rotation and the
// radius together traces a spiral — transform only, no path maths.

const CENTER = 200
const DOCS = [
  { a: 0, r: 178, spin: 200, tilt: -18 },
  { a: 31, r: 150, spin: 230, tilt: 12 },
  { a: 62, r: 186, spin: 190, tilt: -6 },
  { a: 94, r: 160, spin: 220, tilt: 22 },
  { a: 125, r: 176, spin: 205, tilt: -24 },
  { a: 155, r: 146, spin: 240, tilt: 8 },
  { a: 186, r: 182, spin: 195, tilt: -12 },
  { a: 216, r: 158, spin: 225, tilt: 18 },
  { a: 247, r: 172, spin: 210, tilt: -20 },
  { a: 278, r: 150, spin: 235, tilt: 6 },
  { a: 308, r: 184, spin: 200, tilt: -8 },
  { a: 339, r: 162, spin: 215, tilt: 14 },
]
const DOC_STAGGER_MS = 25

// The mango mark's own path coordinates (see Logo.tsx) are centred at ~(80, 100).
const MARK_SCALE = 1.25
const MARK_X = CENTER - 80 * MARK_SCALE
const MARK_Y = CENTER - 100 * MARK_SCALE

export function MangoSwirl() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <div
        aria-hidden="true"
        className="absolute inset-[12%] -z-10 rounded-full bg-gradient-to-br from-mango-100 via-mango-50 to-transparent opacity-80 blur-2xl"
      />
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        role="img"
        aria-label="Documents gathering into the MangoDocs mango"
      >
        <g aria-hidden="true">
          {DOCS.map((d, i) => (
            <g
              key={i}
              className="swirl-doc"
              style={
                {
                  '--a': `${d.a}deg`,
                  '--r': `${d.r}px`,
                  '--spin': `${d.a + d.spin}deg`,
                  '--tilt': `${d.tilt}deg`,
                  animationDelay: `${150 + i * DOC_STAGGER_MS}ms`,
                } as CSSProperties
              }
            >
              <DocShape />
            </g>
          ))}

          <g className="swirl-mango">
            <g transform={`translate(${MARK_X}, ${MARK_Y}) scale(${MARK_SCALE})`}>
              <path
                d="M88 2L156 79C155.7 84.8 157.2 101.3 154 114C150.8 126.7 144.7 143 137 155C129.3 167 117.7 179 108 186C98.3 193 88 196 79 197C70 198 60.7 195.5 54 192C47.3 188.5 43 183.7 39 176C35 168.3 34.2 155.8 30 146C25.8 136.2 18.3 127.7 14 117C9.7 106.3 5 93.5 4 82C3 70.5 4.3 58 8 48C11.7 38 18.3 29 26 22C33.7 15 43.7 9.3 54 6C64.3 2.7 82.3 2.7 88 2Z"
                fill="#E88C1E"
              />
              <path className="swirl-fold" d="M88 2L88 79L156 79Z" fill="#B96409" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

// A small page with a folded corner, drawn centred on the diagram's centre so
// the CSS rotate/translate pivot around the middle of the swirl.
function DocShape() {
  const w = 34
  const h = 44
  const f = 10
  const x = CENTER - w / 2
  const y = CENTER - h / 2
  return (
    <g>
      <path
        d={`M${x},${y} h${w - f} l${f},${f} v${h - f} h${-w} z`}
        fill="var(--surface)"
        stroke="var(--mango-700)"
        strokeWidth={1.5}
      />
      <path d={`M${x + w - f},${y} v${f} h${f}`} fill="var(--mango-100)" stroke="var(--mango-700)" strokeWidth={1.2} />
      {[14, 21, 28].map((dy) => (
        <line
          key={dy}
          x1={x + 7}
          x2={x + w - 7 - (dy === 28 ? 8 : 0)}
          y1={y + dy}
          y2={y + dy}
          stroke="var(--neutral-300)"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </g>
  )
}
