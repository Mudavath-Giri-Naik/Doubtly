import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Add the static copy plugin
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_redirects',
          dest: '.'
        }
      ]
    })
  ],
})
