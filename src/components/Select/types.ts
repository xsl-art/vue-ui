import type { VNode } from "vue";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type RenderLabelFunc = (option: SelectOption) => VNode;
//过滤函数
export type CustomFilterFunc = (value: string) => SelectOption[];
//远程搜索函数
export type CustomRemoteSearchFunc = (value: string) => Promise<SelectOption[]>;

export interface SelectProps {
  modelValue: string | string[];
  options?: SelectOption[];
  multiple?: boolean; //多选
  placeholder?: string;
  disabled?: boolean;
  clearabled?: boolean;
  renderLabel?: RenderLabelFunc;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomRemoteSearchFunc;
}

export interface SelectState {
  inputValue: string;
  selectedOption: null | SelectOption;
  selectedOptions: SelectOption[];
  mouseHover: boolean;
  loading: boolean;
  highlightIndex: number;
}

export interface SelectEmits {
  (e: "change", value: string | string[]): void;
  (e: "update:modelValue", value: string | string[]): void;
  (e: "visible-change", value: boolean): void; //下拉框显示状态变化
  (e: "clear"): void;
  (e: "multiple-choose", value: string[]): void;
}
