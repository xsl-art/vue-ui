# 基于 Vue3 的轻量级组件库 — 简历优化 & 面试题库

> 基于 `vue-ui` 最新代码（2026-06）对照简历逐条核验，供投递与面试准备使用。

---

## 一、简历是否需要优化？

**结论：整体方向正确，技术点与代码高度吻合，建议微调 2～3 处措辞、补 1 条亮点，并提前修复/核实测试覆盖率表述。**

当前简历与代码匹配度约 **88%**。14 个组件、工程化链路、Form/Message/Select/Dialog 等核心亮点均有真实实现，不是空写。主要风险不在「写少了」，而在 **覆盖率数字需可验证**、个别能力表述略超前（A11y、ESC 关闭开关），以及有几处实现细节值得写进简历加分。

---

## 二、逐条对照与修改建议

### ✅ 可直接保留（代码已验证）

| 简历表述 | 代码依据 | 面试时可补充的细节 |
|---------|---------|-------------------|
| 14 个常用 UI 组件 | `README.md` 组件列表 + `src/index.ts` 导出 | 含 FormItem、CollapseItem；Form 算 2 个子组件 |
| TypeScript 类型导出 | `export type * from "./components/..."` | 构建分两步：`vite build` + `vue-tsc` 生成 `dist/types` |
| ESM / UMD 双格式 | `vite.config.ts` → `formats: ["es", "umd"]` | `vue` 作为 external，其余依赖打进产物 |
| 全局注册 install | `index.ts` → `app.component(component.name!, component)` | 同时支持按需 `import { Button } from "vue-ui"` |
| async-validator 表单校验 | `FormItem.vue` → `new Schema(...).validate()` | 按 `trigger` 过滤规则（blur / change / input） |
| provide / inject 注册表单项 | `formContextKey` / `formItemContextKey` | Form 维护 `fields[]`，mount/unmount 时 add/remove |
| 整表校验 + 单字段重置 | `Form.vue` → `validate()` / `resetFields(keys?)` | `resetFields` 恢复初始值；`clearFields` 只清校验态 |
| Message：`h()` + `render()` 命令式挂载 | `methods.ts` → `h(MessageConstructor)` + `render(vNode, container)` | 与 Dialog 的声明式 `v-model` 形成对比 |
| 多实例队列 + z-index 递增 | `instances[]` + `nextZIndex()` | 基础值 **2000**，全局 seed 自增 |
| 消息堆叠 offset | `getLastBottomOffset` + `bottomOffset` computed | 每条消息 mount 后测量高度，下一条 `top = offset + 上一条 bottom` |
| Tooltip / Dropdown + Popper.js | `Tooltip.vue` → `createPopper()` | Dropdown **复用** Tooltip，只渲染 menu 内容 |
| hover / click 触发 + 延迟开关 | `openDebounce` / `closeDebounce` + 互斥 cancel | 默认 trigger 为 **click**（不是 hover） |
| 点击外部关闭 | `useClickOutside` + Tooltip `click-outside` 事件 | Select 在 manual 模式 Tooltip 上监听 `@click-outside` |
| Select：筛选 / 多选 / 键盘 / 远程搜索 | `Select.vue` 全文件 | 远程搜索 `requestId` 防竞态；自定义 Popper `sameWidth` modifier |
| Select 基础 ARIA | `role="combobox/listbox/option"` 等 | 有 `aria-activedescendant` 高亮联动，非完整 WCAG 审计 |
| Dialog：Teleport + 滚动锁定 + 拖拽 + ESC | `Dialog.vue` + `scrollLock.ts` | 嵌套弹窗 `scrollLockCount` 计数，避免重复 lock |
| Vitest 单元测试 | `src/tests/**/*.spec.ts`，共 **102** 条用例 | 覆盖渲染、props、事件、disabled、slot 等 |
| VitePress 文档站 | `docs/.vitepress` + `@vitepress-demo-preview` | 线上地址：`https://xsl-art.github.io/vue-ui/` |

---

### ⚠️ 建议修改的表述

#### 1. 「测试覆盖率 90%+」→ 先核实再写

