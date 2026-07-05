<template>
  <VkButton type="primary" @click="open">show message</VkButton>
  <VkButton type="danger" @click="close">show danger</VkButton>
</template>

<script setup lang="ts">
import VkButton from '@/components/Button'
import { closeAll, createMessage } from '@/components/Message/methods'

const open = () => {
  createMessage({ message: '小提示', type: 'info', duration: 0, closable: true })
  createMessage({ message: '创建成功!!', type: 'success', duration: 0, closable: true })
  createMessage({ message: "危险物品请勿触碰!!!", type: "danger", duration: 3000, closable: true })
  createMessage({ message: 'hello message', type: 'primary', duration: 0, closable: true })
}

const close = () => {
  closeAll()
}

</script>
