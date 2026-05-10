<template>
  <div class="tooltip">
    <Tooltip placement="right">
      <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
      <template #content>
        <h1>hello toolTip!</h1>
      </template>
    </Tooltip>

    <Tooltip placement="top">
      <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
      <template #content>
        <h1>hello toolTip!</h1>
      </template>
    </Tooltip>

    <Tooltip placement="left">
      <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
      <template #content>
        <h1>hello toolTip!</h1>
      </template>
    </Tooltip>

  </div>
</template>

<script setup lang="ts">
import Tooltip from '../../../src/components/Tooltip/Tooltip.vue'
</script>

<style>
.tooltip {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>