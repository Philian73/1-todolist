import { AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../../features/Auth/model/authReducer.ts'
import { tasksReducer } from '../../features/Tasks/model/tasksReducer.ts'
import { todoListsReducer } from '../../features/TodoLists/model/todoListsReducer.ts'
import { appReducer } from '../model/appReducer.ts'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  tasks: tasksReducer,
  todoLists: todoListsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
