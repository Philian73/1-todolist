import type { Meta, StoryObj } from '@storybook/react'

import App from './App.tsx'
import { ReduxStoreProviderDecorator } from './store/decorators/ReduxStoreProviderDecorator.tsx'

const meta = {
  title: 'TodoLists/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} satisfies Meta<typeof App>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {}
