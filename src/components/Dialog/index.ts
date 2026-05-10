import type { App } from "vue";
import Dialog from "./Dialog.vue";

Dialog.install = (app: App) => {
  app.component(Dialog.name!, Dialog);
};

export default Dialog;
export { Dialog };
export * from "./types";
