import type { App } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Alert from "./components/Alert/Alert.vue";
import Dropdown from "./components/Dropdown/Dropdown.vue";
import Form, { FormItem } from "./components/Form";
import Icon from "./components/Icon/Icon.vue";
import Input from "./components/Input/Input.vue";
import Select from "./components/Select/Select.vue";
import Switch from "./components/Switch/Switch.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Button from "./components/Button/Button.vue";
import Collapse, { CollapseItem } from "./components/Collapse";
import Message, { createMessage, closeAll as closeMessageAll } from "./components/Message";
import Dialog from "./components/Dialog";
import Tag from "./components/Tag";
import "@/styles/index.scss";

library.add(fas);

const components = [
  Alert,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Input,
  Select,
  Switch,
  Tooltip,
  Button,
  Collapse,
  CollapseItem,
  Message,
  Dialog,
  Tag,
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export {
  install,
  Alert,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Input,
  Select,
  Switch,
  Tooltip,
  Button,
  Collapse,
  CollapseItem,
  Message,
  createMessage,
  closeMessageAll,
  Dialog,
  Tag,
};

export type * from "./components/Alert";
export type * from "./components/Button";
export type * from "./components/Collapse";
export type * from "./components/Dialog";
export type * from "./components/Dropdown";
export type * from "./components/Form";
export type * from "./components/Icon";
export type * from "./components/Input";
export type * from "./components/Message";
export type * from "./components/Select";
export type * from "./components/Switch";
export type * from "./components/Tag";
export type * from "./components/Tooltip";

//全局导入使用插件
export default {
  install,
};
