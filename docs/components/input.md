---
title: Input | V-Element
description: Input 组件的文档
---

# Input 输入框

通过鼠标或键盘输入字符，支持基础输入、禁用、清空、密码切换、不同尺寸、复合输入框以及文本域。

## 基础用法

使用 **v-model** 绑定输入框的值，使用 **placeholder** 设置占位文本。

<preview path="../demo/Input/Basic.vue" title="基础输入框" description="Input 基础用例"></preview>

## 禁用状态

设置 **disabled** 属性即可禁用输入框。

<preview path="../demo/Input/Disable.vue" title="禁用状态" description="Input 禁用状态"></preview>

## 一键清空

设置 **clearable** 属性后，输入框聚焦且有内容时会展示清空按钮。

<preview path="../demo/Input/Clear.vue" title="一键清空" description="Input 支持清空内容"></preview>

## 密码框

设置 **show-password** 属性后，输入框会展示密码显隐切换按钮。

<preview path="../demo/Input/Password.vue" title="密码框" description="Input 密码显隐切换"></preview>

## 不同尺寸

设置 **size** 属性，支持 **large / small** 两种尺寸。不设置时使用默认尺寸。

<preview path="../demo/Input/Size.vue" title="不同尺寸" description="Input 不同尺寸"></preview>

## 复合型输入框

使用 **prepend**、**append**、**prefix**、**suffix** 插槽可以组合前置、后置、前缀和后缀内容。

<preview path="../demo/Input/Combo.vue" title="复合型输入框" description="Input 复合插槽用法"></preview>

## 文本域

设置 **type="textarea"** 可以展示文本域，使用 **rows** 可以设置文本域的可见行数。

<preview path="../demo/Input/Textarea.vue" title="文本域" description="Input 文本域用法"></preview>

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string` | — |
| type | 输入框类型 | `string` | `text` |
| size | 输入框尺寸 | `large \| small` | — |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| show-password | 是否显示密码切换按钮 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| placeholder | 占位文本 | `string` | — |
| readonly | 原生 readonly 属性 | `boolean` | `false` |
| autocomplete | 原生 autocomplete 属性 | `string` | `off` |
| autofocus | 原生 autofocus 属性 | `boolean` | `false` |
| form | 原生 form 属性 | `string` | — |
| rows | textarea 可见行数，仅在 `type="textarea"` 时生效 | `number` | `2` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 输入值变化时触发 | `(value: string)` |
| change | 输入值改变且失焦后触发 | `(value: string)` |
| focus | 获取焦点时触发 | `(event: FocusEvent)` |
| blur | 失去焦点时触发 | `(event: FocusEvent)` |
| clear | 点击清空按钮时触发 | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
