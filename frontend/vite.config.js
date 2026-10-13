import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The tailwindcss() plugin is the official way to use Tailwind v4 with Vite.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})