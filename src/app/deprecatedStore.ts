import { AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { _appReducer } from '@/app/model/[deprecated]'
import { _authReducer } from '@/features/Auth/model/[deprecated]'
import { _tasksReducer } from '@/features/Tasks/model/[deprecated]'
import { _todoListsReducer } from '@/features/TodoLists/model/[deprecated]'

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
  app: _appReducer,
  auth: _authReducer,
  tasks: _tasksReducer,
  todoLists: _todoListsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const deprecatedStore = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
