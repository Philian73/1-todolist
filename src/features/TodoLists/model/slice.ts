import { createSlice } from '@reduxjs/toolkit'

import { TodoListDomainType } from './types.ts'

export type TodoListsInitialStateType = TodoListDomainType[]

const initialState = [] as TodoListsInitialStateType

const slice = createSlice({
  name: '@@todoLists',
  initialState,
  reducers: {},
})

export const todoListsReducer = slice.reducer
export const todoListsActions = slice.actions
export const todoListsThunks = {}
