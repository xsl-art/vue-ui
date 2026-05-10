---
title: Form | V-Element
description: Form 组件的文档
---

# Form 表单

由输入框、选择器、按钮等控件组成，用于收集、校验和提交数据。当前 Form 基于 `async-validator` 实现字段校验。

## 基础用法

使用 **model** 传入表单数据对象，使用 **rules** 定义字段校验规则。通过 **FormItem** 的 **prop** 关联字段，表单实例提供 **validate**、**resetFields** 和 **clearValidate** 方法，支持原生input校验。

<preview path="../demo/Form/Basic.vue" title="基础表单" description="Form 基础校验用法"></preview>

## 切换**Label**位置

使用 **labelPosition**切换label的显示位置，有上左右三种选择。
<preview path="../demo/Form/ChangePosition.vue" title="基础表单" description="切换Form label显示位置"></preview>

## API

### Form Attributes

| 属性名 | 说明         | 类型                  | 默认值 |
| ------ | ------------ | --------------------- | ------ |
| model  | 表单数据对象 | `Record<string, any>` | —      |
| rules  | 表单校验规则 | `FormRules`           | —      |

### Form Exposes

| 方法名        | 说明                                                                  | 参数                 |
| ------------- | --------------------------------------------------------------------- | -------------------- |
| validate      | 对整个表单进行校验，校验通过时 resolve `true`，失败时 reject 错误字段 | —                    |
| resetFields   | 重置全部或指定字段的值和校验状态                                      | `(props?: string[])` |
| clearValidate | 清除全部或指定字段的校验状态                                          | `(props?: string[])` |

### FormItem Attributes

| 属性名 | 说明                                         | 类型     | 默认值 |
| ------ | -------------------------------------------- | -------- | ------ |
| label  | 标签文本                                     | `string` | —      |
| prop   | 表单字段名，对应 `model` 和 `rules` 中的字段 | `string` | —      |

### FormItem Slots

| 插槽名  | 说明           | 插槽参数       |
| ------- | -------------- | -------------- |
| default | 表单项内容     | `{ validate }` |
| label   | 自定义标签内容 | `{ label }`    |

### FormItem Exposes

| 方法名 / 属性名 | 说明                       | 参数                 |
| --------------- | -------------------------- | -------------------- |
| validateStatus  | 当前表单项校验状态         | —                    |
| validate        | 校验当前表单项             | `(trigger?: string)` |
| resetField      | 重置当前字段的值和校验状态 | —                    |
| clearValidate   | 清除当前字段的校验状态     | —                    |

### FormRules

校验规则兼容 `async-validator`，并额外支持 **trigger** 配置触发时机。

| 字段名  | 说明                                           | 类型     |
| ------- | ---------------------------------------------- | -------- |
| trigger | 触发校验的时机，例如 `blur`、`change`、`input` | `string` |
