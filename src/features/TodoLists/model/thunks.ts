import { APIResultCodes } from '../../../app/api/api.ts'
import { appActions } from '../../../app/model/actions.ts'
import { AppThunkType } from '../../../app/store/store.ts'
import { errorAPIHandler, handlerServerNetworkError } from '../../../app/utils/error-handler.ts'
import { tasksThunks } from '../../Tasks/model/thunks.ts'
import { todoListsAPI } from '../api/todoListsAPI.ts'

import { todoListsActions } from './actions.ts'
import { TodoListType } from './types.ts'

export const todoListsThunks = {
  getTodoLists(): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus('loading'))

      try {
        const response = await todoListsAPI.getTodoLists()

        dispatch(appActions.setAppStatus('succeeded'))
        dispatch(todoListsActions.setTodoLists(response.data))

        response.data.forEach(todoList => {
          dispatch(tasksThunks.getTasks(todoList.id))
        })
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
  deleteTodoList(ID: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus('loading'))
      dispatch(todoListsActions.updateTodoList(ID, { entityStatus: 'loading' }))

      try {
        await todoListsAPI.deleteTodoList(ID)

        dispatch(todoListsActions.deleteTodoList(ID))
        dispatch(appActions.setAppStatus('succeeded'))
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(todoListsActions.updateTodoList(ID, { entityStatus: 'idle' }))
      }
    }
  },
  createTodoList(title: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus('loading'))

      try {
        const response = await todoListsAPI.createTodoList(title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(todoListsActions.createTodoList(response.data.data.item))
          dispatch(appActions.setAppStatus('succeeded'))
        } else {
          errorAPIHandler<{ item: TodoListType }>(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
  updateTitleTodoList(ID: string, title: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus('loading'))
      dispatch(todoListsActions.updateTodoList(ID, { entityStatus: 'loading' }))

      try {
        const response = await todoListsAPI.updateTitleTodoList(ID, title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(todoListsActions.updateTodoList(ID, { title }))
          dispatch(appActions.setAppStatus('succeeded'))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(todoListsActions.updateTodoList(ID, { entityStatus: 'idle' }))
      }
    }
  },
}
