<script setup>
import VkButton from "@/components/Button/Button.vue";
</script>

<template>
  <div class="button-row">
    <VkButton>default</VkButton>
    <VkButton type="primary">Button1</VkButton>
    <VkButton type="success">Button2</VkButton>
    <VkButton type="info">Button3</VkButton>
    <VkButton type="warning">Button4</VkButton>
    <VkButton type="danger">Button5</VkButton>
  </div>

  <div class="button-row">
    <VkButton>default</VkButton>
    <VkButton type="primary" plain>Button1</VkButton>
    <VkButton type="success" plain>Button2</VkButton>
    <VkButton type="info" plain>Button3</VkButton>
    <VkButton type="warning" plain>Button4</VkButton>
    <VkButton type="danger" plain>Button5</VkButton>
  </div>

  <div class="button-row">
    <VkButton circle>circle</VkButton>
    <VkButton type="primary" circle>Button1</VkButton>
    <VkButton type="success" circle>Button2</VkButton>
    <VkButton type="info" circle>Button3</VkButton>
    <VkButton type="warning" circle>Button4</VkButton>
    <VkButton type="danger" circle>Button5</VkButton>
  </div>

  <div class="button-row">
    <VkButton round>round</VkButton>
    <VkButton type="primary" round>Buttone1</VkButton>
    <VkButton type="success" round>Buttone2</VkButton>
    <VkButton type="info" round>Buttone3</VkButton>
    <VkButton type="warning" round>Buttone4</VkButton>
    <VkButton type="danger" round>Buttone5</VkButton>
  </div>
</template>

<style>
.button-row {
  display: flex;
  margin-top: 15px;
}
</style>
