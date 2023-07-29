import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { appActions } from 'app/model/slice.ts'
import { AppThunkType } from 'app/store.ts'
import { APIResultCodes } from 'common/api'
import { errorAPIHandler, handlerServerNetworkError } from 'common/utils'
import { authAPI } from 'features/Auth/api'
import { LoginParamsType } from 'features/Auth/model/types.ts'
import { todoListsActions } from 'features/TodoLists/model/[deprecated]/actions.ts'

const initialState = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {
  me(): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))

      try {
        const response = await authAPI.me()

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(appActions.setAppIsInitialized({ isInitialized: true }))
      }
    }
  },
  login(data: LoginParamsType): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))

      try {
        const response = await authAPI.login(data)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
  logout(): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))

      try {
        const response = await authAPI.logout()

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
          dispatch(todoListsActions.clearTodoLists())
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
}
