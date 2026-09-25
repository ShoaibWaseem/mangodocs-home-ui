import { useEffect, useRef } from 'react'

// "Many folders, one source": contracts from Drive/SharePoint folders flowing
// into MangoDocs. Only names sources MangoDocs actually connects to.
//
// Motion (see globals.css .flow-*): the connector lines draw in once when the
// diagram scrolls into view, then documents trickle along them into the hub for a few trips and stop.
// SVG animateMotion — the cheapest way to move something along a curve with no
// library. The trickle pauses while off-screen, and never starts under
// prefers-reduced-motion (the finished, static diagram is shown instead).

const SOURCES = [
  { label: 'Google Drive', sub: 'Supplier contracts' },
  { label: 'SharePoint', sub: 'Legal / Signed' },
  { label: 'Google Drive', sub: 'Sales / MSAs' },
  { label: 'SharePoint', sub: 'Procurement' },
  { label: 'Scanned PDFs', sub: 'Any connected folder' },
]

type Layout = {
  width: number
  height: number
  chip: { x: number; w: number; h: number; ys: number[]; label: number; sub: number }
  hub: { x: number; y: number; w: number; h: number }
}

const DESKTOP: Layout = {
  width: 960,
  height: 380,
  chip: { x: 1, w: 250, h: 52, ys: [8, 82, 156, 230, 304], label: 15, sub: 13 },
  hub: { x: 650, y: 110, w: 309, h: 160 },
}

const MOBILE: Layout = {
  width: 360,
  height: 272,
  chip: { x: 1, w: 164, h: 44, ys: [2, 58, 114, 170, 226], label: 12.5, sub: 11 },
  hub: { x: 226, y: 76, w: 133, h: 120 },
}

// Timings, in seconds. Lines draw first; the trickle starts as they finish.
const LINE_STAGGER = 0.08
const FLOW_START = 0.9
const FLOW_DUR = 3.2 // one document's trip
const DOCS_PER_PATH = 2
const FLOW_TRIPS = 3 // per document — the point lands, then the diagram rests (~15s)
const PATH_OFFSET = 0.64 // desynchronises the five paths into a steady trickle

function pathFor(l: Layout, i: number) {
  const x0 = l.chip.x + l.chip.w
  const y0 = l.chip.ys[i] + l.chip.h / 2
  const x1 = l.hub.x
  const y1 = l.hub.y + l.hub.h / 2
  const mid = (x0 + x1) / 2
  return `M${x0},${y0} C${mid},${y0} ${mid},${y1} ${x1},${y1}`
}

// A connector's bounding box, padded past the stroke on every side.
function lineBox(l: Layout, i: number) {
  const pad = 4
  const x0 = l.chip.x + l.chip.w
  const y0 = l.chip.ys[i] + l.chip.h / 2
  const x1 = l.hub.x
  const y1 = l.hub.y + l.hub.h / 2
  return { x: x0 - pad, y: Math.min(y0, y1) - pad, w: x1 - x0 + pad * 2, h: Math.abs(y1 - y0) + pad * 2 }
}

