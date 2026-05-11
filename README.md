# Vue-Ui

Vue-Ui 是一个基于 **Vue 3 + TypeScript + Vite** 构建的轻量级组件库，参考 Element Plus 的组件设计方式，聚焦个人项目和中后台场景中高频使用的基础组件。

项目不仅包含组件实现代码，还配套了组件文档、交互示例、类型声明、单元测试和多格式构建配置，适合作为学习 Vue 3 组件库开发、沉淀业务组件或搭建个人 UI 库的实践项目。

## 项目特点

- **Vue 3 Composition API**：组件全部基于 Vue 3 组合式 API 开发，结构清晰，易于维护和扩展。
- **TypeScript 类型支持**：组件 Props、事件、实例方法等均提供类型约束，提升开发体验。
- **常用组件覆盖**：内置按钮、输入框、表单、弹窗、下拉、提示、选择器等常见 UI 组件。
- **支持全局注册与按需引入**：既可以一次性注册完整组件库，也可以按需导入单个组件。
- **ESM / UMD 双格式构建**：同时输出适用于现代构建工具和浏览器直接引入的产物。
- **独立样式产物**：组件样式统一打包为 CSS，便于在应用中统一引入。
- **VitePress 文档站**：提供组件说明、API 表格和可交互 Demo，方便查看和调试组件效果。
- **Vitest 单元测试**：引入测试体系，保障核心组件行为稳定可靠。
- **表单校验能力**：基于 `async-validator` 实现表单规则校验，适合中后台表单场景。
- **浮层定位能力**：基于 `@popperjs/core` 支持 Tooltip、Dropdown 等浮层组件定位。
- **图标组件集成**：集成 Font Awesome Vue 组件，方便在业务中使用图标能力。

## 组件列表

目前项目包含以下基础组件：

- `Alert` 提示
- `Button` 按钮
- `Collapse` 折叠面板
- `Dialog` 对话框
- `Dropdown` 下拉菜单
- `Form` 表单
- `FormItem` 表单项
- `Icon` 图标
- `Input` 输入框
- `Message` 消息提示
- `Select` 选择器
- `Switch` 开关
- `Tag` 标签
- `Tooltip` 文字提示

## 技术栈

- Vue 3
- TypeScript
- Vite
- VitePress
- Vitest
- Sass
- async-validator
- @popperjs/core
- Font Awesome

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
pnpm dev
```

### 启动文档站

```bash
pnpm run docs:dev
```

### 测试并构建组件库

```bash
pnpm lint
pnpm test
pnpm build
```

构建后会生成：

- `dist/es`：ES Module 产物
- `dist/umd`：UMD 产物
- `dist/types`：TypeScript 类型声明
- `dist/style.css`：组件库样式文件

### 本地基础测试和验证

```bash
pnpm pack
pnpm create vite test-my-vue-ui --template vue-ts
cd test-my-vue-ui
pnpm install
pnpm add ../my-vue-ui/my-vue-ui-0.1.0.tgz
```

引入样式和在main.ts文件中进行注册使用，并验证全局注册和按需导入是否正常。

## 使用方式

### 全局注册

```ts
import { createApp } from "vue";
import VueUi from "vue-ui";
import "vue-ui/style.css";
import App from "./App.vue";

createApp(App).use(VueUi).mount("#app");
```

### 按需引入

```ts
import { Button, Input } from "vue-ui";
import "vue-ui/style.css";
```

```vue
<template>
  <Button type="primary">确认</Button>
  <Input v-model="value" placeholder="请输入内容" />
</template>
```

## 文档说明

项目使用 VitePress 搭建组件文档，文档中包含：

- 组件基础用法
- 组件不同状态示例
- Props / Events / Slots API 说明
- 可预览的组件 Demo

已配置的文档组件包括 Alert、Button、Collapse、Dialog、Dropdown、Form、Icon、Input、Message、Select、Switch、Tooltip 等。

## 适用场景

该项目适合用于：

- 学习 Vue 3 组件库设计与封装
- 了解组件库打包、类型声明和文档站搭建流程
- 作为个人项目或中后台项目的基础 UI 组件库
- 在业务项目中二次封装和扩展通用组件

## 项目定位

Vue-Ui 更偏向一个轻量、易读、可扩展的组件库实践项目。没有完全复刻完整的组件功能，主要学习了在原生组件的基础上进行封装样式功能，设计属性、事件、插槽等内容，从0到1搭建一个基本的组件雏形，统一进行install和单元测试，在vitepress文档中书写其基本的用法。在此项目基础上还能再进行已有组件功能的扩展和其他混合组件的开发。
