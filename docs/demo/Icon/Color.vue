<script setup lang="ts">
import Icon from "@/components/Icon/Icon.vue";
</script>

<template>
  <div class="icon-demo-row">
    <Icon icon="heart" color="#f56c6c" />
    <Icon icon="star" color="#e6a23c" />
    <Icon icon="leaf" color="#67c23a" />
    <Icon icon="paper-plane" color="#409eff" />
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
