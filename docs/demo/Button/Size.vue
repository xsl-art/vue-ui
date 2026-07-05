<script setup>
import VkButton from "@/components/Button/Button.vue";
</script>

<template>
  <div class="button-row">
    <VkButton type="primary" icon="upload" size="large">upload</VkButton>
    <VkButton type="primary" icon="upload" size="small">upload</VkButton>
    <VkButton type="success" circle size="large">success</VkButton>
    <VkButton type="success" circle size="small">success</VkButton>
    <VkButton type="danger" round size="large">danger</VkButton>
    <VkButton type="danger" round size="small">danger</VkButton>
  </div>
</template>

<style>
.button-row {
  display: flex;
  align-items: center;
}
</style>
