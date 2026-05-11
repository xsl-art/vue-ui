import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, nextTick, reactive } from "vue";
import Form from "../../components/Form/Form.vue";
import FormItem from "../../components/Form/FormItem.vue";
import Input from "../../components/Input/Input.vue";

const IconStub = defineComponent({
  name: "Icon",
  props: { icon: String },
  template: `<i class="icon-stub" :data-icon="icon"></i>`,
});

const FormHost = defineComponent({
  components: { Form, FormItem, Input },
  setup() {
    const model = reactive({ username: "", password: "123456" });
    const rules = {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ min: 6, message: "密码至少 6 位" }],
    };
    return { model, rules };
  },
  template: `
    <Form ref="formRef" :model="model" :rules="rules" label-position="left">
      <FormItem label="用户名" prop="username">
        <Input v-model="model.username" placeholder="用户名" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="model.password" placeholder="密码" />
      </FormItem>
    </Form>
  `,
});

type FormHostVm = InstanceType<typeof FormHost> & {
  model: {
    username: string;
    password: string;
  };
};

const mountForm = () => mount(FormHost, { global: { stubs: { Icon: IconStub } } });
const getFormVm = (wrapper: ReturnType<typeof mount>) => wrapper.findComponent(Form).vm;

beforeEach(() => {
  //每个测试用例之前屏蔽控制台输出信息
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Form", () => {
  it("renders label position class, labels and binds input ids", () => {
    const wrapper = mountForm();

    expect(wrapper.find(".vk-form").classes()).toContain("vk-form--label-left");
    const labels = wrapper.findAll(".vk-form-item__label");
    expect(labels[0].text()).toBe("用户名");
    expect(labels[1].text()).toBe("密码");
    expect(labels[0].attributes("for")).toBe(wrapper.findAll("input")[0].attributes("id"));
    expect(labels[0].attributes("aria-required")).toBe("true");
  });

  it("validates fields and shows error message on blur", async () => {
    const wrapper = mountForm();

    await wrapper.findAll("input")[0].trigger("blur");
    await nextTick();

    const firstItem = wrapper.findAll(".vk-form-item")[0];
    expect(firstItem.classes()).toContain("is-error");
    expect(firstItem.find(".vk-form-item__error-msg").text()).toBe("请输入用户名");
    expect(firstItem.find(".vk-form-item__error-msg").attributes("role")).toBe("alert");
  });

  it("passes validation after input and submit validation", async () => {
    const wrapper = mountForm();
    const input = wrapper.findAll("input")[0];

    await input.setValue("Tom");
    await input.trigger("blur");
    await nextTick();
    await expect(getFormVm(wrapper).validate()).resolves.toBe(true);

    expect(wrapper.findAll(".vk-form-item")[0].classes()).toContain("is-success");
  });

  it("rejects validate when any registered field fails", async () => {
    const wrapper = mountForm();

    await expect(getFormVm(wrapper).validate()).rejects.toHaveProperty("username");
  });

  it("resets selected fields and clears validation state", async () => {
    const wrapper = mountForm();
    const input = wrapper.findAll("input")[0];

    await input.setValue("Tom");
    await input.trigger("blur");
    expect((wrapper.vm as FormHostVm).model.username).toBe("Tom");

    getFormVm(wrapper).resetFields(["username"]);
    await nextTick();

    expect((wrapper.vm as FormHostVm).model.username).toBe("");
    expect(wrapper.findAll(".vk-form-item")[0].classes()).not.toContain("is-success");
  });

  it("clears selected validation states", async () => {
    const wrapper = mountForm();

    await wrapper.findAll("input")[0].trigger("blur");
    await nextTick();
    expect(wrapper.findAll(".vk-form-item")[0].classes()).toContain("is-error");

    getFormVm(wrapper).clearFields(["username"]);
    await nextTick();

    expect(wrapper.findAll(".vk-form-item")[0].classes()).not.toContain("is-error");
    expect(wrapper.find(".vk-form-item__error-msg").exists()).toBe(false);
  });
});

describe("FormItem", () => {
  it("supports custom label slot and default slot validate function", async () => {
    const Host = defineComponent({
      components: { Form, FormItem },
      setup() {
        const model = reactive({ email: "" });
        const rules = { email: [{ required: true, message: "请输入邮箱" }] };
        return { model, rules };
      },
      template: `
        <Form :model="model" :rules="rules">
          <FormItem prop="email">
            <template #label="{ label, inputId, errorId }">
              <span class="custom-label" :data-input-id="inputId" :data-error-id="errorId">{{ label || '邮箱' }}</span>
            </template>
            <template #default="{ validate }">
              <button type="button" class="validate-btn" @click="validate().catch(() => {})">校验</button>
            </template>
          </FormItem>
        </Form>
      `,
    });
    const wrapper = mount(Host);

    await wrapper.find(".validate-btn").trigger("click");
    await nextTick();

    expect(wrapper.find(".custom-label").text()).toBe("邮箱");
    expect(wrapper.find(".custom-label").attributes("data-input-id")).toMatch(/^vk-form-item-/);
    expect(wrapper.find(".custom-label").attributes("data-error-id")).toMatch(/^vk-form-item-/);
    expect(wrapper.find(".vk-form-item").classes()).toContain("is-error");
  });
});
