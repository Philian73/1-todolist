import { createSelector } from '@reduxjs/toolkit'

import { TaskStatuses } from './types.ts'

import { AppRootStateType } from 'app/store.ts'
import { FilterValuesType } from 'features/TodoLists/model/types.ts'

export const tasksSelectors = {
  selectTasksByTodoListID(todoListID: string) {
    return (state: AppRootStateType) => state.tasks[todoListID]
  },
  selectFilteredTasksByTodoListID(todoListID: string, filter: FilterValuesType) {
    return createSelector(this.selectTasksByTodoListID(todoListID), tasks => {
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
