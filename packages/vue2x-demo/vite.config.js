import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import fs from "node:fs";
import PageHtml from "vite-plugin-page-html";
import devtoolsJson from 'vite-plugin-devtools-json';
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

export default () => {
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
    ],
  });
};
