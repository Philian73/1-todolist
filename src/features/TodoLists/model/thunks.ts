import { Dispatch } from 'redux'

import { AppThunkType } from '../../../app/store/store.ts'
import { tasksThunks } from '../../Tasks/model/thunks.ts'
import { todoListsAPI } from '../api/todoListsAPI.ts'

import { todoListsActions } from './actions.ts'

export const todoListsThunks = {
  getTodoLists(): AppThunkType {
    return dispatch => {
      todoListsAPI.getTodoLists().then(response => {
        dispatch(todoListsActions.setTodoLists(response.data))

        response.data.forEach(todoList => {
          dispatch(tasksThunks.getTasks(todoList.id))
        })
      })
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
