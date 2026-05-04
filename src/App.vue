<script setup lang="ts">
import { h, onMounted, ref } from 'vue';
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Alert from './components/Alert/Alert.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import type { TooltipInstance } from './components/Tooltip/types';
import Dropdown from './components/Dropdown/Dropdown.vue';
import type { MenuOption } from './components/Dropdown/types';
import { createMessage } from './components/Message/methods';


//初始激活项
const openedValue = ref(["a"]);

const toolTipRef = ref<TooltipInstance>()

const menu: MenuOption[] = [
  { label: 'srfaga', key: 1 },
  { label: 222, key: 2, divided: true },
  { label: 444, key: 3, disabled: true },
  { label: 'faHardOfHearing', key: 4 },
  { label: h('h4', 'hello peter'), key: 5 }
]

onMounted(() => {
  createMessage({ message: 'dhakfh', duration: 3000, type: 'success' }),
    createMessage({ message: 'dhakfh', duration: 0, type: 'danger' })
})
</script>

<template>
  <Button type="danger" loading>测试Button</Button>
  <Button round type="primary" icon="face-smile" @click="toolTipRef?.hide">测试Button2</Button>
  <Button circle type="success" plain @click="toolTipRef?.show">测试Button2</Button>

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

  <br />

  <Alert title="123" content="fjsdfhl" type="primary" effect="light" center></Alert>
  <Alert title="123" content="fjsdfhl" type="success" effect="light"></Alert>
  <Alert title="123" content="fjsdfhl" type="warning" effect="dark"></Alert>
  <Alert title="123" content="fjsdfhl" type="danger" effect="dark"></Alert>
  <Alert title="123" content="fjsdfhl" type="info" effect="light"></Alert>

  <br />

  <Tooltip ref="toolTipRef">
    <img src="../src/assets/vue.svg" alt="" class="logo" width="125" height="125">
    <template #content>
      <span>你好啊tooltip</span>
    </template>
  </Tooltip>

  <Dropdown trigger="hover" placement="right" :menu-options="menu">
    <img src="../src/assets/vue.svg" alt="" class="logo" width="125" height="125">
    <template #content>
    </template>
  </Dropdown>

  <br />
</template>
