---
title: Collapse | V-Element
description: Collapse 组件的文档
---

# Collapse 折叠面板

通过折叠面板收纳内容区域，适用于展示大量可分组信息。

## 基础用法

使用 **v-model** 绑定当前展开项的 **name** 数组，在 **CollapseItem** 中通过 **name** 设置唯一标识，通过 **title** 设置面板标题。
<preview path="../demo/Collapse/Base.vue" title="Collapse基础使用" description="基本结构使用"></preview>

## 手风琴模式

设置 **accordion** 属性后，每次只能展开一个面板。
<preview path="../demo/Collapse/Accordion.vue" title="Collapse基础使用" description="手风琴模式使用"></preview>

## 禁用状态

在 **CollapseItem** 上设置 **disabled** 可以禁用某个面板项，禁用后不可点击展开或收起。
<preview path="../demo/Collapse/Disabled.vue" title="Collapse基础使用" description="禁用子项"></preview>

## API

### Collapse Attributes

| 属性名                | 说明                     | 类型                      | 默认值  |
| --------------------- | ------------------------ | ------------------------- | ------- |
| model-value / v-model | 当前展开项的 `name` 数组 | `Array<string \| number>` | —       |
| accordion             | 是否开启手风琴模式       | `boolean`                 | `false` |

### Collapse Events

| 事件名            | 说明                             | 回调参数                           |
| ----------------- | -------------------------------- | ---------------------------------- |
| update:modelValue | 展开项变化时触发，用于 `v-model` | `(value: Array<string \| number>)` |
| change            | 展开项变化时触发                 | `(value: Array<string \| number>)` |

### Collapse Slots

| 插槽名  | 说明              |
| ------- | ----------------- |
| default | CollapseItem 列表 |

### CollapseItem Attributes

| 属性名   | 说明           | 类型               | 默认值  |
| -------- | -------------- | ------------------ | ------- |
| name     | 面板项唯一标识 | `string \| number` | —       |
| title    | 面板项标题     | `string`           | —       |
| disabled | 是否禁用面板项 | `boolean`          | `false` |

### CollapseItem Slots

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 面板项内容       |
| title   | 自定义面板项标题 |
