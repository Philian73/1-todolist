import { AppRootStateType } from 'app/store.ts'

export const authSelectors = {
  isLoggedIn: (state: AppRootStateType) => state.auth.isLoggedIn,
}
