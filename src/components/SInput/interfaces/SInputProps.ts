import { ValidationType } from '@/interfaces/ValidationType'
import { type Component } from 'vue'

export interface ISInputProps {
  modelValue?: string
  label?: string
  validationState?: ValidationType
  alert?: string
  leftIcon?: Component
  rightIcon?: Component
}
