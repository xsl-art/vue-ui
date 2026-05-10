---
title: Select | V-Element
description: Select 组件的文档
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容，支持清空、禁用选项、过滤、自定义渲染和远程搜索。

## 基础用法

使用 **v-model** 绑定当前选中的值，通过 **options** 传入选项列表。

<preview path="../demo/Select/Basic.vue" title="基础选择器" description="Select 基础用例"></preview>

## 可过滤

设置 **filterable** 属性后，可以根据输入内容过滤选项。

<preview path="../demo/Select/Filter.vue" title="可过滤选择器" description="Select 本地过滤"></preview>

## 自定义选项渲染

通过 **render-label** 传入渲染函数，可以自定义每一项的显示内容。

<preview path="../demo/Select/CustomRender.vue" title="自定义选项渲染" description="Select 自定义选项内容"></preview>

## 远程搜索

同时设置 **filterable**、**remote** 和 **remote-method**，可以在输入时异步获取选项。

<preview path="../demo/Select/Remote.vue" title="远程搜索" description="Select 远程搜索用法"></preview>

## 多选功能

通过设置**multiple**属性开启多选功能，显示框内容以Tag标签展示。
<preview path="../demo/Select/Multiple.vue" title="远程搜索" description="Select 远程搜索用法"></preview>

## API

### Attributes

| 属性名                | 说明               | 类型                                         | 默认值  |
| --------------------- | ------------------ | -------------------------------------------- | ------- |
| model-value / v-model | 绑定值             | `string`                                     | —       |
| options               | 选项列表           | `SelectOption[]`                             | `[]`    |
| placeholder           | 占位文本           | `string`                                     | —       |
| disabled              | 是否禁用           | `boolean`                                    | `false` |
| clearable             | 是否可以清空       | `boolean`                                    | `false` |
| render-label          | 自定义选项渲染函数 | `(option: SelectOption) => VNode`            | —       |
| filterable            | 是否可过滤         | `boolean`                                    | `false` |
| filter-method         | 自定义本地过滤方法 | `(value: string) => SelectOption[]`          | —       |
| remote                | 是否启用远程搜索   | `boolean`                                    | `false` |
| remote-method         | 远程搜索方法       | `(value: string) => Promise<SelectOption[]>` | —       |
| multiple              | 多选模式           | `boolean`                                    | `false` |

—

### SelectOption

| 字段名   | 说明           | 类型      | 默认值  |
| -------- | -------------- | --------- | ------- |
| label    | 选项显示文本   | `string`  | —       |
| value    | 选项绑定值     | `string`  | —       |
| disabled | 是否禁用该选项 | `boolean` | `false` |

### Events

| 事件名         | 说明                     | 回调参数             |
| -------------- | ------------------------ | -------------------- |
| change         | 选中值变化时触发         | `(value: string)`    |
| visible-change | 下拉框显示状态变化时触发 | `(visible: boolean)` |
| clear          | 点击清空按钮时触发       | —                    |
