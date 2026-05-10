<script setup lang="ts">
import Icon from "@/components/Icon/Icon.vue";
</script>

<template>
  <div class="icon-demo-row">
    <Icon icon="spinner" spin size="2x" />
    <Icon icon="rotate" spin-pulse size="2x" />
    <Icon icon="bell" shake size="2x" />
    <Icon icon="heart" beat size="2x" />
  </div>
</template>

<style scoped>
.icon-demo-row {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
