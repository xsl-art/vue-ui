import type { App } from "vue";
import Input from "./Input.vue";
import Icon from "../Icon/Icon.vue";

Input.install = (app: App) => {
  app.component(Icon.name!, Icon);
};

export default Icon;
export * from "./types";
