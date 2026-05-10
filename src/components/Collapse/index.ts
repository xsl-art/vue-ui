import type { App } from "vue";
import Collspse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";

Collspse.install = (app: App) => {
  app.component(Collspse.name!, Collspse);
};

CollapseItem.install = (app: App) => {
  app.component(CollapseItem.name!, CollapseItem);
};

export default Collspse;

export { CollapseItem };

export * from "./types";
