import { TodoListType } from '../'
import { todoListsAPI } from '../../api'

import { _todoListsActions } from './'

import { _appActions } from '@/app/model/[deprecated]'
import { AppThunkType } from '@/app/store'
import { APIResultCodes } from '@/common/api'
import { errorAPIHandler, handlerServerNetworkError } from '@/common/utils'
import { _tasksThunks } from '@/features/Tasks/model/[deprecated]'

export const _todoListsThunks = {
  getTodoLists(): AppThunkType {
    return async dispatch => {
      dispatch(_appActions.setAppStatus('loading'))

      try {
        const response = await todoListsAPI.getTodoLists()

        dispatch(_todoListsActions.setTodoLists(response.data))
        dispatch(_appActions.setAppStatus('succeeded'))

        response.data.forEach(todoList => {
          dispatch(_tasksThunks.getTasks(todoList.id))
        })
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
  deleteTodoList(ID: string): AppThunkType {
    return async dispatch => {
      dispatch(_appActions.setAppStatus('loading'))
      dispatch(_todoListsActions.updateTodoList(ID, { entityStatus: 'loading' }))

      try {
        await todoListsAPI.deleteTodoList(ID)

        dispatch(_todoListsActions.deleteTodoList(ID))
        dispatch(_appActions.setAppStatus('succeeded'))
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(_todoListsActions.updateTodoList(ID, { entityStatus: 'idle' }))
      }
    }
  },
  createTodoList(title: string): AppThunkType {
    return async dispatch => {
      dispatch(_appActions.setAppStatus('loading'))

      try {
        const response = await todoListsAPI.createTodoList(title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(_todoListsActions.createTodoList(response.data.data.item))
          dispatch(_appActions.setAppStatus('succeeded'))
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
      dispatch(_appActions.setAppStatus('loading'))
      dispatch(_todoListsActions.updateTodoList(ID, { entityStatus: 'loading' }))

      try {
        const response = await todoListsAPI.updateTitleTodoList(ID, title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(_todoListsActions.updateTodoList(ID, { title }))
          dispatch(_appActions.setAppStatus('succeeded'))
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
