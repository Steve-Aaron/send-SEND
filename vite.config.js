import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    proxy: {
      '/parliament-api': {
        target: 'https://members-api.parliament.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/parliament-api/, ''),
      },
    },
  },
})
