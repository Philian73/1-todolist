import { createSlice, isAnyOf } from '@reduxjs/toolkit'

import { authAPI } from '../api'

import { LoginParamsType } from './'

import { appActions } from '@/app/model'
import { APIResultCodes } from '@/common/api'
import { createAppAsyncThunk, errorAPIHandler, handlerServerNetworkError } from '@/common/utils'
import { todoListsActions } from '@/features/todoLists/model'

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
      .addCase(logout.fulfilled, state => {
        state.isLoggedIn = false
      })
      .addMatcher(isAnyOf(me.fulfilled, login.fulfilled), state => {
        state.isLoggedIn = true
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
