import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import Select from "../../components/Select/Select.vue";

const TooltipStub = defineComponent({
  name: "Tooltip",
  emits: ["click-outside"],
  setup(_, { slots, expose, emit }) {
    const visible = ref(false);
    const show = () => {
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
    };
    const update = vi.fn();
    expose({ show, hide, update });

    return () =>
      h("div", { class: "tooltip-stub" }, [
        h("div", { class: "tooltip-default" }, slots.default?.()),
        visible.value
          ? h(
              "div",
              {
                class: "tooltip-content",
                onClick: () => emit("click-outside", true),
              },
              slots.content?.(),
            )
          : null,
      ]);
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
    return () => h("span", props.VNode as string);
  },
});

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Disabled", value: "disabled", disabled: true },
];

const mountSelect = (props = {}) =>
  mount(Select, {
    props: {
      modelValue: "",
      options,
      ...props,
    },
    global: {
      stubs: {
        Tooltip: TooltipStub,
        Icon: IconStub,
        RenderVNode: RenderVnodeStub,
      },
    },
  });

const waitDebounce = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("Select", () => {
  it("renders placeholder and opens options with accessibility attributes", async () => {
    const wrapper = mountSelect({ placeholder: "请选择" });

    expect(wrapper.find("input").attributes("placeholder")).toBe("请选择");

    await wrapper.find(".vk-select").trigger("click");
    await nextTick();

    const menu = wrapper.find(".vk-select__menu");
    const items = wrapper.findAll(".vk-select__menu-item");
    expect(menu.attributes("role")).toBe("listbox");
    expect(wrapper.find("input").attributes("aria-expanded")).toBe("true");
    expect(wrapper.find("input").attributes("aria-controls")).toBe(menu.attributes("id"));
    expect(items).toHaveLength(3);
    expect(items[0].text()).toContain("Apple");
    expect(items[2].classes()).toContain("is-disabled");
    expect(items[2].attributes("aria-disabled")).toBe("true");
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([true]);
  });

  it("selects an enabled option and closes dropdown", async () => {
    const wrapper = mountSelect();

    await wrapper.find(".vk-select").trigger("click");
    await wrapper.findAll(".vk-select__menu-item")[1].trigger("click");

    expect(wrapper.find("input").element.value).toBe("Banana");
    expect(wrapper.emitted("change")?.at(-1)).toEqual(["banana"]);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["banana"]);
    expect(wrapper.emitted("visible-change")?.at(-1)).toEqual([false]);
    expect(wrapper.find(".tooltip-content").exists()).toBe(false);
  });

  it("does not select disabled option", async () => {
    const wrapper = mountSelect();

    await wrapper.find(".vk-select").trigger("click");
    await wrapper.findAll(".vk-select__menu-item")[2].trigger("click");

    expect(wrapper.emitted("change")).toBeFalsy();
    expect(wrapper.find(".tooltip-content").exists()).toBe(true);
  });

  it("supports keyboard navigation and selection", async () => {
    const wrapper = mountSelect();
    const input = wrapper.find("input");

    await input.trigger("keydown", { key: "ArrowDown" });
    await nextTick();
    expect(wrapper.find(".vk-select__menu-item.is-highlighted").text()).toContain("Apple");

    await input.trigger("keydown", { key: "ArrowDown" });
    expect(wrapper.find(".vk-select__menu-item.is-highlighted").text()).toContain("Banana");

    await input.trigger("keydown", { key: "Enter" });
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["banana"]);
  });

  it("filters options with built-in and custom filter methods", async () => {
    const wrapper = mountSelect({ filterable: true });

    await wrapper.find(".vk-select").trigger("click");
    await wrapper.find("input").setValue("App");
    await waitDebounce();

    expect(wrapper.findAll(".vk-select__menu-item")).toHaveLength(1);
    expect(wrapper.text()).toContain("Apple");

    const filterMethod = vi.fn((value: string) => options.filter((option) => option.value.includes(value)));
    const customWrapper = mountSelect({ filterable: true, filterMethod });
    await customWrapper.find(".vk-select").trigger("click");
    await customWrapper.find("input").setValue("ban");
    await waitDebounce();

    expect(filterMethod).toHaveBeenCalledWith("ban");
    expect(customWrapper.findAll(".vk-select__menu-item")).toHaveLength(1);
    expect(customWrapper.text()).toContain("Banana");
  });

  it("renders no data when filter has no match", async () => {
    const wrapper = mountSelect({ filterable: true });

    await wrapper.find(".vk-select").trigger("click");
    await wrapper.find("input").setValue("none");
    await waitDebounce();

    expect(wrapper.find(".vk-select__nodata").text()).toBe("no match data!!!");
  });

  it("loads remote options", async () => {
    const remoteMethod = vi.fn().mockResolvedValue([{ label: "Remote", value: "remote" }]);
    const wrapper = mountSelect({ filterable: true, remote: true, remoteMethod });

    await wrapper.find(".vk-select").trigger("click");
    await wrapper.find("input").setValue("re");
    await new Promise((resolve) => setTimeout(resolve, 320));
    await nextTick();

    expect(remoteMethod).toHaveBeenCalledWith("re");
    expect(wrapper.text()).toContain("Remote");
  });

  it("clears selected value when clear icon is clicked", async () => {
    const wrapper = mountSelect({ modelValue: "apple", clearabled: true });

    await wrapper.find(".vk-select").trigger("mouseenter");
    await nextTick();
    expect(wrapper.find('[aria-label="Clear selection"]').exists()).toBe(true);

    await wrapper.find('[aria-label="Clear selection"]').trigger("click");

    expect(wrapper.emitted("clear")).toHaveLength(1);
    expect(wrapper.emitted("change")?.at(-1)).toEqual([""]);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([""]);
  });

  it("supports multiple selection, tag removal and Backspace removal", async () => {
    const wrapper = mountSelect({ modelValue: ["apple"], multiple: true });

    expect(wrapper.find(".vk-select__tags").text()).toContain("Apple");

    await wrapper.find(".vk-select").trigger("click");
    await wrapper.findAll(".vk-select__menu-item")[1].trigger("click");

    expect(wrapper.emitted("multiple-choose")?.at(-1)).toEqual([["apple", "banana"]]);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([["apple", "banana"]]);

    await wrapper.findAll(".icon")[0].trigger("click");
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([["banana"]]);

    await wrapper.find("input").trigger("keydown", { key: "Backspace" });
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([[]]);
  });

  it("does not open when disabled and syncs modelValue changes", async () => {
    const wrapper = mountSelect({ disabled: true, modelValue: "apple" });

    await wrapper.find(".vk-select").trigger("click");
    expect(wrapper.classes()).toContain("is-disabled");
    expect(wrapper.find(".tooltip-content").exists()).toBe(false);

    await wrapper.setProps({ disabled: false, modelValue: "banana" });
    expect(wrapper.find("input").element.value).toBe("Banana");
  });
});
