<script setup lang="ts">
import VkTag from "@/components/Tag/Tag.vue";
</script>

<template>
  <div class="tag-demo-group">
    <div class="tag-demo-row">
      <VkTag type="primary" effect="light">Light</VkTag>
      <VkTag type="success" effect="light">Light</VkTag>
      <VkTag type="warning" effect="light">Light</VkTag>
      <VkTag type="danger" effect="light">Light</VkTag>
    </div>
    <div class="tag-demo-row">
      <VkTag type="primary" effect="dark">Dark</VkTag>
      <VkTag type="success" effect="dark">Dark</VkTag>
      <VkTag type="warning" effect="dark">Dark</VkTag>
      <VkTag type="danger" effect="dark">Dark</VkTag>
    </div>
    <div class="tag-demo-row">
      <VkTag type="primary" effect="plain">Plain</VkTag>
      <VkTag type="success" effect="plain">Plain</VkTag>
      <VkTag type="warning" effect="plain">Plain</VkTag>
      <VkTag type="danger" effect="plain">Plain</VkTag>
    </div>
  </div>
</template>

<style scoped>
.tag-demo-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tag-demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
