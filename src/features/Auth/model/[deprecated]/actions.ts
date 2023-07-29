export const _authActions = {
  setIsLoggedIn(value: boolean) {
    return {
      type: 'LOGIN/SET-IS-LOGGED-IN',
      payload: { value },
    } as const
  },
}

export type AuthActionsType = typeof _authActions
