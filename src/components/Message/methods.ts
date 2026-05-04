import { h, render, shallowReactive } from "vue";
import type { CreateMessageProps, MessageContext } from "./types";
import useZIndex from "../../hooks/useZIndex";
import MessageConstructor from "./Message.vue";
//createMessage()函数
let seed = 1;
const instances: MessageContext[] = shallowReactive([]);
export const createMessage = (props: CreateMessageProps) => {
  //生成唯一id和zIndex
  const { nextZIndex } = useZIndex();
  const id = `message_${seed++}`;
  //创建临时容器
  const container = document.createElement("div");
  const destory = () => {
    //删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container); //卸载虚拟节点
    container.remove(); //移除dom容器
  };
  //通过实例暴露的visible属性删除
  const manualDestory = () => {
    const instance = instances.find((instance) => instance.id === id);
    if (instance) instance.vm.exposed!.visible.value = false;
  };

  //合并属性
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory,
  };

  //创建并渲染VNode
  const vNode = h(MessageConstructor, newProps);
  render(vNode, container);

  //构建并返回实例
  const vm = vNode.component!;
  const instance = {
    id,
    vNode,
    vm,
    props: newProps,
    destory: manualDestory,
  };
  instances.push(instance);
  const firstChild = container.firstChild;
  if (firstChild) {
    document.body.appendChild(firstChild as HTMLElement);
  }
  return instance;
};

//获取最新实例
export const getLastInstance = () => {
  return instances[instances.length - 1];
};

//计算消息堆叠高度
export const getLastBottomOffset = (id: string | number | undefined) => {
  if (!id) return;
  const idx = instances.findIndex((instance) => instance.id === id);
  if (idx <= 0) return 0;
  //前一条偏移
  const prev = instances[idx - 1];
  return prev.vm.exposed!.bottomOffset.value;
};

//关闭所有消息
export const closeAll = () => {
  instances.forEach((instance) => {
    instance.destory();
  });
};
