import { describe, beforeEach, it, expect } from 'vitest'

import { appActions } from '../../app/model/actions.ts'
import { appReducer, InitialStateType } from '../../app/model/appReducer.ts'

describe('appReducer', () => {
  let initialState: InitialStateType

  beforeEach(() => {
    initialState = {
      status: 'idle',
      error: null,
    }
  })

  it('correct error message should be set', () => {
    const errorMessage = 'some-error'

    const action = appActions.setAppError(errorMessage)
    const endState = appReducer(initialState, action)

    expect(endState.error).toBe(errorMessage)
  })

  it('correct status should be set', () => {
    const action = appActions.setAppStatus('loading')
    const endState = appReducer(initialState, action)

    expect(endState.status).toBe('loading')
  })
})
