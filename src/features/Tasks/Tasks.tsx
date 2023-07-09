import { FC, memo } from 'react'

import List from '@mui/material/List'

import { useAppSelector } from '../../app/hooks/hooks.ts'
import { FilterValuesType } from '../TodoLists/model/types.ts'

import { TaskDomainType, TaskStatuses } from './model/types.ts'
import { Task } from './ui/Task/Task.tsx'

type PropsType = {
  todoListID: string
  filter: FilterValuesType
  todoListStatus: boolean
}
export const Tasks: FC<PropsType> = memo(({ todoListID, filter, todoListStatus }) => {
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
    return <Task key={task.id} task={task} status={todoListStatus} />
  })

  return <List>{tasksMap}</List>
})
