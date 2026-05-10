<template>
  <Dropdown trigger="click" :menu-options="options">
    <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import { type MenuOption } from '@/components/Dropdown/types';

//定义选项菜单
const options: MenuOption[] = [
  { key: 1, label: "item1" },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3' },
  { key: 4, label: 'item4', divided: true }
]
</script>