<script setup lang="ts">
import Tag from "@/components/Tag/Tag.vue";
</script>

<template>
  <div class="tag-demo-row">
    <Tag size="large">Large</Tag>
    <Tag>Small</Tag>
    <Tag size="mini">Mini</Tag>
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
