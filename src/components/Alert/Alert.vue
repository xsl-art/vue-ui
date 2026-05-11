<template>
  <Transition name="vk-alert-fade">
    <div class="vk-alert" :class="{
      [`vk-alert--${type}`]: type,
      [`vk-alert--${effect}`]: effect,
      'is-closable': closable,
      'is-center': center,
      'is-showIcon': icon
    }" role="alert" v-if="visible" :aria-labelledby="titleId" :aria-describedby="contentId">
      <div class="vk-alert__icon" v-if="icon && type && typeIconMap[type]">
        <Icon :icon="typeIconMap[type!]" class="icon" aria-hidden="true" />
      </div>
      <div class="vk-alert__content">
        <div class="vk-alert__title" :id="titleId">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="vk-alert__description" :id="contentId">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
      <button class="vk-alert__clear" type="button" v-if="closable" @click.stop="handleClick" tabindex="0"
        aria-label="Close alert">
        <Icon icon="xmark" />
      </button>
      <Dialog v-model="isOpened" title="提示" width="300px" draggable>
        <p class="tip">确定删除这条信息吗？</p>
        <template #footer>
          <Button @click="cancel">取消</Button>
          <Button @click="confirm">确定</Button>
        </template>
      </Dialog>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { AlertProps, AlertEmits, AlertInstance } from './types';
import Icon from '../Icon/Icon.vue';
import Dialog from '../Dialog/Dialog.vue';
import Button from '../Button/Button.vue';


defineOptions({
  name: 'VkAlert',
  inheritAttrs: false
})

withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  center: false,
  title: '',
  content: '',
  icon: false,
  closable: true
})

const emits = defineEmits<AlertEmits>()

const alertRef = ref<AlertInstance>()

const visible = ref(true)
const isOpened = ref(false)

//语义化
const instanceId = Math.random().toString(36).slice(2, 8);
const titleId = `alert-title-${instanceId}`;
const contentId = `alert-content-${instanceId}`;

//图标映射
const typeIconMap: Record<string, string> = {
  primary: "tag",
  success: "circle-check",
  warning: "circle-exclamation",
  danger: "heart",
  info: "circle-info",
};

const handleClick = (e?: Event) => {
  if (e) e.stopPropagation()
  isOpened.value = true
}

const cancel = () => {
  visible.value = true
  isOpened.value = false
}

const confirm = () => {
  visible.value = false
  isOpened.value = false
  emits('close')
}

defineExpose({
  ref: alertRef
})
</script>