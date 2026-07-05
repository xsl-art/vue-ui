<script setup>
import { ref } from "vue";
import VkInput from "@/components/Input/Input.vue";
const test = ref("some text");
</script>
<template>
  <VkInput v-model="test" disabled />
</template>
