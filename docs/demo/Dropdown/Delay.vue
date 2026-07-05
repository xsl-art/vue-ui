<template>
  <VkDropdown trigger="click" :menu-options="options" :open-delay="2000" :close-delay="2000">
    <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
  </VkDropdown>
</template>

<script setup lang="ts">
import { h } from 'vue';
import VkDropdown from '@/components/Dropdown/Dropdown.vue'
import { type MenuOption } from '@/components/Dropdown/types';

//定义选项菜单
const options: MenuOption[] = [
  { key: 1, label: "item1" },
  { key: 2, label: 'item2' },
  { key: 3, label: 'item3' },
  { key: 4, label: h('strong', 'render by renderFn') }
]
</script>