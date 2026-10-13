import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Privacy } from '@/pages/Privacy'
import '@/fonts'
import '@/styles/globals.css'
import { countVisit } from '@/lib/countVisit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Privacy />
  </StrictMode>,
)

countVisit()
