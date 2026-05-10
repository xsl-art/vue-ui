---
title: Tag | V-Element
description: Tag 组件的文档
---

# Tag 标签

用于标记和分类内容，支持不同类型、主题、尺寸、圆角、禁用和关闭操作。

## 基础用法

通过 **type** 属性设置标签类型，支持 **primary / success / warning / danger / info**。

<preview path="../demo/Tag/Basic.vue" title="基础标签" description="Tag 基础用例"></preview>

## 不同主题

通过 **effect** 设置主题，支持 **light / dark / plain**，默认是 **light**。

<preview path="../demo/Tag/Effect.vue" title="不同主题" description="Tag 主题用法"></preview>

## 不同尺寸

通过 **size** 设置标签尺寸，支持 **large / small / mini**，默认是 **small**。

<preview path="../demo/Tag/Size.vue" title="不同尺寸" description="Tag 尺寸用法"></preview>

## 可关闭标签

设置 **closable** 属性后会展示关闭图标，点击关闭图标后隐藏标签并触发 **close** 事件。设置 **disabled** 后关闭操作不会生效。

<preview path="../demo/Tag/Closable.vue" title="可关闭标签" description="Tag 关闭和禁用用法"></preview>

## API

### Attributes

| 属性名   | 说明             | 类型                                              | 默认值    |
| -------- | ---------------- | ------------------------------------------------- | --------- |
| type     | 标签类型         | `primary \| success \| warning \| danger \| info` | `primary` |
| closable | 是否可关闭       | `boolean`                                         | `false`   |
| effect   | 主题样式         | `dark \| light \| plain`                         | `light`   |
| size     | 标签尺寸         | `large \| small \| mini`                         | `small`   |
| round    | 是否为圆角标签   | `boolean`                                         | `false`   |
| disabled | 是否禁用关闭操作 | `boolean`                                         | `false`   |

### Events

| 事件名 | 说明              | 回调参数 |
| ------ | ----------------- | -------- |
| close  | 关闭 Tag 时触发   | —        |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 标签内容 |

### Exposes

| 方法名 | 说明                                | 参数 |
| ------ | ----------------------------------- | ---- |
| close  | 手动关闭 Tag，并触发 `close` 事件   | —    |
