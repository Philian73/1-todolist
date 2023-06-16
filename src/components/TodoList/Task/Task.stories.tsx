import { ChangeEvent } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { useSelector } from 'react-redux'

import { ReduxStoreProviderDecorator } from '../../../store/decorators/ReduxStoreProviderDecorator.tsx'
import { AppRootStateType } from '../../../store/store.ts'
import { TaskType } from '../../../types/types.ts'
import { EditableSpan } from '../../EditableSpan/EditableSpan.tsx'

import { Task } from './Task.tsx'

const TaskWithStoryBook: typeof Task = ({ todoListID, task }) => {
  const changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
    action('status changed')(todoListID, task.id, e.currentTarget.checked)
  }
  const removeTask = () => action('removed task')(todoListID, task.id)
  const changeTitleTask = (title: string) => action('changed name')(todoListID, task.id, title)

  return (
    <ListItem
      key={task.id}
      divider
      disablePadding
      disableGutters
      secondaryAction={
        <IconButton size="small" onClick={removeTask}>
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      }
    >
      <Checkbox size="small" checked={task.isDone} onChange={changeStatusTask} />
      <EditableSpan title={task.title} changeTitle={changeTitleTask} />
    </ListItem>
  )
}

const meta = {
  title: 'TodoLists/Task',
  component: Task,
  tags: ['autodocs'],
  args: {
    todoListID: 'todoListID_1',
    task: { id: 'taskID_1', title: 'Title task', isDone: false },
  },
} satisfies Meta<typeof Task>

export default meta
type Story = StoryObj<typeof meta>

export const IsNotDone: Story = {
  render: args => {
    return <TaskWithStoryBook {...args} />
  },
}

export const IsDone: Story = {
  args: {
    task: { id: 'taskID_1', title: 'Title task', isDone: true },
  },
  render: args => {
    return <TaskWithStoryBook {...args} />
  },
}

const BaseWrap = () => {
  const todoListID = 'todoListID_1'
  const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoListID][1])

  return task ? <Task todoListID={todoListID} task={task} /> : <span>Список пуст</span>
}

export const Base: Story = {
  decorators: [ReduxStoreProviderDecorator],
  render: () => {
    return <BaseWrap />
  },
}
