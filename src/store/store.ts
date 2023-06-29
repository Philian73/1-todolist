import { AnyAction, combineReducers, compose, legacy_createStore } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { tasksReducer } from './reducers/tasksReducer.ts'
import { todoListsReducer } from './reducers/todoListsReducer.ts'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer, composeEnhancers())
