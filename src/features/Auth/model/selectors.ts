import { AppRootStateType } from '@/app/store'

export const authSelectors = {
  isLoggedIn: (state: AppRootStateType) => state.auth.isLoggedIn,
}
