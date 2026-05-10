<template>
  <Button type="primary" @click="open1">show message</Button>
  <Button type="danger" @click="open2">show danger</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
import { createMessage } from '@/components/Message/methods'

const open1 = () => {
  createMessage({ message: '小提示', type: 'info', closable: true })
}

const open2 = () => {
  createMessage({ message: "危险物品请勿触碰!!!", type: "danger", duration: 3000, closable: true })
}

</script>
