import { TaskType, UpdateTaskModelType } from '../types.ts'

import { tasksActions } from './actions.ts'

import { appActions } from 'app/model/slice.ts'
import { AppThunkType } from 'app/store.ts'
import { APIResultCodes } from 'common/api'
import { errorAPIHandler, handlerServerNetworkError } from 'common/utils'
import { tasksAPI } from 'features/Tasks/api'
import { todoListsActions } from 'features/TodoLists/model/[deprecated]/actions.ts'

export const tasksThunks = {
  getTasks(todoListID: string): AppThunkType {
    return async dispatch => {
      const response = await tasksAPI.getTasks(todoListID)

      dispatch(tasksActions.setTasks(todoListID, response.data.items))
    }
  },
  deleteTask(todoListID: string, taskID: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(tasksActions.updateTask(todoListID, taskID, { entityStatus: 'loading' }))

      try {
        await tasksAPI.deleteTask(todoListID, taskID)

        dispatch(tasksActions.deleteTask(todoListID, taskID))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(tasksActions.updateTask(todoListID, taskID, { entityStatus: 'idle' }))
      }
    }
  },
  createTask(todoListID: string, title: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(todoListsActions.updateTodoList(todoListID, { entityStatus: 'loading' }))
      try {
        const response = await tasksAPI.createTask(todoListID, title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(tasksActions.createTask(response.data.data.item))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          errorAPIHandler<{ item: TaskType }>(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(todoListsActions.updateTodoList(todoListID, { entityStatus: 'idle' }))
      }
    }
  },
  updateTask(todoListID: string, taskID: string, data: Partial<UpdateTaskModelType>): AppThunkType {
    return async (dispatch, getState) => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(tasksActions.updateTask(todoListID, taskID, { entityStatus: 'loading' }))

      try {
        const task = getState().tasks[todoListID].find(task => task.id === taskID)!

        const model: UpdateTaskModelType = {
          title: task.title,
          deadline: task.deadline,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          status: task.status,
          entityStatus: task.entityStatus,
          ...data,
        }

        const response = await tasksAPI.updateTask(todoListID, taskID, model)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(tasksActions.updateTask(todoListID, taskID, model))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          errorAPIHandler<{ item: TaskType }>(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(tasksActions.updateTask(todoListID, taskID, { entityStatus: 'idle' }))
      }
    }
  },
}
