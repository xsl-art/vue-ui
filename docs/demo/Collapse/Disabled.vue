<template>
  <VkCollapse v-model="openedValue" accordion>
    <VkCollapseItem name="a" title="Title A">
      <h3>headline title</h3>
      <div>x y z v b n</div>
    </VkCollapseItem>
    <VkCollapseItem name="b" title="Title B" disabled>
      <div>this is bbbbb test</div>
    </VkCollapseItem>
    <VkCollapseItem name="c" title="Title C">
      <div>this is cccc test</div>
    </VkCollapseItem>
    <VkCollapseItem name="d" title="Title D" disabled>
      <div>this is cccc test</div>
    </VkCollapseItem>
    <VkCollapseItem name="e" title="Title E">
      <div>this is cccc test</div>
    </VkCollapseItem>
  </VkCollapse>

</template>

<script setup lang="ts">
import VkCollapse from '@/components/Collapse/Collapse.vue'
import VkCollapseItem from '@/components/Collapse/CollapseItem.vue'
import { ref } from 'vue'

const openedValue = ref(["a"]);
</script>