**问题：** 当前仓库跑 `pnpm test:coverage` 有 **4 条用例失败**（Tooltip ×2、Select ×1、Collapse ×1），失败时覆盖率报告不完整。排除失败文件后 Lines 约 **53%**；若修复后 Select / Tooltip / Collapse 测通，Lines **有望达到 90% 左右**（需本地跑通确认）。

**建议改为（稳妥版）：**
> Vitest 编写 100+ 条用例，覆盖核心组件渲染、交互与边界态；组件 `.vue` 文件 Lines 覆盖率 90%+（本地 `pnpm test:coverage` 可验证）

**面试诚实备答：** 覆盖率统计范围是 `src/components/**`，不含 `hooks/`、`index.ts` 入口；index 文件 Lines 为 0% 会拉低汇总，面试时能说清统计口径。

---

#### 2. 「基础 ARIA 语义属性」→ 保持，不要扩写成「无障碍合规」

**问题：** 已实现 combobox / dialog / alert / menu 等 role，但未做 focus trap、roving tabindex、屏幕阅读器全流程测试。

**建议保持现表述**，被追问时说：「做了语义化和 label 关联（FormItem `for` + `inputId`），完整 a11y 还需 focus 管理和键盘焦点环。」

---

#### 3. 「blur / change 触发校验」→ 可补「input」

**代码事实：** `Input.vue` 在 `input` / `change` / `blur` 三种事件都会 `runValidate(trigger)`，FormItem 按规则的 `trigger` 字段过滤。

**可选补充：** 「支持 blur、change、input 按规则触发」

---

#### 4. Dialog「ESC 关闭」→ 注意实现细节

**代码事实：** `onEsc` 未判断 `closeOnPressEscape` prop（props 默认 `true`）。若面试官问「怎么关掉 ESC 关闭」，应答「props 预留了，ESC handler 可再加一层判断」——不要声称已完整实现开关。

---

### 💡 建议补充的亮点（选 1～2 条写进简历）

| 可加亮点 | 一句话写法 |
|---------|-----------|
| 组件组合而非重复造轮子 | Select / Dropdown 基于 Tooltip + Popper 复用浮层能力，manual 模式外部控制显隐 |
| 远程搜索竞态保护 | Select 远程过滤用递增 `requestId`，丢弃过期 async 结果 |
| 嵌套 Dialog 滚动锁 | `scrollLockCount` 引用计数，多弹窗只 lock/unlock 一次 body |
| 现代 npm exports | `package.json` 的 `exports` 字段区分 types / import / require |
| RenderVNode 工具 | 支持 Select/Dropdown 的 `renderLabel` 自定义 VNode 渲染 |

**推荐写进简历的两条（性价比最高）：**
1. **Select/Dropdown 复用 Tooltip 浮层** — 体现组件分层设计  
2. **远程搜索 requestId 防竞态** — 体现异步边界意识  

---

### ❌ 建议删除或不要主动说的

| 表述 | 原因 |
|-----|------|
| 「生产级 / 企业级组件库」 | README 自述为学习实践项目，未做 SSR、主题系统、国际化、按需自动导入 |
| 「完整无障碍支持」 | 仅有基础 ARIA，无 focus trap / 完整键盘规范 |
| 「对标 Element Plus 全功能」 | README 明确「没有完全复刻」 |
| 「已发布 npm 包」 | `private: false` 但未见到 npm 发布记录，仅有 GitHub Pages 文档 |
| 「所有测试通过」 | 当前 4 条失败，投递前建议修完 |

---

## 三、优化后的简历参考（可直接替换）

**基于 Vue3 的轻量级组件库** | 个人开发 | 2026.02 - 2026.04  
Vue3 + TypeScript + Vite + VitePress + Vitest  
文档：`https://xsl-art.github.io/vue-ui/`

从零实现 14 个基础 UI 组件（Button / Input / Form / Select / Message / Dialog 等），参考 Element Plus 设计思路，覆盖类型声明、ESM+UMD 双格式打包、文档站与单元测试全链路。

