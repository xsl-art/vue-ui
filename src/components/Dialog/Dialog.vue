<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="vk-dialog-fade" @after-enter="onOpen" @after-leave="onAfterLeave">
      <div class="vk-dialog-overlay" v-show="modelValue" :class="[modalClass, { 'is-modal': modal }]"
        :style="overlayStyle" role="presentation">
        <div class="vk-dialog__wrapper" :class="{ 'is-align-center': alignCenter }" :style="wrapperStyle"
          @click.self="onModalClick">
          <div ref="dialogRef" class="vk-dialog" :class="[{ 'is-fullscreen': fullscreen }, dialogClass]"
            :style="dialogStyle" role="dialog" aria-modal="true" :aria-labelledby="titleId"
            :aria-describedby="descriptionId" tabindex="-1">
            <div class="vk-dialog__header" :class="{ 'is-draggable': draggable && !fullscreen }"
              @mousedown="onHeaderMouseDown">
              <slot name="header">
                <span class="vk-dialog__title" :id="titleId">{{ title }}</span>
              </slot>
              <button v-if="showClose" type="button" class="vk-dialog__close" @click="handleClose"
                aria-label="Close dialog">
                <Icon icon="xmark" />
              </button>
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
import { computed, onBeforeUnmount, ref, watch } from "vue";
import type { CSSProperties } from "vue";
import Icon from "../Icon/Icon.vue";
import type { DialogEmits, DialogProps } from "./types";
import useZIndex from "../../hooks/useZIndex";
import useEventListener from "../../hooks/useEventListener";
import { lockBodyScroll, unlockBodyScroll } from "./scrollLock";

defineOptions({
  name: "VkDialog",
});

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
  draggable: false,
  dialogClass: "",
});

const emit = defineEmits<DialogEmits>();

const { nextZIndex } = useZIndex(2000);
const currentZIndex = ref(0);
const bodyMounted = ref(true);
const dialogRef = ref<HTMLElement>();
const titleId = `vk-dialog-title-${Math.random().toString(36).slice(2, 10)}`;
const descriptionId = `vk-dialog-desc-${Math.random().toString(36).slice(2, 10)}`;
const dialogOffset = ref({ x: 0, y: 0 });
const dragging = ref(false);

const overlayStyle = computed(() => ({
  zIndex: props.zIndex ?? currentZIndex.value,
}));

const wrapperStyle = computed(() => {
  if (props.fullscreen || props.alignCenter) return {};
  return { paddingTop: props.top };
});

const dialogStyle = computed<CSSProperties>(() => {
  if (props.fullscreen) return {};
  return {
    width: props.width,
    "--vk-dialog-translate-x": `${dialogOffset.value.x}px`,
    "--vk-dialog-translate-y": `${dialogOffset.value.y}px`,
  } as CSSProperties;
});

const onOpen = () => {
  emit("opened");
};

const onAfterLeave = () => {
  if (props.destroyOnClose) {
    bodyMounted.value = false;
  }
  if (props.lockScroll) {
    unlockBodyScroll();
  }
  emit("closed");
};

const onModalClick = () => {
  if (!props.modal || !props.closeOnClickModal) return;
  handleClose();
};

const handleClose = () => {
  emit("close");
  emit("update:modelValue", false);
};

const onHeaderMouseDown = (e: MouseEvent) => {
  if (!props.draggable || props.fullscreen) return;
  if (e.button !== 0) return;

  const dialogEl = dialogRef.value;
  if (!dialogEl) return;

  const target = e.target as HTMLElement | null;
  if (target?.closest(".vk-dialog__close")) return;

  e.preventDefault();
  dragging.value = true;

  const rect = dialogEl.getBoundingClientRect();
  const startX = e.clientX;
  const startY = e.clientY;
  const startOffset = { ...dialogOffset.value };
  const minX = -rect.left + startOffset.x;
  const maxX = document.documentElement.clientWidth - rect.right + startOffset.x;
  const minY = -rect.top + startOffset.y;
  const maxY = document.documentElement.clientHeight - rect.bottom + startOffset.y;

  const onMouseMove = (moveEvent: MouseEvent) => {
    if (!dragging.value) return;
    dialogOffset.value = {
      x: Math.min(Math.max(startOffset.x + moveEvent.clientX - startX, minX), maxX),
      y: Math.min(Math.max(startOffset.y + moveEvent.clientY - startY, minY), maxY),
    };
  };

  const onMouseUp = () => {
    dragging.value = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

const onEsc = (e: Event) => {
  const ev = e as KeyboardEvent;
  if (ev.key !== "Escape") return;
  if (!props.modelValue) return;
  handleClose();
};

useEventListener(document, "keydown", onEsc);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      if (props.zIndex == null) {
        currentZIndex.value = nextZIndex();
      }
      bodyMounted.value = true;
      if (props.lockScroll) {
        lockBodyScroll();
      }
      emit("open");
    }
  },
  { immediate: true },
);

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
