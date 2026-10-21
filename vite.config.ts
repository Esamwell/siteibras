import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Redirect all 404s to index.html so React Router handles /admin etc.
    historyApiFallback: true,
  },
  preview: {
    // Same for production preview
    historyApiFallback: true,
  },
})

