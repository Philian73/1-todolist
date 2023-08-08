import { RootStateType } from '@/app/store'

export const authSelectors = {
  isLoggedIn: (state: RootStateType) => state.auth.isLoggedIn,
}
