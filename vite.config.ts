import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Using a relative base path so the build works when deployed to GitHub
// Pages under a project subpath (https://<user>.github.io/<repo>/) as well
// as user/organization pages served from the domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
