---
title: Alert | V-Element
description: Alert 组件的文档
---

# Alert 提示

用于页面中展示重要提示信息，支持不同状态、明暗主题、图标、居中和关闭操作。

## 基础用法

通过 **title** 设置标题，通过 **content** 设置描述内容；使用 **type** 可以切换提示类型，支持 **primary / success / warning / danger / info**。
<preview path="../demo/Alert/Basic.vue"></preview>

## 可关闭

设置 **closable** 属性后会显示关闭按钮，点击后隐藏提示并触发 **close** 事件。
<preview path="../demo/Alert/Close.vue"></preview>

## 设置主题

使用 **effect** 设置主题，支持 **light / dark**，默认是light。
<preview path="../demo/Alert/Theme.vue"></preview>

## 设置图标

使用 **icon** 控制是否显示状态图标提高可读性。
<preview path="../demo/Alert/ShowIcon.vue"></preview>

## 居中展示

使用**center**属性实现**title** 和 **content** 内容居中。
<preview path="../demo/Alert/Center.vue"></preview>

## API

### Attributes

| 属性名   | 说明             | 类型                                              | 默认值    |
| -------- | ---------------- | ------------------------------------------------- | --------- |
| title    | 标题文本         | `string`                                          | —         |
| type     | 提示类型         | `primary \| success \| warning \| danger \| info` | `primary` |
| content  | 描述内容         | `string`                                          | —         |
| closable | 是否可关闭       | `boolean`                                         | `false`   |
| center   | 文字是否居中     | `boolean`                                         | `false`   |
| icon     | 是否显示类型图标 | `boolean`                                         | `true`    |
| effect   | 主题样式         | `dark \| light`                                   | `light`   |

### Events

| 事件名 | 说明              | 回调参数 |
| ------ | ----------------- | -------- |
| close  | 关闭 Alert 时触发 | —        |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| title   | 自定义标题内容 |
| content | 自定义描述内容 |

### Exposes

| 方法名 | 说明                                | 参数 |
| ------ | ----------------------------------- | ---- |
| close  | 手动关闭 Alert，并触发 `close` 事件 | —    |
