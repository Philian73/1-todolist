import { FC, useEffect } from 'react'

import List from '@mui/material/List'

import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks.ts'
import { FilterValuesType } from '../TodoLists/model/types.ts'

import { tasksThunks } from './model/thunks.ts'
import { TaskStatuses, TaskType } from './model/types.ts'
import { Task } from './ui/Task/Task.tsx'

type PropsType = {
  todoListID: string
  filter: FilterValuesType
}
export const Tasks: FC<PropsType> = ({ todoListID, filter }) => {
  const tasks = useAppSelector<TaskType[]>(state => state.tasks[todoListID])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.getTasks(todoListID))
  }, [])

  const getTasksForRender = (tasks: TaskType[], filterValue: FilterValuesType): TaskType[] => {
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
