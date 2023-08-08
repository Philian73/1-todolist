import { RootStateType } from '@/app/store'

export const appSelectors = {
  isInitialized: (state: RootStateType) => state.app.isInitialized,
  status: (state: RootStateType) => state.app.status,
  error: (state: RootStateType) => state.app.error,
}
