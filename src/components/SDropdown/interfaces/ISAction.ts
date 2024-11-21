import { type Component } from 'vue'

export interface IAction {
  key: string
  label: string
  action: () => void
  icon?: Component
  description?: string
  isDisabled?: boolean
  dataTestId?: string
}
