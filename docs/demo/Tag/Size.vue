<script setup lang="ts">
import VkTag from "@/components/Tag/Tag.vue";
</script>

<template>
  <div class="tag-demo-row">
    <VkTag size="large">Large</VkTag>
    <VkTag>Small</VkTag>
    <VkTag size="mini">Mini</VkTag>
  </div>
</template>

<style scoped>
.tag-demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
