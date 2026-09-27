import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  // 5173 is mangodocs-ui's dev port; mangodocs-api's marketing_site_origins
  // allows this one for local testing of the interest form.
  server: { port: 5175 },
  // Two pages: the homepage and /privacy (firebase.json's cleanUrls serves
  // privacy.html at /privacy).
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
