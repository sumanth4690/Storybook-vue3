import type { Meta, StoryObj } from '@storybook/vue3'
import SButton from './SButton.vue'

const meta: Meta<typeof SButton> = {
  title: 'SButton',
  component: SButton,
  args: { label: 'Buttton' },
  render: (args) => ({
    components: { SButton },
    setup() {
      return { args }
    },
    template: "<SButton v-bind='args' />",
  }),
}

export default meta
type Story = StoryObj<typeof meta>

export const primary: Story = {
  args: { label: 'Primary' },
}
