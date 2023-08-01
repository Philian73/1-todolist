import { createSelector } from '@reduxjs/toolkit'

import { TaskStatuses } from './types.ts'

import { AppRootStateType } from 'app/store.ts'
import { FilterValuesType } from 'features/TodoLists/model/types.ts'

export const tasksSelectors = {
  selectTasksByTodoListID: (todoListID: string) => (state: AppRootStateType) => {
    return state.tasks[todoListID]
  },
  selectFilteredTasksByTodoListID: (todoListID: string, filter: FilterValuesType) =>
    createSelector(tasksSelectors.selectTasksByTodoListID(todoListID), tasks => {
      switch (filter) {
        case 'active':
          return tasks.filter(task => task.status === TaskStatuses.New)
        case 'completed':
          return tasks.filter(task => task.status === TaskStatuses.Completed)
        default:
          return tasks
      }
    }),
}
