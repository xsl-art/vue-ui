<template>
  <div class="tooltip-box">
    <Tooltip placement="right" manual ref="tooltipRef">
      <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
      <template #content>
        <h1>hello toolTip!</h1>
      </template>
    </Tooltip>
    <div class="button-box">
      <Button type="primary" plain @click="show">显示按钮</Button>
      <Button type="primary" plain @click="close">关闭按钮</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
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