<template>
  <Collapse v-model="openedValue">
    <CollapseItem name="a" title="Title A">
      <h3>headline title</h3>
      <div>x y z v b n</div>
    </CollapseItem>
    <CollapseItem name="b" title="Title B">
      <div>this is bbbbb test</div>
    </CollapseItem>
    <CollapseItem name="c" title="Disabled Title">
      <div>this is cccc test</div>
    </CollapseItem>
  </Collapse>

</template>

<script setup lang="ts">
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
import { ref } from 'vue'

const openedValue = ref(["a"]);
</script>