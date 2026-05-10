import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import Dropdown from "../../components/Dropdown/Dropdown.vue";

const TooltipStub = defineComponent({
  name: "Tooltip",
  props: {
    manual: Boolean,
  },
  emits: ["visible-change"],
  setup(props, { slots, expose, emit }) {
    const visible = ref(false);
    const show = () => {
      visible.value = true;
      emit("visible-change", true);
    };
    const hide = () => {
      visible.value = false;
      emit("visible-change", false);
    };
    expose({ show, hide });

    return () =>
      h("div", { class: "tooltip-stub" }, [
        h("div", { class: "tooltip-trigger", onclick: props.manual ? undefined : show }, slots.default?.()),
        visible.value ? h("div", { class: "tooltip-content" }, slots.content?.()) : null,
      ]);
  },
});

const RenderVnodeStub = defineComponent({
  name: "RenderVNode",
  props: {
    VNode: { type: [String, Object, Number], required: true },
  },
  setup(props) {
    return () => h("span", String(props.VNode));
  },
});

const mountDropdown = (props = {}, slots = { default: "Trigger" }) =>
  mount(Dropdown, {
    props,
    slots,
    global: { stubs: { Tooltip: TooltipStub, RenderVNode: RenderVnodeStub } },
  });

describe("Dropdown", () => {
  const menuOptions = [
    { label: "Action", key: "action" },
    { label: "Disabled", key: "disabled", disabled: true },
    { label: "Divided", key: "divided", divided: true },
  ];

  it("renders trigger slot and menu options", async () => {
    const wrapper = mountDropdown({ menuOptions }, { default: "打开菜单" });

    await wrapper.find(".tooltip-trigger").trigger("click");

    expect(wrapper.text()).toContain("打开菜单");
    expect(wrapper.findAll(".vk-dropdown__item")).toHaveLength(3);
    expect(wrapper.findAll(".divided-placeholder")).toHaveLength(1);
  });

  it("emits select when enabled item is clicked", async () => {
    const wrapper = mountDropdown({ menuOptions });

    await wrapper.find(".tooltip-trigger").trigger("click");
    await wrapper.findAll(".vk-dropdown__item")[0].trigger("click");

    expect(wrapper.emitted("select")?.at(-1)).toEqual([menuOptions[0]]);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([false]);
  });

  it("does not emit select for disabled item", async () => {
    const wrapper = mountDropdown({ menuOptions });

    await wrapper.find(".tooltip-trigger").trigger("click");
    await wrapper.findAll(".vk-dropdown__item")[1].trigger("click");

    expect(wrapper.findAll(".vk-dropdown__item")[1].classes()).toContain("is-disabled");
    expect(wrapper.emitted("select")).toBeFalsy();
  });

  it("supports keyboard toggle", async () => {
    const wrapper = mountDropdown({ menuOptions });

    await wrapper.trigger("keydown", { key: "Enter" });
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);

    await wrapper.trigger("keydown", { key: "Escape" });
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([false]);
  });

  it("keeps menu open after select when hideAfterClick is false", async () => {
    const wrapper = mountDropdown({ menuOptions, hideAfterClick: false });

    await wrapper.find(".tooltip-trigger").trigger("click");
    await wrapper.findAll(".vk-dropdown__item")[0].trigger("click");

    expect(wrapper.emitted("select")?.at(-1)).toEqual([menuOptions[0]]);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);
    expect(wrapper.find(".tooltip-content").exists()).toBe(true);
  });

  it("keeps menu open when disabled item is clicked", async () => {
    const wrapper = mountDropdown({ menuOptions });

    await wrapper.find(".tooltip-trigger").trigger("click");
    await wrapper.findAll(".vk-dropdown__item")[1].trigger("click");

    expect(wrapper.emitted("select")).toBeFalsy();
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);
    expect(wrapper.find(".tooltip-content").exists()).toBe(true);
  });

  it("exposes show and hide methods", async () => {
    const wrapper = mountDropdown({ menuOptions });

    wrapper.vm.show();
    await nextTick();
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);
    expect(wrapper.find(".tooltip-content").exists()).toBe(true);

    wrapper.vm.hide();
    await nextTick();
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([false]);
    expect(wrapper.find(".tooltip-content").exists()).toBe(false);
  });

  it("supports manual mode", async () => {
    const wrapper = mountDropdown({ menuOptions, manual: true });

    await wrapper.find(".tooltip-trigger").trigger("click");
    expect(wrapper.find(".tooltip-content").exists()).toBe(false);
    expect(wrapper.emitted("visible-change")).toBeFalsy();

    wrapper.vm.show();
    await nextTick();
    expect(wrapper.find(".tooltip-content").exists()).toBe(true);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);
  });

  it("renders empty menu without items", async () => {
    const wrapper = mountDropdown({ menuOptions: [] });

    await wrapper.find(".tooltip-trigger").trigger("click");

    expect(wrapper.find(".vk-dropdown__menu").exists()).toBe(true);
    expect(wrapper.findAll(".vk-dropdown__item")).toHaveLength(0);
  });

  it("renders string, number, and vnode labels", async () => {
    const mixedOptions = [
      { label: "String label", key: "string" },
      { label: 100, key: "number" },
      { label: h("strong", "VNode label"), key: "vnode" },
    ];

    const wrapper = mount(Dropdown, {
      props: { menuOptions: mixedOptions },
      slots: { default: "Trigger" },
      global: { stubs: { Tooltip: TooltipStub } },
    });

    await wrapper.find(".tooltip-trigger").trigger("click");

    expect(wrapper.text()).toContain("String label");
    expect(wrapper.text()).toContain("100");
    expect(wrapper.text()).toContain("VNode label");
  });

  it("adds divided class and placeholder for divided item", async () => {
    const wrapper = mountDropdown({ menuOptions });

    await wrapper.find(".tooltip-trigger").trigger("click");

    const dividedItem = wrapper.findAll(".vk-dropdown__item")[2];
    expect(wrapper.findAll(".divided-placeholder")).toHaveLength(1);
    expect(dividedItem.classes()).toContain("is-divided");
  });

  it("sets menu accessibility attributes", async () => {
    const wrapper = mountDropdown({ menuOptions });

    await wrapper.find(".tooltip-trigger").trigger("click");

    const menu = wrapper.find(".vk-dropdown__menu");
    const items = wrapper.findAll(".vk-dropdown__item");

    expect(menu.attributes("role")).toBe("menu");
    expect(menu.attributes("id")).toMatch(/^vk-dropdown-menu-/);
    expect(items[0].attributes("role")).toBe("menuitem");
    expect(items[0].attributes("tabindex")).toBe("-1");
    expect(items[0].attributes("aria-disabled")).toBeUndefined();
    expect(items[1].attributes("aria-disabled")).toBe("true");
    expect(items[0].attributes("id")).toBe("dropdown-item-action");
  });

  it("ignores unrelated keyboard events", async () => {
    const wrapper = mountDropdown({ menuOptions });

    await wrapper.trigger("keydown", { key: "ArrowDown" });

    expect(wrapper.emitted("visible-change")).toBeFalsy();
    expect(wrapper.find(".tooltip-content").exists()).toBe(false);
  });
});
