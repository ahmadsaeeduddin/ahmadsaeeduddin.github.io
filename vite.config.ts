import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio2.0/',              // <<< IMPORTANT
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: { sourcemap: true }
})
