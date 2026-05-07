<template>
  <div class="vk-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="vk-tooltip__trigger" ref="triggrtNode" v-on="events">
      <slot></slot>
    </div>
    <Transition name="fade">
      <div class="vk-tooltip__popper" v-if="isOpen" ref="popperNode" v-on="popperEvents">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import type { TooltipProps, TooltipEmits } from './types';
import { createPopper, type Instance } from '@popperjs/core';
import useClickOutside from '../../hooks/useClickOutside';
import { debounce } from 'lodash';

defineOptions({
  name: 'VkTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: 'click',
  placement: 'bottom',
  transition: 'fade',
  manual: false,
  openDelay: 0,
  closeDelay: 0
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const outerEvents: Record<string, any> = reactive({})
const events: Record<string, any> = reactive({})
const popperEvents: Record<string, any> = reactive({})
const popperContainerNode = ref<HTMLElement>()
const triggrtNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
let popperInstance: null | Instance = null
let openTimes = 0
let closeTimes = 0

//自定义配置
const popperOptions = computed(() => {
  //解构用户输入的配置
  const { modifiers: customModifiers = [], ...customOptions } = props.popperOptions ?? {}

  return {
    placement: props.placement,
    ...customOptions,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      },
      ...customModifiers
    ]
  }
})

//显示
const open = () => {
  openTimes++
  isOpen.value = true
  emits('visible-change', true)
}

//隐藏
const close = () => {
  closeTimes++
  isOpen.value = false
  emits('visible-change', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

//互斥取消
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}

const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

//判断是否点击外部
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value) {
    if (!props.manual) closeFinal()
    emits('click-outside', true)
  }
})

//事件清除
const clearEvent = () => {
  Object.keys(events).forEach(key => {
    delete events[key]
  })
  Object.keys(outerEvents).forEach(key => {
    delete outerEvents[key]
  })
  Object.keys(popperEvents).forEach(key => {
    delete popperEvents[key]
  })
}
//事件绑定
const attachEvent = () => {
  clearEvent()
  //手动模式直接返回
  if (props.manual) return
  //hover
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
    popperEvents['mouseenter'] = openFinal
  } else {
    //click
    events['click'] = openFinal
  }
}

//初始化调用
attachEvent()

//监听manual
watch(() => props.manual, () => {
  attachEvent()
})

//监听trigger
watch(() => props.trigger, (newVal, oldVal) => {
  if (newVal !== oldVal) attachEvent()
})

//popper.js实例创建
watch(() => isOpen.value, (newVal) => {
  if (newVal) {
    if (triggrtNode.value && popperNode.value) {
      popperInstance = createPopper(triggrtNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post' })


const update = () => popperInstance?.update()


defineExpose({
  show: openFinal,
  hide: closeFinal,
  update
})
</script>
