import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { defineComponent, nextTick } from "vue";
import Input from "../../components/Input/Input.vue";
import { formItemContextKey } from "../../components/Form/types";

const IconStub = defineComponent({
  name: "Icon",
  props: {
    icon: String,
  },
  emits: ["click", "mousedown"],
  template: `<i class="icon-stub" :data-icon="icon" @click="$emit('click', $event)" @mousedown="$emit('mousedown', $event)"></i>`,
});

const mountInput = (options: Parameters<typeof mount>[1] = {}) =>
  mount(Input, {
    ...options,
    global: {
      stubs: { Icon: IconStub, ...(options.global?.stubs ?? {}) },
      provide: options.global?.provide,
    },
  });

describe("Input", () => {
  it("renders input with modelValue, classes, attrs and slots", () => {
    const wrapper = mountInput({
      props: {
        modelValue: "hello",
        type: "text",
        size: "large",
        placeholder: "请输入",
      },
      attrs: { name: "username" },
      slots: {
        prepend: "https://",
        prefix: "P",
        suffix: "S",
        append: ".com",
      },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        "vk-input--text",
        "vk-input--large",
        "is-prepend",
        "is-prefix",
        "is-suffix",
        "is-append",
      ]),
    );
    expect(wrapper.find("input").element.value).toBe("hello");
    expect(wrapper.find("input").attributes("placeholder")).toBe("请输入");
    expect(wrapper.find("input").attributes("name")).toBe("username");
    expect(wrapper.text()).toContain("https://");
    expect(wrapper.text()).toContain("P");
    expect(wrapper.text()).toContain("S");
    expect(wrapper.text()).toContain(".com");
  });

  it("emits input, update:modelValue, change, focus and blur events", async () => {
    const wrapper = mountInput({ props: { modelValue: "" } });
    const input = wrapper.find("input");

    await input.trigger("focus");
    expect(wrapper.classes()).toContain("is-focus");
    expect(wrapper.emitted("focus")).toHaveLength(1);

    await input.setValue("abc");
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["abc"]);
    expect(wrapper.emitted("input")?.at(-1)).toEqual(["abc"]);

    await input.trigger("change");
    expect(wrapper.emitted("change")?.at(-1)).toEqual(["abc"]);

    await input.trigger("blur");
    expect(wrapper.classes()).not.toContain("is-focus");
    expect(wrapper.emitted("blur")).toHaveLength(1);
  });

  it("clears value when clear icon is clicked", async () => {
    const wrapper = mountInput({ props: { modelValue: "abc", clearable: true } });
    const input = wrapper.find("input");

    await input.trigger("focus");
    expect(wrapper.find('[data-icon="circle-xmark"]').exists()).toBe(true);

    await wrapper.find('[data-icon="circle-xmark"]').trigger("click");

    expect(input.element.value).toBe("");
    expect(wrapper.emitted("clear")).toHaveLength(1);
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([""]);
    expect(wrapper.emitted("change")?.at(-1)).toEqual([""]);
  });

  it("toggles password visibility", async () => {
    const wrapper = mountInput({ props: { modelValue: "secret", showPassword: true } });

    expect(wrapper.find("input").attributes("type")).toBe("password");
    expect(wrapper.find('[data-icon="eye-slash"]').exists()).toBe(true);

    await wrapper.find('[data-icon="eye-slash"]').trigger("click");
    expect(wrapper.find("input").attributes("type")).toBe("text");
    expect(wrapper.find('[data-icon="eye"]').exists()).toBe(true);
  });

  it("renders textarea and respects rows, disabled and readonly props", () => {
    const wrapper = mountInput({
      props: {
        type: "textarea",
        modelValue: "content",
        rows: 5,
        disabled: true,
        readonly: true,
      },
    });

    const textarea = wrapper.find("textarea");
    expect(textarea.exists()).toBe(true);
    expect(textarea.element.value).toBe("content");
    expect(textarea.attributes("rows")).toBe("5");
    expect(textarea.attributes("disabled")).toBeDefined();
    expect(textarea.attributes("readonly")).toBeDefined();
    expect(wrapper.classes()).toContain("is-disabled");
  });

  it("syncs inner value when modelValue changes", async () => {
    const wrapper = mountInput({ props: { modelValue: "old" } });

    await wrapper.setProps({ modelValue: "new" });

    expect(wrapper.find("input").element.value).toBe("new");
  });

  it("uses form item context id and runs validation on input, change and blur", async () => {
    const validate = vi.fn().mockResolvedValue(true);
    const wrapper = mountInput({
      global: {
        stubs: { Icon: IconStub },
        provide: {
          [formItemContextKey as symbol]: {
            inputId: "field-id",
            validate,
          },
        },
      },
    });

    const input = wrapper.find("input");
    expect(input.attributes("id")).toBe("field-id");

    await input.setValue("abc");
    await input.trigger("change");
    await input.trigger("blur");
    await nextTick();

    expect(validate).toHaveBeenCalledWith("input");
    expect(validate).toHaveBeenCalledWith("change");
    expect(validate).toHaveBeenCalledWith("blur");
  });
});
