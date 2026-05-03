<template>
  <div class="vk-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="vk-collapse-item__header" :class="{ 'is-disabled': disabled, 'is-active': isActive }"
      @click="handleClick" :id="`item-header-${name}`">
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle"></Icon>
    </div>
    <Transition name="fade" v-on="transationEvents">
      <div class="vk-collapse-item__wrapper" v-show="isActive">
        <div class="vk-collapse-item__content" :id="`item-header-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import Icon from '../Icon/Icon.vue';
import { collapseContextKey, type CollaseItemProps } from './types';

defineOptions({
  name: 'VkCollapseItem'
})

const props = defineProps<CollaseItemProps>()

const result = inject(collapseContextKey)

const isActive = computed(() => result?.activeNames.value?.includes(props.name!))
const handleClick = () => {
  if (props.disabled) return
  result?.handleClick(props.name!)
}

//动画钩子函数
const transationEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = "hidden"
    el.style.transition = 'height 0.3s ease'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
    el.style.transition = 'height 0.3s ease'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
    el.style.transition = ''
  }
}

</script>