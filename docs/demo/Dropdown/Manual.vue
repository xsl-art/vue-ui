<template>
  <div class="dropdown">
    <VkDropdown ref="dropdownRef" :menu-options="options" manual placement="top">
      <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
    </VkDropdown>
    <div class="buttons">
      <VkButton @click="dropdownRef?.show">打开</VkButton>
      <VkButton @click="dropdownRef?.hide">关闭</VkButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import VkDropdown from '@/components/Dropdown/Dropdown.vue'
import { type DropdownInstance, type MenuOption } from '@/components/Dropdown/types';
import VkButton from '@/components/Button/Button.vue';


const dropdownRef = ref<DropdownInstance>()

//定义选项菜单
const options: MenuOption[] = [
  { key: 1, label: "item1" },
  { key: 2, label: 'item2' },
  { key: 3, label: 'item3' },
  { key: 4, label: h('b', 'render by renderFn') }
]
</script>

<style>
.dropdown {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
