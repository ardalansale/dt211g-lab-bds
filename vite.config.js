import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sass: resolve(__dirname, 'sass.html'),
        animering: resolve(__dirname, 'animering.html'),
      }
    }
  },
  
  plugins: [
    ViteImageOptimizer({
      svg: { quality: 100 },
      jpg: false,
      jpeg: false,
      webp: { quality: 80 },
    })
  ]
})