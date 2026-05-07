<script setup lang="ts">
import { h, onMounted, reactive, ref } from 'vue';
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
import Switch from './components/Switch/Switch.vue';
import Input from './components/Input/Input.vue';
import type { SelectOption } from './components/Select/types';
import Select from './components/Select/Select.vue';
import type { FormInstance, FormRules } from './components/Form/types';
import FormItem from './components/Form/FormItem.vue';
import Form from './components/Form/Form.vue';
import Dialog from './components/Dialog/Dialog.vue';

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

const options: SelectOption[] = [
  { label: "hello", value: "1" },
  { label: "xyz", value: "2" },
  { label: "testing", value: "3" },
  { label: "123", value: "4", disabled: true },
  { label: "fhafhaskfhkefh", value: "5" },
  { label: "asf", value: "8" },
];

const handleFetch = async (query: string): Promise<SelectOption[]> => {
  if (!query) return [];
  const res = await fetch(`https://api.github.com/search/repositories?q=${query}`);
  const data = (await res.json()) as { items: any[] };
  return data.items.slice(0, 10).map((item) => ({
    label: item.name,
    value: item.node_id,
  }));
};

const formRef = ref<FormInstance>();
const model = reactive({
  email: "",
  password: "",
  test: "",
  confirmPwd: "",
});

const rules: FormRules = {
  email: [{ type: "email", required: true, trigger: "blur" }],
  password: [{ type: "string", required: true, trigger: "blur", min: 3, max: 5 }],
  test: [{ type: "string", required: true, trigger: "blur" }],
  confirmPwd: [
    { type: "string", required: true, trigger: "blur" },
    {
      validator: (_rule, value) => value === model.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
};

const submit = async () => {
  try {
    await formRef.value?.validate();
    console.log("passed");
  } catch (e) {
    console.log("the error", e);
  }
};

const reset = () => {
  formRef.value?.resetFields();
};

const visible = ref(false);

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
  <Switch model-value="boolean" active-text="开" inactive-text="关"></Switch>
  <Switch model-value="boolean" active-text="开" inactive-text="关" size="large"></Switch>
  <Switch model-value="boolean" active-text="开" inactive-text="关" size="small"></Switch>

  <br />
  <Input type="text" size="large" style="width: 50px;" clearable />
  <Input type="password" size="small" show-password clearable />
  <Input type="textarea" size="small" />

  <br />
  <Select model-value="" placeholder="请选择" :options="options" filterable></Select>
  <Select model-value="" placeholder="请选择" :options="options" filterable remote :remote-method="handleFetch"></Select>

  <br />
  <div>
    <Form :model="model" :rules="rules" ref="formRef" label-position="left">
      <FormItem label="the email" prop="email">
        <Input v-model="model.email" />
      </FormItem>
      <FormItem label="the password" prop="password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input type="password" v-model="model.password" />
      </FormItem>
      <FormItem label="test" prop="test">
        <template #default="{ validate }">
          <input type="text" v-model="model.test" @blur="() => validate('blur')" />
        </template>
      </FormItem>
      <FormItem label="confirmPwd" prop="confirmPwd">
        <Input type="password" v-model="model.confirmPwd" />
      </FormItem>
      <div>
        <Button type="primary" native-type="reset" @click.prevent="submit">Submit</Button>
        <Button @click.prevent="reset">Reset</Button>
      </div>
    </Form>
    <div class="form-demo-value">
      <span>form value:</span>
      <pre>{{ model }}</pre>
    </div>
  </div>

  <br />
  <Button type="success" @click="visible = true">点击弹出对话框</Button>
  <Dialog v-model="visible" title="提示" width="480px" @close="() => { }" @closed="() => { }" modal draggable>
    <p>正文内容</p>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="邮箱" prop="email">
        <Input v-model="model.email" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input type="password" v-model="model.password" />
      </FormItem>
    </Form>
    <template #footer>
      <Button @click="visible = false">确定</Button>
    </template>
  </Dialog>
</template>
