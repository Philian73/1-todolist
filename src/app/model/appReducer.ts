import { AppActionsType } from './actions.ts'
import { RequestStatusType } from './types.ts'

const initialState = {
  error: null,
  status: 'idle' as RequestStatusType,
}

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
}

// TYPES
type InitialStateType = typeof initialState
type ActionsType = ReturnType<AppActionsType[keyof AppActionsType]>
