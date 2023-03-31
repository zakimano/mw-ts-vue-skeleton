import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // we define an output directory outside this project dir, since we want to use this "web-app" as our overlay for our component.
    outDir: '../mwdist/ui',
    // tell rollup that electron is a built-in module
    rollupOptions: {
      external: ['electron']
    }
  }
})
