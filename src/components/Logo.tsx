export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-20 0 200 200" fill="none" aria-hidden="true" className={className}>
      <path
        d="M88 2L156 79C155.7 84.8 157.2 101.3 154 114C150.8 126.7 144.7 143 137 155C129.3 167 117.7 179 108 186C98.3 193 88 196 79 197C70 198 60.7 195.5 54 192C47.3 188.5 43 183.7 39 176C35 168.3 34.2 155.8 30 146C25.8 136.2 18.3 127.7 14 117C9.7 106.3 5 93.5 4 82C3 70.5 4.3 58 8 48C11.7 38 18.3 29 26 22C33.7 15 43.7 9.3 54 6C64.3 2.7 82.3 2.7 88 2Z"
        fill="#E88C1E"
      />
      <path d="M88 2L88 79L156 79Z" fill="#B96409" />
    </svg>
  )
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark className="h-7 w-7" />
      <span
        className={`font-display text-lg font-medium tracking-[-0.01em] ${inverted ? 'text-neutral-50' : 'text-ink'}`}
      >
        MangoDocs
      </span>
    </span>
  )
}
