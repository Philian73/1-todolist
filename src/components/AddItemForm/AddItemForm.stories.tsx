import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { AddItemForm } from './AddItemForm.tsx'

const meta = {
  title: 'TodoLists/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
      action: 'clicked',
    },
  },
} satisfies Meta<typeof AddItemForm>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    addItem: action('Button clicked inside form'),
  },
}
