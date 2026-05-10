<template>
  <Button type="primary" @click="visible = true">点击弹出对话框</Button>
  <Dialog v-model="visible" title="提示" width="480px" @close="() => { }" @closed="() => { }" modal>
    <p>请输入个人邮箱和密码</p>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="邮箱" prop="email">
        <Input v-model="model.email" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="model.password" />
      </FormItem>
      <FormItem label="confirmPwd" prop="confirmPwd">
        <Input type="password" v-model="model.confirmPwd" />
      </FormItem>
    </Form>
    <template #footer>
      <Button type="primary" native-type="reset" @click.prevent="submit">Submit</Button>
      <Button @click.prevent="reset">Reset</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import Dialog from '@/components/Dialog/Dialog.vue'
import type { FormInstance, FormRules } from '@/components/Form/types';
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue';
import { reactive, ref } from 'vue'
const visible = ref(false);
const model = reactive({
  email: "",
  password: "",
  test: "",
  confirmPwd: "",
});

const rules: FormRules = {
  email: [{ type: "email", required: true, trigger: "blur" }],
  password: [{ type: "string", required: true, trigger: "blur", min: 3, max: 5 }],
  confirmPwd: [
    { type: "string", required: true, trigger: "blur" },
    {
      validator: (_rule, value) => value === model.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
};
const formRef = ref<FormInstance>();

const submit = async () => {
  try {
    await formRef.value?.validate();
    console.log("passed");
  } catch (e) {
    console.log("the error", e);
  }
};
const reset = () => {
  formRef.value?.resetFields();
};
</script>