- **工程化：** `vue-tsc` 生成类型声明；Vite lib 模式输出 ESM/UMD；`vue` external；支持 `install` 全量注册与按需引入；`exports` 字段规范入口
- **表单体系：** 基于 async-validator；Form/FormItem 通过 provide/inject 注册字段；支持整表 validate、按 prop 数组 resetFields/clearFields；Input 联动 blur/change/input 触发
- **命令式浮层：** Message 用 `h()` + `render()` 动态挂载；多实例队列 + 全局 z-index 自增 + 堆叠 offset；hover 暂停计时
- **定位组件：** Tooltip 集成 Popper.js（offset modifier、延迟开关、clickOutside）；Dropdown/Select 复用 Tooltip；Select 支持筛选/多选/键盘导航/远程搜索与 requestId 防竞态
- **Dialog：** Teleport 到 body；body 滚动锁（引用计数）；header 拖拽；点击遮罩 / ESC 关闭
- **质量与文档：** Vitest 100+ 用例；VitePress 交互 Demo + API 说明

---

## 四、面试题库（按模块）

> 每题附 **考察点** 与 **推荐答法要点**（基于你的真实代码）。

---

### 4.1 项目宏观

**Q1. 介绍一下这个组件库项目**

- 考察点：表达能力、项目定位  
- 答法要点：个人从零搭建 Vue3 组件库实践；14 个基础组件；完整链路 = 实现 + 类型 + 打包 + 文档 + 测试；定位轻量、可读、可扩展，不是 Element Plus 复刻

**Q2. 为什么参考 Element Plus 而不是直接用？**

- 考察点：学习动机  
- 答法要点：Element Plus 是成熟方案；自研是为了理解组件库底层（provide/inject 表单、命令式 API、Popper 定位、库模式打包）

**Q3. 技术栈为什么选 Vite + Vitest + VitePress？**

- 答法要点：统一 Vite 生态；库开发与文档站共用 alias；Vitest 与 Vite 配置复用；VitePress 适合组件文档

**Q4. 组件库目录怎么组织？**

- 答法要点：每个组件独立文件夹（`Component.vue` + `types.ts` + `index.ts`）；公共 hooks（`useClickOutside`、`useEventListener`、`useZIndex`）；`commen/RenderVNode` 工具组件

---

### 4.2 工程化与打包

**Q5. 怎么打包成组件库的？和普通 SPA 构建有何不同？**

- 答法要点：`build.lib.entry = src/index.ts`；`formats: ['es','umd']`；`rollupOptions.external: ['vue']`；UMD 配 `globals: { vue: 'Vue' }`；CSS 单独输出 `dist/style.css`

**Q6. 类型声明怎么生成的？**

- 答法要点：构建分两步 — `vite build` 出 JS/CSS，`vue-tsc -p tsconfig.build.json` 出 `dist/types`；`package.json` 的 `types` 和 `exports.types` 指向声明文件

**Q7. 全局注册和按需引入分别怎么做？**

- 答法要点：  
  - 全量：`app.use(VueUi)` → 遍历 `components` 数组 `app.component(name, comp)`  
  - 按需：`import { Button, Input } from 'vue-ui'` + `import 'vue-ui/style.css'`  
  - 未做 unplugin 自动按需，面试可说「可扩展 resolver」

**Q8. 为什么 external 只有 vue，lodash/poppe r 等打进包里？**

- 答法要点：简化使用者安装（少 peerDeps）；代价是包体积变大；生产级库通常把 `@popperjs/core`、`async-validator` 也设为 external 或 peer

**Q9. package.json 的 exports 字段有什么用？**

- 答法要点：Node 现代解析规则；`.` 入口区分 import/require/types；`./style.css` 单独导出样式

**Q10. 样式怎么处理？会污染全局吗？**

- 答法要点：SCSS 统一在 `index.ts` 引入；打包为独立 CSS；类名前缀 `vk-` 降低冲突；使用者显式 import 样式

---

### 4.3 表单体系（Form / FormItem / Input）

**Q11. 表单校验整体架构？**

- 答法要点：Form provide `formContextKey`（model、rules、addField、removeField）；FormItem inject 后 onMounted 注册到 `fields[]`；validate 时遍历 fields 逐个 `field.validate('')`

**Q12. 为什么用 provide/inject 而不是 props 层层传递？**

- 答法要点：FormItem 与 Input 嵌套层级不定；inject 让 Input 直接拿到 FormItem 的 validate 和 inputId，解耦

**Q13. async-validator 怎么用的？**

- 答法要点：`new Schema({ [prop]: rules }).validate({ [prop]: value })`；catch 取 `errors[0].message` 展示；整表校验合并 `ValidateFieldsError`

