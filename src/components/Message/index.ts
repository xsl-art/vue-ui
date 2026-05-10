import type { App } from "vue";
import Message from "./Message.vue";
import { createMessage, closeAll } from "./methods";

Message.install = (app: App) => {
  app.component(Message.name!, Message);
};

export default Message;
export { createMessage, closeAll };
export * from "./types";
