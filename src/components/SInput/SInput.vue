<template>
  <div class="w-80">
    <label class="text-sm" v-if="props.label">{{ props.label }}</label>
    <div class="relative">
      <component
        class="pointer-events-none ml-2.5 mt-2 text-gray-900 h-5 w-5 absolute"
        v-if="leftIcon"
        :is="leftIcon"
      ></component>
      <component
        class="pointer-events-none mt-2 right-2.5 text-gray-900 h-5 w-5 absolute"
        v-if="rightIcon"
        :is="rightIcon"
      ></component>
      <input
        class="rounded block h-9 w-full border"
        :class="[
          {
            'pl-2.5': !leftIcon,
            'pl-10': leftIcon,
            'pr-2.5': !rightIcon,
            'pr-10': rightIcon,
          },
          { 'border-green-600': props.validationState === ValidationType.Valid },
          { 'border-red-600': props.validationState === ValidationType.Invalid },
          { 'border-gray-500': !props.validationState },
        ]"
        type="text"
        v-model="internalModelValue"
        @input="emit('update:modelValue', internalModelValue)"
      />
    </div>
    <small class="text-xs text-red-600">{{ alert }}</small>
  </div>
</template>

<script setup lang="ts">
import { ValidationType } from '@/interfaces/ValidationType'
import { FunctionalComponent, PropType, ref, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  alert: {
    type: String,
    default: null,
  },
  leftIcon: {
    type: Object as PropType<FunctionalComponent>,
    default: null,
  },
  rightIcon: {
    type: Object as PropType<FunctionalComponent>,
    default: null,
  },
  validationState: {
    type: Object as PropType<ValidationType.Valid | ValidationType.Invalid>,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const internalModelValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== internalModelValue.value) {
      internalModelValue.value = newValue
      emit('update:modelValue', newValue)
    }
  },
)
</script>
