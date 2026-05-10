<template>
  <div class="alert-box">
    <Alert title="默认" content="alert展示默认内容" type="primary" icon></Alert>
    <Alert title="成功" content="alert展示成功内容" type="success" icon></Alert>
    <Alert title="提示" content="alert展示提示内容" type="info" icon></Alert>
    <Alert title="警告" content="alert展示警告内容" type="warning" icon></Alert>
    <Alert title="危险" content="alert展示危险内容" type="danger" icon></Alert>
  </div>
</template>

<script setup lang="ts">
import Alert from '@/components/Alert/Alert.vue'

</script>

<style>
.alert-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>