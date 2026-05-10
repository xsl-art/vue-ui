<script lang="ts" setup>
import Form from "@/components/Form/Form.vue";
import FormItem from "@/components/Form/FormItem.vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import { reactive, ref } from "vue";
import type { FormRules } from "@/components/Form";

const formRef = ref();
const model = reactive({
  email: "",
  password: "",
  test: "",
  confirmPwd: "",
});

const rules: FormRules = {
  email: [{ type: "email", required: true, trigger: "blur" }],
  password: [{ type: "string", required: true, trigger: "blur", min: 3, max: 5 }],
  test: [{ type: "string", required: true, trigger: "blur" }],
  confirmPwd: [
    { type: "string", required: true, trigger: "blur" },
    {
      validator: (value: any) => value === model.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
};

const submit = async () => {
  try {
    await formRef.value.validate();
    console.log("passed");
  } catch (e) {
    console.log("the error", e);
  }
};

const reset = () => {
  formRef.value.resetFields();
};
</script>

<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef" label-position="top">
      <FormItem label="the email" prop="email">
        <Input v-model="model.email" />
      </FormItem>
      <FormItem label="the password" prop="password">
        <!--  <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template> -->
        <Input type="password" v-model="model.password" />
      </FormItem>
      <FormItem label="test" prop="test">
        <template #default="{ validate }">
          <input class="origin-input" type="text" v-model="model.test" @blur="() => validate()" />
        </template>
      </FormItem>
      <FormItem label="confirmPwd" prop="confirmPwd">
        <Input type="password" v-model="model.confirmPwd" />
      </FormItem>
      <div>
        <Button type="primary" @click.prevent="submit">Submit</Button>
        <Button @click.prevent="reset">Reset</Button>
      </div>
    </Form>
    <div class="form-demo-value">
      <span>form value:</span>
      <pre>{{ model }}</pre>
    </div>
  </div>
</template>

<style>
.origin-input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
