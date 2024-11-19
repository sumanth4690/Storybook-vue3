<template>
  <div class="w-80">
    <label class="text-sm" v-if="props.label" data-testid="input-label">{{ props.label }}</label>
    <div class="relative">
      <component class="ml-2.5 mt-2 text-gray-900 h-5 w-5 absolute" :is="leftIcon"></component>
      <component class="mt-2 right-2.5 text-gray-900 h-5 w-5 absolute" :is="rightIcon"></component>
      <input
        class="rounded block h-9 w-full border"
        data-testid="SInput"
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
    <small class="text-xs text-red-600" data-testid="alert-message" v-if="alert">{{ alert }}</small>
  </div>
</template>

<script setup lang="ts">
import { ValidationType } from '@/interfaces/ValidationType'
import { type Component, ref, watch } from 'vue'
import { ISInputProps } from './interfaces/SInputProps'

const props = defineProps<ISInputProps>()

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
