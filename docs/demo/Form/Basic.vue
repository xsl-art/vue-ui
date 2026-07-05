<script lang="ts" setup>
import VkForm from "@/components/Form/Form.vue";
import VkFormItem from "@/components/Form/FormItem.vue";
import VkInput from "@/components/Input/Input.vue";
import VkButton from "@/components/Button/Button.vue";
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
      validator: (value) => value === model.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
};

const submit = async () => {
  await formRef.value.validate();
};

const reset = () => {
  formRef.value.resetFields();
};
</script>

<template>
  <div>
    <VkForm :model="model" :rules="rules" ref="formRef" label-position="top">
      <VkFormItem label="the email" prop="email">
        <VkInput v-model="model.email" />
      </VkFormItem>
      <VkFormItem label="the password" prop="password">
        <!--  <template #label="{ label }">
          <VkButton>{{ label }}</VkButton>
        </template> -->
        <VkInput type="password" v-model="model.password" />
      </VkFormItem>
      <VkFormItem label="test" prop="test">
        <template #default="{ validate }">
          <input class="origin-input" type="text" v-model="model.test" @blur="() => validate()" />
        </template>
      </VkFormItem>
      <VkFormItem label="confirmPwd" prop="confirmPwd">
        <VkInput type="password" v-model="model.confirmPwd" />
      </VkFormItem>
      <div>
        <VkButton type="primary" @click.prevent="submit">Submit</VkButton>
        <VkButton @click.prevent="reset">Reset</VkButton>
      </div>
    </VkForm>
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
