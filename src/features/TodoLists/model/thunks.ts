import { Dispatch } from 'redux'

import { todoListsAPI } from '../api/todoListsAPI.ts'

import { todoListsActions } from './actions.ts'

export const todoListsThunks = {
  getTodoLists() {
    return (dispatch: Dispatch) => {
      todoListsAPI.getTodoLists().then(response => {
        dispatch(todoListsActions.setTodoLists(response.data))
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
        dispatch(todoListsActions.updateTitleTodoList(ID, title))
      })
    }
  },
}
