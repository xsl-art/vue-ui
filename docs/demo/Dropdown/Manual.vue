<template>
  <div class="dropdown">
    <Dropdown ref="dropdownRef" :menu-options="options" manual placement="top">
      <img src="@/assets/vue.svg" alt="logo" class="logo" width="50" height="50" />
    </Dropdown>
    <div class="buttons">
      <Button @click="dropdownRef?.show">打开</Button>
      <Button @click="dropdownRef?.hide">关闭</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import { type DropdownInstance, type MenuOption } from '@/components/Dropdown/types';
import Button from '@/components/Button/Button.vue';


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
