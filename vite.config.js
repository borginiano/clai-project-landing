import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configuración para React 19 + Tailwind 4
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
