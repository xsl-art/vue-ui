<script setup lang="ts">
import { ref } from 'vue';
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';

//初始激活项
const openedValue = ref(["a"]);
</script>

<template>
  <Button type="danger" disabled loading>测试Button</Button>
  <Button round type="primary" icon="face-smile">测试Button2</Button>
  <Button circle type="success" plain>测试Button2</Button>

  <br />
  <Icon icon="face-smile" color="pink" size="10x"></Icon>
  <Icon icon="poo" type="warning" color="brown" size="10x"></Icon>

  <br />
  <Collapse :model-value="openedValue">
    <CollapseItem name="a" title="第一条">
      <div>123</div>
    </CollapseItem>
    <CollapseItem name="b" title="第二条">
      <div>123飞机阿拉弗拉</div>
    </CollapseItem>
    <CollapseItem name="c" title="第三条">
      <div>123方法骄傲了是否</div>
    </CollapseItem>
    <CollapseItem name="d" title="第四条">
      <div>123范德萨案件发生开发</div>
    </CollapseItem>
  </Collapse>
</template>
