# 使用教程

本页介绍如何在 Vue 3 项目中安装、注册和使用 `Vue-Ui` 组件库，并提供常见组件的基础示例，方便你快速完成接入和验证。

## 快速开始

`Vue-Ui` 是一个基于 **Vue 3 + TypeScript** 开发的轻量级组件库，支持全局注册和按需引入两种使用方式。组件样式已统一打包为独立 CSS 文件，使用组件前需要在入口文件中引入样式。

## 环境要求

建议在以下环境中使用：

- Node.js 18+
- Vue 3
- TypeScript 5+
- Vite 5+
- pnpm / npm / yarn 任一包管理器

## 安装

如果组件库已经发布到 npm，可以直接安装：

```bash
npm install vue-ui
```

或使用 pnpm：

```bash
pnpm add vue-ui
```

如果是在本地开发阶段验证组件库，可以先在组件库项目中执行打包和本地打包命令：

```bash
pnpm build
pnpm pack
```

然后在测试项目中安装生成的 `.tgz` 文件：

```bash
pnpm add ../vue-ui/vue-ui-0.1.0.tgz
```

> 实际文件名以 `pnpm pack` 输出的包名和版本号为准。

## 全局注册

如果项目中会大量使用组件，可以在入口文件中一次性注册完整组件库。

```main.ts
import { createApp } from "vue";
import VueUi from "vue-ui";
import "vue-ui/style.css";
import App from "./App.vue";

createApp(App).use(VueUi).mount("#app");
```

注册完成后，可以在任意组件中直接使用组件库提供的组件：

```vue
<template>
  <Button type="primary">主要按钮</Button>
  <Input v-model="keyword" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const keyword = ref("");
</script>
```

## 按需引入

如果只使用部分组件，可以按需导入指定组件。按需引入有利于减少业务代码中无关组件的使用成本。

```vue
<template>
  <Button type="primary" @click="handleClick">提交</Button>
  <Switch v-model="enabled" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button, Switch } from "vue-ui";
import "vue-ui/style.css";

const enabled = ref(false);

const handleClick = () => {
  console.log("submit");
};
</script>
```

> 当前样式为统一样式入口，按需引入组件时仍建议引入 `vue-ui/style.css`。

## 在 Vite 项目中使用

以下是一个完整的 Vite + Vue 3 项目入口示例：

```ts
import { createApp } from "vue";
import VueUi from "vue-ui";
import "vue-ui/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(VueUi);
app.mount("#app");
```

如果你希望单独注册某些组件，也可以这样写：

```ts
import { createApp } from "vue";
import { Button, Input, Select } from "vue-ui";
import "vue-ui/style.css";
import App from "./App.vue";

const app = createApp(App);

app.component("Button", Button);
app.component("Input", Input);
app.component("Select", Select);

app.mount("#app");
```

## 类型支持

组件库导出了各组件的 TypeScript 类型声明。使用 TypeScript 项目时，编辑器可以自动获得组件属性、事件和方法的类型提示。

```ts
import type { ButtonProps, InputProps } from "vue-ui";
```

具体类型名称以组件目录中导出的类型为准。

## 本地开发验证流程

如果你正在开发组件库本身，可以按下面流程验证构建产物是否能在业务项目中正常使用：

1. 在组件库项目中安装依赖：

```bash
pnpm install
```

2. 构建组件库：

```bash
pnpm build
```

3. 生成本地安装包：

```bash
pnpm pack
```

4. 创建或进入测试项目并安装本地包：

```bash
pnpm create vite test-my-vue-ui --template vue-ts
cd test-my-vue-ui
pnpm install
pnpm add ../vue-ui/vue-ui-0.1.0.tgz
```

5. 在测试项目的 `main.ts` 中引入组件库和样式：

```ts
import { createApp } from "vue";
import VueUi from "vue-ui";
import "vue-ui/style.css";
import App from "./App.vue";

createApp(App).use(VueUi).mount("#app");
```

6. 在页面中添加组件示例，运行项目验证：

```bash
pnpm dev
```

## 常见问题

### 组件样式没有生效

请确认已经在入口文件中引入样式文件：

```ts
import "vue-ui/style.css";
```

### 全局注册后组件无法识别

请检查是否已经执行 `app.use(VueUi)`，并确认组件库包名和安装路径正确。

### Message 方法调用没有类型提示

请确认使用的是从组件库入口导出的 `createMessage` 和 `closeMessageAll` 方法：

```ts
import { createMessage, closeMessageAll } from "vue-ui";
```

### 本地安装包失败

请确认 `.tgz` 文件路径正确，并且组件库已经完成构建和打包。可以重新执行：

```bash
pnpm build
pnpm pack
```

## 更多示例

每个组件都有独立的文档页面和可交互 Demo。你可以在左侧组件菜单中查看对应组件的基础用法、不同状态、Props、Events 和 Slots 说明。