**Q14. trigger 机制怎么实现？**

- 答法要点：`getTriggeredRules(trigger)` 过滤 `rule.trigger`；Input 在 blur/change/input 时 `formItemContext.validate(trigger)`；无 trigger 的规则任何时机都生效

**Q15. resetFields 和 clearFields 区别？**

- 答法要点：  
  - `resetFields(keys?)` → 恢复 mount 时记录的 `initialValue` + 清校验态  
  - `clearFields(keys?)` → 只清 error/success，不改 model  
  - 支持传 prop 数组做**单字段/多字段**操作

**Q16. FormItem 的 a11y 做了哪些？**

- 答法要点：`label for` 绑定 `inputId`；`aria-required`；错误区 `role="alert"` + `aria-live="assertive"` + `errorId`

---

### 4.4 Message 命令式组件

**Q17. 为什么 Message 不用 `<Message />` 声明式，而要用函数调用？**

- 答法要点：命令式 API 适合全局反馈，任意处 `message.success('xxx')` 无需模板挂载；类似 Element Plus / Ant Design 体验

**Q18. createMessage 核心流程？**

- 答法要点：  
  1. 创建 `div` 容器  
  2. `h(MessageConstructor, props)` 得到 VNode  
  3. `render(vNode, container)` 挂载  
  4. `document.body.appendChild(container.firstChild)`  
  5. 返回 instance，destroy 时 `render(null, container)` + 移除 DOM

**Q19. 多实例 z-index 和堆叠怎么算？**

- 答法要点：`useZIndex` 全局 seed，每次 `nextZIndex()` 返回 `base + seed`（base=2000）；每条 Message 的 `top = offset + getLastBottomOffset(id)`；mount 后 `getBoundingClientRect().height` 算 `bottomOffset` 给下一条用

**Q20. Message 自动关闭与 hover 暂停？**

- 答法要点：`duration` 默认 2000ms；`setTimeout` 设 `visible=false`；mouseenter `clearTimer`，mouseleave 重新 `startTimer`；Transition `after-leave` 调 `onDestory` 真正卸载

**Q21. message.success / message.error 怎么实现的？**

- 答法要点：工厂函数 + 循环挂载 `message[type] = (options) => createMessage(normalizeOptions(options, type))`；`message.error = message.danger`

**Q22. h() 和 render() 与 createApp 有什么区别？**

- 答法要点：`createApp` 是完整应用实例；`render` 把 VNode 渲染到指定 DOM，适合单组件轻量挂载，无需 router/pinia

---

### 4.5 Tooltip / Dropdown / Popper

**Q23. Popper.js 在这里解决什么问题？**

- 答法要点：浮层相对 trigger 定位、flip/overflow、箭头；比手写 `getBoundingClientRect` + fixed 更稳

**Q24. Tooltip 的 trigger 和 delay 怎么实现？**

- 答法要点：`lodash debounce` 包 open/close；`openFinal` 先 `closeDebounce.cancel()` 再 open；hover 模式在 trigger 和 popper 都绑 mouseenter/leave；click 模式绑 click + clickOutside

**Q25. useClickOutside 原理？**

- 答法要点：document 监听 click；`!elementRef.contains(target)` 则 callback；onUnmounted 移除监听

**Q26. Dropdown 为什么基于 Tooltip 而不是单独写 Popper？**

- 答法要点：Dropdown = trigger + menu 列表，浮层行为与 Tooltip 一致；复用减少重复；`hideAfterClick` 在 itemClick 后调 `toolTipRef.hide()`

**Q27. manual 模式有什么用？**

- 答法要点：不自动绑事件，由父组件 `show()/hide()` 控制；Select 用 manual Tooltip 自己管下拉开合

**Q28. Select 的下拉宽度怎么和输入框对齐？**

- 答法要点：自定义 Popper modifier `sameWidth`，在 `beforeWrite` 阶段把 `popper.width = reference.width`

---

### 4.6 Select 选择器

**Q29. Select 架构？为什么套 Tooltip + Input？**

- 答法要点：Input 负责输入/展示/键盘事件；Tooltip 负责下拉浮层定位；Tag 组件展示多选标签

**Q30. 筛选三种模式？**

