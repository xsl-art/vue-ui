<template>
  <VkButton type="success" round @click="open1">show success</VkButton>
  <VkButton type="danger" round @click="open2">show danger</VkButton>
  <VkButton type="warning" round @click="open3">show warning</VkButton>
</template>

<script setup lang="ts">
import VkButton from '@/components/Button'
import { message } from '@/components/Message/methods'

const open1 = () => message.success('成功了!!!')
const open2 = () => message.error("危险物品请勿触碰!!!")
const open3 = () => message.warning('警告警告!!!')

</script>
