import { flushPromises, mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SInput from './SInput.vue'
import { ValidationType } from '@/interfaces/ValidationType'
import { EyeIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { Component } from 'vue'

describe('InputField.vue', () => {
  const LeftIcon: Component = EyeIcon
  const RightIcon: Component = UserCircleIcon

  it('renders the label when the `label` prop is provided', () => {
    const wrapper = mount(SInput, {
      props: {
        label: 'Test Label',
      },
    })

    const label = wrapper.find('[data-testid="input-label"]')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Test Label')
  })

  it('does not render the label when the `label` prop is not provided', () => {
    const wrapper = mount(SInput)

    const label = wrapper.find('[data-testid="input-label"]')
    expect(label.exists()).toBe(false)
  })

  it('renders the left and right icons when provided', () => {
    const wrapper = mount(SInput, {
      props: {
        leftIcon: LeftIcon,
        rightIcon: RightIcon,
      },
    })

    expect(wrapper.findComponent(EyeIcon).exists()).toBe(true)
    expect(wrapper.findComponent(UserCircleIcon).exists()).toBe(true)
  })

  it('applies the correct padding classes based on icon props', () => {
    const wrapper = mount(SInput, {
      props: {
        leftIcon: LeftIcon,
      },
    })

    const input = wrapper.find('[data-testid="SInput"]')
    expect(input.classes()).toContain('pl-10')
    expect(input.classes()).toContain('pr-2.5')
  })

  it('applies validation classes correctly', () => {
    const wrapper = mount(SInput, {
      props: {
        validationState: ValidationType.Valid,
      },
    })

    const input = wrapper.find('[data-testid="SInput"]')
    expect(input.classes()).toContain('border-green-600')
  })

  it('emits `update:modelValue` when the input value changes', async () => {
    const wrapper = mount(SInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('[data-testid="SInput"]')
    await input.setValue('New Value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New Value'])
  })

  it('syncs `modelValue` with `internalModelValue`', async () => {
    const wrapper = mount(SInput, {
      props: {
        modelValue: 'Initial Value',
      },
    })

    const input = wrapper.find('[data-testid="SInput"]')
    expect((input.element as HTMLInputElement).value).toBe('Initial Value')

    await wrapper.setProps({ modelValue: 'Updated Value' })
    expect((input.element as HTMLInputElement).value).toBe('Updated Value')
  })

  it('displays the alert message when the `alert` prop is provided', () => {
    const wrapper = mount(SInput, {
      props: {
        alert: 'This is an error message.',
      },
    })

    const alert = wrapper.find('[data-testid="alert-message"]')
    expect(alert.exists()).toBe(true)
    expect(alert.text()).toBe('This is an error message.')
  })

  it('does not display an alert message when the `alert` prop is not provided', () => {
    const wrapper = mount(SInput)

    const alert = wrapper.find('[data-testid="alert-message"]')
    expect(alert.exists()).toBe(false)
  })

  it('does not apply validation classes when `validationState` is null', () => {
    const wrapper = mount(SInput)

    const input = wrapper.find('[data-testid="SInput"]')
    expect(input.classes()).not.toContain('border-green-600')
    expect(input.classes()).not.toContain('border-red-600')
  })
})
