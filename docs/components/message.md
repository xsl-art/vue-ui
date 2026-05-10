---
title: Message | V-Element
description: Message 组件的文档
---

# Message 消息提示

用于页面顶部展示轻量级反馈信息，支持不同类型、自动关闭、手动关闭和多条堆叠显示。

## 基础用法

通过调用 **createMessage** 方法创建消息。传入 **message** 设置消息内容，传入 **type** 设置消息类型。

<preview path="../demo/Message/Base.vue" title="Message基础使用" description="设置内容和类型"></preview>

## 可关闭

设置 **showClose** 后会展示关闭按钮，用户可以手动关闭消息。
<preview path="../demo/Message/Close.vue" title="Message基础使用" description="手动关闭"></preview>

## 自动关闭

通过 **duration** 设置自动关闭时间，单位毫秒。设置为 **0** 时不会自动关闭。
<preview path="../demo/Message/NotClose.vue" title="Message基础使用" description="不自动关闭"></preview>

## 关闭所有消息

可以调用 **closeAll** 一次性关闭当前所有消息。
<preview path="../demo/Message/CloseAll.vue" title="Message基础使用" description="一键关闭"></preview>

## API

### createMessage Options

| 属性名         | 说明                                          | 类型                                              | 默认值    |
| -------------- | --------------------------------------------- | ------------------------------------------------- | --------- |
| message        | 消息内容                                      | `string \| VNode`                                 | —         |
| duration       | 自动关闭延迟，单位毫秒；设为 `0` 时不自动关闭 | `number`                                          | `3000`    |
| showClose      | 是否显示关闭按钮                              | `boolean`                                         | `false`   |
| type           | 消息类型                                      | `success \| primary \| info \| danger \| warning` | `info`    |
| offset         | 消息距离窗口顶部的偏移量，单位像素            | `number`                                          | `20`      |
| transitionName | 过渡动画名称                                  | `string`                                          | `fade-up` |

### Methods

| 方法名          | 说明                   | 参数                            | 返回值                        |
| --------------- | ---------------------- | ------------------------------- | ----------------------------- |
| createMessage   | 创建一条消息提示       | `(options: CreateMessageProps)` | `MessageContext`              |
| getLastInstance | 获取最后创建的消息实例 | —                               | `MessageContext \| undefined` |
| closeAll        | 关闭所有消息           | —                               | —                             |

### MessageContext

| 字段名  | 说明             | 类型                        |
| ------- | ---------------- | --------------------------- |
| id      | 消息唯一标识     | `string`                    |
| vnode   | 消息对应的 VNode | `VNode`                     |
| vm      | 消息组件实例     | `ComponentInternalInstance` |
| props   | 消息最终属性     | `MessageProps`              |
| destroy | 手动关闭当前消息 | `() => void`                |
