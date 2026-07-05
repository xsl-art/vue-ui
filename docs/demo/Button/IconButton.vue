<script setup>
import VkButton from "@/components/Button/Button.vue";
</script>

<template>
  <div class="button-row">
    <VkButton type="primary" icon="upload">上传</VkButton>
    <VkButton type="success" icon="filter">选择</VkButton>
    <VkButton type="info" icon="info">Button3</VkButton>
    <VkButton type="warning" icon="box">Button4</VkButton>
    <VkButton type="danger" icon="mouse">Button5</VkButton>
  </div>
</template>
