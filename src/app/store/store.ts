import { configureStore } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { appReducer } from 'app/model/appReducer.ts'
import { authReducer } from 'features/Auth/model/slice.ts'
import { tasksReducer } from 'features/Tasks/model/tasksReducer.ts'
import { todoListsReducer } from 'features/TodoLists/model/todoListsReducer.ts'

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
