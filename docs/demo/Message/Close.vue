<template>
  <VkButton type="primary" @click="open1">show message</VkButton>
  <VkButton type="danger" @click="open2">show danger</VkButton>
</template>

<script setup lang="ts">
import VkButton from '@/components/Button'
import { createMessage } from '@/components/Message/methods'

const open1 = () => {
  createMessage({ message: '小提示', type: 'info', duration: 0, closable: true })
}

const open2 = () => {
  createMessage({ message: "危险物品请勿触碰!!!", type: "danger", duration: 0, closable: true })
}

</script>
