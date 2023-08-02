import { AppRootStateType } from 'app/store.ts'

export const appSelectors = {
  isInitialized: (state: AppRootStateType) => state.app.isInitialized,
  status: (state: AppRootStateType) => state.app.status,
  error: (state: AppRootStateType) => state.app.error,
}
