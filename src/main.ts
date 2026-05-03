import { createApp } from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
createApp(App).mount("#app");
