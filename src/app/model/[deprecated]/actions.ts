import { RequestStatusType } from '../types.ts'

export const _appActions = {
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
  setAppIsInitialized(value: boolean) {
    return {
      type: 'APP/SET-IS-INITIALIZED',
      payload: { value },
    } as const
  },
}

// TYPES
export type AppActionsType = typeof _appActions
