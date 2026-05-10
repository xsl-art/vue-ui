<script setup>
import { ref } from "vue";
import Select from "@/components/Select/Select.vue";

const test = ref([]);
const options2 = [
  { label: "hello", value: "1" },
  { label: "xyz", value: "2" },
  { label: "testing", value: "3" },
  { label: "123", value: "4", disabled: true },
  { label: 'fahfkad', value: '5' },
  { label: 'nvzj', value: '6' }
];
</script>
<template>
  <Select v-model="test" placeholder="基础选择器，请选择" :options="options2" clearable multiple />
</template>
