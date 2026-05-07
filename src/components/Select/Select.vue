<template>
  <div class="vk-select" :class="{ 'is-disabled': disabled, 'is-multiple': multiple }" @click="toggleDropdown"
    @mouseenter="states.mouseHover = true" @mouseleave="states.mouseHover = false">
    <Tooltip placement="bottom" ref="toolTipRef" :popper-options="popperOptions" manual
      @click-outside="controlDropdown(false)">
      <Input v-model="states.inputValue" :disabled="disabled" :placeholder="filteredPlaceholder" ref="inputRef"
        :readonly="!isDropdownShow || !filterable" role="combobox" :aria-activedescendant="activeDescendantId"
        :aria-expanded="isDropdownShow" :aria-controls="listboxId" aria-haspopup="listbox"
        :aria-autocomplete="filterable ? 'list' : 'none'" :aria-busy="states.loading" @input="debounceOnFilter"
        @keydown="handleKeydown">
        <template #prefix>
          <div class="vk-select__tags">
            <Tag ref="tagRef" type="info" size="small" effect="light" closable :disabled="disabled"
              v-for="option in states.selectedOptions" :key="option.value" @close="removeTag(option)"
              :aria-label="`Remove ${option.label}`">
              {{ option.label }}
            </Tag>
          </div>
        </template>
        <template #suffix>
          <button type="button" class="vk-input__clear" v-if="showClearIcon" @mousedown.prevent="NOOP"
            @click.stop="handleClear" aria-label="Clear selection">
            <Icon icon="circle-xmark" aria-hidden="true" />
          </button>

          <Icon class="header-angle" v-else icon="angle-down" :class="{ 'is-active': isDropdownShow }"
            aria-hidden="true" />
        </template>
      </Input>
      <template #content>
        <div class="vk-select__loading" v-if="states.loading" role="status" aria-live="polite">
          <Icon icon="spinner" spin aria-hidden="true" />
        </div>
        <div class="vk-select__nodata" v-else-if="filterable && filteredOptions.length === 0" role="status">
          no match data!!!
        </div>
        <ul class="vk-select__menu" v-else :id="listboxId" role="listbox" :aria-multiselectable="multiple">
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li class="vk-select__menu-item" :class="{
              'is-disabled': item.disabled,
              'is-selected': isOptionSelected(item),
              'is-highlighted': states.highlightIndex === index,
            }" :id="getOptionId(item, index)" role="option" :aria-selected="isOptionSelected(item)"
              :aria-disabled="item.disabled" @click.stop="itemSelect(item)">
              <span class="vk-select__menu-item-label">
                <RenderVNode :VNode="renderLabel ? renderLabel(item) : item.label"></RenderVNode>
              </span>
              <Icon class="vk-select__menu-item-check" icon="check" v-show="isOptionSelected(item)" aria-hidden="true">
              </Icon>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, nextTick } from "vue";
import Icon from "../Icon/Icon.vue";
import Input from "../Input/Input.vue";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { SelectEmits, SelectProps, SelectOption, SelectState } from "./types";
import RenderVNode from "../../commen/RenderVNode";
import type { TooltipInstance } from "../Tooltip/types";
import type { InputInstance } from "../Input/types";
import { debounce, isFunction } from "lodash";
import Tag from "../Tag/Tag.vue";

defineOptions({
  name: "VkSelect",
});

const listboxId = `vk-select-listbox-${Math.random().toString(36).slice(2, 8)}`;

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
});

const emits = defineEmits<SelectEmits>();

const popperOptions: any = {
  modifiers: [
    {
      //下拉框与输入框距离
      name: "offset",
      options: {
        offset: [0, 4],
      },
    },
    {
      //自定义等宽
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      //指定这个函数在 Popper 将样式写入 DOM 之前执行
      phase: "beforeWrite",
      //必须确保 computeStyles 这个内置修饰器已经运行过，计算出了基础的位置和样式
      requires: ["computeStyles"],
      effect: ({ state }: { state: any }) => {
        state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
      },
    },
  ],
};

//单选初始选项
const findOption = (value: string | string[]) => {
  if (Array.isArray(value)) return null;
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};

//多选初始选项
const findOptions = (value: string | string[]) => {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  const options = props.options.filter((option) => values.includes(option.value));
  return options ? options : [];
};


const toolTipRef = ref<TooltipInstance>();
const initialOption = findOption(props.modelValue);
const initialOptions = findOptions(props.modelValue);
const inputRef = ref<InputInstance>();
const filteredOptions = ref(props.options);
const timeout = computed(() => (props.remote ? 300 : 0)); //远程搜索300ms延迟

watch(
  () => props.options,
  (newVal) => {
    filteredOptions.value = newVal;
    syncSelectedByModelValue(props.modelValue);
  },
);

watch(
  () => props.modelValue,
  (newVal) => {
    syncSelectedByModelValue(newVal);
  },
);

const states = reactive<SelectState>({
  inputValue: props.multiple ? "" : initialOption ? initialOption.label : "",
  selectedOption: initialOption,
  selectedOptions: initialOptions as SelectOption[],
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
});

const isDropdownShow = ref(false);

const updateDropdownPosition = async () => {
  await nextTick();
  if (!isDropdownShow.value) return;
  toolTipRef.value?.update?.();
};

watch(
  () => states.selectedOptions.length,
  () => {
    if (props.multiple) updateDropdownPosition();
  },
  { flush: "post" },
);

const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};

