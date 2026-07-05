<script setup lang="ts">
import VkIcon from "@/components/Icon/Icon.vue";
</script>

<template>
  <div class="icon-demo-row">
    <VkIcon icon="spinner" spin size="2x" />
    <VkIcon icon="rotate" spin-pulse size="2x" />
    <VkIcon icon="bell" shake size="2x" />
    <VkIcon icon="heart" beat size="2x" />
  </div>
</template>

<style scoped>
.icon-demo-row {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
