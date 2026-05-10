<template>
  <Collapse v-model="openedValue" accordion>
    <CollapseItem name="a" title="Title A">
      <h3>headline title</h3>
      <div>x y z v b n</div>
    </CollapseItem>
    <CollapseItem name="b" title="Title B" disabled>
      <div>this is bbbbb test</div>
    </CollapseItem>
    <CollapseItem name="c" title="Title C">
      <div>this is cccc test</div>
    </CollapseItem>
    <CollapseItem name="d" title="Title D" disabled>
      <div>this is cccc test</div>
    </CollapseItem>
    <CollapseItem name="e" title="Title E">
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