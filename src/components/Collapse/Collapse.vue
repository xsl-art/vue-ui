<template>
  <div class="vk-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { type CollapseProps, type NameType, type CollapseEmits, collapseContextKey } from './types';

defineOptions({
  name: 'VkCollapse'
})

const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: () => [],
  accordion: false
})

const emits = defineEmits<CollapseEmits>()

const activeNames = ref<NameType[]>([...props.modelValue])

if (props.accordion && activeNames.value.length > 1) {
  console.warn("accordion mode should only have one active item");
}

watch(() => props.modelValue, (newVal) => {
  activeNames.value = [...newVal]
})

const handleClick = (item: NameType) => {
  let newActiveNames: NameType[]

  if (props.accordion) {
    newActiveNames = activeNames.value.includes(item) ? [] : [item]
  } else {
    newActiveNames = [...activeNames.value]
    const index = newActiveNames.indexOf(item)

    if (index > -1) {
      newActiveNames.splice(index, 1)
    } else {
      newActiveNames.push(item)
    }
  }

  activeNames.value = newActiveNames
  emits('update:modelValue', newActiveNames)
  emits('change', newActiveNames)
}

provide(collapseContextKey, {
  activeNames,
  handleClick
})
</script>
