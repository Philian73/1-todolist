import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TodoListDomainType, TodoListType } from './types.ts'

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
  },
})

export const todoListsReducer = slice.reducer
export const todoListsActions = slice.actions
export const todoListsThunks = {}

// TYPES
export type TodoListsInitialStateType = TodoListDomainType[]
