<template>
  <div class="vk-form-item" :class="{
    'is-loading': validateStatus.loading,
    'is-success': validateStatus.state === 'success',
    'is-error': validateStatus.state === 'error',
    'is-required': isRequired
  }">
    <label class="vk-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div class="vk-form-item__content">
      <slot :validate="validate"></slot>
      <div class="vk-form-item__error-msg" v-if="validateStatus.state === 'error'">{{ validateStatus.errorMsg }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, reactive } from "vue";
import {
  formContextKey,
  formItemContextKey,
  type FormItemContext,
  type FormItemInstance,
  type FormItemProps,
  type FormValidateFailture,
  type ValidateStatusProps,
} from "./types";
import { isNil } from "lodash-es";
import Schema from "async-validator";

defineOptions({
  name: 'VkFormItem'
})

const props = defineProps<FormItemProps>();
const formContext = inject(formContextKey)

const validateStatus: ValidateStatusProps = reactive({
  state: 'init',
  errorMsg: '',
  loading: false
})

let initialValue: any = null;

//获取字段值
const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})

//获取校验规则
const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})

//获取触发规则
const getTriggeredRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules) {
    return rules.filter(rule => {
      if (!rule.trigger || !trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
  } else {
    return []
  }
}
const isRequired = computed(() => { return itemRules.value?.some(rule => rule.required) })

//校验方法
const validate = async (trigger?: string) => {
  console.log('进来了');

  //校验字段名prop(password,account)
  const modelName = props.prop
  const triggeredRules = getTriggeredRules(trigger)
  console.log('这里');

  if (triggeredRules.length === 0) return true
  console.log('执行这里');

  if (modelName) {
    // Schema 接收一个规则描述对象，然后返回一个实例校验器，该实例拥有 .validate() 方法
    const validator = new Schema({ [modelName]: triggeredRules })
    validateStatus.loading = true
    return validator.validate({ [modelName]: innerValue.value }).then(() => {
      console.log('开始校验');

      validateStatus.state = 'success'
      console.log('校验完成', validateStatus.state);

    }).catch((e: FormValidateFailture) => {
      const { errors } = e
      validateStatus.state = 'error'
      validateStatus.errorMsg = errors && errors.length > 0 ? errors[0]?.message || '' : ''
      console.log(e.errors);
      return Promise.reject(e)
    }).finally(() => validateStatus.loading = false)
  }
}

const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}

const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue
  }
}

const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField
}

provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})

onUnmounted(() => {
  formContext?.removeField(context)
})

//暴露实例方法共父组件通过ref调用
defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate,
});
</script>