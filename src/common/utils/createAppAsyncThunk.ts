import { createAsyncThunk } from '@reduxjs/toolkit'

import { AppDispatchType, AppRootStateType } from 'app/store.ts'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatchType
  rejectValue: null
}>()
