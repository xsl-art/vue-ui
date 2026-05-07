export interface DialogProps {
  /** 是否显示 */
  modelValue: boolean;
  title?: string;
  width?: string;
  fullscreen?: boolean;
  top?: string;
  modal?: boolean;
  modalClass?: string;
  appendToBody?: boolean;
  lockScroll?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  showClose?: boolean;
  destroyOnClose?: boolean;
  alignCenter?: boolean;
  /** 是否开启拖拽 */
  draggable?: boolean;
  //对话框根节点自定义 class
  dialogClass?: string;
  zIndex?: number;
}

export interface DialogEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "open"): void;
  (e: "opened"): void;
  (e: "close"): void;
  (e: "closed"): void;
}

export interface DialogInstance {
  open: () => void;
  close: () => void;
}
