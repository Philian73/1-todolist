import { AuthActionsType } from './'

const initialState = {
  isLoggedIn: false,
}

export const _authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.payload.value }
    default:
      return state
  }
}

export type InitialStateType = typeof initialState
type ActionsType = ReturnType<AuthActionsType[keyof AuthActionsType]>
