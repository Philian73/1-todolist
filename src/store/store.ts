import { combineReducers, legacy_createStore } from 'redux'

import { tasksReducer } from './reducers/tasksReducer.ts'
import { todoListsReducer } from './reducers/todoListsReducer.ts'

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U }
  ? U
  : never

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
})

export const store = legacy_createStore(rootReducer)
