import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType } from './types.ts'

const initialState: AppInitialStateType = {
  isInitialized: false,
  status: 'idle',
  error: null,
}

const slice = createSlice({
  name: '@@app',
  initialState,
  reducers: {
    setAppIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions

// TYPES
export type AppInitialStateType = {
  isInitialized: boolean
  status: RequestStatusType
  error: string | null
}
