<script setup>
import { ref } from "vue";
import VkSwitch from "@/components/Switch/Switch.vue";

const test = ref(false);
const test2 = ref(false);
</script>
<template>
  正常：
  <VkSwitch v-model="test" /> <br />
  禁用：
  <VkSwitch v-model="test2" disabled />
</template>
