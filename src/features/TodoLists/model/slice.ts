import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilterValuesType, TodoListDomainType, TodoListType } from './types.ts'

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
  },
})

export const todoListsReducer = slice.reducer
export const todoListsActions = slice.actions
export const todoListsThunks = {}

// TYPES
export type TodoListsInitialStateType = TodoListDomainType[]
