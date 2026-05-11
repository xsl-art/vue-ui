<script setup lang="ts">
import Tag from "@/components/Tag/Tag.vue";

</script>

<template>
  <div class="tag-demo-row">
    <Tag closable>Closable</Tag>
    <Tag type="success" closable>Success</Tag>
    <Tag type="warning" closable round>Round</Tag>
    <Tag type="danger" closable disabled>Disabled</Tag>
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
