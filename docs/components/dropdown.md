---
title: Dropdown | V-Element
description: Dropdown 组件的文档
---

# Dropdown 下拉菜单

将操作集合收纳到下拉菜单中，常用于更多操作、命令菜单等场景。Dropdown 基于 Tooltip 定位能力实现，因此支持部分 Tooltip 的触发方式和定位属性。

## 基础用法

通过 **menu-options** 传入菜单项列表，默认插槽作为触发元素，可以传入渲染函数来创建子项。点击菜单项后会触发 **select** 事件。
<preview path="../demo/Dropdown/Base.vue" title="Dropdown基础使用" description="配置菜单列表和select事件"></preview>

## 禁用与分割线

菜单项支持 **disabled** 禁用状态；设置 **divided** 可以在菜单项前展示分割线。
<preview path="../demo/Dropdown/DisDiv.vue" title="Dropdown基础使用" description="禁用子项和设置分割线"></preview>

## 触发方式和位置

通过 **trigger** 设置触发方式，支持 **hover / click**；通过 **placement** 设置弹出位置。
<preview path="../demo/Dropdown/TriggerStyle.vue" title="Dropdown基础使用" description="触发方式和位置"></preview>

## 设置延时打开关闭下拉菜单

通过 **openDelay** 设置打开延时ms数，**closeDelay** 设置关闭ms数，默认是0。
<preview path="../demo/Dropdown/Delay.vue" title="Dropdown基础使用" description="延时触发"></preview>

## 手动触发

支持跟Tooltip组件一样通过 **manual** 手动触发。
<preview path="../demo/Dropdown/Manual.vue" title="Dropdown基础使用" description="手动触发"></preview>

## API

### Attributes

| 属性名           | 说明                                         | 类型               | 默认值   |
| ---------------- | -------------------------------------------- | ------------------ | -------- |
| menu-options     | 菜单项列表                                   | `MenuOption[]`     | —        |
| hide-after-click | 点击菜单项后是否隐藏下拉菜单                 | `boolean`          | `true`   |
| content          | 弹出内容，继承自 Tooltip，通常由菜单内部使用 | `string`           | —        |
| trigger          | 触发方式                                     | `hover \| click`   | `click`  |
| placement        | 弹出位置                                     | `Placement`        | `bottom` |
| manual           | 是否手动控制显示隐藏                         | `boolean`          | `false`  |
| popper-options   | Popper.js 配置                               | `Partial<Options>` | —        |
| transition       | 过渡动画名                                   | `string`           | `fade`   |
| open-delay       | 延迟打开时间，单位毫秒                       | `number`           | `0`      |
| close-delay      | 延迟关闭时间，单位毫秒                       | `number`           | `0`      |

### MenuOption

| 字段名   | 说明                   | 类型               | 默认值  |
| -------- | ---------------------- | ------------------ | ------- |
| label    | 菜单项显示内容         | `string \| VNode`  | —       |
| key      | 菜单项唯一标识         | `string \| number` | —       |
| disabled | 是否禁用该菜单项       | `boolean`          | `false` |
| divided  | 是否在该项前显示分割线 | `boolean`          | `false` |

### Events

| 事件名         | 说明                       | 回调参数               |
| -------------- | -------------------------- | ---------------------- |
| visible-change | 下拉菜单显示状态变化时触发 | `(visible: boolean)`   |
| select         | 点击可用菜单项时触发       | `(option: MenuOption)` |

### Slots

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 下拉菜单触发元素 |

### Exposes

| 方法名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| show   | 手动显示下拉菜单 | —    |
| hide   | 手动隐藏下拉菜单 | —    |
