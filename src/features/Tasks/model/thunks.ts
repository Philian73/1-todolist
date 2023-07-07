import { Dispatch } from 'redux'

import { AppRootStateType } from '../../../app/store/store.ts'
import { tasksAPI } from '../api/tasksAPI.ts'

import { tasksActions } from './actions.ts'
import { UpdateTaskModelType } from './types.ts'

export const tasksThunks = {
  getTasks(todoListID: string) {
    return (dispatch: Dispatch) => {
      tasksAPI.getTasks(todoListID).then(response => {
        dispatch(tasksActions.setTasks(todoListID, response.data.items))
      })
    }
  },
  deleteTask(todoListID: string, taskID: string) {
    return (dispatch: Dispatch) => {
      tasksAPI.deleteTask(todoListID, taskID).then(() => {
        dispatch(tasksActions.deleteTask(todoListID, taskID))
      })
    }
  },
  createTask(todoListID: string, title: string) {
    return (dispatch: Dispatch) => {
      tasksAPI.createTask(todoListID, title).then(response => {
        dispatch(tasksActions.createTask(response.data.data.item))
      })
    }
  },
  updateTask(todoListID: string, taskID: string, data: Partial<UpdateTaskModelType>) {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const task = getState().tasks[todoListID].find(task => task.id === taskID)

      if (task) {
        const model: UpdateTaskModelType = {
          title: task.title,
          deadline: task.deadline,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          status: task.status,
          ...data,
        }

        tasksAPI.updateTask(todoListID, taskID, model).then(() => {
          dispatch(tasksActions.updateTask(todoListID, taskID, model))
        })
      }
    }
  },
}
