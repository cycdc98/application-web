import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import fs from "node:fs";
import PageHtml from "vite-plugin-page-html";
import devtoolsJson from 'vite-plugin-devtools-json';
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

export default ({ command }) => {
  console.log(command);
  return defineConfig({
    plugins: [
      devtoolsJson(),
      PageHtml({
        title: pkg.name
      }),
      vue(),
      Components({
        resolvers: [ElementUiResolver()],
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: false
      })
    ],
  });
};
