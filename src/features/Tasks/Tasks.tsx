import { FC } from 'react'

import List from '@mui/material/List'

import { useAppSelector } from '../../app/hooks/hooks.ts'
import { FilterValuesType } from '../TodoLists/model/types.ts'

import { TaskDomainType, TaskStatuses } from './model/types.ts'
import { Task } from './ui/Task/Task.tsx'

type PropsType = {
  todoListID: string
  filter: FilterValuesType
}
export const Tasks: FC<PropsType> = ({ todoListID, filter }) => {
  const tasks = useAppSelector<TaskDomainType[]>(state => state.tasks[todoListID])

  const getTasksForRender = (
    tasks: TaskDomainType[],
    filterValue: FilterValuesType
  ): TaskDomainType[] => {
    switch (filterValue) {
      case 'active':
        return tasks.filter(task => task.status === TaskStatuses.New)
      case 'completed':
        return tasks.filter(task => task.status === TaskStatuses.Completed)
      default:
        return tasks
    }
  }

  const tasksMap = getTasksForRender(tasks, filter).map(task => {
    return <Task key={task.id} task={task} />
  })

  return <List>{tasksMap}</List>
}
