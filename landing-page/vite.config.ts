import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/vibe/',      // ✅ GtHub Pages용 경로
  build: {
    outDir: '../docs', // ✅ 레포 루트/docs에 빌드
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})