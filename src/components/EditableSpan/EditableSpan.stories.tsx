import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { EditableSpan } from './EditableSpan.tsx'

const meta = {
  title: 'TodoLists/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Start value empty. Add value push button set string',
    },
    onChange: {
      description: 'Value EditableSpan changed',
    },
  },
} satisfies Meta<typeof EditableSpan>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    value: 'some text',
    onChange: action('Value Editable span changed'),
  },
}
