import { RequestStatusType } from './types.ts'

export const appActions = {
  setAppStatus(status: RequestStatusType) {
    return {
      type: 'APP/SET-STATUS',
      payload: { status },
    } as const
  },
  setAppError(error: string | null) {
    return {
      type: 'APP/SET-ERROR',
      payload: { error },
    } as const
  },
}

// TYPES
export type AppActionsType = typeof appActions
