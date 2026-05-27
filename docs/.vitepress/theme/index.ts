import DefaultTheme from "vitepress/theme";
import "../../../src/icons";
import "../../icons";
// @ts-ignore: SCSS side-effect import may not have module declarations in TS
import "../../../src/styles/index.scss";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";
// @ts-ignore: CSS side-effect import may not have module declarations in TS
import "@vitepress-demo-preview/component/dist/style.css";
import type { App } from "vue";
export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
  },
};
