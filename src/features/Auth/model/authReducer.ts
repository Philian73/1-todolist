import { AuthActionsType } from './actions.ts'

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.payload.value }
    default:
      return state
  }
}

type InitialStateType = typeof initialState
type ActionsType = ReturnType<AuthActionsType[keyof AuthActionsType]>
