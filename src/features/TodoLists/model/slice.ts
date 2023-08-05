import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilterValuesType, TodoListDomainType, TodoListType } from './types.ts'

import { appActions } from 'app/model/slice.ts'
import { RequestStatusType } from 'app/model/types.ts'
import { AppThunkType } from 'app/store.ts'
import { APIResultCodes } from 'common/api'
import { createAppAsyncThunk, errorAPIHandler, handlerServerNetworkError } from 'common/utils'
import { todoListsAPI } from 'features/TodoLists/api'

const initialState: TodoListsInitialStateType = []

const slice = createSlice({
  name: '@@todoLists',
  initialState,
  reducers: {
    clearTodoLists() {
      return []
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
  extraReducers: builder => {
    builder
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        action.payload.todoLists.forEach(todoList => {
          state.push({ ...todoList, filter: 'all', entityStatus: 'idle' })
        })
      })
      .addCase(deleteTodoList.fulfilled, (state, action) => {
        const index = state.findIndex(todoList => todoList.id === action.payload.ID)

        if (index !== -1) state.splice(index, 1)
      })
  },
})

const fetchTodoLists = createAppAsyncThunk<{ todoLists: TodoListType[] }, undefined>(
  '@@todoLists/fetch-todoLists',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
      const response = await todoListsAPI.getTodoLists()
      const todoLists = response.data

      dispatch(appActions.setAppStatus({ status: 'succeeded' }))

      return { todoLists }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    }
  }
)

const deleteTodoList = createAppAsyncThunk<{ ID: string }, string>(
  '@@todoLists/delete-todoList',
  async (ID, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    dispatch(todoListsActions.updateEntityStatusTodoList({ ID, entityStatus: 'loading' }))

    try {
      await todoListsAPI.deleteTodoList(ID)

      dispatch(appActions.setAppStatus({ status: 'succeeded' }))

      return { ID }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    } finally {
      dispatch(todoListsActions.updateEntityStatusTodoList({ ID, entityStatus: 'idle' }))
    }
  }
)

const createTodoList = (title: string): AppThunkType => {
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
}
const updateTitleTodoList = (ID: string, title: string): AppThunkType => {
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
}

export const todoListsReducer = slice.reducer
export const todoListsActions = slice.actions
export const todoListsThunks = {
  fetchTodoLists,
  deleteTodoList,
  createTodoList,
  updateTitleTodoList,
}

// TYPES
export type TodoListsInitialStateType = TodoListDomainType[]
