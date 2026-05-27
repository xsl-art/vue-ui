<template>
  <Button type="success" round @click="open1">show success</Button>
  <Button type="danger" round @click="open2">show danger</Button>
  <Button type="warning" round @click="open3">show warning</Button>
</template>

<script setup lang="ts">
import Button from '@/components/Button'
import { message } from '@/components/Message/methods'

const open1 = () => message.success('成功了!!!')
const open2 = () => message.error("危险物品请勿触碰!!!")
const open3 = () => message.warning('警告警告!!!')

</script>
