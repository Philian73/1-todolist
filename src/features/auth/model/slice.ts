import { createSlice, isAnyOf, isFulfilled } from '@reduxjs/toolkit'

import { authAPI } from '../api'

import { LoginParamsType } from './'

import { appActions } from '@/app/model'
import { APIResultCodes } from '@/common/api'
import { createAppAsyncThunk, errorAPIHandler, handlerServerNetworkError } from '@/common/utils'
import { todoListsActions } from '@/features/todoLists/model'

// THUNKS
const initializeApp = createAppAsyncThunk<undefined, undefined>(
  '@@auth/initialize-app',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
      const response = await authAPI.me()

      if (response.data.resultCode === APIResultCodes.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        errorAPIHandler(response.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setAppIsInitialized({ isInitialized: true }))
    }
  }
)

const login = createAppAsyncThunk<undefined, LoginParamsType>(
  '@@auth/login',
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
      const response = await authAPI.login(data)

      if (response.data.resultCode === APIResultCodes.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } else {
        errorAPIHandler(response.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    }
  }
)

const logout = createAppAsyncThunk<undefined, undefined>(
  '@@auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
      const response = await authAPI.logout()

      if (response.data.resultCode === APIResultCodes.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(todoListsActions.clearTodoLists())
      } else {
        errorAPIHandler(response.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    }
  }
)

// SLICE
const initialState: AuthInitialStateType = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled, state => {
        state.isLoggedIn = false
      })
      .addMatcher(isAnyOf(isFulfilled(initializeApp, login)), state => {
        state.isLoggedIn = true
      })
  },
})

// EXPORTS
export const authReducer = slice.reducer
export const authThunks = { initializeApp, login, logout }

// TYPES
export type AuthInitialStateType = {
  isLoggedIn: boolean
}
