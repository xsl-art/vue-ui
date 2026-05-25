import type { App } from "vue";
import Message from "./Message.vue";
import { createMessage, closeAll, message } from "./methods";

Message.install = (app: App) => {
  app.component(Message.name!, Message);
};

export default Message;
export { createMessage, closeAll, message };
export * from "./types";
