import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change this to 3000, 8000, or any port you prefer
    strictPort: true, // Forces Vite to use this exact port or fail, rather than auto-shifting
  }
})