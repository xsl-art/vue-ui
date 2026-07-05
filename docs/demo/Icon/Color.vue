<script setup lang="ts">
import VkIcon from "@/components/Icon/Icon.vue";
</script>

<template>
  <div class="icon-demo-row">
    <VkIcon icon="heart" color="#f56c6c" />
    <VkIcon icon="star" color="#e6a23c" />
    <VkIcon icon="leaf" color="#67c23a" />
    <VkIcon icon="paper-plane" color="#409eff" />
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
