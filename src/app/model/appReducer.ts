import { AppActionsType } from './actions.ts'
import { RequestStatusType } from './types.ts'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.payload.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}

// TYPES
type InitialStateType = typeof initialState
type ActionsType = ReturnType<AppActionsType[keyof AppActionsType]>
