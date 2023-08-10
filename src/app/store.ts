import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from '@/app/model'
import { authReducer } from '@/features/auth/model'
import { tasksReducer } from '@/features/tasks/model'
import { todoListsReducer } from '@/features/todoLists/model'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
  },
})

// TYPES
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
