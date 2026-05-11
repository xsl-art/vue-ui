<template>
  <Transition :name="transitionName" @after-leave="destoryComponent" @enter="updateHeight">
    <div class="vk-message" v-show="visible" :class="{
      [`vk-message--${type}`]: type,
      'is-closable': closable,
    }" role="alert" ref="messageRef" :style="cssStyle" @mouseenter="clearTimer" @mouseleave="startTimer">
      <div class="vk-message__content">
        <slot>
          <RenderVNode :VNode="message!" v-if="message"></RenderVNode>
        </slot>
      </div>
      <button type="button" class="vk-message__close" aria-label="Close message" @click.stop="visible = false">
        <Icon icon="xmark"></Icon>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import type { MessageProps } from "./types";
import RenderVNode from "../../commen/RenderVNode";
import Icon from "../Icon/Icon.vue";
import { getLastBottomOffset } from "./methods";
import useEventListener from "../../hooks/useEventListener";
defineOptions({
  name: "VkMessage",
});

const props = withDefaults(defineProps<MessageProps>(), {
  offset: 20,
  duration: 2000,
  closable: true,
  transitionName: "fade-up",
});

const messageRef = ref<HTMLDivElement>();
const visible = ref(true);

//计算样式
const height = ref(0);
const lastOffset = computed(() => getLastBottomOffset(props.id));
const topOffset = computed(() => props.offset + lastOffset.value);
const bottomOffset = computed(() => topOffset.value + height.value);
const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}));

//hover上去清除定时器，离开重新计时
let timer: ReturnType<typeof window.setTimeout> | null = null;
function startTimer() {
  if (props.duration === 0) return;
  if (timer) clearTimer();
  timer = window.setTimeout(() => {
    visible.value = false;
  }, props.duration);
}

function clearTimer() {
  if (timer) {
    window.clearTimeout(timer);
    timer = null;
  }
}

onMounted(async () => {
  visible.value = true;
  await nextTick();
  updateHeight();
  startTimer();
});

//键盘事件
function keydown(e: Event) {
  const event = e as KeyboardEvent;
  if (event.code === "Escape") {
    visible.value = false;
  }
}

useEventListener(document, "keydown", keydown);

function destoryComponent() {
  props.onDestory();
}

function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height;
}

defineExpose({
  visible,
  bottomOffset,
});
</script>
