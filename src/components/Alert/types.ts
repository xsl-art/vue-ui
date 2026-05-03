export type AlertType = "primary" | "success" | "warning" | "danger" | "info";
export interface AlertProps {
  icon?: boolean;
  title?: string | number;
  content?: string | number;
  closable?: boolean;
  type?: AlertType;
  center?: boolean;
  effect?: "dark" | "light";
}

export interface AlertEmits {
  (e: "close"): void;
}

export interface AlertInstance {
  close: () => void;
}
