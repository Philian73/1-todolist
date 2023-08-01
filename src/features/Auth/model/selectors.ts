import { AppRootStateType } from 'app/store.ts'

export const authSelectors = {
  selectIsLoggedIn: (state: AppRootStateType) => state.auth.isLoggedIn,
}
