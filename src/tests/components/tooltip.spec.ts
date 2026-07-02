import { mount, type VueWrapper } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, nextTick } from "vue";
import Tooltip from "../../components/Tooltip/Tooltip.vue";

const TransitionStub = defineComponent({
  name: "Transition",
  setup(_, { slots }) {
    return () => slots.default?.();
  },
});

const mountTooltip = (options: Parameters<typeof mount>[1] = {}) =>
  mount(Tooltip, {
    ...options,
    global: {
      stubs: { Transition: TransitionStub },
      ...options.global,
    },
  });

/** v-show 在 jsdom 下通过 inline style 判断，isVisible() 不可靠 */
const expectPopperOpen = (wrapper: VueWrapper) => {
  const style = wrapper.find(".vk-tooltip__popper").attributes("style") ?? "";
  expect(style).not.toContain("display: none");
};

const expectPopperClosed = (wrapper: VueWrapper) => {
  const style = wrapper.find(".vk-tooltip__popper").attributes("style") ?? "";
  expect(style).toContain("display: none");
};

vi.mock("@popperjs/core", () => ({
  createPopper: vi.fn(() => ({
    update: vi.fn(),
    destroy: vi.fn(),
  })),
}));

const waitDebounce = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("Tooltip", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("renders default slot and opens content on click", async () => {
    const wrapper = mountTooltip({
      props: { content: "提示内容" },
      slots: { default: "触发器" },
    });

    expect(wrapper.text()).toContain("触发器");

    await wrapper.find(".vk-tooltip__trigger").trigger("click");
    await waitDebounce();

    const popper = wrapper.find(".vk-tooltip__popper");
    expectPopperOpen(wrapper);
    expect(popper.text()).toContain("提示内容");
    expect(popper.attributes("role")).toBe("tooltip");
    expect(wrapper.find(".vk-tooltip__trigger").attributes("aria-describedby")).toBe(
      popper.attributes("id"),
    );
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);
  });

  it("opens and closes on hover with delay", async () => {
    const wrapper = mountTooltip({
      props: { trigger: "hover", content: "hover content", openDelay: 50, closeDelay: 50 },
      slots: { default: "hover trigger" },
    });

    await wrapper.find(".vk-tooltip__trigger").trigger("mouseenter");
    await new Promise((resolve) => setTimeout(resolve, 60));
    expectPopperOpen(wrapper);

    await wrapper.find(".vk-tooltip").trigger("mouseleave");
    await new Promise((resolve) => setTimeout(resolve, 60));
    expectPopperClosed(wrapper);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([false]);
  });

  it("supports content slot", async () => {
    const wrapper = mountTooltip({
      slots: {
        default: "trigger",
        content: '<span class="custom-content">自定义内容</span>',
      },
    });

    await wrapper.find(".vk-tooltip__trigger").trigger("click");
    await waitDebounce();

    expect(wrapper.find(".custom-content").text()).toBe("自定义内容");
  });

  it("exposes show, hide and update methods in manual mode", async () => {
    const wrapper = mountTooltip({
      props: { manual: true, content: "manual" },
      slots: { default: "trigger" },
    });

    await wrapper.find(".vk-tooltip__trigger").trigger("click");
    expectPopperClosed(wrapper);

    wrapper.vm.show();
    await nextTick();
    expectPopperOpen(wrapper);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);

    wrapper.vm.update();

    wrapper.vm.hide();
    await nextTick();
    expectPopperClosed(wrapper);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([false]);
  });

  it("emits click-outside and closes click tooltip", async () => {
    const wrapper = mountTooltip({
      attachTo: document.body,
      props: { content: "outside" },
      slots: { default: "trigger" },
    });

    await wrapper.find(".vk-tooltip__trigger").trigger("click");
    await waitDebounce();

    document.body.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await waitDebounce();

    expect(wrapper.emitted("click-outside")?.at(-1)).toEqual([true]);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([false]);
    wrapper.unmount();
  });
});
