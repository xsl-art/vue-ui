<script setup lang="ts">
import Tag from "@/components/Tag/Tag.vue";
</script>

<template>
  <div class="tag-demo-group">
    <div class="tag-demo-row">
      <Tag type="primary" effect="light">Light</Tag>
      <Tag type="success" effect="light">Light</Tag>
      <Tag type="warning" effect="light">Light</Tag>
      <Tag type="danger" effect="light">Light</Tag>
    </div>
    <div class="tag-demo-row">
      <Tag type="primary" effect="dark">Dark</Tag>
      <Tag type="success" effect="dark">Dark</Tag>
      <Tag type="warning" effect="dark">Dark</Tag>
      <Tag type="danger" effect="dark">Dark</Tag>
    </div>
    <div class="tag-demo-row">
      <Tag type="primary" effect="plain">Plain</Tag>
      <Tag type="success" effect="plain">Plain</Tag>
      <Tag type="warning" effect="plain">Plain</Tag>
      <Tag type="danger" effect="plain">Plain</Tag>
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
