import { defineConfig } from "vite";
import path from "path";

export default () => {
  return defineConfig({
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "BehaviorAnalysis",
        fileName: (format) => `behavior-analysis.${format}.js`,
        formats: ["umd", "cjs", "es"],
      },
    },
  });
};
