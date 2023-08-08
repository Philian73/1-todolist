import { describe, beforeEach, it, expect } from 'vitest'

import { InitialStateType, _appReducer, _appActions } from './'

describe('_appReducer', () => {
  let initialState: InitialStateType

  beforeEach(() => {
    initialState = {
      isInitialized: false,
      status: 'idle',
      error: null,
    }
  })

  it('correct error message should be set', () => {
    const errorMessage = 'some-error'

    const action = _appActions.setAppError(errorMessage)
    const endState = _appReducer(initialState, action)

    expect(endState.error).toBe(errorMessage)
  })

  it('correct status should be set', () => {
    const action = _appActions.setAppStatus('loading')
    const endState = _appReducer(initialState, action)

    expect(endState.status).toBe('loading')
  })

  it('correct isInitialized should be set', () => {
    const action = _appActions.setAppIsInitialized(true)
    const endState = _appReducer(initialState, action)

    expect(endState.isInitialized).toBeTruthy()
  })
})
