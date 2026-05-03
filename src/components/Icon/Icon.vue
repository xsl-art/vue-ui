<template>
  <i class="vk-icon" :class="{ [`vk-icon--${type}`]: type }" v-bind="$attrs" :style="customStyle">
    <FontAwesomeIcon v-bind="filterProps"></FontAwesomeIcon>
  </i>
</template>

<script setup lang="ts">
import type { IconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash'
import { computed } from 'vue';

defineOptions({
  name: 'VkIcon',
  inheritAttrs: false
})

const props = defineProps<IconProps>()
//计算样式
const customStyle = computed(() => props.color ? { color: props.color } : {})

//剔除不必要属性 type color
const filterProps = computed(() => omit(props, ['type', 'color']))
</script>