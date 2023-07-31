import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'

import { appReducer } from 'app/model/slice.ts'
import { authReducer } from 'features/Auth/model/slice.ts'
import { tasksReducer } from 'features/Tasks/model/slice.ts'
import { todoListsReducer } from 'features/TodoLists/model/slice.ts'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    tasks: tasksReducer,
    todoLists: todoListsReducer,
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
