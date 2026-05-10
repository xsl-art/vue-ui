---
title: Button | V-Element
description: Button 组件的文档
---

# Button 按钮

常用的操作按钮，用于触发页面中的即时操作。

## 基础用法

通过 **type** 属性设置按钮类型，支持 **primary / success / warning / danger / info**。同时可以使用 **plain**、**round**、**circle**、**loading**、**icon** 等属性控制按钮展示状态。

<preview path="../demo/Button/Basic.vue" title="基础按钮" description="Button 基础用例"></preview>

## 禁用状态

通过 **disabled** 属性设置按钮是否为禁用状态，该属性接收一个boolean值。
<preview path="../demo/Button/Disabled.vue" title="禁用按钮" description="Button 禁用用例"></preview>

## 图标按钮

通过**icon** 属性设置图标按钮，可以使用自定义图标。
<preview path="../demo/Button/IconButton.vue" title="图标按钮" description="Button 图标用例"></preview>

## 加载状态按钮

通过设置**loading**属性设置加载状态按钮，该属性接收一个boolean值。
<preview path="../demo/Button/Loading.vue" title="加载中按钮" description="Button 加载中用例"></preview>

## 设置大小

通过设置**large** 和 **small** 属性设置按钮大小。
<preview path="../demo/Button/Size.vue" title="按钮大小" description="Button 大小用例"></preview>

## API

### Attributes

| 属性名      | 说明                     | 类型                                              | 默认值   |
| ----------- | ------------------------ | ------------------------------------------------- | -------- |
| type        | 按钮类型                 | `primary \| success \| warning \| danger \| info` | —        |
| size        | 按钮尺寸                 | `large \| small`                                  | —        |
| plain       | 是否为朴素按钮           | `boolean`                                         | `false`  |
| round       | 是否为圆角按钮           | `boolean`                                         | `false`  |
| circle      | 是否为圆形按钮           | `boolean`                                         | `false`  |
| disabled    | 是否禁用按钮             | `boolean`                                         | `false`  |
| native-type | 原生 button 的 type 属性 | `button \| submit \| reset`                       | `button` |
| autofocus   | 是否自动聚焦             | `boolean`                                         | `false`  |
| icon        | 图标名称                 | `string`                                          | —        |
| loading     | 是否为加载中状态         | `boolean`                                         | `false`  |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |
