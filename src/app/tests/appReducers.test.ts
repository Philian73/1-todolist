import { describe, beforeEach, it, expect } from 'vitest'

import { AppInitialStateType, appReducer, appActions } from '../model'

describe('appReducer', () => {
  let initialState: AppInitialStateType

  beforeEach(() => {
    initialState = {
      isInitialized: false,
      status: 'idle',
      error: null,
    }
  })

  it('correct error message should be set', () => {
    const error = 'some-error'

    const action = appActions.setAppError({ error })
    const endState = appReducer(initialState, action)

    expect(endState.error).toBe(error)
  })

  it('correct status should be set', () => {
    const action = appActions.setAppStatus({ status: 'loading' })
    const endState = appReducer(initialState, action)

    expect(endState.status).toBe('loading')
  })

  it('correct isInitialized should be set', () => {
    const action = appActions.setAppIsInitialized({ isInitialized: true })
    const endState = appReducer(initialState, action)

    expect(endState.isInitialized).toBeTruthy()
  })
})
