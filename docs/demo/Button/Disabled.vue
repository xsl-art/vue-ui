<script setup>
import Button from "@/components/Button/Button.vue";
</script>

<template>
  <div class="button-row">
    <Button disabled>default</Button>
    <Button type="primary" disabled>Button1</Button>
    <Button type="success" disabled>Button2</Button>
    <Button type="info" disabled>Button3</Button>
    <Button type="warning" disabled>Button4</Button>
    <Button type="danger" disabled>Button5</Button>
  </div>

  <div class="button-row">
    <Button disabled>default</Button>
    <Button type="primary" plain disabled>Button1</Button>
    <Button type="success" plain disabled>Button2</Button>
    <Button type="info" plain disabled>Button3</Button>
    <Button type="warning" plain disabled>Button4</Button>
    <Button type="danger" plain disabled>Button5</Button>
  </div>
</template>

<style>
.button-row {
  display: flex;
  margin-top: 15px;
}
</style>
