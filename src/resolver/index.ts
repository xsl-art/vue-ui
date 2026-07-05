import type { ComponentInfo, ComponentResolver } from "unplugin-vue-components";

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

const PREFIX = "Vk";

export function VueUiResolver(): ComponentResolver {
  return {
    type: "component",
    resolve: (name: string): ComponentInfo | undefined => {
      if (!name.startsWith(PREFIX)) return;

      const componentName = name.slice(PREFIX.length);

      if (!componentName || !(componentList as readonly string[]).includes(componentName)) {
        return;
      }

      const dirName = subComponentMap[componentName] || componentName;

      return {
        name: "default",
        from: `vue-ui/es/components/${dirName}`,
        sideEffects: [`vue-ui/es/components/${dirName}/style.css`],
      };
    },
  };
}
