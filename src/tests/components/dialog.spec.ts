import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, nextTick } from "vue";
import Dialog from "../../components/Dialog/Dialog.vue";
import { unlockBodyScroll } from "../../components/Dialog/scrollLock";

/* 标题、内容、footer、可访问性属性渲染
自定义 header 插槽
关闭按钮、遮罩点击、Escape 关闭行为
showClose、closeOnClickModal、modal
open / opened / closed 事件
lockScroll 滚动锁定与释放
destroyOnClose
fullscreen / alignCenter 布局样式
暴露的 open / close 方法
draggable 拖拽行为及关闭按钮不触发拖拽 */
const TransitionStub = defineComponent({
  name: "Transition",
  emits: ["after-enter", "after-leave"],
  setup(_, { slots }) {
    return () => slots.default?.();
  },
});

const mountedWrappers: ReturnType<typeof mount>[] = [];

const mountDialog = (options: Parameters<typeof mount>[1] = {}) => {
  const wrapper = mount(Dialog, {
    attachTo: document.body,
    props: {
      modelValue: true,
      appendToBody: false,
      ...(options.props ?? {}),
    },
    slots: options.slots,
    global: {
      stubs: {
        Icon: true,
        Transition: TransitionStub,
        ...(options.global?.stubs ?? {}),
      },
      ...(options.global ?? {}),
    },
  });

  mountedWrappers.push(wrapper);
  return wrapper;
};

