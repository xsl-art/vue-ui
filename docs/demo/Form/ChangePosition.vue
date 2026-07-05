<script lang="ts" setup>
import VkForm from "@/components/Form/Form.vue";
import VkFormItem from "@/components/Form/FormItem.vue";
import VkInput from "@/components/Input/Input.vue";
import VkButton from "@/components/Button/Button.vue";
import type { FormRules, LabelPosition } from '@/components/Form/types'
import { reactive, ref } from "vue";

const model = reactive({
  email: "",
  password: "",
  confirmPwd: "",
});

const rules: FormRules = {
  email: [{ type: "email", required: true, trigger: "blur" }],
  password: [{ type: "string", required: true, trigger: "blur", min: 3, max: 5 }],
  confirmPwd: [
    { type: "string", required: true, trigger: "blur" },
    {
      validator: (value: unknown) => value === model.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
};

const positon = ref<LabelPosition>('top')

const changeLeft = () => {
  positon.value = 'left'
}

const changeRight = () => {
  positon.value = 'right'
}

const changeTop = () => {
  positon.value = 'top'
}


</script>

<template>
  <div class="form-box">
    <VkForm :model="model" :rules="rules" ref="formRef" :label-position="positon">
      <VkFormItem label="the email" prop="email">
        <VkInput v-model="model.email" />
      </VkFormItem>
      <VkFormItem label="the password" prop="password">
        <VkInput type="password" v-model="model.password" />
      </VkFormItem>
      <VkFormItem label="confirmPwd" prop="confirmPwd">
        <VkInput type="password" v-model="model.confirmPwd" />
      </VkFormItem>
    </VkForm>
    <VkButton type="primary" @click="changeLeft">Left</VkButton>
    <VkButton type="success" @click="changeRight">Right</VkButton>
    <VkButton type="warning" @click="changeTop">Top</VkButton>
  </div>
</template>
