<script setup lang="ts">
import VkTag from "@/components/Tag/Tag.vue";
</script>

<template>
  <div class="tag-demo-row">
    <VkTag>Primary</VkTag>
    <VkTag type="success">Success</VkTag>
    <VkTag type="info">Info</VkTag>
    <VkTag type="warning">Warning</VkTag>
    <VkTag type="danger">Danger</VkTag>
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
