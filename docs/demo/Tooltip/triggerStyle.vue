<template>
  <Tooltip placement="right" trigger="hover">
    <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
    <template #content>
      <h1>hello toolTip!</h1>
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import Tooltip from '../../../src/components/Tooltip/Tooltip.vue'
</script>