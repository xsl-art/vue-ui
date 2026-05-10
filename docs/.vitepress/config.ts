import { defineConfig } from "vitepress";
import { fileURLToPath } from "node:url";
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin";
const srcDir = fileURLToPath(new URL("../../src", import.meta.url));
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Ui",
  description: "A Vue3 component library",
  vite: {
    resolve: {
      alias: {
        "@": srcDir,
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/use-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [{ text: "基本使用", link: "/use-examples" }],
      },
      {
        text: "Basic",
        items: [
          { text: "Alert 提示", link: "/components/alert" },
          { text: "Button 按钮", link: "/components/button" },
          { text: "Collapse 折叠面板", link: "/components/collapse" },
          { text: "Dialog 对话框", link: "/components/dialog" },
          { text: "Dropdown 下拉菜单", link: "/components/dropdown" },
          { text: "Form 表单", link: "/components/form" },
          { text: "Icon 图标", link: "/components/icon" },
          { text: "Input 输入框", link: "/components/input" },
          { text: "Message 消息提示", link: "/components/message" },
          { text: "Select 选择器", link: "/components/select" },
          { text: "Switch 开关", link: "/components/switch" },
          { text: "Tag 标签", link: "/components/tag" },
          { text: "Tooltip 文字提示", link: "/components/tooltip" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
