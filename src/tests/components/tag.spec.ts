import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Tag from "../../components/Tag/Tag.vue";

describe("Tag", () => {
  it("renders slot content and style classes", () => {
    const wrapper = mount(Tag, {
      props: {
        type: "success",
        size: "large",
        effect: "dark",
        round: true,
      },
      slots: { default: "标签" },
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.text()).toContain("标签");
    expect(wrapper.attributes("role")).toBe("tag");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["vk-tag--success", "vk-tag--large", "vk-tag--dark", "is-round"]),
    );
  });

  it("uses default type, effect and size", () => {
    const wrapper = mount(Tag, {
      slots: { default: "默认标签" },
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["vk-tag--primary", "vk-tag--small", "vk-tag--light"]),
    );
  });

  it("closes and emits close when close icon is clicked", async () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: { default: "可关闭" },
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.classes()).toContain("is-closable");
    await wrapper.find(".icon").trigger("click");

    expect(wrapper.emitted("close")).toHaveLength(1);
    expect(wrapper.find(".vk-tag").exists()).toBe(false);
  });

  it("does not close when disabled", async () => {
    const wrapper = mount(Tag, {
      props: { closable: true, disabled: true },
      slots: { default: "禁用" },
      global: { stubs: { Icon: true } },
    });

    await wrapper.find(".icon").trigger("click");

    expect(wrapper.classes()).toContain("is-disabled");
    expect(wrapper.find(".vk-tag").exists()).toBe(true);
    expect(wrapper.emitted("close")).toBeFalsy();
  });
});
