<template>
  <div
    class="vk-tag"
    :class="{
      [`vk-tag--${type}`]: type,
      [`vk-tag--${size}`]: size,
      [`vk-tag--${effect}`]: effect,
      'is-round': round,
      'is-disabled': disabled,
      'is-closable': closable,
    }"
    role="tag"
    v-if="isVisible"
  >
    <span>
      <slot></slot>
    </span>
    <div class="icon" @click.stop="handleClick" v-if="closable">
      <Icon icon="xmark" v-if="closable" class="image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TagProps } from "./types";
import type { TagEmits } from "./types";
import Icon from "../Icon/Icon.vue";
import { ref } from "vue";

defineOptions({
  name: "VkTag",
});

const props = withDefaults(defineProps<TagProps>(), {
  type: "primary",
  effect: "light",
  size: "small",
});

const emits = defineEmits<TagEmits>();

//是否可见
const isVisible = ref(true);

//点击xmark
const handleClick = (e?: Event) => {
  if (e) e.stopPropagation();
  if (props.disabled) return;
  close();
};

const close = () => {
  isVisible.value = false;
  emits("close");
};

defineExpose({
  close,
});
</script>

<script lang="ts">
export default {};
</script>
