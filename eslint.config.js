import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import vitest from "@vitest/eslint-plugin";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "public/**",
      "docs/.vitepress/cache/**",
      "docs/.vitepress/dist/**",
      "**/*.md",
      "**/*.min.*",
      "package-lock.json",
    ],
  },
  eslint.configs.recommended, //JS/TS 基础最佳实践
  ...tseslint.configs.recommended, // TypeScript 推荐规则（如类型检查、未使用变量等）
  ...pluginVue.configs["flat/recommended"], // Vue 3 推荐规则（如模板语法检查、组件定义规范等）
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    //环境隔离
    files: ["src/**/*.{ts,vue}", "docs/**/*.{vue,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: [
      "*.config.{js,ts}",
      "vite*.ts",
      "vitest.config.ts",
      "eslint.config.js",
      "scripts/**/*.{js,mjs,cjs}",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["tests/**/*.ts"],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      // 允许在测试中使用 Form, Input 等保留字作为组件名
      "vue/no-reserved-component-names": "off",
      //允许在一个文件中定义多个组件
      "vue/one-component-per-file": "off",
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  eslintConfigPrettier,
  {
    rules: {
      // 组件库中常见单词组件名：Alert、Message、Dialog 等
      "vue/multi-word-component-names": "off",
      // 与 Vue 3 / 组件库 camelCase 属性写法兼容
      "vue/attribute-hyphenation": "off",
      "vue/attributes-order": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/v-on-event-hyphenation": "off",
      // 文档站、插件注册常用非 PascalCase 组件名
      "vue/component-definition-name-casing": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  /* 必须放在全局 rules 之后，否则会被 @typescript-eslint/no-explicit-any 再次打开 */
  {
    files: ["src/vite-env.d.ts"],
    rules: {
      //关闭空对象类型和 any 的检查
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
