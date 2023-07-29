import { AppActionsType } from 'app/model/[deprecated]/actions.ts'
import { RequestStatusType } from 'app/model/types.ts'

const initialState = {
  isInitialized: false,
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

export const _appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.payload.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.payload.error }
    case 'APP/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.payload.value }
    default:
      return state
  }
}

// TYPES
export type InitialStateType = typeof initialState
type ActionsType = ReturnType<AppActionsType[keyof AppActionsType]>
