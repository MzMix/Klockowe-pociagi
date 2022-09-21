/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: '/',
    port: 5176
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@components/': `${path.resolve(__dirname, 'src/components')}/`,
      '@Board/': `${path.resolve(__dirname, 'src/components/Board')}/`,
      '@General/': `${path.resolve(__dirname, 'src/components/General')}/`,
      '@MainPage/': `${path.resolve(__dirname, 'src/components/MainPage')}/`,
      '@Menu/': `${path.resolve(__dirname, 'src/components/Menu')}/`,
      '@Toast/': `${path.resolve(__dirname, 'src/components/Toast')}/`,
      '@Stores/': `${path.resolve(__dirname, 'src/Stores')}/`,
      '@Utils/': `${path.resolve(__dirname, 'src/Utils')}/`,
    }
  },
  plugins: [vue()],
})
