import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'

import { appReducer } from '@/app/model'
import { authReducer } from '@/features/Auth/model'
import { tasksReducer } from '@/features/Tasks/model'
import { todoListsReducer } from '@/features/TodoLists/model'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
  },
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
