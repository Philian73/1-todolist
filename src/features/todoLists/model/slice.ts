import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { todoListsAPI } from '../api'

import { FilterValuesType, TodoListDomainType, TodoListType } from './'

import { appActions } from '@/app/model'
import { APIResultCodes } from '@/common/api'
import { createAppAsyncThunk, errorAPIHandler, handlerServerNetworkError } from '@/common/utils'

// THUNKS
const fetchTodoLists = createAppAsyncThunk<{ todoLists: TodoListType[] }, undefined>(
  'todoLists/fetch-todoLists',
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
  'todoLists/delete-todoList',
  async (ID, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    dispatch(todoListsActions.setIsLoadingTodoList({ ID, isLoading: true }))

    try {
      await todoListsAPI.deleteTodoList(ID)

      dispatch(appActions.setAppStatus({ status: 'succeeded' }))

      return { ID }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    } finally {
      dispatch(todoListsActions.setIsLoadingTodoList({ ID, isLoading: false }))
    }
  }
)

const createTodoList = createAppAsyncThunk<{ todoList: TodoListType }, string>(
  'todoLists/create-todoList',
  async (title, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
      const response = await todoListsAPI.createTodoList(title)
      const todoList = response.data.data.item

      if (response.data.resultCode === APIResultCodes.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))

        return { todoList }
      } else {
        errorAPIHandler(response.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    }
  }
)

const updateTitleTodoList = createAppAsyncThunk<
  { ID: string; title: string },
  { ID: string; title: string }
>('todoLists/update-title-todoList', async ({ ID, title }, { dispatch, rejectWithValue }) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  dispatch(todoListsActions.setIsLoadingTodoList({ ID, isLoading: true }))

  try {
    const response = await todoListsAPI.updateTitleTodoList(ID, title)

    if (response.data.resultCode === APIResultCodes.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))

      return { ID, title }
    } else {
      errorAPIHandler(response.data, dispatch)

      return rejectWithValue(null)
    }
  } catch (error) {
    handlerServerNetworkError(error, dispatch)

    return rejectWithValue(null)
  } finally {
    dispatch(todoListsActions.setIsLoadingTodoList({ ID, isLoading: false }))
  }
})

// SLICE
const initialState: TodoListsInitialStateType = []

const slice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {
    clearTodoLists() {
      return []
    },
    updateFilterTodoList(state, action: PayloadAction<{ ID: string; filter: FilterValuesType }>) {
      const todoList = state.find(todoList => todoList.id === action.payload.ID)

      if (todoList) todoList.filter = action.payload.filter
    },
    setIsLoadingTodoList(state, action: PayloadAction<{ ID: string; isLoading: boolean }>) {
      const todoList = state.find(todoList => todoList.id === action.payload.ID)

      if (todoList) todoList.isLoading = action.payload.isLoading
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        action.payload.todoLists.forEach(todoList => {
          state.push({ ...todoList, filter: 'all', isLoading: false })
        })
      })
      .addCase(deleteTodoList.fulfilled, (state, action) => {
        const index = state.findIndex(todoList => todoList.id === action.payload.ID)

        if (index !== -1) state.splice(index, 1)
      })
      .addCase(createTodoList.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todoList, filter: 'all', isLoading: false })
      })
      .addCase(updateTitleTodoList.fulfilled, (state, action) => {
        const todoList = state.find(todoList => todoList.id === action.payload.ID)

        if (todoList) todoList.title = action.payload.title
      })
  },
})

// EXPORTS
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
