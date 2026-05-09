import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick } from "vue";
import Message from "../../components/Message/Message.vue";
import {
  closeAll,
  createMessage,
  getLastBottomOffset,
  getLastInstance,
} from "../../components/Message/methods";

const TransitionStub = defineComponent({
  name: "Transition",
  props: { name: String },
  emits: ["after-leave", "enter"],
  setup(_, { slots }) {
    return () => slots.default?.();
  },
});

const IconStub = defineComponent({
  name: "Icon",
  props: { icon: String },
  template: `<i class="icon-stub" :data-icon="icon"></i>`,
});

const RenderVnodeStub = defineComponent({
  name: "RenderVNode",
  props: {
    VNode: { type: [String, Number, Object], required: true },
  },
  setup(props) {
    return () => h("span", String(props.VNode));
  },
});

const mountMessage = (props = {}) =>
  mount(Message, {
    props: {
      id: "message-id",
      zIndex: 2001,
      duration: 0,
      onDestory: vi.fn(),
      ...props,
    },
    global: {
      stubs: {
        Transition: TransitionStub,
        Icon: IconStub,
        RenderVNode: RenderVnodeStub,
      },
    },
  });

describe("Message", () => {
  afterEach(() => {
    closeAll();
    document.body.innerHTML = "";
    vi.useRealTimers();
  });

  it("renders message, type class, close button and style", () => {
    const wrapper = mountMessage({
      message: "保存成功",
      type: "success",
      closable: true,
      offset: 30,
      zIndex: 3000,
    });

    const message = wrapper.find(".vk-message");
    expect(message.attributes("role")).toBe("alert");
    expect(message.classes()).toEqual(
      expect.arrayContaining(["vk-message--success", "is-closable"]),
    );
    expect(message.attributes("style")).toContain("top: 30px");
    expect(message.attributes("style")).toContain("z-index: 3000");
    expect(wrapper.text()).toContain("保存成功");
    expect(wrapper.find(".vk-message__close").attributes("aria-label")).toBe("Close message");
  });

  it("supports default slot content", () => {
    const wrapper = mount(Message, {
      props: {
        id: "slot-message",
        zIndex: 2001,
        duration: 0,
        onDestory: vi.fn(),
      },
      slots: { default: '<strong class="slot-message">自定义内容</strong>' },
      global: { stubs: { Transition: TransitionStub, Icon: IconStub } },
    });

    expect(wrapper.find(".slot-message").text()).toBe("自定义内容");
  });

  it("hides on close button and calls onDestory after leave", async () => {
    const onDestory = vi.fn();
    const wrapper = mountMessage({ onDestory });

    await wrapper.find(".vk-message__close").trigger("click");
    expect(wrapper.vm.visible).toBe(false);

    wrapper.findComponent({ name: "Transition" }).vm.$emit("after-leave");
    expect(onDestory).toHaveBeenCalledTimes(1);
  });

  it("auto closes after duration and pauses on hover", async () => {
    vi.useFakeTimers();
    const wrapper = mountMessage({ duration: 100 });
    await nextTick();
    await nextTick();

    await wrapper.find(".vk-message").trigger("mouseenter");
    //调用每个启动的定时器，直到超过指定的毫秒数或队列为空
    vi.advanceTimersByTime(100);
    await nextTick();
    expect(wrapper.vm.visible).toBe(true);

    await wrapper.find(".vk-message").trigger("mouseleave");
    vi.advanceTimersByTime(100);
    await nextTick();
    expect(wrapper.vm.visible).toBe(false);
  });

  it("closes when Escape is pressed", async () => {
    const wrapper = mountMessage();

    document.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));
    await nextTick();

    expect(wrapper.vm.visible).toBe(false);
  });

  it("creates message instances, computes stacked offset and closes all", async () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 40,
      right: 100,
      width: 100,
      height: 40,
      toJSON: () => undefined,
    });

    const first = createMessage({ message: "first", duration: 0, offset: 20 });
    await nextTick();
    const second = createMessage({ message: "second", duration: 0, offset: 20 });
    await nextTick();

    expect(document.body.textContent).toContain("first");
    expect(document.body.textContent).toContain("second");
    expect(getLastInstance()?.id).toBe(second.id);
    expect(getLastBottomOffset(second.id)).toBe(60);

    closeAll();
    await nextTick();

    expect(first.vm.exposed!.visible.value).toBe(false);
    expect(second.vm.exposed!.visible.value).toBe(false);
  });
});
