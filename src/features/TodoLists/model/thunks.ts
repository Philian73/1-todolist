import { Dispatch } from 'redux'

import { appActions } from '../../../app/model/actions.ts'
import { AppThunkType } from '../../../app/store/store.ts'
import { handlerServerNetworkError } from '../../../app/utils/error-handler.ts'
import { tasksThunks } from '../../Tasks/model/thunks.ts'
import { todoListsAPI } from '../api/todoListsAPI.ts'

import { todoListsActions } from './actions.ts'

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
  deleteTodoList(ID: string) {
    return (dispatch: Dispatch) => {
      todoListsAPI.deleteTodoList(ID).then(() => {
        dispatch(todoListsActions.deleteTodoList(ID))
      })
    }
  },
  createTodoList(title: string) {
    return (dispatch: Dispatch) => {
      todoListsAPI.createTodoList(title).then(response => {
        dispatch(todoListsActions.createTodoList(response.data.data.item))
      })
    }
  },
  updateTitleTodoList(ID: string, title: string) {
    return (dispatch: Dispatch) => {
      todoListsAPI.updateTitleTodoList(ID, title).then(() => {
        dispatch(todoListsActions.updateTodoList(ID, { title }))
      })
    }
  },
}
