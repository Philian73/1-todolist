import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'

import { appReducer } from 'app/model/slice.ts'
import { authReducer } from 'features/Auth/model/slice.ts'
import { tasksReducer } from 'features/Tasks/model/[deprecated]/tasksReducer.ts'
import { todoListsReducer } from 'features/TodoLists/model/[deprecated]/todoListsReducer.ts'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  tasks: tasksReducer,
  todoLists: todoListsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

// TYPES
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatchType = typeof store.dispatch
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>
