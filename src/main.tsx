import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/App'
import '@/fonts'
import '@/styles/globals.css'
import { countVisit } from '@/lib/countVisit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

countVisit()
