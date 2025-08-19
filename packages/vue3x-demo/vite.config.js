import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  server: {
    https: true
  },
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        { src: 'node_modules/@vladmandic/face-api/model/', dest: '' },
      ]
    }),
    basicSsl({
      certDir: './.devServer/cert',
    }),
  ],
  resolve: {
    alias: {
    }
  }
})