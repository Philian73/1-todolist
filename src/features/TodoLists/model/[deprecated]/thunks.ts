import { todoListsAPI } from '../../api'
import { TodoListType } from '../types.ts'

import { _todoListsActions } from './actions.ts'

import { appActions } from 'app/model/slice.ts'
import { AppThunkType } from 'app/store.ts'
import { APIResultCodes } from 'common/api'
import { errorAPIHandler, handlerServerNetworkError } from 'common/utils'
import { tasksThunks } from 'features/Tasks/model/[deprecated]/thunks.ts'

export const _todoListsThunks = {
  getTodoLists(): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))

      try {
        const response = await todoListsAPI.getTodoLists()

        dispatch(_todoListsActions.setTodoLists(response.data))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))

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
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(_todoListsActions.updateTodoList(ID, { entityStatus: 'loading' }))

      try {
        await todoListsAPI.deleteTodoList(ID)

        dispatch(_todoListsActions.deleteTodoList(ID))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(_todoListsActions.updateTodoList(ID, { entityStatus: 'idle' }))
      }
    }
  },
  createTodoList(title: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))

      try {
        const response = await todoListsAPI.createTodoList(title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(_todoListsActions.createTodoList(response.data.data.item))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
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
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(_todoListsActions.updateTodoList(ID, { entityStatus: 'loading' }))

      try {
        const response = await todoListsAPI.updateTitleTodoList(ID, title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(_todoListsActions.updateTodoList(ID, { title }))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(_todoListsActions.updateTodoList(ID, { entityStatus: 'idle' }))
      }
    }
  },
}
