import type { AnchorHTMLAttributes } from 'react'

// Square, uppercase, widely spaced: the editorial button. Mango is the one
// colour on the page; everything else is ink, paper and stone.
type Variant = 'dark' | 'mango' | 'ghost-light'

const variants: Record<Variant, string> = {
  dark: 'bg-neutral-900 text-neutral-50 hover:bg-neutral-800',
  mango: 'bg-mango-500 text-neutral-900 hover:bg-mango-400',
  'ghost-light': 'text-white/80 ring-1 ring-inset ring-white/25 hover:bg-white/10 hover:text-white',
}

export const buttonClass = (variant: Variant = 'dark') =>
  `caps inline-flex h-12 items-center justify-center gap-3 px-8 transition-[transform,background-color,color] duration-150 ease-out active:scale-[0.97] ${variants[variant]}`

export function ButtonLink({
  variant = 'dark',
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={`${buttonClass(variant)} ${className}`} {...props} />
}
