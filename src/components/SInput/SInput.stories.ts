import { Meta, StoryFn } from '@storybook/vue3'
import Input from './SInput.vue'
import { EyeIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { ValidationType } from '@/interfaces/ValidationType'
import { ref } from 'vue'

export default {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Label',
  },
  argTypes: {
    validationState: {
      options: [ValidationType.Valid, ValidationType.Invalid, undefined],
      control: { type: 'select' },
    },
  },
} as Meta<typeof Input>

const Template: StoryFn<typeof Input> = (args) => ({
  components: { Input },
  setup() {
    const value = ref<string | undefined>()
    return { args, value }
  },
  template: `<div class="p-5">
    <Input v-model='value' v-bind='args' />
  </div>`,
})

export const Default = Template.bind({})

export const iconLeft = Template.bind({})
iconLeft.args = {
  leftIcon: UserCircleIcon,
}

export const iconRight = Template.bind({})
iconRight.args = {
  rightIcon: EyeIcon,
}

export const iconLeftAndRight = Template.bind({})
iconLeftAndRight.args = {
  leftIcon: UserCircleIcon,
  rightIcon: EyeIcon,
}

export const validInput = Template.bind({})
validInput.args = {
  validationState: ValidationType.Valid,
  leftIcon: UserCircleIcon,
}

export const InValidInput = Template.bind({})
InValidInput.args = {
  validationState: ValidationType.Invalid,
}

export const InValidWithAlert = Template.bind({})
InValidWithAlert.args = {
  validationState: ValidationType.Invalid,
  alert: 'Error message',
}
