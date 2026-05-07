<template>
  <div class="vk-input" :class="{
    [`vk-input--${type}`]: type,
    [`vk-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
    'is-append': $slots.append,
    'is-focus': isFocus,
  }">
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div class="vk-input__prepend" v-if="$slots.prepend" :id="prependId">
        <slot name="prepend"></slot>
      </div>
      <div class="vk-input__wrapper">
        <!-- prefix slot -->
        <span class="vk-input__prefix" v-if="$slots.prefix">
          <slot name="prefix"></slot>
        </span>
        <input class="vk-input__inner" ref="inputRef" :id="inputIdFromFormItem"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" v-bind="$attrs" :disabled="disabled"
          :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus"
          :form="form" v-model="innerValue" @change="handleChange" @input="handleInput" @blur="handleBlur"
          @focus="handleFocus" />
        <!-- suffix slot -->
        <span class="vk-input__suffix" v-if="$slots.suffix || showClear || showPasswordArea" @click="keepFocus">
          <slot name="suffix"></slot>
          <Icon icon="circle-xmark" v-if="showClear" @click="handleClear" @mousedown.prevent="NOOP"
            class="vk-input__clear">
          </Icon>
          <Icon icon="eye" v-if="showPassword && passwordVisible" @click="togglePasswordVisible"
            class="vk-input__password"></Icon>
          <Icon icon="eye-slash" v-if="showPassword && !passwordVisible" @click="togglePasswordVisible"
            class="vk-input__password"></Icon>
        </span>
      </div>
      <!-- append slot -->
      <div class="vk-input__append" v-if="$slots.append" :id="appendId">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea class="vk-textarea__wrapper" v-bind="$attrs" ref="inputRef" :rows="rows" :disabled="disabled"
        :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus" :form="form"
        v-model="innerValue" @input="handleInput" @focus="handleFocus" @blur="handleBlur"
        @change="handleChange"></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, ref, watch, type Ref } from "vue";
import Icon from "../Icon/Icon.vue";
import type { InputEmits, InputProps } from "./types";
import { formItemContextKey } from "../Form/types";

defineOptions({
  name: "VkInput",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<InputProps>(), {
  autocomplete: "off",
  rows: 2,
});

const emits = defineEmits<InputEmits>();

const inputRef = ref() as Ref<HTMLInputElement | HTMLTextAreaElement>;
const isFocus = ref(false);
const innerValue = ref(props.modelValue ?? "");
const passwordVisible = ref(false);
const showClear = computed(
  () => props.clearable && !props.disabled && !!innerValue.value && isFocus.value,
);
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value,
);

//校验
const formItemContext = inject(formItemContextKey, undefined);
const inputIdFromFormItem = computed(() => formItemContext?.inputId);

const prependId = `vk-input-prepend-${Math.random().toString(36).slice(2, 8)}`;
const appendId = `vk-input-append-${Math.random().toString(36).slice(2, 8)}`;

const runValidate = (trigger?: string) => {
  if (formItemContext) {
    formItemContext?.validate(trigger).catch((e) => console.error(e.errors));
  }
};
const keepFocus = async () => {
  await nextTick();
  inputRef.value!.focus();
};

const handleChange = () => {
  emits("change", innerValue.value);
  runValidate("change");
};

const handleInput = () => {
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
  runValidate("input");
};

const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emits("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emits("blur", event);
  runValidate("blur");
};

const handleClear = () => {
  innerValue.value = "";
  emits("clear");
  emits("update:modelValue", "");
  emits("change", "");
};

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};

const NOOP = () => { };

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue ?? "";
  },
);

defineExpose({
  ref: inputRef,
});
</script>
