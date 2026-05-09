<template>
  <div class="vk-form" :class="`vk-form--label-${props.labelPosition || 'right'}`">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { ValidateFieldsError } from "async-validator";
import {
  formContextKey,
  type FormContext,
  type FormInstance,
  type FormItemContext,
  type FormProps,
  type FormValidateFailture,
} from "./types";
import { provide } from "vue";

defineOptions({
  name: 'VkForm'
})

const props = defineProps<FormProps>()

//管理所有表单项
const fields: FormItemContext[] = []

//表单挂载时注册到表单项数组
const addField: FormContext['addField'] = (field) => fields.push(field)

//表单卸载时移除
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) fields.splice(fields.indexOf(field), 1)
}

//重置字段 不传参则重置所有
const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.resetField())
}

//清除校验状态和错误信息
const clearFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.clearValidate())
}

//整体校验
const validate = async () => {
  let validationErrors: ValidateFieldsError = {}
  //遍历注册表单项数组
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (e) {
      const errors = e as FormValidateFailture
      validationErrors = {
        ...validationErrors,
        ...errors.fields
      }
    }
  }
  if (Object.keys(validationErrors).length === 0) return true
  return Promise.reject(validationErrors)
}

provide(formContextKey, {
  ...props,
  addField,
  removeField
})

defineExpose<FormInstance>({
  validate,
  resetFields,
  clearFields
})

</script>