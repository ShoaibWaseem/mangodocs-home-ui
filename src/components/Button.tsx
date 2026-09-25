import type { AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost-inverted'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-e1',
  secondary: 'bg-surface text-ink border border-border-strong hover:bg-surface-sunken',
  'ghost-inverted': 'text-neutral-100 border border-neutral-700 hover:bg-neutral-800',
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[0.9375rem] font-semibold transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
