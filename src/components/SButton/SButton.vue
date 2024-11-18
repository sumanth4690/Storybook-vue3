<template>
  <div>
    <button class="text-red-300" @click="emit('click')">{{ props.label }}</button>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    primary?: boolean
    size?: 'small' | 'medium' | 'large'
  }>(),
  { primary: false },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
