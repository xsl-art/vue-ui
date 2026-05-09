import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Switch from "../../components/Switch/Switch.vue";

describe("Switch", () => {
  it("renders checked status, text, size and input attributes", () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        activeText: "开",
        inactiveText: "关",
        name: "enabled",
        size: "large",
      },
    });

    const input = wrapper.find("input");
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["vk-switch--large", "is-checked"]));
    expect(wrapper.text()).toContain("开");
    expect(input.attributes("role")).toBe("switch");
    expect(input.attributes("name")).toBe("enabled");
    expect(input.attributes("aria-checked")).toBe("true");
    expect(input.attributes("aria-label")).toBe("开");
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it("toggles value by click and emits events", async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        activeValue: "on",
        inactiveValue: "off",
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["on"]);
    expect(wrapper.emitted("change")?.at(-1)).toEqual(["on"]);
    expect(wrapper.classes()).toContain("is-checked");
  });

  it("toggles with Enter key", async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } });

    await wrapper.find("input").trigger("keydown.enter");

    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([true]);
  });

  it("does not toggle when disabled", async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true,
        inactiveText: "禁用",
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.classes()).toContain("is-disabled");
    expect(wrapper.find("input").attributes("disabled")).toBeDefined();
    expect(wrapper.find("input").attributes("aria-disabled")).toBe("true");
    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });

  it("syncs when modelValue changes", async () => {
    const wrapper = mount(Switch, { props: { modelValue: false } });

    await wrapper.setProps({ modelValue: true });

    expect(wrapper.classes()).toContain("is-checked");
    expect((wrapper.find("input").element as HTMLInputElement).checked).toBe(true);
  });
});
