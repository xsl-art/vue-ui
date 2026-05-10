/// <reference types="vite/client" />

//typescript声明文件
//主要作用是为 Vite 项目中的非 TypeScript 资源提供类型支持，
// 确保在 .ts 或 .vue 文件中导入这些资源时不会报错，并能获得正确的类型提示。
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const content: string;
  export default content;
}
