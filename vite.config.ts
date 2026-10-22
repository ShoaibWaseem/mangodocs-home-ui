import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { readFileSync } from 'node:fs'

// src/config.ts's COMPANY block starts as bracketed placeholders. Never let
// those reach the live legal pages (ALLOW_PLACEHOLDERS=1 for a local check).
function assertNoLegalPlaceholders() {
  const config = readFileSync(path.resolve(import.meta.dirname, 'src/config.ts'), 'utf8')
  const company = config.slice(config.indexOf('export const COMPANY'))
  if (/'\[[A-Z ]+\]'/.test(company) && !process.env.ALLOW_PLACEHOLDERS) {
    throw new Error('src/config.ts COMPANY still has placeholders: fill them in before building for production.')
  }
}

export default defineConfig(({ command }) => {
  if (command === 'build') assertNoLegalPlaceholders()
  return {
    plugins: [react()],
    // 5173 is mangodocs-ui's dev port; mangodocs-api's marketing_site_origins
    // allows this one for local testing of the interest form.
    server: { port: 5175 },
    // Three pages: the homepage, /privacy and /terms (firebase.json's cleanUrls
    // serves privacy.html at /privacy, terms.html at /terms).
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          privacy: path.resolve(import.meta.dirname, 'privacy.html'),
          terms: path.resolve(import.meta.dirname, 'terms.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})