describe("Dialog", () => {
  afterEach(() => {
    mountedWrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    unlockBodyScroll();
    document.body.innerHTML = "";
    document.body.style.overflow = "";
    vi.restoreAllMocks();
  });

  it("renders title, body, footer and accessibility attributes", () => {
    const wrapper = mountDialog({
      props: {
        title: "提示标题",
        width: "480px",
        top: "20vh",
        modalClass: "custom-overlay",
        dialogClass: "custom-dialog",
        zIndex: 3000,
      },
      slots: {
        default: "对话框内容",
        footer: "底部内容",
      },
    });

    const overlay = wrapper.find(".vk-dialog-overlay");
    const dialog = wrapper.find(".vk-dialog");
    const wrapperEl = wrapper.find(".vk-dialog__wrapper");
    const title = wrapper.find(".vk-dialog__title");

    expect(overlay.exists()).toBe(true);
    expect(overlay.classes()).toEqual(expect.arrayContaining(["is-modal", "custom-overlay"]));
    expect(overlay.attributes("role")).toBe("presentation");
    expect(overlay.attributes("style")).toContain("z-index: 3000");
    expect(wrapperEl.attributes("style")).toContain("padding-top: 20vh");
    expect(dialog.classes()).toContain("custom-dialog");
    expect(dialog.attributes("role")).toBe("dialog");
    expect(dialog.attributes("aria-modal")).toBe("true");
    expect(dialog.attributes("aria-labelledby")).toBe(title.attributes("id"));
    expect(dialog.attributes("aria-describedby")).toMatch(/^vk-dialog-desc-/);
    expect(dialog.attributes("tabindex")).toBe("-1");
    expect(dialog.attributes("style")).toContain("width: 480px");
    expect(wrapper.text()).toContain("提示标题");
    expect(wrapper.text()).toContain("对话框内容");
    expect(wrapper.text()).toContain("底部内容");
  });

  it("renders custom header slot instead of default title", () => {
    const wrapper = mountDialog({
      props: { title: "默认标题" },
      slots: {
        header: '<h2 class="custom-header">自定义标题</h2>',
      },
    });

    expect(wrapper.find(".custom-header").text()).toBe("自定义标题");
    expect(wrapper.find(".vk-dialog__title").exists()).toBe(false);
    expect(wrapper.text()).not.toContain("默认标题");
  });

  it("emits close and update:modelValue when close button is clicked", async () => {
    const wrapper = mountDialog();

    await wrapper.find(".vk-dialog__close").trigger("click");

    expect(wrapper.emitted("close")).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([false]);
  });

  it("does not render close button when showClose is false", () => {
    const wrapper = mountDialog({ props: { showClose: false } });

    expect(wrapper.find(".vk-dialog__close").exists()).toBe(false);
  });

  it("closes when modal wrapper is clicked", async () => {
    const wrapper = mountDialog();

    await wrapper.find(".vk-dialog__wrapper").trigger("click");

    expect(wrapper.emitted("close")).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([false]);
  });

  it("does not close on modal click when disabled or non-modal", async () => {
    const clickDisabledWrapper = mountDialog({ props: { closeOnClickModal: false } });
    await clickDisabledWrapper.find(".vk-dialog__wrapper").trigger("click");
    expect(clickDisabledWrapper.emitted("close")).toBeFalsy();

    const nonModalWrapper = mountDialog({ props: { modal: false } });
    await nonModalWrapper.find(".vk-dialog__wrapper").trigger("click");
    expect(nonModalWrapper.emitted("close")).toBeFalsy();
    expect(nonModalWrapper.find(".vk-dialog-overlay").classes()).not.toContain("is-modal");
  });

  it("closes on Escape only when dialog is visible", async () => {
    const wrapper = mountDialog();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await nextTick();

    expect(wrapper.emitted("close")).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([false]);

    await wrapper.setProps({ modelValue: false });
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await nextTick();

    expect(wrapper.emitted("close")).toHaveLength(1);
  });

  it("emits open when opened and closed after leave transition", async () => {
    const wrapper = mountDialog({ props: { modelValue: false } });

    expect(wrapper.emitted("open")).toBeFalsy();

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.emitted("open")).toHaveLength(1);

    wrapper.findComponent({ name: "Transition" }).vm.$emit("after-enter");
    expect(wrapper.emitted("opened")).toHaveLength(1);

    await wrapper.setProps({ modelValue: false });
    wrapper.findComponent({ name: "Transition" }).vm.$emit("after-leave");
    expect(wrapper.emitted("closed")).toHaveLength(1);
  });

  it("locks body scroll while visible and unlocks after close transition", async () => {
    const wrapper = mountDialog();

    expect(document.body.style.overflow).toBe("hidden");

    await wrapper.setProps({ modelValue: false });
    wrapper.findComponent({ name: "Transition" }).vm.$emit("after-leave");

    expect(document.body.style.overflow).toBe("");
  });

  it("does not lock body scroll when lockScroll is false", () => {
    mountDialog({ props: { lockScroll: false } });

    expect(document.body.style.overflow).toBe("");
  });

  it("destroys body content after close when destroyOnClose is true", async () => {
    const wrapper = mountDialog({
      props: { destroyOnClose: true },
      slots: { default: '<span class="body-content">内容</span>' },
    });

    expect(wrapper.find(".body-content").exists()).toBe(true);

    await wrapper.setProps({ modelValue: false });
    wrapper.findComponent({ name: "Transition" }).vm.$emit("after-leave");
    await nextTick();

    expect(wrapper.find(".vk-dialog__body").exists()).toBe(false);

    await wrapper.setProps({ modelValue: true });
    await nextTick();

    expect(wrapper.find(".body-content").exists()).toBe(true);
  });

  it("applies fullscreen and center layout styles", () => {
    const fullscreenWrapper = mountDialog({
      props: { fullscreen: true, width: "360px", top: "30vh" },
    });

    expect(fullscreenWrapper.find(".vk-dialog").classes()).toContain("is-fullscreen");
    expect(fullscreenWrapper.find(".vk-dialog").attributes("style") ?? "").not.toContain(
      "width: 360px",
    );
    expect(fullscreenWrapper.find(".vk-dialog__wrapper").attributes("style") ?? "").not.toContain(
      "padding-top",
    );

    const centerWrapper = mountDialog({ props: { alignCenter: true, top: "30vh" } });

    expect(centerWrapper.find(".vk-dialog__wrapper").classes()).toContain("is-align-center");
    expect(centerWrapper.find(".vk-dialog__wrapper").attributes("style") ?? "").not.toContain(
      "padding-top",
    );
  });

  it("exposes open and close methods", async () => {
    const wrapper = mountDialog({ props: { modelValue: false } });

    wrapper.vm.open();
    wrapper.vm.close();
    await nextTick();

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
    expect(wrapper.emitted("close")).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([false]);
  });

  it("can be dragged by header and keeps close button from starting drag", async () => {
    const wrapper = mountDialog({ props: { draggable: true } });
    const dialog = wrapper.find(".vk-dialog");
    const header = wrapper.find(".vk-dialog__header");
    const close = wrapper.find(".vk-dialog__close");

    vi.spyOn(dialog.element, "getBoundingClientRect").mockReturnValue({
      x: 100,
      y: 100,
      top: 100,
      left: 100,
      bottom: 300,
      right: 400,
      width: 300,
      height: 200,
      toJSON: () => undefined,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      configurable: true,
      value: 768,
    });

    await header.trigger("mousedown", { button: 0, clientX: 120, clientY: 140 });
    document.dispatchEvent(new MouseEvent("mousemove", { clientX: 170, clientY: 180 }));
    await nextTick();

    expect(header.classes()).toContain("is-draggable");
    expect(dialog.attributes("style")).toContain("--vk-dialog-translate-x: 50px");
    expect(dialog.attributes("style")).toContain("--vk-dialog-translate-y: 40px");

    document.dispatchEvent(new MouseEvent("mouseup"));
    await close.trigger("mousedown", { button: 0, clientX: 170, clientY: 180 });
    document.dispatchEvent(new MouseEvent("mousemove", { clientX: 220, clientY: 230 }));
    await nextTick();

    expect(dialog.attributes("style")).toContain("--vk-dialog-translate-x: 50px");
    expect(dialog.attributes("style")).toContain("--vk-dialog-translate-y: 40px");
  });
});
