import { Placement } from '@/enums/Placement'
import { MenuButton, MenuItems } from '@headlessui/vue'
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { toRaw } from 'vue'
import SDropdown from './SDropdown.vue'
import { SDropdownButtonType } from './enum/SDropdownButtonType'
import ISDropdownActionGroup from './interfaces/ISDropdownActionGroup'
import ISDropdownInformationItem from './interfaces/ISDropdownInformationItem'
import ISDropdownProps from './interfaces/ISDropdownProps'
import { IAction } from './interfaces/ISAction'

describe('SDropdown', () => {
  const actionSpy = vi.fn()
  const groups: ISDropdownActionGroup[] = [
    {
      key: 'group1',
      actions: [
        {
          key: 'action1',
          label: 'Action 1',
          dataTestId: 'test-id-action-1',
          action: actionSpy,
        },
      ],
    },
    {
      key: 'group2',
      actions: [
        {
          key: 'action2',
          label: 'Action 2',
          dataTestId: 'test-id-action-2',
          action: actionSpy,
        },
      ],
    },
  ]
  const defaultInformationItem: ISDropdownInformationItem[] = [
    {
      key: 'informationItemlabel1',
      label: 'Information item label 1',
      text: 'Information item name 1',
    },
  ]
  const actions: IAction[] = groups[0].actions
  const menuLabelTextSelector = "[data-test='SDropdown-menu-label']"
  const informationItemTextSelector = "[data-test='SDropdown-information-item-text']"
  const menuButtonSelector = "[data-test='SDropdown-menu-item-btn']"
  const descriptionSelector = "[data-test='SDropdown-description']"
  const menuItemSelector = ["[data-testid='test-id-action-1']", "[data-testid='test-id-action-2']"]

  it('renders the correct label text', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: actions }],
    }
    const wrapper = mount(SDropdown, {
      props: {
        menuButton: initialProps.menuButton,
        actions: initialProps.actions,
      },
    })

    expect(wrapper.find(menuLabelTextSelector).text()).toBe(initialProps.menuButton)
  })

  it('renders icons when provided', async () => {
    const iconActions: IAction[] = actions.map((ele) => {
      return { ...ele, icon: ArrowDownTrayIcon }
    })
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: iconActions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })
    const menuItem = wrapper.findComponent(MenuButton)
    await menuItem.trigger('click')
    const iconComponentName = iconActions[0].icon ? toRaw(iconActions[0].icon.name) : null
    if (iconComponentName) {
      const iconComponent = wrapper.findComponent({ name: iconComponentName })

      expect(iconComponent.exists()).toBe(true)
    }
  })

  it('renders description when provided', async () => {
    const describedActions: IAction[] = actions.map((ele) => {
      return { ...ele, description: 'description' }
    })
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: describedActions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })
    const menuItem = wrapper.findComponent(MenuButton)
    await menuItem.trigger('click')
    const descriptionDiv = wrapper.find(descriptionSelector)

    expect(descriptionDiv.text()).toBe(initialProps.actions[0].actions[0].description)
  })

  it('does not render description when not provided', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: actions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })

    const menuItem = wrapper.findComponent(MenuButton)
    await menuItem.trigger('click')
    const descriptionDiv = wrapper.find(descriptionSelector)

    expect(descriptionDiv.exists()).toBeFalsy()
  })

  it('opens dropdown when menuItem is clicked', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: actions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })
    const menuItem = wrapper.findComponent(MenuButton)
    await menuItem.trigger('click')

    expect(wrapper.find(menuButtonSelector).exists()).toBe(true)
  })

  it('dropdown menu items placed on left when position prop is not set', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: actions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })
    const menuButton = wrapper.findComponent(MenuButton)
    await menuButton.trigger('click')
    const menuItems = wrapper.findComponent(MenuItems)

    expect(menuItems.classes()).not.toContain('ct-right-0')
  })

  it('should not opens dropdown when menuItem is not clicked', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: actions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })

    expect(wrapper.find(menuButtonSelector).exists()).toBe(false)
  })

  it('should not opens dropdown when menuButton is disabled', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      isDisabled: true,
      actions: [{ key: '1', actions: actions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })

    expect(wrapper.find(menuButtonSelector).exists()).toBe(false)
  })

  it("disables the action's button when disable is true", async () => {
    const disabledActions: IAction[] = actions.map((ele) => {
      return { ...ele, isDisabled: true }
    })
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: disabledActions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })
    const menuItem = wrapper.findComponent(MenuButton)
    await menuItem.trigger('click')
    const buttonElement = wrapper.find<HTMLButtonElement>(menuButtonSelector)

    expect(buttonElement.attributes()).toHaveProperty('disabled')
  })

  it('renders enabled menuItem by default', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: actions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })

    const menuItem = wrapper.findComponent(MenuButton)
    await menuItem.trigger('click')
    const buttonElement = wrapper.find(menuButtonSelector)

    expect(buttonElement.attributes()).not.toHaveProperty('disabled')
  })

  it('should not triggers an action when button is disabled', async () => {
    const disabledActions: IAction[] = actions.map((ele) => {
      return { ...ele, isDisabled: true }
    })
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: disabledActions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })
    const menuItem = wrapper.findComponent(MenuButton)
    await menuItem.trigger('click')
    const buttonElement = wrapper.find(menuButtonSelector)
    await buttonElement.trigger('click')

    expect(actionSpy).not.toHaveBeenCalled()
  })

  it('triggers an action when button is clicked', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: [{ key: '1', actions: actions }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })
    const menuItem = wrapper.findComponent(MenuButton)
    await menuItem.trigger('click')
    const buttonElement = wrapper.find<HTMLButtonElement>(menuButtonSelector)
    await buttonElement.trigger('click')

    expect(actionSpy).toHaveBeenCalled()
  })

  it('provides border when multiple groups are provided', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: groups,
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })
    const menuItems = wrapper.findAllComponents({ name: 'MenuItem' })

    menuItems.forEach((menuItem) => {
      expect(menuItem.classes('ct-border-b')).toBe(true)
    })

    expect(menuItems.length).toBe(actions.length - 1) // Each group is separated by a border except the last one.
  })

  it('renders informationItems Label and text when informationItems prop provided', async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: groups,
      informationItems: defaultInformationItem,
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })
    const informationItemLabelSelector = "[data-test='SDropdown-information-item-label']"

    const menuButton = wrapper.findComponent(MenuButton)
    await menuButton.trigger('click')

    expect(wrapper.find(informationItemLabelSelector).text()).toBe(defaultInformationItem[0].label)

    expect(wrapper.find(informationItemTextSelector).text()).toBe(defaultInformationItem[0].text)
  })

  it("renders '-' when informationItems text is undefined", async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: groups,
      informationItems: [{ ...defaultInformationItem[0], text: undefined }],
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })

    const menuButton = wrapper.findComponent(MenuButton)
    await menuButton.trigger('click')

    expect(wrapper.find(informationItemTextSelector).text()).toBe('-')
  })

  it("sets data-testid's on actions when provided", async () => {
    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: groups,
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })

    const menuButton = wrapper.findComponent(MenuButton)
    await menuButton.trigger('click')

    expect(wrapper.find(menuItemSelector[0]).exists()).toBe(true)
    expect(wrapper.find(menuItemSelector[1]).exists()).toBe(true)
  })

  it("doesn't set a data-testid it is not provided", async () => {
    const groupsWithoutDataTestId: ISDropdownActionGroup[] = [
      {
        key: 'group1',
        actions: [
          {
            key: 'action1',
            label: 'Action 1',
            action: actionSpy,
          },
        ],
      },
    ]

    const initialProps: ISDropdownProps = {
      menuButton: 'label',
      actions: groupsWithoutDataTestId,
    }
    const wrapper = mount(SDropdown, {
      props: initialProps,
    })

    const menuButton = wrapper.findComponent(MenuButton)
    await menuButton.trigger('click')

    expect(wrapper.find("[data-test='SDropdown-actions'] > [data-testid]").exists()).toBe(false)
  })
})