const controlDropdown = async (show: boolean) => {
  if (show) {
    if (props.filterable && states.selectedOption) {
      states.inputValue = "";
    }

    if (props.filterable) generateFilterOptions(states.inputValue);
    toolTipRef.value?.show();
    await updateDropdownPosition();
    const selectedIndex = filteredOptions.value.findIndex(
      (option) => isOptionSelected(option) && !option.disabled,
    );
    states.highlightIndex = selectedIndex > -1 ? selectedIndex : findNextEnabledOption(-1, 1);
  } else {
    toolTipRef.value?.hide();
    if (props.filterable) {
      states.inputValue = props.multiple
        ? ""
        : states.selectedOption
          ? states.selectedOption.label
          : "";
    }
    states.highlightIndex = -1;
  }
  isDropdownShow.value = show;
  emits("visible-change", show);
};

//过滤
const generateFilterOptions = async (searchVlaue: string) => {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchVlaue);
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(searchVlaue);
    } catch (e) {
      console.error(e);
      filteredOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    filteredOptions.value = props.options.filter((Option) => Option.label.includes(searchVlaue));
  }
  states.highlightIndex = -1;
};

const onFilter = () => generateFilterOptions(states.inputValue);

const debounceOnFilter = debounce(() => onFilter(), timeout.value);

//placeholder
const filteredPlaceholder = computed(() => {
  if (props.multiple && states.selectedOptions.length > 0) return "";
  if (!props.filterable || !isDropdownShow.value) return props.placeholder;
  if (states.selectedOption) return states.selectedOption.label;
  return props.placeholder;
});

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
        itemSelect(filteredOptions.value[states.highlightIndex]);
      } else {
        controlDropdown(false);
      }
      break;
    case "Escape":
      if (isDropdownShow.value) controlDropdown(false);
      break;
    case "ArrowUp":
    case "ArrowDown":
      e.preventDefault();
      if (!isDropdownShow.value) controlDropdown(true);
      if (filteredOptions.value.length > 0) {
        const direction = e.key === "ArrowDown" ? 1 : -1;
        states.highlightIndex = findNextEnabledOption(states.highlightIndex, direction);
      }
      break;
    case "Backspace":
      if (props.multiple && states.inputValue === "" && states.selectedOptions.length > 0) {
        removeTag(states.selectedOptions[states.selectedOptions.length - 1]);
      }
      break;
    default:
      break;
  }
};

const NOOP = () => { };

const hasSelectedValue = computed(() =>
  props.multiple ? states.selectedOptions.length > 0 : !!states.selectedOption,
);

const showClearIcon = computed(() => {
  return (
    states.mouseHover &&
    props.clearabled &&
    states.inputValue.trim() !== "" &&
    hasSelectedValue.value &&
    !props.multiple
  );
});

const handleClear = () => {
  states.inputValue = "";
  states.selectedOption = null;
  states.selectedOptions = [];
  emits("clear");
  emits("change", props.multiple ? [] : "");
  emits("update:modelValue", props.multiple ? [] : "");
};

const isOptionSelected = (item: SelectOption) =>
  props.multiple
    ? states.selectedOptions.some((option) => option.value === item.value)
    : states.selectedOption?.value === item.value;

const syncSelectedByModelValue = (value: string | string[]) => {
  if (props.multiple) {
    states.selectedOptions = findOptions(value);
    states.selectedOption = null;
    states.inputValue = "";
    return;
  }
  const option = findOption(value);
  states.selectedOption = option;
  states.selectedOptions = [];
  states.inputValue = option ? option.label : "";
};

const getOptionId = (item: SelectOption, index: number) => `select-item-${item.value}-${index}`;

const itemSelect = (item: SelectOption) => {
  if (item.disabled) return;
  if (props.multiple) {
    multipleItemSelect(item);
    inputRef.value?.ref.focus?.();
    return;
  }
  states.inputValue = item.label;
  states.selectedOption = item;
  emits("change", item.value);
  emits("update:modelValue", item.value);
  controlDropdown(false);
  inputRef.value?.ref?.focus?.();
};

const getMultipleValues = () => states.selectedOptions.map((option) => option.value);

const multipleItemSelect = (item: SelectOption) => {
  const selectedIndex = states.selectedOptions.findIndex((option) => option.value === item.value);
  if (selectedIndex > -1) {
    states.selectedOptions.splice(selectedIndex, 1);
  } else {
    states.selectedOptions.push(item);
  }
  const values = getMultipleValues();
  states.inputValue = "";
  emits("multiple-choose", values);
  emits("change", values);
  emits("update:modelValue", values);
};
const removeTag = (option: SelectOption) => {
  const selectedIndex = states.selectedOptions.findIndex(
    (selectedOption) => selectedOption.value === option.value,
  );
  if (selectedIndex === -1) return;
  states.selectedOptions.splice(selectedIndex, 1);
  states.inputValue = "";
  const values = getMultipleValues();
  emits("multiple-choose", values);
  emits("change", values);
  emits("update:modelValue", values);
};

const findNextEnabledOption = (startIndex: number, direction: 1 | -1) => {
  if (filteredOptions.value.length === 0) return -1;
  let steps = 0;
  let index = startIndex;
  while (steps < filteredOptions.value.length) {
    index = (index + direction + filteredOptions.value.length) % filteredOptions.value.length;
    if (!filteredOptions.value[index].disabled) return index;
    steps++;
  }
  return -1;
};

const activeDescendantId = computed(() => {
  const index = states.highlightIndex;
  if (index < 0) return undefined;
  const option = filteredOptions.value[index];
  if (!option) return undefined;
  return getOptionId(option, index);
});
</script>
