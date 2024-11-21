import { ComponentSize } from '@/enums/ComponentSize'
import { Placement } from '@/enums/Placement'
import { Component } from 'vue'
import { SDropdownButtonType } from '../enum/SDropdownButtonType'
import ISDropdownActionGroup from './ISDropdownActionGroup'
import ISDropdownInformationItem from './ISDropdownInformationItem'

export default interface ISDropdownProps {
  /** Choose the type of button you want to render, use Component for custom icon.
   * Custom icons can be styled using a render function, but default classes are supplied */
  menuButton: ISDropdownButton | string | Component
  actions: ISDropdownActionGroup[]
  isDisabled?: boolean
  informationItems?: ISDropdownInformationItem[]
  size?: ComponentSize
  position?: Placement.Left | Placement.Right
  /** The menu doesn't have much contrast on a white background, enabling this adds some more contrast */
  applyWhiteBgCompensation?: boolean
}

export interface ISDropdownButton {
  type: SDropdownButtonType
  hasBackgroundColor?: boolean
}
