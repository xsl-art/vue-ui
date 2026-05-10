<template>
  <Button type="primary" @click="open">show message</Button>
  <Button type="danger" @click="close">show danger</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
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
