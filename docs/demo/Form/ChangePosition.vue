<script lang="ts" setup>
import Form from "@/components/Form/Form.vue";
import FormItem from "@/components/Form/FormItem.vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
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
      validator: (value: any) => value === model.password,
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
    <Form :model="model" :rules="rules" ref="formRef" :label-position="positon">
      <FormItem label="the email" prop="email">
        <Input v-model="model.email" />
      </FormItem>
      <FormItem label="the password" prop="password">
        <Input type="password" v-model="model.password" />
      </FormItem>
      <FormItem label="confirmPwd" prop="confirmPwd">
        <Input type="password" v-model="model.confirmPwd" />
      </FormItem>
    </Form>
    <Button type="primary" @click="changeLeft">Left</Button>
    <Button type="success" @click="changeRight">Right</Button>
    <Button type="warning" @click="changeTop">Top</Button>
  </div>
</template>
