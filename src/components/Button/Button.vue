<template>
  <button class="vk-button" ref="buttonRef" :class="{
    [`vk-button--${type}`]: type,
    [`vk-button--${size}`]: size,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled,
    'is-loading': loading
  }" :disabled="disabled || loading" :type="nativeType" :autofocus="autofocus" :aria-busy="loading"
    :aria-disabled="disabled || loading">
    <Icon icon="spinner" spin v-if="loading" aria-hidden="true" />
    <Icon :icon="icon" v-if="icon" />
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonInstance, ButtonProps } from './types';
import Icon from '../Icon/Icon.vue';

defineOptions({
  name: 'VkButton'
})

const buttonRef = ref<ButtonInstance>()
const props = withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

defineExpose({
  ref: buttonRef
})
</script>