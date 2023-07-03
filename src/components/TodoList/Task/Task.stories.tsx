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
import { TaskPriorities, TaskStatuses, TaskType } from '../../../types/types.ts'
import { EditableSpan } from '../../EditableSpan/EditableSpan.tsx'

import { Task } from './Task.tsx'

const TaskWithStoryBook: typeof Task = ({ task }) => {
  const removeTask = () => {
    action('Remove Button clicked changed inside Task')(task.todoListId, task.id)
  }
  const changeTitleTask = (title: string) => {
    action('Title changed inside Task')(task.todoListId, task.id, title)
  }
  const changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
    action('Status changed inside Task')(task.todoListId, task.id, e.currentTarget.checked)
  }

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
      <Checkbox
        size="small"
        checked={task.status === TaskStatuses.Completed}
        onChange={changeStatusTask}
      />
      <EditableSpan value={task.title} onChange={changeTitleTask} />
    </ListItem>
  )
}

const meta = {
  title: 'TodoLists/Task',
  component: Task,
  tags: ['autodocs'],
  args: {
    task: {
      id: 'taskID_1',
      title: 'Title task',
      status: TaskStatuses.New,
      description: null,
      priority: TaskPriorities.Low,
      order: 0,
      startDate: null,
      deadline: null,
      addedDate: new Date().toISOString(),
      todoListId: 'todoListID_1',
    },
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
    task: {
      id: 'taskID_1',
      title: 'Title task',
      status: TaskStatuses.Completed,
      description: null,
      priority: TaskPriorities.Low,
      order: 0,
      startDate: null,
      deadline: null,
      addedDate: new Date().toISOString(),
      todoListId: 'todoListID_1',
    },
  },
  render: args => {
    return <TaskWithStoryBook {...args} />
  },
}

const BaseWrap = () => {
  const todoListID = 'todoListID_1'
  const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoListID][1])

  return task ? <Task task={task} /> : <span>Список пуст</span>
}

export const Base: Story = {
  decorators: [ReduxStoreProviderDecorator],
  render: () => {
    return <BaseWrap />
  },
}
