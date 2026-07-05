<script setup>
import VkButton from "@/components/Button/Button.vue";
</script>

<template>
  <div class="button-row">
    <VkButton disabled>default</VkButton>
    <VkButton type="primary" disabled>Button1</VkButton>
    <VkButton type="success" disabled>Button2</VkButton>
    <VkButton type="info" disabled>Button3</VkButton>
    <VkButton type="warning" disabled>Button4</VkButton>
    <VkButton type="danger" disabled>Button5</VkButton>
  </div>

  <div class="button-row">
    <VkButton disabled>default</VkButton>
    <VkButton type="primary" plain disabled>Button1</VkButton>
    <VkButton type="success" plain disabled>Button2</VkButton>
    <VkButton type="info" plain disabled>Button3</VkButton>
    <VkButton type="warning" plain disabled>Button4</VkButton>
    <VkButton type="danger" plain disabled>Button5</VkButton>
  </div>
</template>

<style>
.button-row {
  display: flex;
  margin-top: 15px;
}
</style>
