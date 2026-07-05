<script setup lang="ts">
import VkTag from "@/components/Tag/Tag.vue";

</script>

<template>
  <div class="tag-demo-row">
    <VkTag closable>Closable</VkTag>
    <VkTag type="success" closable>Success</VkTag>
    <VkTag type="warning" closable round>Round</VkTag>
    <VkTag type="danger" closable disabled>Disabled</VkTag>
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
