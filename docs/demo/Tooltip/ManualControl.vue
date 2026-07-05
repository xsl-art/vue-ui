<template>
  <div class="tooltip-box">
    <VkTooltip placement="right" manual ref="tooltipRef">
      <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
      <template #content>
        <h1>hello toolTip!</h1>
      </template>
    </VkTooltip>
    <div class="button-box">
      <VkButton type="primary" plain @click="show">显示按钮</VkButton>
      <VkButton type="primary" plain @click="close">关闭按钮</VkButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import VkTooltip from '@/components/Tooltip/Tooltip.vue'
import VkButton from '@/components/Button/Button.vue'
import { ref } from 'vue'
import { type TooltipInstance } from '@/components/Tooltip/types';


const tooltipRef = ref<TooltipInstance | null>(null)

const close = () => tooltipRef.value?.hide()
const show = () => tooltipRef.value?.show()
</script>

<style>
.tooltip-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-box {
  margin-top: 20px;
}
</style>