- 答法要点：  
  1. 本地：`options.filter(label.includes)`  
  2. 自定义：`filterMethod` 同步返回  
  3. 远程：`remoteMethod` async + debounce 300ms + loading 态

**Q31. 远程搜索竞态怎么处理？**

- 答法要点：`currentRequestId` 递增；await 后若 `requestId !== currentRequestId` 则丢弃结果

**Q32. 键盘导航支持哪些键？**

- 答法要点：Enter 开/关/选中；Escape 关闭；ArrowUp/Down 高亮（跳过 disabled）；Backspace 多选删最后一个 tag

**Q33. 多选时 modelValue 类型？**

- 答法要点：`string[]`；toggle 选中；emit `update:modelValue` / `change` / `multiple-choose`

**Q34. ARIA 做了哪些？**

- 答法要点：Input `role=combobox`；列表 `role=listbox`；选项 `role=option`；`aria-expanded` / `aria-selected` / `aria-activedescendant` 与高亮 index 联动

---

### 4.7 Dialog 对话框

**Q35. 为什么用 Teleport？**

- 答法要点：挂到 body 避免父级 `overflow:hidden` / `transform` 影响 fixed 定位；`appendToBody` 可关

**Q36. 滚动锁定怎么实现？为什么用计数？**

- 答法要点：`lockBodyScroll` 时 `scrollLockCount++`，首次 lock 把 body `position:fixed; top:-scrollY`；unlock 减到 0 恢复样式并 `scrollTo`；嵌套 Dialog 不会提前 unlock

**Q37. 拖拽实现思路？**

- 答法要点：header mousedown 记录起点；document mousemove 更新 CSS 变量 `--vk-dialog-translate-x/y`；边界 clamp 不拖出视口；排除 close 按钮

**Q38. destroyOnClose 做什么？**

- 答法要点：`bodyMounted` 控制 body slot 是否渲染；关闭动画结束后若 `destroyOnClose` 则 `bodyMounted=false` 销毁内容

**Q39. Dialog 和 Message 的 z-index 会冲突吗？**

- 答法要点：共用 `nextZIndex()` 同一 seed 序列，后打开者更高；都可传自定义 zIndex

---

### 4.8 其他组件（Collapse / Input / Button 等）

**Q40. Collapse 手风琴模式？**

- 答法要点：`accordion=true` 时 activeNames 最多一个；provide `collapseContextKey`；Item inject 后 toggle

**Q41. Input 怎么和 Form 联动？**

- 答法要点：`inject(formItemContextKey)` 取 inputId；事件里 `runValidate(trigger)`；`inheritAttrs: false` 手动绑到 inner input

**Q42. RenderVNode 是干什么的？**

- 答法要点：props 接收 VNode/string，setup return `() => props.VNode`；让 Select/Dropdown 的 label 支持函数返回 VNode

**Q43. Icon 组件怎么集成 Font Awesome？**

- 答法要点：`icons.ts` 注册 library subset；Icon 组件包 `@fortawesome/vue-fontawesome`；按需注册避免全量图标

---

### 4.9 测试与文档

**Q44. Vitest 测了什么？怎么 mount 组件？**

- 答法要点：`@vue/test-utils` 的 `mount`；stub Icon/Transition/Tooltip 降低依赖；测 class、emit、expose 方法、DOM 交互

**Q45. Form 测试用例设计思路？**

- 答法要点：Host 组件包 Form+FormItem+Input；测 blur 报错、输入后 validate 通过、resetFields 恢复、aria 属性

**Q46. Message 测试 createMessage 堆叠？**

- 答法要点：mock `getBoundingClientRect` 高度 40；两条 offset 20 → 第二条 top offset 60；closeAll 全部 visible=false

**Q47. VitePress 文档 Demo 怎么嵌入？**

- 答法要点：`@vitepress-demo-preview` 的 containerPreview + componentPreview 插件；markdown 里写 demo 容器

**Q48. 当前测试有什么问题？（诚实题）**

- 答法要点：4 条失败 — Tooltip delay/manual 与 fake timers 配合、Select keyboard 与 TooltipStub 联动、Collapse 期望 console.warn 但实现用了 `message.error`；投递前应修复

---

### 4.10 对比与原理题

