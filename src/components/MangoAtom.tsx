import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

// Hero brand moment: the mango as an atom's nucleus, with documents of every
// format orbiting it. Loops forever, slowly (constant motion → linear), and
// pauses while off-screen. Reduced motion shows the same atom, still.
//
// Real CSS 3D (globals.css .atom-*): each orbit is a ring tilted with
// rotateZ(θ) rotateX(ORBIT_TILT); a document travels it as
// rotateZ(φ) translateX(r) rotateZ(-φ), then undoes the ring's tilt so it
// always faces the viewer. Because the mango sits in the same 3D scene at
// z = 0, documents genuinely pass behind and in front of it — no z-index
// juggling. Sizes are in cqi (percent of the atom's width), so it scales as
// one piece from phone to desktop.

type Format = 'pdf' | 'docx' | 'xlsx' | 'scan' | 'txt' | 'eml'

type Doc = { format: Format; w: number; h: number; phase: number; tilt: number }

const ORBITS: { angle: number; radius: number; seconds: number; reverse?: boolean; docs: Doc[] }[] = [
  {
    angle: 0,
    radius: 39,
    seconds: 22,
    docs: [
      { format: 'pdf', w: 12, h: 15.5, phase: 0, tilt: -6 },
      { format: 'xlsx', w: 15, h: 11, phase: 0.5, tilt: 4 },
    ],
  },
  {
    angle: 60,
    radius: 35,
    seconds: 18,
    reverse: true,
    docs: [
      { format: 'docx', w: 11, h: 14.5, phase: 0.2, tilt: 5 },
      { format: 'eml', w: 10, h: 12, phase: 0.7, tilt: -4 },
    ],
  },
  {
    angle: 120,
    radius: 37,
    seconds: 26,
    docs: [
      { format: 'scan', w: 12.5, h: 16, phase: 0.35, tilt: -3 },
      { format: 'txt', w: 9.5, h: 12.5, phase: 0.85, tilt: 7 },
    ],
  },
]

const ORBIT_TILT = 72 // degrees the rings lean away from the viewer

const DOC_IN_STAGGER_MS = 70

export function MangoAtom() {
  const ref = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  // Nobody needs an animation running below the fold.
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  let order = 0

  return (
    <div
      ref={ref}
      data-paused={paused || undefined}
      className="atom relative mx-auto aspect-square w-full max-w-[28rem]"
      role="img"
      aria-label="The MangoDocs mango at the centre of an atom, with documents of every format orbiting it"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[14%] -z-10 rounded-full bg-gradient-to-br from-mango-100 via-mango-50 to-transparent opacity-80 blur-2xl"
      />
      <div className="atom-scene absolute inset-0" aria-hidden="true">
        <div className="atom-nucleus">
          <svg viewBox="-20 0 200 200" className="h-full w-full">
            <path
              d="M88 2L156 79C155.7 84.8 157.2 101.3 154 114C150.8 126.7 144.7 143 137 155C129.3 167 117.7 179 108 186C98.3 193 88 196 79 197C70 198 60.7 195.5 54 192C47.3 188.5 43 183.7 39 176C35 168.3 34.2 155.8 30 146C25.8 136.2 18.3 127.7 14 117C9.7 106.3 5 93.5 4 82C3 70.5 4.3 58 8 48C11.7 38 18.3 29 26 22C33.7 15 43.7 9.3 54 6C64.3 2.7 82.3 2.7 88 2Z"
              fill="#E88C1E"
            />
            <path d="M88 2L88 79L156 79Z" fill="#B96409" />
          </svg>
        </div>

        {ORBITS.map((o) => (
          <div
            key={o.angle}
            className="atom-orbit"
            style={{ transform: `rotateZ(${o.angle}deg) rotateX(${ORBIT_TILT}deg)` } as CSSProperties}
          >
            <div className="atom-ring" style={{ '--r': `${o.radius}cqi` } as CSSProperties} />
            {o.docs.map((d) => (
              <DocCard
                key={d.format}
                doc={d}
                style={
                  {
                    '--r': `${o.radius}cqi`,
                    '--w': `${d.w}cqi`,
                    '--h': `${d.h}cqi`,
                    // Undo the ring's tilt, then add the document's own small lean.
                    '--face': `rotateX(${-ORBIT_TILT}deg) rotateZ(${-o.angle + d.tilt}deg)`,
                    animationDuration: `${o.seconds}s, 500ms`,
                    animationDirection: `${o.reverse ? 'reverse' : 'normal'}, normal`,
                    // Negative delay = start part-way round, so documents are spread out from frame one.
                    animationDelay: `${-d.phase * o.seconds}s, ${200 + order++ * DOC_IN_STAGGER_MS}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const FORMATS: Record<Format, { label: string; badge: string; paper: string; lines: string }> = {
  pdf: { label: 'PDF', badge: '#C8372D', paper: '#ffffff', lines: 'var(--neutral-200)' },
  docx: { label: 'DOCX', badge: '#2B5CAB', paper: '#ffffff', lines: 'var(--neutral-200)' },
  xlsx: { label: 'XLSX', badge: '#1E7A46', paper: '#ffffff', lines: 'var(--neutral-200)' },
  scan: { label: 'JPG', badge: '#5B6470', paper: '#F3EEE3', lines: '#D9D1C0' },
  txt: { label: 'TXT', badge: '#423F3A', paper: '#FBFAF8', lines: 'var(--neutral-300)' },
  eml: { label: 'EML', badge: '#6B46A8', paper: '#ffffff', lines: 'var(--neutral-200)' },
}

function DocCard({ doc, style }: { doc: Doc; style: CSSProperties }) {
  const f = FORMATS[doc.format]
  return (
    <div className="atom-doc" style={style}>
      <div
        className="atom-paper"
        style={{ backgroundColor: f.paper, '--lines': f.lines } as CSSProperties}
        data-format={doc.format}
      >
        <span className="atom-badge" style={{ background: f.badge }}>
          {f.label}
        </span>
      </div>
    </div>
  )
}
