import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import Tooltip from "../../components/Tooltip/Tooltip.vue";

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
    const wrapper = mount(Tooltip, {
      props: { content: "提示内容" },
      slots: { default: "触发器" },
    });

    expect(wrapper.text()).toContain("触发器");

    await wrapper.find(".vk-tooltip__trigger").trigger("click");
    await waitDebounce();

    const popper = wrapper.find(".vk-tooltip__popper");
    expect(popper.exists()).toBe(true);
    expect(popper.text()).toContain("提示内容");
    expect(popper.attributes("role")).toBe("tooltip");
    expect(wrapper.find(".vk-tooltip__trigger").attributes("aria-describedby")).toBe(
      popper.attributes("id"),
    );
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);
  });

  it("opens and closes on hover with delay", async () => {
    vi.useFakeTimers();
    const wrapper = mount(Tooltip, {
      props: { trigger: "hover", content: "hover content", openDelay: 50, closeDelay: 50 },
      slots: { default: "hover trigger" },
    });

    await wrapper.find(".vk-tooltip__trigger").trigger("mouseenter");
    vi.advanceTimersByTime(50);
    await vi.runOnlyPendingTimersAsync();
    expect(wrapper.find(".vk-tooltip__popper").exists()).toBe(true);

    await wrapper.trigger("mouseleave");
    vi.advanceTimersByTime(50);
    await vi.runOnlyPendingTimersAsync();
    expect(wrapper.find(".vk-tooltip__popper").exists()).toBe(false);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([false]);
  });

  it("supports content slot", async () => {
    const wrapper = mount(Tooltip, {
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
    const wrapper = mount(Tooltip, {
      props: { manual: true, content: "manual" },
      slots: { default: "trigger" },
    });

    await wrapper.find(".vk-tooltip__trigger").trigger("click");
    expect(wrapper.find(".vk-tooltip__popper").exists()).toBe(false);

    wrapper.vm.show();
    await waitDebounce();
    expect(wrapper.find(".vk-tooltip__popper").exists()).toBe(true);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);

    wrapper.vm.update();

    wrapper.vm.hide();
    await waitDebounce();
    expect(wrapper.find(".vk-tooltip__popper").exists()).toBe(false);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([false]);
  });

  it("emits click-outside and closes click tooltip", async () => {
    const wrapper = mount(Tooltip, {
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
