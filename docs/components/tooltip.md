---
title: Tooltip | V-Element
description: Tooltip 组件的文档
---

# Tooltip 文字提示

常用于鼠标悬停或点击元素时展示补充信息，基于 Popper.js 完成弹层定位。

## 基础用法

使用默认插槽传入触发元素，通过 **content** 设置提示内容。
<preview path="../demo/Tooltip/triggerElement.vue" title="tooltip触发元素" description="传入触发元素"></preview>

## 触发方式

通过 **trigger** 设置触发方式，支持 **hover** 和 **click**，默认是click。
<preview path="../demo/Tooltip/triggerStyle.vue" title="tooltip触发方式" description="触发方式"></preview>

## 弹出位置

通过 **placement** 设置提示框位置，支持 Popper.js 的 Placement 类型，例如 **top**、**bottom**、**left**、**right** 及其 start / end 变体。
<preview path="../demo/Tooltip/triggerDirection.vue" title="tooltip触发方向" description="触发方向"></preview>

## 手动控制

设置 **manual** 后组件不会自动绑定触发事件，可以通过组件实例暴露的 **show** 和 **hide** 方法控制显示隐藏。
<preview path="../demo/Tooltip/ManualControl.vue" title="tooltip手动触发" description="手动触发"></preview>

## API

### Attributes

| 属性名         | 说明                   | 类型               | 默认值   |
| -------------- | ---------------------- | ------------------ | -------- |
| content        | 提示内容               | `string`           | —        |
| trigger        | 触发方式               | `hover \| click`   | `click`  |
| placement      | 弹出位置               | `Placement`        | `bottom` |
| manual         | 是否手动控制显示隐藏   | `boolean`          | `false`  |
| popper-options | Popper.js 配置项       | `Partial<Options>` | —        |
| transition     | 过渡动画名             | `string`           | `fade`   |
| open-delay     | 延迟打开时间，单位毫秒 | `number`           | `0`      |
| close-delay    | 延迟关闭时间，单位毫秒 | `number`           | `0`      |

### Events

| 事件名         | 说明                       | 回调参数             |
| -------------- | -------------------------- | -------------------- |
| visible-change | Tooltip 显示状态变化时触发 | `(visible: boolean)` |
| click-outside  | 点击 Tooltip 外部时触发    | `(value: boolean)`   |

### Slots

| 插槽名  | 说明                |
| ------- | ------------------- |
| default | 触发 Tooltip 的元素 |
| content | 自定义提示内容      |

### Exposes

| 方法名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| show   | 手动显示 Tooltip | —    |
| hide   | 手动隐藏 Tooltip | —    |
