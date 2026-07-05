<script setup>
import { ref } from "vue";
import VkSwitch from "@/components/Switch/Switch.vue";
const test = ref(false);
</script>
<template>
  <VkSwitch v-model="test" />
</template>
