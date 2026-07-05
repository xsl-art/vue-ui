<script setup>
import { ref } from "vue";
import VkInput from "@/components/Input/Input.vue";
const test = ref("");
</script>
<template>
  <VkInput v-model="test" placeholder="密码文本框，可以切换" showPassword />
</template>
