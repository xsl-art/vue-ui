<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="vk-dialog-fade" @after-enter="onOpen" @after-leave="onAfterLeave">
      <div class="vk-dialog-overlay" v-show="modelValue" :class="[modalClass, { 'is-modal': modal }]"
        :style="overlayStyle" role="presentation">
        <div class="vk-dialog__wrapper" :class="{ 'is-align-center': alignCenter }" :style="wrapperStyle"
          @click.self="onModalClick">
          <div class="vk-dialog" :class="[{ 'is-fullscreen': fullscreen }, dialogClass]" :style="dialogStyle"
            role="dialog" aria-modal="true" :aria-labelledby="titleId">
            <div class="vk-dialog__header">
              <slot name="header">
                <span class="vk-dialog__title" :id="titleId">{{ title }}</span>
              </slot>
              <Icon icon="xmark" class="vk-dialog__close" @click="handleClose" />
            </div>
            <div class="vk-dialog__body" v-if="bodyMounted">
              <slot></slot>
            </div>
            <div class="vk-dialog__footer" v-if="$slots.footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import Icon from '../Icon/Icon.vue';
import type { DialogEmits, DialogProps } from './types';
import useZIndex from '../../hooks/useZIndex';
import useEventListener from '../../hooks/useEventListener';
import { lockBodyScroll, unlockBodyScroll } from './scrollLock';

defineOptions({
  name: 'VkDialog'
})

const props = withDefaults(defineProps<DialogProps>(), {
  title: "",
  width: "50%",
  fullscreen: false,
  top: "15vh",
  modal: true,
  modalClass: "",
  appendToBody: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  destroyOnClose: false,
  alignCenter: false,
  dialogClass: "",
});

const emit = defineEmits<DialogEmits>();

const { nextZIndex } = useZIndex(2000)
const currentZIndex = ref(0)
const bodyMounted = ref(true)
const titleId = `vk-dialog-title-${Math.random().toString(36).slice(2, 10)}`;


const overlayStyle = computed(() => ({
  zIndex: props.zIndex ?? currentZIndex.value
}))

const wrapperStyle = computed(() => {
  if (props.fullscreen || props.alignCenter) return {}
  return { paddingTop: props.top }
})

const dialogStyle = computed(() => {
  if (props.fullscreen) return {}
  return { width: props.width }
})

const onOpen = () => {
  emit('opened')
}

const onAfterLeave = () => {
  if (props.destroyOnClose) {
    bodyMounted.value = false
  }
  if (props.lockScroll) {
    unlockBodyScroll()
  }
  emit('closed')
}

const onModalClick = () => {
  if (!props.modal || !props.closeOnClickModal) return
  handleClose()
}

const handleClose = () => {
  emit('close')
  emit('update:modelValue', false)
}

const onEsc = (e: Event) => {
  const ev = e as KeyboardEvent
  if (ev.key !== 'Escape') return
  if (!props.modelValue) return
  handleClose()
}

useEventListener(document, 'keydown', onEsc)

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    if (props.zIndex == null) {
      currentZIndex.value = nextZIndex()
    }
    bodyMounted.value = true
    if (props.lockScroll) {
      lockBodyScroll()
    }
    emit('open')
  }
}, { immediate: true })

onBeforeUnmount(() => {
  if (props.modelValue && props.lockScroll) {
    unlockBodyScroll();
  }
});

defineExpose({
  open: () => emit("update:modelValue", true),
  close: handleClose,
});
</script>