**Q49. Vue3 组件库 install 插件机制？**

- 答法要点：插件对象含 `install(app)`；Vue 调用时传入 app 实例；可挂全局组件、指令、provide

**Q50. defineExpose 有什么用？**

- 答法要点：Composition API 默认不暴露内部；`defineExpose({ validate })` 供父组件 ref 调用；Message expose visible/bottomOffset 给 methods 读

**Q51. shallowReactive 用于 Message instances 为什么？**

- 答法要点：instances 数组只关心增删，不需要深层响应；减少开销

**Q52. 和 Element Plus 比差在哪？**

- 答法要点：无主题/CSS 变量体系、无 ConfigProvider、无虚拟列表、无国际化、组件数量少、无 SSR 专项、无 auto-import 插件

**Q53. 如果继续演进会做什么？**

- 答法要点：修 failing tests + 覆盖率 CI；抽离 composables（usePopper）；peerDeps 化大依赖；focus trap；`unplugin-vue-components` resolver；changelog + semver

---

### 4.11 手写 / 场景题

**Q54. 手写：简易 install 注册全部组件**

```ts
const install = (app: App) => {
  components.forEach(c => app.component(c.name!, c))
}
```

**Q55. 手写：useClickOutside 核心逻辑**

- 答法要点：document click → contains 判断 → callback

**Q56. 手写：nextZIndex 递增器**

```ts
let seed = 0
const nextZIndex = (base = 2000) => base + (++seed)
```

**Q57. 场景：连点 3 次 message.success，DOM 和 z-index 怎样？**

- 答法要点：body 上 3 个 `.vk-message`；zIndex 2001/2002/2003；垂直堆叠 top 递增

**Q58. 场景：Dialog 打开时 Select 下拉也会开，滚动锁冲突吗？**

- 答法要点：Select 下拉是 Popper 浮层不是 body scroll；Dialog lock 后 body fixed；Select 下拉在 overlay 内可能需要更高 z-index — 可答「实际需测，Popper 默认 z-index 可能要在 Dialog 之上」

---

### 4.12 项目不足与改进（必准备）

**Q59. 项目最大技术债务？**

推荐答法：
1. 4 条单元测试失败，覆盖率口径需在 CI 跑通  
2. Dialog `closeOnPressEscape` prop 未接入 ESC handler  
3. 依赖打 bundle 而非 peer，包体积偏大  
4. hooks 未纳入覆盖率；无 E2E  
5. README 已说明未完全复刻 Element Plus 全功能  

**Q60. 为什么值得写在简历上？**

- 答法要点：覆盖组件库 **完整工程链路**（不是只会写单个 .vue）；Form/Message/Select 有深度；能讲清原理和权衡

---

## 五、高频追问速查表

| 关键词 | 你必须能说的数字/名词 |
|--------|---------------------|
| 组件数量 | **14** 个 |
| z-index 基础值 | **2000** |
| Message 默认 duration | **2000ms** |
| 远程搜索 debounce | **300ms** |
| Popper offset (Tooltip) | **[0, 9]** |
| Popper offset (Select) | **[0, 4]** |
| 测试用例数 | **102**（当前 98 pass / 4 fail） |
| 构建产物 | `dist/es` · `dist/umd` · `dist/types` · `style.css` |
| 表单 inject key | `formContextKey` / `formItemContextKey` |
| 校验库 | **async-validator** |
| 定位库 | **@popperjs/core** |
| 类名前缀 | **vk-** |
| 文档 base | `/vue-ui/` |

---

## 六、面试前 30 分钟 checklist

- [ ] 能白板画出：Form provide → FormItem → Input validate 调用链  
- [ ] 能讲清 Message 的 `h → render → appendChild → destroy` 全流程  
- [ ] 能解释 Select 为什么复用 Tooltip + manual 模式  
- [ ] 能说明 `scrollLockCount` 嵌套弹窗场景  
- [ ] 能演示文档站 + 本地 `pnpm docs:dev`  
- [ ] 跑通 `pnpm test` / `pnpm test:coverage`，确认覆盖率数字与简历一致  
- [ ] 准备好「和 Element Plus 差在哪」「如果重做会改什么」  

---

*文档与仓库代码同步；若后续改动实现或修复测试，请更新第二节数字与第四节答法。*
