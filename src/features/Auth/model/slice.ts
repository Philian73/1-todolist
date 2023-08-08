import { createSlice } from '@reduxjs/toolkit'

import { authAPI } from '../api'

import { LoginParamsType } from './types'

import { appActions } from '@/app/model'
import { APIResultCodes } from '@/common/api'
import { createAppAsyncThunk, errorAPIHandler, handlerServerNetworkError } from '@/common/utils'
import { todoListsActions } from '@/features/TodoLists/model'

// THUNKS
const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  '@@auth/me',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
      const response = await authAPI.me()

      if (response.data.resultCode === APIResultCodes.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))

        return { isLoggedIn: true }
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

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  '@@auth/login',
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
      const response = await authAPI.login(data)

      if (response.data.resultCode === APIResultCodes.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))

        return { isLoggedIn: true }
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

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  '@@auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))

    try {
      const response = await authAPI.logout()

      if (response.data.resultCode === APIResultCodes.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        dispatch(todoListsActions.clearTodoLists())

        return { isLoggedIn: false }
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
      .addCase(me.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

// EXPORTS
export const authReducer = slice.reducer
export const authThunks = { me, login, logout }

// TYPES
export type AuthInitialStateType = {
  isLoggedIn: boolean
}
