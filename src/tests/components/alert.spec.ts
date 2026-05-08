import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Alert from "../../components/Alert/Alert.vue";
import { defineComponent, nextTick } from "vue";

//基于 Vue Test Utils 的行为驱动组件单元测试，使用 stub 隔离子组件，偏黑盒测试风格。
describe("Alert", () => {
  const DialogStub = defineComponent({
    props: {
      modelValue: Boolean,
      title: String,
    },
    emits: ["update:modelValue"],
    template: `
      <div v-if="modelValue" class="vk-dialog-overlay">
        <span>{{ title }}</span>
        <slot />
        <slot name="footer" />
      </div>
    `,
  });

  const ButtonStub = defineComponent({
    emits: ["click"],
    template: `<button type="button" @click="$emit('click')"><slot /></button>`,
  });

  it("render title,content and state classes", () => {
    const wrapper = mount(Alert, {
      props: {
        title: "提示标题",
        content: "提示内容",
        type: "info",
        effect: "dark",
        center: true,
        closable: true,
      },
      global: { stubs: { Icon: true } },
    });

    const alert = wrapper.find(".vk-alert");
    expect(alert.attributes("role")).toBe("alert");
    expect(wrapper.text()).toContain("提示标题");
    expect(wrapper.text()).toContain("提示内容");
    expect(alert.classes()).toEqual(
      expect.arrayContaining(["vk-alert--info", "vk-alert--dark", "is-center", "is-closable"]),
    );
  });

  it("should show dialog when close button is clicked, and hide alert only after confirm", async () => {
    const wrapper = mount(Alert, {
      props: {
        title: "可关闭提示",
        type: "info",
        closable: true,
      },
      global: { stubs: { Icon: true, Dialog: DialogStub, Button: ButtonStub } },
    });

    expect(wrapper.find(".vk-alert").exists()).toBe(true);

    const closeBtn = wrapper.find(".vk-alert__clear");
    expect(closeBtn.exists()).toBe(true);

    await closeBtn.trigger("click");
    await nextTick();

    expect(wrapper.text()).toContain("提示");
    expect(wrapper.text()).toContain("确定删除这条信息吗？");
    expect(wrapper.find(".vk-alert").exists()).toBe(true);

    const cancelButton = wrapper.findAll("button").find((btn) => btn.text() === "取消");
    expect(cancelButton).toBeDefined();
    await cancelButton!.trigger("click");
    await nextTick();

    expect(wrapper.text()).not.toContain("确定删除这条信息吗？");
    expect(wrapper.find(".vk-alert").exists()).toBe(true);

    await closeBtn.trigger("click");
    await nextTick();
    expect(wrapper.text()).toContain("确定删除这条信息吗？");

    const confirmButton = wrapper.findAll("button").find((btn) => btn.text() === "确定");
    expect(confirmButton).toBeDefined();
    await confirmButton!.trigger("click");
    await nextTick();

    expect(wrapper.find(".vk-alert").exists()).toBe(false);
    expect(wrapper.emitted("close")).toBeTruthy();
    expect(wrapper.emitted("close")?.length).toBe(1);
  });

  it("support title and content self define slots", () => {
    const wrapper = mount(Alert, {
      slots: {
        title: "自定义标题",
        content: "自定义内容",
      },
      global: { stubs: { Icon: true } },
    });

    expect(wrapper.find(".vk-alert__title").text()).toBe("自定义标题");
    expect(wrapper.find(".vk-alert__description").text()).toBe("自定义内容");
  });
});
