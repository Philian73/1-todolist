import { APIResultCodes } from '../../../app/api/api.ts'
import { appActions } from '../../../app/model/actions.ts'
import { AppThunkType } from '../../../app/store/store.ts'
import { errorAPIHandler, handlerServerNetworkError } from '../../../app/utils/error-handler.ts'
import { todoListsActions } from '../../TodoLists/model/actions.ts'
import { tasksAPI } from '../api/tasksAPI.ts'

import { tasksActions } from './actions.ts'
import { TaskType, UpdateTaskModelType } from './types.ts'

export const tasksThunks = {
  getTasks(todoListID: string): AppThunkType {
    return async dispatch => {
      const response = await tasksAPI.getTasks(todoListID)

      dispatch(tasksActions.setTasks(todoListID, response.data.items))
    }
  },
  deleteTask(todoListID: string, taskID: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus('loading'))
      dispatch(tasksActions.updateTask(todoListID, taskID, { entityStatus: 'loading' }))

      try {
        await tasksAPI.deleteTask(todoListID, taskID)

        dispatch(tasksActions.deleteTask(todoListID, taskID))
        dispatch(appActions.setAppStatus('succeeded'))
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(tasksActions.updateTask(todoListID, taskID, { entityStatus: 'idle' }))
      }
    }
  },
  createTask(todoListID: string, title: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus('loading'))
      dispatch(todoListsActions.updateTodoList(todoListID, { entityStatus: 'loading' }))
      try {
        const response = await tasksAPI.createTask(todoListID, title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(tasksActions.createTask(response.data.data.item))
          dispatch(appActions.setAppStatus('succeeded'))
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
      dispatch(appActions.setAppStatus('loading'))
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
          dispatch(appActions.setAppStatus('succeeded'))
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
