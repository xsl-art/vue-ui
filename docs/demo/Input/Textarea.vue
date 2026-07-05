<script setup>
import { ref } from "vue";
import VkInput from "@/components/Input/Input.vue";
const test = ref("");
</script>
<template>
  <VkInput v-model="test" placeholder="可以是一个 Textarea" type="textarea" :rows="4" style="width: 320px" />
</template>
