<template>
  <VkTooltip placement="right">
    <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
    <template #content>
      <h1>hello toolTip!</h1>
    </template>
  </VkTooltip>
</template>

<script setup lang="ts">
import VkTooltip from '../../../src/components/Tooltip/Tooltip.vue'
</script>