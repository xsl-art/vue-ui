import type { ComponentInfo, ComponentResolver } from "unplugin-vue-components";

export interface VueUiResolverOptions {
  /**
   * 组件名前缀。默认 "Vk"，表示只解析模板中以 Vk 开头的标签，如 <VkButton />。
   * 设置为 false 或空字符串可关闭前缀匹配，直接解析 <Button />。
   */
  prefix?: string | false;
}

const componentList = [
  "Alert",
  "Button",
  "Collapse",
  "CollapseItem",
  "Dialog",
  "Dropdown",
  "Form",
  "FormItem",
  "Icon",
  "Input",
  "Message",
  "Select",
  "Switch",
  "Tag",
  "Tooltip",
] as const;

const subComponentMap: Record<string, string> = {
  CollapseItem: "Collapse",
  FormItem: "Form",
};

export function VueUiResolver(options: VueUiResolverOptions = {}): ComponentResolver {
  const { prefix = "Vk" } = options;

  return {
    type: "component",
    resolve: (name: string): ComponentInfo | undefined => {
      let componentName = name;

      if (prefix) {
        if (!componentName.startsWith(prefix)) return;
        componentName = componentName.slice(prefix.length);
      }

      if (!componentName || !(componentList as readonly string[]).includes(componentName)) {
        return;
      }

      const dirName = subComponentMap[componentName] || componentName;

      return {
        name: "default",
        as: componentName,
        from: `vue-ui/es/components/${dirName}`,
        sideEffects: [`vue-ui/es/components/${dirName}/style.css`],
      };
    },
  };
}
