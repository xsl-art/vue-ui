import type { ComponentInternalInstance, VNode } from "vue";

export type MessageType = "success" | "primary" | "info" | "danger" | "warning";
export interface MessageProps {
  message?: string | VNode | number;
  duration?: number;
  closable?: boolean;
  type?: MessageType;
  onDestory: () => void;
  id: string | number;
  zIndex: number;
  offset?: number;
  transitionName?: string;
}

export interface MessageContext {
  id: string;
  vNode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  destory: () => void;
}

export type CreateMessageProps = Omit<MessageProps, "onDestory" | "zIndex" | "id">;
