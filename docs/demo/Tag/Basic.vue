<script setup lang="ts">
import Tag from "@/components/Tag/Tag.vue";
</script>

<template>
  <div class="tag-demo-row">
    <Tag>Primary</Tag>
    <Tag type="success">Success</Tag>
    <Tag type="info">Info</Tag>
    <Tag type="warning">Warning</Tag>
    <Tag type="danger">Danger</Tag>
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
