<template>
  <div class="vk-dropdown" tabindex="0" @keydown.enter.prevent="toggleByKeyboard"
    @keydown.esc.prevent="toggleByKeyboard">
    <Tooltip ref="toolTipRef" :trigger="trigger" :placement="placement" :popper-options="popperOptions"
      :open-delay="openDelay" :close-delay="closeDelay" @visible-change="visibleChange">
      <slot></slot>
      <template #content>
        <ul class="vk-dropdown__menu" role="menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li class="divided-placeholder" v-if="item.divided"></li>
            <li class="vk-dropdown__item" :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`dropdown-item-${item.key}`" @click="() => itemClick(item)">
              <RenderVNode :VNode="item.label"></RenderVNode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import type { TooltipInstance } from '../Tooltip/types';
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types';
import RenderVNode from '../../commen/RenderVNode'


defineOptions({
  name: 'VkDropdown'
})

const toolTipRef = ref() as Ref<TooltipInstance>

const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emits = defineEmits<DropdownEmits>()
const isOpen = ref(false)

const visibleChange = (e: boolean) => {
  isOpen.value = e
  emits('visible-change', e)
}

const itemClick = (item: MenuOption) => {
  if (item.disabled) return
  emits('select', item)
  if (props.hideAfterClick) {
    toolTipRef.value.hide()
  }
}

const toggleByKeyboard = () => {
  if (isOpen.value) {
    toolTipRef.value.hide()
  } else {
    toolTipRef.value.show()
  }
}

defineExpose<DropdownInstance>({
  hide: () => toolTipRef.value.hide(),
  show: () => toolTipRef.value.show()
})

</script>