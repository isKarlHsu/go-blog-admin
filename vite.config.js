import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true, // 自动打开
    cors: true, // 允许跨域
    host: '0.0.0.0',
    port: 5174,
    // 是否开启 https
    https: false,
    // 反向代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      },
      '/admin': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/admin/, '')
      }
    }
  }
})
