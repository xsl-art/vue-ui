export type TagType = "primary" | "info" | "success" | "warning" | "danger";
export interface TagProps {
  type: TagType;
  closable?: boolean;
  effect: "dark" | "light" | "plain";
  size: "large" | "small" | "mini";
  round?: boolean;
  disabled?: boolean;
}

export interface TagEmits {
  (e: "close"): void;
}

export interface TagInstance {
  close: () => void;
}
