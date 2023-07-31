import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilterValuesType, TodoListDomainType, TodoListType } from './types.ts'

import { appActions } from 'app/model/slice.ts'
import { RequestStatusType } from 'app/model/types.ts'
import { AppThunkType } from 'app/store.ts'
import { APIResultCodes } from 'common/api'
import { errorAPIHandler, handlerServerNetworkError } from 'common/utils'
import { tasksThunks } from 'features/Tasks/model/slice.ts'
import { todoListsAPI } from 'features/TodoLists/api'

const initialState: TodoListsInitialStateType = []

const slice = createSlice({
  name: '@@todoLists',
  initialState,
  reducers: {
    setTodoLists(state, action: PayloadAction<{ todoLists: TodoListType[] }>) {
      action.payload.todoLists.forEach(todoList => {
        state.push({ ...todoList, filter: 'all', entityStatus: 'idle' })
      })
    },
    clearTodoLists(state) {
      state.splice(0, state.length)
    },
    deleteTodoList(state, action: PayloadAction<{ ID: string }>) {
      const index = state.findIndex(todoList => todoList.id === action.payload.ID)

      if (index !== -1) state.splice(index, 1)
    },
    createTodoList(state, action: PayloadAction<{ todoList: TodoListType }>) {
      state.unshift({ ...action.payload.todoList, filter: 'all', entityStatus: 'idle' })
    },
    updateTitleTodoList(state, action: PayloadAction<{ ID: string; title: string }>) {
      const index = state.findIndex(todoList => todoList.id === action.payload.ID)

      if (index !== -1) state[index].title = action.payload.title
    },
    updateFilterTodoList(state, action: PayloadAction<{ ID: string; filter: FilterValuesType }>) {
      const index = state.findIndex(todoList => todoList.id === action.payload.ID)

      if (index !== -1) state[index].filter = action.payload.filter
    },
    updateEntityStatusTodoList(
      state,
      action: PayloadAction<{ ID: string; entityStatus: RequestStatusType }>
    ) {
      const index = state.findIndex(todoList => todoList.id === action.payload.ID)

      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    },
  },
})

export const todoListsReducer = slice.reducer
export const todoListsActions = slice.actions
export const todoListsThunks = {
  getTodoLists(): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))

      try {
        const response = await todoListsAPI.getTodoLists()

        dispatch(todoListsActions.setTodoLists({ todoLists: response.data }))

        for (const todoList of response.data) {
          await dispatch(tasksThunks.getTasks(todoList.id))
        }

        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
  deleteTodoList(ID: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(todoListsActions.updateEntityStatusTodoList({ ID, entityStatus: 'loading' }))

      try {
        await todoListsAPI.deleteTodoList(ID)

        dispatch(todoListsActions.deleteTodoList({ ID }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(todoListsActions.updateEntityStatusTodoList({ ID, entityStatus: 'idle' }))
      }
    }
  },
  createTodoList(title: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))

      try {
        const response = await todoListsAPI.createTodoList(title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(todoListsActions.createTodoList({ todoList: response.data.data.item }))
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
      dispatch(todoListsActions.updateEntityStatusTodoList({ ID, entityStatus: 'loading' }))

      try {
        const response = await todoListsAPI.updateTitleTodoList(ID, title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(todoListsActions.updateTitleTodoList({ ID, title }))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(todoListsActions.updateEntityStatusTodoList({ ID, entityStatus: 'idle' }))
      }
    }
  },
}

// TYPES
export type TodoListsInitialStateType = TodoListDomainType[]
