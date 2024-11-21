<template>
  <Menu as="div" class="relative inline-block">
    <MenuButton
      class="group block focus:outline-0"
      :disabled="isDisabled"
      data-test="SDropdown-menu-button"
    >
      <div v-if="isMenuButtonStringType" :class="labelClasses" data-test="SDropdown-menu-label">
        {{ menuButton }}
        <ChevronDownIcon :class="chevronIconClasses" aria-hidden="true" />
      </div>

      <component
        :is="sDropdownIconButton"
        v-else-if="sDropdownIconButton"
        :class="[
          menuIconClasses,
          'menu-icon', // marker class for testing. data-test doesn't work with hero icons...
        ]"
      />

      <component
        :is="props.menuButton"
        v-else
        data-test="SDropdown-custom-menu-icon"
        :class="menuIconClasses"
      />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems :class="menuItemsClasses">
        <MenuItem v-if="props.informationItems" as="div" data-test="SDropdown-information-items">
          <div
            v-for="informationItem in props.informationItems"
            :key="informationItem.key"
            class="cursor-default px-2.5 pt-2.5 first:pt-2 last:border-b last:border-grey last:pb-2"
          >
            <p :class="informationItemLabelClasses" data-test="SDropdown-information-item-label">
              {{ informationItem.label }}
            </p>
            <p :class="informationItemTextClasses" data-test="SDropdown-information-item-text">
              {{ informationItem.text || '-' }}
            </p>
          </div>
        </MenuItem>
        <MenuItem
          v-for="itemGroup in props.actions"
          :key="itemGroup.key"
          as="div"
          data-test="SDropdown-actions"
          class="border-b border-grey last:border-b-0"
        >
          <div v-for="item in itemGroup.actions" :key="item.key" :data-testid="item.dataTestId">
            <button
              :class="[item.isDisabled ? disabledClasses : actionClasses]"
              :disabled="item.isDisabled"
              data-test="SDropdown-menu-item-btn"
              @click="item.action"
            >
              <component :is="toRaw(item.icon)" :class="iconClasses" />
              {{ item.label }}
              <div
                v-if="item.description"
                data-test="SDropdown-description"
                :class="descriptionClasses"
              >
                {{ item.description }}
              </div>
            </button>
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Placement } from '@/enums/Placement'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { EllipsisVerticalIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import GraphIcon from './GraphIcon.vue'
import { computed, h, toRaw, Component as VueComponent } from 'vue'
import { SDropdownButtonType } from './enum/SDropdownButtonType'
import ISDropdownProps, { ISDropdownButton } from './interfaces/ISDropdownProps'
import { ComponentSize } from '@/enums/ComponentSize'

const props = withDefaults(defineProps<ISDropdownProps>(), {
  isDisabled: undefined,
  informationItems: undefined,
  size: ComponentSize.Medium,
  position: Placement.Left,
})

const issDropdownIconButton = (obj: ISDropdownProps['menuButton']): obj is ISDropdownButton => {
  return typeof obj === 'object' && 'type' in obj
}

const sDropdownIconButton = computed(() => {
  if (!issDropdownIconButton(props.menuButton)) {
    return undefined
  }

  const icons = new Map<SDropdownButtonType, VueComponent>([
    [SDropdownButtonType.EllipsisVerticalIcon, EllipsisVerticalIcon],
    [SDropdownButtonType.UserCircleIcon, UserCircleIcon],
    [
      SDropdownButtonType.GraphIcon,
      h(GraphIcon, {
        // Temporary quick and dirty fix, this icon's color should differ from the rest.
        // Permanent fix will be done in #20228
        class: '!text-black group-disabled:!text-grey-600',
      }),
    ],
  ])

  return icons.get(props.menuButton.type)
})

const descriptionClasses = computed(() => {
  return ['font-normal text-grey-700', props.size === ComponentSize.ExtraLarge ? 'mt-1' : 'mt-0.5']
})

const isMenuButtonStringType = computed<boolean>(() => typeof props.menuButton === 'string')

const getFontSizeClass = () => {
  switch (props.size) {
    case ComponentSize.ExtraSmall:
      return 'text-xxs'
    case ComponentSize.Small:
      return 'text-xs'
    case ComponentSize.Medium:
      return 'text-sm'
    case ComponentSize.Large:
    case ComponentSize.ExtraLarge:
      return 'text-base'
    default:
      return ''
  }
}

const actionClasses = computed(() => {
  const classes = [
    'block w-full cursor-pointer items-center border-l-2 border-transparent py-2 px-2.5 font-normal text-black hover:border-red hover:bg-grey-100 text-left',
  ]
  const menuButtonSize = getFontSizeClass()
  return classes.concat(menuButtonSize)
})

const disabledClasses = computed(() => {
  const classes = [
    'text-grey-600 border-none cursor-not-allowed hover:bg-transparent block w-full items-center py-2 px-2.5 font-normal text-left',
  ]
  const menuButtonSize = getFontSizeClass()
  return classes.concat(menuButtonSize)
})

const labelClasses = computed(() => {
  const classes = [
    'font-normal items-center text-black group flex rounded border border-grey-600 bg-white px-2.5 group-focus-visible:border-grey-700 group-disabled:opacity-50',
  ]
  switch (props.size) {
    case ComponentSize.ExtraSmall:
      classes.push('py-1 h-6 text-xs')
      break
    case ComponentSize.Small:
      classes.push('py-1 h-8 text-sm')
      break
    case ComponentSize.Medium:
      classes.push('py-1.5 h-9 text-sm')
      break
    case ComponentSize.Large:
      classes.push('py-1.5 h-10 text-base')
      break
    case ComponentSize.ExtraLarge:
      classes.push('py-1.5 h-12 text-base')
      break
  }
  return classes
})

const menuIconClasses = computed(() => {
  const classes = [
    'cursor-pointer block outline text-grey-700 rounded outline-1 outline-transparent hover:group-disabled:outline-transparent hover:group-disabled:bg-transparent group-focus-visible:outline-grey-700 group-disabled:cursor-default group-disabled:text-grey-600 group-disabled:!bg-transparent',
  ]
  if (issDropdownIconButton(props.menuButton) && props.menuButton.hasBackgroundColor) {
    classes.push("hover:bg-grey group-focus-visible:bg-grey group-[[aria-expanded='true']]:bg-grey")
  }

  switch (props.size) {
    case ComponentSize.ExtraSmall:
    case ComponentSize.Small:
      classes.push('h-5 w-5')
      break
    case ComponentSize.Medium:
    case ComponentSize.Large:
      classes.push('h-6 w-6')
      break
    case ComponentSize.ExtraLarge:
      classes.push('h-7 w-7')
      break
  }

  return classes
})

const chevronIconClasses = computed(() => {
  const classes = ["ml-2.5 text-grey-700 group-[[aria-expanded='true']]:rotate-180"]
  switch (props.size) {
    case ComponentSize.ExtraSmall:
      classes.push('h-3.5 w-3.5')
      break
    case ComponentSize.Small:
      classes.push('h-5 w-5')
      break
    case ComponentSize.Medium:
    case ComponentSize.Large:
    case ComponentSize.ExtraLarge:
      classes.push('h-6 w-6')
      break
  }
  return classes
})

const menuItemsClasses = computed(() => {
  const classes = [
    'absolute z-10 mt-2 border border-grey rounded shadow-sm bg-white focus:outline-none overflow-hidden',
  ]

  if (props.position === Placement.Right) {
    classes.push('right-0')
  }

  if (props.applyWhiteBgCompensation === true) {
    classes.push('border-[0.5px] border-grey')
  }

  switch (props.size) {
    case ComponentSize.ExtraSmall:
      classes.push('w-48')
      break
    case ComponentSize.Small:
      classes.push('w-52')
      break
    case ComponentSize.Medium:
      classes.push('w-56')
      break
    case ComponentSize.Large:
      classes.push('w-60')
      break
    case ComponentSize.ExtraLarge:
      classes.push('w-64')
      break
  }
  return classes
})

const informationItemLabelClasses = computed(() => {
  const classes = ['text-left font-normal text-grey-700']
  switch (props.size) {
    case ComponentSize.ExtraSmall:
      classes.push('text-xxs')
      break
    case ComponentSize.Small:
    case ComponentSize.Medium:
      classes.push('text-xs')
      break
    case ComponentSize.Large:
    case ComponentSize.ExtraLarge:
      classes.push('text-sm')
      break
  }
  return classes
})

const informationItemTextClasses = computed(() => [
  'mt-0.5 font-medium text-black cursor-default',
  getFontSizeClass(),
])

const iconClasses = computed(() => {
  const classes = ['pointer-events-none mr-2.5 my-0.5 inline-block']
  switch (props.size) {
    case ComponentSize.Large:
    case ComponentSize.ExtraLarge:
      classes.push('h-5 w-5')
      break
    case ComponentSize.Small:
    case ComponentSize.Medium:
      classes.push('h-4 w-4')
      break
    case ComponentSize.ExtraSmall:
      classes.push('h-3.5 w-3.5')
      break
  }
  return classes
})
</script>
