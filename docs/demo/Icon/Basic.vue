<script setup lang="ts">
import VkIcon from "@/components/Icon/Icon.vue";
</script>

<template>
  <div class="icon-demo-row">
    <VkIcon icon="house" />
    <VkIcon icon="user" />
    <VkIcon icon="check" />
    <VkIcon icon="xmark" />
    <VkIcon icon="spinner" />
  </div>
</template>

<style scoped>
.icon-demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
}
</style>
