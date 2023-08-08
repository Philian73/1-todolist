import { FC, memo, useEffect } from 'react'

import List from '@mui/material/List'

import { Task } from '../'
import { tasksSelectors, tasksThunks } from '../../model'

import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { FilterValuesType } from '@/features/TodoLists/model'

type PropsType = {
  todoListID: string
  filter: FilterValuesType
  todoListStatus: boolean
}
export const Tasks: FC<PropsType> = memo(({ todoListID, filter, todoListStatus }) => {
  const tasks = useAppSelector(tasksSelectors.filteredTasksByTodoListID(todoListID, filter))

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todoListID))
  }, [dispatch, todoListID])

  const tasksMap = tasks.map(task => {
    return <Task key={task.id} task={task} status={todoListStatus} />
  })

  return <List>{tasksMap}</List>
})
