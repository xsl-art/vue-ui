<script setup lang="ts">
import Icon from "@/components/Icon/Icon.vue";
</script>

<template>
  <div class="icon-demo-row">
    <Icon icon="check" type="primary" />
    <Icon icon="circle-check" type="success" />
    <Icon icon="circle-info" type="info" />
    <Icon icon="triangle-exclamation" type="warning" />
    <Icon icon="circle-xmark" type="danger" />
  </div>
</template>

<style scoped>
.icon-demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 22px;
}
</style>
