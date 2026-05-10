<template>
  <Button type="info" @click="visible = true">点击弹出对话框</Button>
  <Dialog v-model="visible" title="提示" width="480px" modal fullscreen>
    <p>正文内容</p>
    <span>这是一段文字xxxxx</span>
    <template #footer>
      <Button @click="visible = false">确定</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import Dialog from '@/components/Dialog/Dialog.vue'
import { ref } from 'vue'
const visible = ref(false);
</script>
