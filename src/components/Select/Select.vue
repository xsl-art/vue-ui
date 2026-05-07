<template>
  <div class="vk-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown"
    @mouseenter="states.mouseHover = true" @mouseleave="states.mouseHover = false">
    <Tooltip placement="bottom" ref="toolTipRef" :popper-options="popperOptions" manual
      @click-outside="controlDropdown(false)">
      <Input v-model="states.inputValue" :disabled="disabled" :placeholder="filteredPlaceholder" ref="inputRef"
        :readonly="!isDropdownShow || !filterable" role="combobox" :aria-activedescendant="activeDescendantId"
        @input="debounceOnFilter" @keydown="handleKeydown">
        <template #suffix>
          <Icon class="vk-input__clear" v-if="showClearIcon" icon="circle-xmark" @mousedown.prevent="NOOP"
            @click.stop="handleClear" />
          <Icon class="header-angle" v-else icon="angle-down" :class="{ 'is-active': isDropdownShow }" />
        </template>
      </Input>
      <template #content>
        <div class="vk-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin />
        </div>
        <div class="vk-select__nodata" v-else-if="filterable && filteredOptions.length === 0">
          no match data!!!
        </div>
        <ul class="vk-select__menu" v-else :id="listboxId">
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li class="vk-select__menu-item" :class="{
              'is-disabled': item.disabled, 'is-selected': isOptionSelected(item),
              'is-highlighted': states.highlightIndex === index
            }" :id="getOptionId(item, index)" role="option" @click.stop="itemSelect(item)">
              <span class="vk-select__menu-item-label">
                <RenderVNode :VNode="renderLabel ? renderLabel(item) : item.label"></RenderVNode>
              </span>
              <Icon class="vk-select__menu-item-check" icon="check" v-show="isOptionSelected(item)"></Icon>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from "vue";
import Icon from "../Icon/Icon.vue";
import Input from "../Input/Input.vue";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { SelectEmits, SelectProps, SelectOption, SelectState } from "./types";
import RenderVNode from "../../commen/RenderVNode";
import type { TooltipInstance } from "../Tooltip/types";
import type { InputInstance } from "../Input/types";
import { debounce, isFunction } from "lodash";

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

const toolTipRef = ref<TooltipInstance>();
const initialOption = findOption(props.modelValue);
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
  inputValue: initialOption ? initialOption.label : "",
  selectOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
});

const isDropdownShow = ref(false);

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
    if (props.filterable && states.selectOption) {
      states.inputValue = ''
    }

    if (props.filterable) generateFilterOptions(states.inputValue)
    toolTipRef.value?.show()
    const selectedIndex = filteredOptions.value.findIndex(option => isOptionSelected(option) && !option.disabled)
    states.highlightIndex = selectedIndex > -1 ? selectedIndex : findNextEnabledOption(-1, 1)
  } else {
    toolTipRef.value?.hide()
    if (props.filterable) {
      states.inputValue = states.selectOption ? states.selectOption.label : ''
    }
    states.highlightIndex = -1
  }
  isDropdownShow.value = show;
  emits('visible-change', show)
};

//过滤
const generateFilterOptions = async (searchVlaue: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchVlaue)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchVlaue)
    } catch (e) {
      console.error(e)
      filteredOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filteredOptions.value = props.options.filter(Option => Option.label.includes(searchVlaue))
  }
  states.highlightIndex = -1
}

const onFilter = () => generateFilterOptions(states.inputValue)

const debounceOnFilter = debounce(() => onFilter(), timeout.value)

//placeholder
const filteredPlaceholder = computed(() => {
  if (!props.filterable || !isDropdownShow.value) return props.placeholder;
  if (states.selectOption) return states.selectOption.label;
  return props.placeholder;
});

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(true)
      } else if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
        itemSelect(filteredOptions.value[states.highlightIndex])
      } else {
        controlDropdown(false)
      }
      break;
    case "Escape":
      if (isDropdownShow.value) controlDropdown(false)
      break
    case 'ArrowUp':
    case 'ArrowDown':
      e.preventDefault()
      if (!isDropdownShow.value) controlDropdown(true)
      if (filteredOptions.value.length > 0) {
        const direction = e.key === 'ArrowDown' ? 1 : -1
        states.highlightIndex = findNextEnabledOption(states.highlightIndex, direction);
      }
      break
    default:
      break
  }
};

const NOOP = () => { };

const hasSelectedValue = computed(() => !!states.selectOption);

const showClearIcon = computed(() => {
  return (
    states.mouseHover && props.clearabled && states.inputValue.trim() !== "" && hasSelectedValue.value
  );
});

const handleClear = () => {
  states.inputValue = "";
  states.selectOption = null;
  emits("clear");
  emits("change", "");
  emits("update:modelValue", "");
};

const isOptionSelected = (item: SelectOption) => states.selectOption?.value === item.value;

const syncSelectedByModelValue = (value: string | string[]) => {
  const option = findOption(value);
  states.selectOption = option;
  states.inputValue = option ? option.label : "";
};

const getOptionId = (item: SelectOption, index: number) => `select-item-${item.value}-${index}`

const itemSelect = (item: SelectOption) => {
  if (item.disabled) return
  states.inputValue = item.label
  states.selectOption = item
  emits('change', item.value)
  emits('update:modelValue', item.value)
  controlDropdown(false)
  inputRef.value?.ref?.focus?.()
}

const findNextEnabledOption = (startIndex: number, direction: 1 | -1) => {
  if (filteredOptions.value.length === 0) return -1
  let steps = 0
  let index = startIndex
  while (steps < filteredOptions.value.length) {
    index = (index + direction + filteredOptions.value.length) % filteredOptions.value.length
    if (!filteredOptions.value[index].disabled) return index
    steps++
  }
  return -1
}

const activeDescendantId = computed(() => {
  const index = states.highlightIndex;
  if (index < 0) return undefined;
  const option = filteredOptions.value[index];
  if (!option) return undefined;
  return getOptionId(option, index);
});
</script>
