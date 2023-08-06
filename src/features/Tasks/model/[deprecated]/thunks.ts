import { TaskType, UpdateTaskModelType } from '../types.ts'

import { _tasksActions } from './actions.ts'

import { _appActions } from 'app/model/[deprecated]/actions.ts'
import { RequestStatusType } from 'app/model/types.ts'
import { AppThunkType } from 'app/store.ts'
import { APIResultCodes } from 'common/api'
import { errorAPIHandler, handlerServerNetworkError } from 'common/utils'
import { tasksAPI } from 'features/Tasks/api'
import { _todoListsActions } from 'features/TodoLists/model/[deprecated]/actions.ts'

export const _tasksThunks = {
  getTasks(todoListID: string): AppThunkType {
    return async dispatch => {
      const response = await tasksAPI.getTasks(todoListID)

      dispatch(_tasksActions.setTasks(todoListID, response.data.items))
    }
  },
  deleteTask(todoListID: string, taskID: string): AppThunkType {
    return async dispatch => {
      dispatch(_appActions.setAppStatus('loading'))
      dispatch(_tasksActions.updateTask(todoListID, taskID, { entityStatus: 'loading' }))

      try {
        await tasksAPI.deleteTask(todoListID, taskID)

        dispatch(_tasksActions.deleteTask(todoListID, taskID))
        dispatch(_appActions.setAppStatus('succeeded'))
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(_tasksActions.updateTask(todoListID, taskID, { entityStatus: 'idle' }))
      }
    }
  },
  createTask(todoListID: string, title: string): AppThunkType {
    return async dispatch => {
      dispatch(_appActions.setAppStatus('loading'))
      dispatch(_todoListsActions.updateTodoList(todoListID, { entityStatus: 'loading' }))
      try {
        const response = await tasksAPI.createTask(todoListID, title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(_tasksActions.createTask(response.data.data.item))
          dispatch(_appActions.setAppStatus('succeeded'))
        } else {
          errorAPIHandler<{ item: TaskType }>(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(_todoListsActions.updateTodoList(todoListID, { entityStatus: 'idle' }))
      }
    }
  },
  updateTask(todoListID: string, taskID: string, data: Partial<UpdateTaskModelType>): AppThunkType {
    return async (dispatch, getState) => {
      dispatch(_appActions.setAppStatus('loading'))
      dispatch(_tasksActions.updateTask(todoListID, taskID, { entityStatus: 'loading' }))

      try {
        const task = getState().tasks[todoListID].find(task => task.id === taskID)!

        const model: UpdateTaskModelType & { entityStatus: RequestStatusType } = {
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
          dispatch(_tasksActions.updateTask(todoListID, taskID, model))
          dispatch(_appActions.setAppStatus('succeeded'))
        } else {
          errorAPIHandler<{ item: TaskType }>(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(_tasksActions.updateTask(todoListID, taskID, { entityStatus: 'idle' }))
      }
    }
  },
}
