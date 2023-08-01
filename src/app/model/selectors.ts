import { AppRootStateType } from 'app/store.ts'

export const appSelectors = {
  selectIsInitialized: (state: AppRootStateType) => state.app.isInitialized,
}
