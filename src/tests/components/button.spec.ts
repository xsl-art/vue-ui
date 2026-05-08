import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Button from "../../components/Button/Button.vue";

describe("Button", () => {
  it("render default slot and style classes", () => {
    const wrapper = mount(Button, {
      props: {
        type: "primary",
        size: "large",
        plain: true,
        round: true,
      },
      slots: { default: "按钮" },
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.text()).toContain("按钮");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["vk-button--primary", "vk-button--large", "is-plain", "is-round"]),
    );
  });

  it("sets native type and disabled status", () => {
    const wrapper = mount(Button, {
      props: {
        nativeType: "submit",
        disabled: true,
      },
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.attributes("type")).toBe("submit");
    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.classes()).toContain("is-disabled");
  });

  it("disabled button while loading", () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
    expect(wrapper.classes()).toContain("is-loading");
  });

  it("uses button as default native type", () => {
    const wrapper = mount(Button, {
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.attributes("type")).toBe("button");
  });

  it("render circle and autofocus attributes", () => {
    const wrapper = mount(Button, {
      props: {
        circle: true,
        autofocus: true,
      },
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.classes()).toContain("is-circle");
    expect(wrapper.attributes("autofocus")).toBeDefined();
  });

  it("sets aria attributes when disabled or loading", () => {
    const disabledWrapper = mount(Button, {
      props: { disabled: true },
      global: { stubs: { Icon: true } },
    });
    expect(disabledWrapper.attributes("aria-disabled")).toBe("true");
    const loadingWrapper = mount(Button, {
      props: { loading: true },
      global: { stubs: { Icon: true } },
    });
    expect(loadingWrapper.attributes("aria-busy")).toBe("true");
    expect(loadingWrapper.attributes("aria-disabled")).toBe("true");
  });

  it("renders icon when icon prop is provided", () => {
    const wrapper = mount(Button, {
      props: { icon: "search" },
      global: { stubs: { Icon: true } },
    });
    const icon = wrapper.findComponent({ name: "Icon" });
    expect(icon.exists()).toBe(true);
    expect(icon.attributes("icon")).toBe("search");
  });

  it("renders loading spinner before icon when loading", () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
        icon: "search",
      },
      global: { stubs: { Icon: true } },
    });
    const icons = wrapper.findAllComponents({ name: "Icon" });
    expect(icons).toHaveLength(2);
    expect(icons[0].attributes("icon")).toBe("spinner");
    expect(icons[0].attributes("spin")).toBeDefined();
  });
});
