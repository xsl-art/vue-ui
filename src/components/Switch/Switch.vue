<template>
  <div class="vk-switch" :class="{ [`vk-switch--${size}`]: size, 'is-checked': checked, 'is-disabled': disabled }"
    @click="switchClick">
    <input type="checkbox" role="switch" ref="inputRef" class="vk-switch__input" :name="name" :disabled="disabled"
      @keydown.enter="switchClick">
    <div class="vk-switch__core">
      <div class="vk-switch__core-inner">
        <span class="vk-switch__core-inner-text" v-if="activeText || inactiveText">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="vk-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { SwitchProps, SwitchEmits } from './types';


defineOptions({
  name: 'VkSwitch'
})
const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'default',
  activeValue: true,
  inactiveValue: false
})

const emits = defineEmits<SwitchEmits>()
const inputRef = ref<HTMLInputElement>()
const innerValue = ref(props.modelValue)
const checked = computed(() => innerValue.value === props.activeValue)

const switchClick = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}

onMounted(() => {
  //同步checkbox状态
  inputRef.value!.checked = checked.value
})

watch(() => checked.value, (newVal) => inputRef.value!.checked = newVal)

watch(() => props.modelValue, (newVal) => innerValue.value = newVal)
</script>