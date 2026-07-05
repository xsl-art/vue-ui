<script setup>
import { ref } from "vue";
import VkInput from "@/components/Input/Input.vue";
const test = ref("");
</script>
<template>
  <div class="size-holder">
    <VkInput v-model="test" placeholder="大的 Input" size="large"> </VkInput>
    <VkInput v-model="test" placeholder="普通的 Input"> </VkInput>
    <VkInput v-model="test" placeholder="小的 Input" size="small"> </VkInput>
  </div>
</template>
<style scoped>
.size-holder {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
