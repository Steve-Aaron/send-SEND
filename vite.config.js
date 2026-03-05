import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/send-SEND/', // Replace with your exact repo name
  plugins: [
    tailwindcss(),
    react(),
  ],
})