<script setup>
import Button from "@/components/Button/Button.vue";
</script>

<template>
  <div class="button-row">
    <Button type="primary" icon="upload" size="large">upload</Button>
    <Button type="primary" icon="upload" size="small">upload</Button>
    <Button type="success" circle size="large">success</Button>
    <Button type="success" circle size="small">success</Button>
    <Button type="danger" round size="large">danger</Button>
    <Button type="danger" round size="small">danger</Button>
  </div>
</template>

<style>
.button-row {
  display: flex;
  align-items: center;
}
</style>
