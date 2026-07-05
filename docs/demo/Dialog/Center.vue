<template>
  <VkButton type="warning" @click="visible = true">点击弹出对话框</VkButton>
  <VkDialog v-model="visible" title="提示" width="480px" modal align-center>
    <p>正文内容</p>
    <template #footer>
      <VkButton @click="visible = false">确定</VkButton>
    </template>
  </VkDialog>
</template>

<script setup lang="ts">
import VkButton from '@/components/Button/Button.vue'
import VkDialog from '@/components/Dialog/Dialog.vue'
import { ref } from 'vue'
const visible = ref(false);
</script>
