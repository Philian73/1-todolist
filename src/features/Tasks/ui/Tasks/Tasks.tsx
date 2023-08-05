import { FC, memo, useEffect } from 'react'

import List from '@mui/material/List'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { Task } from 'features/Tasks'
import { tasksSelectors } from 'features/Tasks/model/selectors.ts'
import { tasksThunks } from 'features/Tasks/model/slice.ts'
import { FilterValuesType } from 'features/TodoLists/model/types.ts'

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
