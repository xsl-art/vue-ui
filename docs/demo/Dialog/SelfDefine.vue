<template>
  <VkButton type="primary" @click="visible = true">点击弹出对话框</VkButton>
  <VkDialog v-model="visible" title="提示" width="480px" @close="() => { }" @closed="() => { }" modal draggable>
    <p>请输入个人邮箱和密码</p>
    <VkForm :model="model" :rules="rules" ref="formRef">
      <VkFormItem label="邮箱" prop="email">
        <VkInput v-model="model.email" />
      </VkFormItem>
      <VkFormItem label="密码" prop="password">
        <VkInput type="password" v-model="model.password" />
      </VkFormItem>
      <VkFormItem label="confirmPwd" prop="confirmPwd">
        <VkInput type="password" v-model="model.confirmPwd" />
      </VkFormItem>
    </VkForm>
    <template #footer>
      <VkButton type="primary" native-type="reset" @click.prevent="submit">Submit</VkButton>
      <VkButton type="danger" @click="open">Error</VkButton>
      <VkButton @click.prevent="reset">Reset</VkButton>
      <VkButton type="info" @click="show = true">点击弹出对话框</VkButton>
    </template>
  </VkDialog>
  <VkDialog v-model="show" title="提示" width="500px" @close="() => { }" @closed="() => { }" modal draggable>
    <p>请输入个人邮箱和密码</p>
    <VkForm :model="model" :rules="rules" ref="formRef">
      <VkFormItem label="邮箱" prop="email">
        <VkInput v-model="model.email" />
      </VkFormItem>
      <VkFormItem label="密码" prop="password">
        <VkInput type="password" v-model="model.password" />
      </VkFormItem>
    </VkForm>
    <template #footer>
      <VkButton type="primary" native-type="reset" @click.prevent="submit">Submit</VkButton>
      <VkButton type="danger" @click="open">Error</VkButton>
      <VkButton @click.prevent="reset">Reset</VkButton>
    </template>
  </VkDialog>
</template>

<script setup lang="ts">
import VkButton from '@/components/Button/Button.vue'
import VkDialog from '@/components/Dialog/Dialog.vue'
import type { FormInstance, FormRules } from '@/components/Form/types';
import VkForm from '@/components/Form/Form.vue'
import VkFormItem from '@/components/Form/FormItem.vue'
import VkInput from '@/components/Input/Input.vue';
import { reactive, ref } from 'vue'
import { createMessage } from '@/index';
const visible = ref(false);
const show = ref(false)
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
  await formRef.value?.validate();
};
const reset = () => {
  formRef.value?.resetFields();
};

const open = () => createMessage({ message: '失败警告', closable: true, type: 'danger' })
</script>
