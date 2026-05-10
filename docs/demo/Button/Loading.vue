<script setup>
import Button from "@/components/Button/Button.vue";
</script>

<template>
  <div class="button-row">
    <Button type="primary" loading>loading...</Button>
    <Button type="success" loading circle>loading...</Button>
    <Button type="info" loading round>loading...</Button>
    <Button type="warning" loading disabled>loading...</Button>
    <Button type="danger" loading>loading...</Button>
  </div>
</template>
