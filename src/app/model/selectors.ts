import { AppRootStateType } from 'app/store.ts'

export const appSelectors = {
  selectIsInitialized: (state: AppRootStateType) => state.app.isInitialized,
  selectStatus: (state: AppRootStateType) => state.app.status,
  selectError: (state: AppRootStateType) => state.app.error,
}
