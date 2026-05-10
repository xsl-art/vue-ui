---
title: Icon | V-Element
description: Icon 组件的文档
---

# Icon 图标

基于 Font Awesome 封装的图标组件，支持 Font Awesome 的常用属性，并额外提供类型色和彩色样式。

## 基础用法

通过 **icon** 属性设置图标名称或 Font Awesome 图标定义。传入字符串时可直接使用已注册的图标名称。

<preview path="../demo/Icon/Basic.vue" title="基础图标" description="Icon 基础用例"></preview>

## 图标类型

通过 **type** 设置语义化类型色，支持 **primary / success / warning / danger / info**。

<preview path="../demo/Icon/Type.vue" title="图标类型" description="Icon 类型色用法"></preview>

## 自定义颜色

通过 **color** 属性可以自定义图标颜色。

<preview path="../demo/Icon/Color.vue" title="自定义颜色" description="Icon 自定义颜色用法"></preview>

## Font Awesome 属性

组件会将除 **type** 和 **color** 以外的属性透传给内部的 **FontAwesomeIcon**，因此可以使用 **size**、**spin**、**pulse**、**rotation** 等属性。

<preview path="../demo/Icon/FontAwesome.vue" title="Font Awesome 属性" description="Icon 透传 Font Awesome 属性"></preview>

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标名称、图标定义或图标数组 | `object \| Array<string> \| string \| IconDefinition` | — |
| type | 语义化类型色 | `primary \| success \| warning \| danger \| info` | — |
| color | 自定义颜色 | `string` | — |
| size | 图标尺寸 | `2xs \| xs \| sm \| lg \| xl \| 2xl \| 1x \| 2x \| 3x \| 4x \| 5x \| 6x \| 7x \| 8x \| 9x \| 10x` | — |
| border | 是否显示边框 | `boolean` | `false` |
| fixed-width | 是否固定宽度 | `boolean` | `false` |
| flip | 翻转方向 | `horizontal \| vertical \| both \| boolean` | — |
| mask | 遮罩图标 | `object \| Array<string> \| string` | — |
| mask-id | 遮罩 ID | `string` | — |
| list-item | 是否作为列表图标 | `boolean` | `false` |
| pull | 浮动方向 | `right \| left` | — |
| pulse | 是否脉冲旋转 | `boolean` | `false` |
| rotation | 旋转角度 | `90 \| 180 \| 270` | — |
| rotate-by | 是否按自定义角度旋转 | `boolean` | `false` |
| swap-opacity | 是否交换双色图标透明度 | `boolean` | `false` |
| spin | 是否旋转 | `boolean` | `false` |
| transform | 图标变换 | `object \| string` | — |
| symbol | 是否作为 symbol 输出 | `boolean \| string` | `false` |
| title | 图标标题 | `string` | — |
| title-id | 图标标题 ID | `string` | — |
| inverse | 是否反色 | `boolean` | `false` |
| bounce | 是否弹跳动画 | `boolean` | `false` |
| shake | 是否抖动动画 | `boolean` | `false` |
| beat | 是否节拍动画 | `boolean` | `false` |
| fade | 是否淡入淡出动画 | `boolean` | `false` |
| beat-fade | 是否节拍淡入淡出动画 | `boolean` | `false` |
| spin-pulse | 是否脉冲旋转动画 | `boolean` | `false` |
| spin-reverse | 是否反向旋转 | `boolean` | `false` |
| width-auto | 是否自动宽度 | `boolean` | `false` |
