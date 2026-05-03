export type ButtonType = "primary" | "info" | "success" | "warning" | "danger";
export type ButtonNativeType = "button" | "reset" | "submit";
export type ButtonSize = "large" | "small";

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  nativeType?: ButtonNativeType;
}

export interface ButtonInstance {
  ref: HTMLButtonElement;
}
