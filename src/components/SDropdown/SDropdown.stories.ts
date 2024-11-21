import { ComponentSize } from '@/enums/ComponentSize'
import { Placement } from '@/enums/Placement'
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import { Meta, StoryObj } from '@storybook/vue3'
import { computed, h, ref } from 'vue'
import { IAction } from './interfaces/ISAction'
import SDropdown from './SDropdown.vue'
import { SDropdownButtonType } from './enum/SDropdownButtonType'
import ISDropdownActionGroup from './interfaces/ISDropdownActionGroup'
import ISDropdownInformationItem from './interfaces/ISDropdownInformationItem'

const selectedAction = ref<IAction | ISDropdownInformationItem>()

const commonActions: IAction[] = [
  {
    key: 'action1',
    label: 'Action 1',
    action: () => {
      selectedAction.value = commonActions[0]
    },
  },
  {
    key: 'action2',
    label: 'Action 2',
    action: () => {
      selectedAction.value = commonActions[1]
    },
  },
]

const group: ISDropdownActionGroup[] = [
  {
    key: 'group1',
    actions: commonActions,
  },
]

const groups: ISDropdownActionGroup[] = [
  ...group,
  {
    key: 'group2',
    actions: [
      ...commonActions,
      {
        key: 'action3',
        label: 'Action 3',
        action: () => {
          selectedAction.value = groups[1].actions[2]
        },
      },
    ],
  },
  {
    key: 'group3',
    actions: [
      {
        key: 'action1',
        label: 'Action 1',
        action: () => {
          selectedAction.value = groups[2].actions[0]
        },
      },
    ],
  },
]

const icons: ISDropdownActionGroup[] = [
  {
    key: 'group1',
    actions: commonActions.map((action) => ({
      ...action,
      icon: ArrowDownTrayIcon,
    })),
  },
]

const disabledAction: ISDropdownActionGroup[] = [
  {
    key: 'group1',
    actions: [
      ...commonActions,
      {
        key: 'action3',
        label: 'Action 3',
        isDisabled: true,
        action: () => {
          selectedAction.value = disabledAction[0].actions[2]
        },
      },
    ],
  },
]

const withDescription: ISDropdownActionGroup[] = [
  {
    key: 'group1',
    actions: commonActions.map((action) => ({
      ...action,
      description: 'description',
    })),
  },
]

const informationItems: ISDropdownInformationItem[] = [
  {
    key: 'informationItemlabel1',
    label: 'Information item label 1',
    text: 'Information item text 1',
  },
  {
    key: 'informationItemlabel2',
    label: 'Information item label 2',
    text: 'Information item text 2',
  },
]

const groupsWithIcons = groups.map((group: ISDropdownActionGroup) => ({
  ...group,
  actions: group.actions.map((action: IAction) => ({
    ...action,
    icon: ArrowDownTrayIcon,
  })),
}))

const meta: Meta<typeof SDropdown> = {
  title: 'Components/Dropdown',
  component: SDropdown,
  args: {
    actions: group,
    menuButton: 'Label',
    size: ComponentSize.Medium,
    position: Placement.Left,
    isDisabled: false,
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    position: {
      options: [Placement.Left, Placement.Right],
      control: 'select',
    },
    menuButton: {
      options: ['LabelText', 'EllipsisIcon', 'UserIcon', 'GraphIcon', 'CustomIcon'],
      mapping: {
        LabelText: 'Label',
        EllipsisIcon: {
          type: SDropdownButtonType.EllipsisVerticalIcon,
        },
        UserIcon: {
          type: SDropdownButtonType.UserCircleIcon,
        },
        GraphIcon: {
          type: SDropdownButtonType.GraphIcon,
        },
      },
      control: 'select',
    },
    size: {
      options: [
        ComponentSize.ExtraSmall,
        ComponentSize.Small,
        ComponentSize.Medium,
        ComponentSize.Large,
        ComponentSize.ExtraLarge,
      ],
      control: 'select',
    },
  },
  tags: ['autodocs'],
  render: (args) => ({
    components: { SDropdown },
    setup() {
      const isMenuButtonStringType = computed(() => typeof args.menuButton === 'string')
      const marginClass = computed(() =>
        args.position === 'right' ? (isMenuButtonStringType.value ? 'ml-36' : 'ml-56') : '',
      )
      return { args, selectedAction, marginClass, isMenuButtonStringType }
    },
    template: `<div class="mb-2">
               <strong class="mr-2">Clicked item :</strong> <span>{{ selectedAction || ' - '}}</span></div>
               <div :class="marginClass">
               <SDropdown v-bind="args" /></div>`,
  }),
}

export default meta
type Story = StoryObj<typeof SDropdown>

export const Default: Story = {}

export const DisabledWithMenuLabel: Story = {
  args: {
    isDisabled: true,
  },
}

export const IconInMenuItems: Story = {
  args: {
    actions: icons,
  },
}

export const WithDescription: Story = {
  args: {
    actions: withDescription,
  },
}

export const Groups: Story = {
  args: {
    actions: groups,
  },
}

export const GroupsWithIconInMenuItems: Story = {
  args: {
    actions: groupsWithIcons,
  },
}

export const UserButton: Story = {
  args: {
    informationItems: informationItems,
    position: Placement.Right,
    menuButton: {
      type: SDropdownButtonType.UserCircleIcon,
    },
  },
}

export const UserItemsWithGroups: Story = {
  args: {
    informationItems: informationItems,
    actions: groups,
    position: Placement.Right,
    menuButton: {
      type: SDropdownButtonType.UserCircleIcon,
    },
  },
}

export const UserItemWithoutText: Story = {
  args: {
    informationItems: [{ ...informationItems[0], text: undefined }, informationItems[1]],
    position: Placement.Right,
    menuButton: {
      type: SDropdownButtonType.UserCircleIcon,
    },
  },
}

export const EllipsisButton: Story = {
  args: {
    menuButton: {
      type: SDropdownButtonType.EllipsisVerticalIcon,
    },
  },
}

export const DisabledWithEllipsisButton: Story = {
  args: {
    menuButton: {
      type: SDropdownButtonType.EllipsisVerticalIcon,
    },
    isDisabled: true,
  },
}

export const EllipsisButtonWithBackground: Story = {
  args: {
    menuButton: {
      type: SDropdownButtonType.EllipsisVerticalIcon,
      hasBackgroundColor: true,
    },
  },
}

export const GraphButton: Story = {
  args: {
    menuButton: {
      type: SDropdownButtonType.GraphIcon,
    },
  },
}

export const DisabledGraphButton: Story = {
  args: {
    isDisabled: true,
    menuButton: {
      type: SDropdownButtonType.GraphIcon,
    },
  },
}
