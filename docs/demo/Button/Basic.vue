<script setup>
import Button from "@/components/Button/Button.vue";
</script>

<template>
  <div class="button-row">
    <Button>default</Button>
    <Button type="primary">Button1</Button>
    <Button type="success">Button2</Button>
    <Button type="info">Button3</Button>
    <Button type="warning">Button4</Button>
    <Button type="danger">Button5</Button>
  </div>

  <div class="button-row">
    <Button>default</Button>
    <Button type="primary" plain>Button1</Button>
    <Button type="success" plain>Button2</Button>
    <Button type="info" plain>Button3</Button>
    <Button type="warning" plain>Button4</Button>
    <Button type="danger" plain>Button5</Button>
  </div>

  <div class="button-row">
    <Button circle>circle</Button>
    <Button type="primary" circle>Button1</Button>
    <Button type="success" circle>Button2</Button>
    <Button type="info" circle>Button3</Button>
    <Button type="warning" circle>Button4</Button>
    <Button type="danger" circle>Button5</Button>
  </div>

  <div class="button-row">
    <Button round>round</Button>
    <Button type="primary" round>Buttone1</Button>
    <Button type="success" round>Buttone2</Button>
    <Button type="info" round>Buttone3</Button>
    <Button type="warning" round>Buttone4</Button>
    <Button type="danger" round>Buttone5</Button>
  </div>
</template>

<style>
.button-row {
  display: flex;
  margin-top: 15px;
}
</style>
