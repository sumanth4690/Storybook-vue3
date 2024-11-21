import { type Component } from 'vue'
import { IAction } from './ISAction'

export default interface ISDropdownActionGroup {
  key: string
  actions: IAction[]
}
