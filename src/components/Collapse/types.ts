import type { InjectionKey, Ref } from "vue";

export type NameType = string | number;

export interface CollaseItemProps {
  title?: string | number;
  name?: NameType;
  disabled?: boolean;
}

export interface CollapseProps {
  //激活项(展开项)数组
  modelValue?: NameType[];
  //手风琴模式
  accordion?: boolean;
}

//父子通信上下文
export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleClick: (name: NameType) => void;
}

export interface CollapseEmits {
  //变化事件
  (e: "update:modelValue", value: NameType[]): void;
  (e: "change", value: NameType[]): void;
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol("collapseContextKey");
