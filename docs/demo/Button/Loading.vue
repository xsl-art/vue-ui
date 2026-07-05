<script setup>
import VkButton from "@/components/Button/Button.vue";
</script>

<template>
  <div class="button-row">
    <VkButton type="primary" loading>loading...</VkButton>
    <VkButton type="success" loading circle>loading...</VkButton>
    <VkButton type="info" loading round>loading...</VkButton>
    <VkButton type="warning" loading disabled>loading...</VkButton>
    <VkButton type="danger" loading>loading...</VkButton>
  </div>
</template>
