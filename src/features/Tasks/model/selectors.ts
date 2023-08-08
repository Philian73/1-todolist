import { createSelector } from '@reduxjs/toolkit'

import { TaskStatuses } from './types'

import { AppRootStateType } from '@/app/store'
import { FilterValuesType } from '@/features/TodoLists/model'

export const tasksSelectors = {
  tasksByTodoListID(todoListID: string) {
    return (state: AppRootStateType) => state.tasks[todoListID]
  },
  filteredTasksByTodoListID(todoListID: string, filter: FilterValuesType) {
    return createSelector(this.tasksByTodoListID(todoListID), tasks => {
      switch (filter) {
        case 'active':
          return tasks.filter(task => task.status === TaskStatuses.New)
        case 'completed':
          return tasks.filter(task => task.status === TaskStatuses.Completed)
        default:
          return tasks
      }
    })
  },
}