function Diagram({ layout: l, id, className }: { layout: Layout; id: string; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const startRef = useRef<SVGAnimateElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      svg.dataset.visible = ''
      return
    }
    if (!('IntersectionObserver' in window)) {
      svg.dataset.visible = ''
      startRef.current?.beginElement()
      return
    }
    let started = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!started) {
            started = true
            svg.dataset.visible = ''
            startRef.current?.beginElement()
          }
          svg.unpauseAnimations()
        } else if (started) {
          svg.pauseAnimations()
        }
      },
      { rootMargin: '0px 0px -100px 0px' },
    )
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  const hubCx = l.hub.x + l.hub.w / 2
  const hubCy = l.hub.y + l.hub.h / 2
  const small = l === MOBILE

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${l.width} ${l.height}`}
      className={`flow-diagram h-auto w-full ${className ?? ''}`}
      role="img"
      aria-label="Contracts from Google Drive and SharePoint folders, including scanned PDFs, flowing into MangoDocs as one searchable source."
    >
      {/* Timeline anchor: every document's motion begins relative to this. */}
      <animate ref={startRef} id={`${id}-start`} attributeName="x" begin="indefinite" dur="0.01s" />

      <g aria-hidden="true">
        {/* Each connector is revealed left-to-right by a clip rect that scales
            from 0 to full width (globals.css .flow-reveal) — transform only.
            The rect is padded so the stroke's full width is never clipped. */}
        <defs>
          {SOURCES.map((_, i) => {
            const b = lineBox(l, i)
            return (
              <clipPath key={i} id={`${id}-clip-${i}`}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  className="flow-reveal"
                  style={{ transitionDelay: `${i * LINE_STAGGER}s` }}
                />
              </clipPath>
            )
          })}
        </defs>
        {SOURCES.map((_, i) => (
          <path
            key={i}
            id={`${id}-path-${i}`}
            d={pathFor(l, i)}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth={small ? 1.25 : 1.5}
            clipPath={`url(#${id}-clip-${i})`}
          />
        ))}

        {SOURCES.map((s, i) => {
          const y = l.chip.ys[i]
          return (
            <g key={i} className="flow-chip" style={{ transitionDelay: `${i * LINE_STAGGER}s` }}>
              <rect
                x={l.chip.x}
                y={y}
                width={l.chip.w}
                height={l.chip.h}
                rx={10}
                fill="var(--surface)"
                stroke="var(--border)"
              />
              <FolderGlyph x={l.chip.x + (small ? 10 : 14)} y={y + l.chip.h / 2 - (small ? 7 : 8)} small={small} />
              <text
                x={l.chip.x + (small ? 32 : 42)}
                y={y + l.chip.h / 2 - (small ? 2 : 3)}
                fontSize={l.chip.label}
                fontWeight={600}
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
              <text
                x={l.chip.x + (small ? 32 : 42)}
                y={y + l.chip.h / 2 + (small ? 12 : 14)}
                fontSize={l.chip.sub}
                fill="var(--text-muted)"
              >
                {s.sub}
              </text>
            </g>
          )
        })}

        {/* Documents in transit. Hidden until their first trip begins. */}
        {SOURCES.flatMap((_, i) =>
          Array.from({ length: DOCS_PER_PATH }, (_, k) => {
            const begin = `${id}-start.begin+${(FLOW_START + i * PATH_OFFSET + k * (FLOW_DUR / DOCS_PER_PATH)).toFixed(2)}s`
            return (
              <g key={`${i}-${k}`} opacity={0}>
                <DocGlyph small={small} />
                <animateMotion
                  begin={begin}
                  dur={`${FLOW_DUR}s`}
                  repeatCount={FLOW_TRIPS}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.77 0 0.175 1"
                >
                  {/* Both forms: older WebKit only resolves xlink:href on mpath. */}
                  <mpath href={`#${id}-path-${i}`} xlinkHref={`#${id}-path-${i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  begin={begin}
                  dur={`${FLOW_DUR}s`}
                  repeatCount={FLOW_TRIPS}
                  values="0;1;1;0"
                  keyTimes="0;0.12;0.82;1"
                />
              </g>
            )
          }),
        )}

        {/* The hub — one source. */}
        <g className="flow-hub">
          <rect
            x={l.hub.x}
            y={l.hub.y}
            width={l.hub.w}
            height={l.hub.h}
            rx={small ? 14 : 18}
            fill="var(--neutral-900)"
          />
          <g
            transform={`translate(${hubCx - (small ? 9 : 13)}, ${l.hub.y + (small ? 18 : 26)}) scale(${small ? 0.11 : 0.16})`}
          >
            <path
              d="M88 2L156 79C155.7 84.8 157.2 101.3 154 114C150.8 126.7 144.7 143 137 155C129.3 167 117.7 179 108 186C98.3 193 88 196 79 197C70 198 60.7 195.5 54 192C47.3 188.5 43 183.7 39 176C35 168.3 34.2 155.8 30 146C25.8 136.2 18.3 127.7 14 117C9.7 106.3 5 93.5 4 82C3 70.5 4.3 58 8 48C11.7 38 18.3 29 26 22C33.7 15 43.7 9.3 54 6C64.3 2.7 82.3 2.7 88 2Z"
              fill="#E88C1E"
            />
            <path d="M88 2L88 79L156 79Z" fill="#B96409" />
          </g>
          <text
            x={hubCx}
            y={hubCy + (small ? 14 : 16)}
            textAnchor="middle"
            fontSize={small ? 14 : 20}
            fontWeight={700}
            fill="var(--neutral-50)"
          >
            MangoDocs
          </text>
          <text
            x={hubCx}
            y={hubCy + (small ? 32 : 42)}
            textAnchor="middle"
            fontSize={small ? 10.5 : 14}
            fill="var(--neutral-400)"
          >
            {small ? 'One source' : 'One searchable source'}
          </text>
        </g>
      </g>
    </svg>
  )
}

function FolderGlyph({ x, y, small }: { x: number; y: number; small: boolean }) {
  const s = small ? 0.8 : 1
  return (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      <path
        d="M1 3.5A1.5 1.5 0 0 1 2.5 2H8l2 2.5h9.5A1.5 1.5 0 0 1 21 6v8.5a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 1 14.5z"
        fill="var(--mango-100)"
        stroke="var(--mango-700)"
        strokeWidth={1.25}
      />
    </g>
  )
}

// Drawn centred on the origin — animateMotion moves the origin along the path.
function DocGlyph({ small }: { small: boolean }) {
  const w = small ? 11 : 15
  const h = small ? 14 : 19
  const f = small ? 3.5 : 5
  return (
    <g>
      <path
        d={`M${-w / 2},${-h / 2} h${w - f} l${f},${f} v${h - f} h${-w} z`}
        fill="var(--surface)"
        stroke="var(--mango-700)"
        strokeWidth={1.25}
      />
      <path
        d={`M${w / 2 - f},${-h / 2} v${f} h${f}`}
        fill="var(--mango-200)"
        stroke="var(--mango-700)"
        strokeWidth={1}
      />
    </g>
  )
}

export function SourcesFlow() {
  return (
    <div className="mx-auto max-w-4xl">
      <Diagram layout={DESKTOP} id="flow-d" className="hidden md:block" />
      <Diagram layout={MOBILE} id="flow-m" className="md:hidden" />
    </div>
  )
}
