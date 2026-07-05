<script setup lang="ts">
import VkIcon from "@/components/Icon/Icon.vue";
</script>

<template>
  <div class="icon-demo-row">
    <VkIcon icon="check" type="primary" />
    <VkIcon icon="circle-check" type="success" />
    <VkIcon icon="circle-info" type="info" />
    <VkIcon icon="triangle-exclamation" type="warning" />
    <VkIcon icon="circle-xmark" type="danger" />
  </div>
</template>

<style scoped>
.icon-demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 22px;
}
</style>
