import { defineComponent } from "vue";
import Collapse from "../../components/Collapse/Collapse.vue";
import CollapseItem from "../../components/Collapse/CollapseItem.vue";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";

const Demo = defineComponent({
  components: { Collapse, CollapseItem },
  props: {
    modelValue: { type: Array, default: () => [] },
    accordion: { type: Boolean, default: false },
  },
  template: `
      <Collapse :model-value="modelValue" :accordion="accordion">
      <CollapseItem name="one" title="One">Content One</CollapseItem>
      <CollapseItem name="two" title="Two">Content Two</CollapseItem>
      <CollapseItem name="disabled" title="Disabled" disabled>Disabled Content</CollapseItem>
    </Collapse>
  `,
});

describe("Collapse", () => {
  it("render active item content", () => {
    const wrapper = mount(Demo, {
      props: {
        modelValue: ["one"],
      },
      global: { stubs: { Icon: true } },
    });

    const contents = wrapper.findAll(".vk-collapse-item__content");
    expect(contents[0].isVisible()).toBe(true);
    expect(contents[0].text()).toContain("Content One");
    expect(contents[1].isVisible()).toBe(false);
  });

  it("emits change and update:modelValue when item header is clicked", async () => {
    const wrapper = mount(Demo, {
      props: { modelValue: ["one"] },
      global: { stubs: { Icon: true } },
    });

    await wrapper.findAll(".vk-collapse-item__header")[1].trigger("click");
    const collapse = wrapper.findComponent(Collapse);

    expect(collapse.emitted("change")?.at(-1)).toEqual([["one", "two"]]);
    expect(collapse.emitted("update:modelValue")?.at(-1)).toEqual([["one", "two"]]);
  });

  it("closes active item when its header is clicked", async () => {
    const wrapper = mount(Demo, {
      props: { modelValue: ["one"] },
      global: { stubs: { Icon: true } },
    });
    await wrapper.findAll(".vk-collapse-item__header")[0].trigger("click");
    const collapse = wrapper.findComponent(Collapse);
    expect(collapse.emitted("change")?.at(-1)).toEqual([[]]);
    expect(collapse.emitted("update:modelValue")?.at(-1)).toEqual([[]]);
  });

  it("closes active item when clicked again in accordion mode", async () => {
    const wrapper = mount(Demo, {
      props: { modelValue: ["one"], accordion: true },
      global: { stubs: { Icon: true } },
    });
    await wrapper.findAll(".vk-collapse-item__header")[0].trigger("click");
    const collapse = wrapper.findComponent(Collapse);
    expect(collapse.emitted("change")?.at(-1)).toEqual([[]]);
    expect(collapse.emitted("update:modelValue")?.at(-1)).toEqual([[]]);
  });

  it("keeps only one active item in accordion mode", async () => {
    const wrapper = mount(Demo, {
      props: { modelValue: ["one"], accordion: true },
      global: { stubs: { Icon: true } },
    });

    await wrapper.findAll(".vk-collapse-item__header")[1].trigger("click");
    const collapse = wrapper.findComponent(Collapse);

    expect(collapse.emitted("change")?.at(-1)).toEqual([["two"]]);
  });

  it("does not emit when disabled item is clicked", async () => {
    const wrapper = mount(Demo, {
      props: { modelValue: [] },
      global: { stubs: { Icon: true } },
    });

    await wrapper.findAll(".vk-collapse-item__header")[2].trigger("click");
    expect(wrapper.findComponent(Collapse).emitted("change")).toBeFalsy();
  });

  it("warns with accordion receives multiple actives names", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    mount(Demo, {
      props: { modelValue: ["one", "two"], accordion: true },
      global: { stubs: { Icon: true } },
    });

    expect(warn).toHaveBeenCalledWith("accordion mode should only have one active item");
    warn.mockRestore();
  });

  it("updates active items when modelValue prop changes", async () => {
    const wrapper = mount(Demo, {
      props: { modelValue: ["one"] },
      global: { stubs: { Icon: true } },
    });
    await wrapper.setProps({ modelValue: ["two"] });
    const contents = wrapper.findAll(".vk-collapse-item__content");
    expect(contents[0].isVisible()).toBe(false);
    expect(contents[1].isVisible()).toBe(true);
    expect(contents[1].text()).toContain("Content Two");
  });

  it("toggles item when Enter key is pressed on header", async () => {
    const wrapper = mount(Demo, {
      props: { modelValue: [] },
      global: { stubs: { Icon: true } },
    });
    await wrapper.findAll(".vk-collapse-item__header")[0].trigger("keydown.enter");
    const collapse = wrapper.findComponent(Collapse);
    expect(collapse.emitted("change")?.at(-1)).toEqual([["one"]]);
  });

  it("toggles item when Space key is pressed on header", async () => {
    const wrapper = mount(Demo, {
      props: { modelValue: [] },
      global: { stubs: { Icon: true } },
    });
    await wrapper.findAll(".vk-collapse-item__header")[1].trigger("keydown.space");
    const collapse = wrapper.findComponent(Collapse);
    expect(collapse.emitted("change")?.at(-1)).toEqual([["two"]]);
  });

  it("applies disabled class to disabled item", () => {
    const wrapper = mount(Demo, {
      props: { modelValue: [] },
      global: { stubs: { Icon: true } },
    });
    const disabledItem = wrapper.findAll(".vk-collapse-item")[2];
    const disabledHeader = wrapper.findAll(".vk-collapse-item__header")[2];
    expect(disabledItem.classes()).toContain("is-disabled");
    expect(disabledHeader.classes()).toContain("is-disabled");
  });

  it("sets active class and aria-hidden according to active state", () => {
    const wrapper = mount(Demo, {
      props: { modelValue: ["one"] },
      global: { stubs: { Icon: true } },
    });
    const headers = wrapper.findAll(".vk-collapse-item__header");
    const wrappers = wrapper.findAll(".vk-collapse-item__wrapper");
    expect(headers[0].classes()).toContain("is-active");
    expect(headers[1].classes()).not.toContain("is-active");
    expect(wrappers[0].attributes("aria-hidden")).toBe("false");
    expect(wrappers[1].attributes("aria-hidden")).toBe("true");
  });

  it("renders custom title slot", () => {
    const CustomTitleDemo = defineComponent({
      components: { Collapse, CollapseItem },
      template: `
        <Collapse :model-value="[]">
          <CollapseItem name="one" title="Default Title">
            <template #title>
              <span class="custom-title">Custom Title</span>
            </template>
            Content
          </CollapseItem>
        </Collapse>
      `,
    });
    const wrapper = mount(CustomTitleDemo, {
      global: { stubs: { Icon: true } },
    });
    expect(wrapper.find(".custom-title").exists()).toBe(true);
    expect(wrapper.find(".custom-title").text()).toBe("Custom Title");
    expect(wrapper.find(".vk-collapse-item__header").text()).not.toContain("Default Title");
  });

  it("supports number type item names", async () => {
    const NumberNameDemo = defineComponent({
      components: { Collapse, CollapseItem },
      template: `
        <Collapse :model-value="[1]">
          <CollapseItem :name="1" title="One">Number One</CollapseItem>
          <CollapseItem :name="2" title="Two">Number Two</CollapseItem>
        </Collapse>
      `,
    });

    const wrapper = mount(NumberNameDemo, {
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.find(".vk-collapse-item__content").isVisible()).toBe(true);

    await wrapper.findAll(".vk-collapse-item__header")[1].trigger("click");

    expect(wrapper.findComponent(Collapse).emitted("change")?.at(-1)).toEqual([[1, 2]]);
  });

  it("uses empty array as default modelValue", () => {
    const DefaultDemo = defineComponent({
      components: { Collapse, CollapseItem },
      template: `
        <Collapse>
          <CollapseItem name="one" title="One">Content One</CollapseItem>
        </Collapse>
      `,
    });

    const wrapper = mount(DefaultDemo, {
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.find(".vk-collapse-item__content").isVisible()).toBe(false);
  });

  it("renders accessibility attributes", () => {
    const wrapper = mount(Demo, {
      props: { modelValue: ["one"] },
      global: { stubs: { Icon: true } },
    });

    const header = wrapper.findAll(".vk-collapse-item__header")[0];
    const content = wrapper.findAll(".vk-collapse-item__wrapper")[0];

    expect(header.attributes("id")).toBe("item-header-one");
    expect(header.attributes("role")).toBe("heading");
    expect(header.attributes("aria-level")).toBe("3");

    expect(content.attributes("id")).toBe("item-content-one");
    expect(content.attributes("role")).toBe("region");
    expect(content.attributes("aria-labelledby")).toBe("item-header-one");
    expect(content.attributes("aria-hidden")).toBe("false");
  });
});
