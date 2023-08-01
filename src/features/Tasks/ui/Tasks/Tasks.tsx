import { FC, memo } from 'react'

import List from '@mui/material/List'

import { TaskDomainType, TaskStatuses } from '../../model/types.ts'

import { useAppSelector } from 'common/hooks'
import { Task } from 'features/Tasks'
import { tasksSelectors } from 'features/Tasks/model/selectors.ts'
import { FilterValuesType } from 'features/TodoLists/model/types.ts'

type PropsType = {
  todoListID: string
  filter: FilterValuesType
  todoListStatus: boolean
}
export const Tasks: FC<PropsType> = memo(({ todoListID, filter, todoListStatus }) => {
  const tasks = useAppSelector(tasksSelectors.selectTasksByTodoListID(todoListID))

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
