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
    deleteTodoList(state, action: PayloadAction<{ ID: string }>) {
      const index = state.findIndex(todoList => todoList.id === action.payload.ID)

      if (index !== -1) state.splice(index, 1)
    },
  },
})

export const todoListsReducer = slice.reducer
export const todoListsActions = slice.actions
export const todoListsThunks = {}

// TYPES
export type TodoListsInitialStateType = TodoListDomainType[]
