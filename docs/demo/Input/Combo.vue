<script setup>
import { ref } from "vue";
import VkInput from "@/components/Input/Input.vue";
import VkIcon from "@/components/Icon/Icon.vue";
const test = ref("");
</script>
<template>
  <VkInput v-model="test" placeholder="prepend append">
    <template #prepend>Https://</template>
    <template #append>.com</template>
  </VkInput>

  <VkInput v-model="test" placeholder="prefix suffix">
    <template #prefix>
      <VkIcon icon="fa-user" />
    </template>
    <template #suffix>
      <VkIcon icon="fa-user" />
    </template>
  </VkInput>
</template>
