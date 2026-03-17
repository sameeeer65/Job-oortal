import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      ignored: [
        '**/.git/**',
        '**/node_modules/**',
        '**/.DS_Store',
        '**/Thumbs.db',
        '**/Desktop.ini',
        '**/*.tmp',
        "**/~*",
        '**/*.crdownload',
        '**/*.swp',
        "**/~$*",
        '**/*.tmp.*'
      ]
    }
  }
})