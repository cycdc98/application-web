import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  server: {
    https: true
  },
  plugins: [
    vue(),
    basicSsl({
      certDir: './.devServer/cert',
    }),
  ],
  resolve: {
    alias: {
    }
  }
})