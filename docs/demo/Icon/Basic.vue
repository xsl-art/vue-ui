<script setup lang="ts">
import Icon from "@/components/Icon/Icon.vue";
</script>

<template>
  <div class="icon-demo-row">
    <Icon icon="house" />
    <Icon icon="user" />
    <Icon icon="check" />
    <Icon icon="xmark" />
    <Icon icon="spinner" />
  </div>
</template>

<style scoped>
.icon-demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
}
</style>
