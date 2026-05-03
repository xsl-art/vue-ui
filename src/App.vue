<script setup lang="ts">
import Button from './components/Button/Button.vue';
import Icon from './components/Icon/Icon.vue';
</script>

<template>
  <Button type="danger" disabled loading>测试Button</Button>
  <Button round type="primary" icon="face-smile">测试Button2</Button>
  <Button circle type="success" plain>测试Button2</Button>
  <br />
  <Icon icon="face-smile" color="pink" size="10x"></Icon>
  <Icon icon="poo" type="warning" color="brown" size="10x"></Icon>
</template>
