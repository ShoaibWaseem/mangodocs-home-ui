import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Terms } from '@/pages/Terms'
import '@/fonts'
import '@/styles/globals.css'
import { countVisit } from '@/lib/countVisit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Terms />
  </StrictMode>,
)

countVisit()
