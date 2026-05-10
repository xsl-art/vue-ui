---
title: Dialog | V-Element
description: Dialog 组件的文档
---

# Dialog 对话框

在保留当前页面状态的情况下，弹出一个覆盖层承载重要信息、表单或确认操作。

## 基础用法

使用 **v-model** 控制对话框显示状态，通过 **title** 设置标题。默认内容通过默认插槽传入，底部操作区可通过 **footer** 插槽传入。
<preview path="../demo/Dialog/Base.vue" title="Dialog基础使用" description="基本结构使用"></preview>

## 自定义头部和底部

通过 **header** 插槽自定义标题区域，通过 **footer** 插槽自定义底部按钮区域。
<preview path="../demo/Dialog/SelfDefine.vue" title="Dialog基础使用" description="自定义内容"></preview>

## 居中

设置 **align-center** 可以让对话框在遮罩中垂直水平居中。
<preview path="../demo/Dialog/Center.vue" title="Dialog基础使用" description="居中展示"></preview>

## 全屏

设置 **fullscreen** 可以展示全屏对话框。
<preview path="../demo/Dialog/FullScreen.vue" title="Dialog基础使用" description="全屏展示"></preview>

## 可拖拽

设置 **draggable** 可以实现对话框拖拽。
<preview path="../demo/Dialog/Draggable.vue" title="Dialog基础使用" description="对话框拖拽"></preview>

## 关闭行为

可以通过 **close-on-click-modal**、**close-on-press-escape**、**show-close** 控制遮罩点击、Esc 按键和右上角关闭按钮行为。

## API

### Attributes

| 属性名                | 说明                                       | 类型      | 默认值  |
| --------------------- | ------------------------------------------ | --------- | ------- |
| model-value / v-model | 是否显示对话框                             | `boolean` | —       |
| title                 | 标题文本                                   | `string`  | —       |
| width                 | 对话框宽度                                 | `string`  | `50%`   |
| fullscreen            | 是否全屏显示                               | `boolean` | `false` |
| top                   | 对话框距离顶部的距离，非全屏且非居中时生效 | `string`  | `15vh`  |
| modal                 | 是否显示遮罩                               | `boolean` | `true`  |
| modal-class           | 遮罩自定义 class                           | `string`  | —       |
| append-to-body        | 是否挂载到 `body`                          | `boolean` | `true`  |
| lock-scroll           | 是否锁定 body 滚动                         | `boolean` | `true`  |
| close-on-click-modal  | 是否可以通过点击遮罩关闭                   | `boolean` | `true`  |
| close-on-press-escape | 是否可以通过按下 Esc 关闭                  | `boolean` | `true`  |
| show-close            | 是否显示右上角关闭按钮                     | `boolean` | `true`  |
| destroy-on-close      | 关闭后是否销毁默认插槽内容                 | `boolean` | `false` |
| align-center          | 是否垂直水平居中                           | `boolean` | `false` |
| dialog-class          | 对话框自定义 class                         | `string`  | —       |
| z-index               | 自定义层级                                 | `number`  | —       |

### Events

| 事件名            | 说明                               | 回调参数           |
| ----------------- | ---------------------------------- | ------------------ |
| update:modelValue | 显示状态变化时触发，用于 `v-model` | `(value: boolean)` |
| open              | Dialog 打开时触发                  | —                  |
| opened            | Dialog 打开动画结束后触发          | —                  |
| close             | Dialog 请求关闭时触发              | —                  |
| closed            | Dialog 关闭动画结束后触发          | —                  |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 对话框主体内容 |
| header  | 自定义头部内容 |
| footer  | 自定义底部内容 |

### Exposes

| 方法名 | 说明            | 参数 |
| ------ | --------------- | ---- |
| open   | 手动打开 Dialog | —    |
| close  | 手动关闭 Dialog | —    |
