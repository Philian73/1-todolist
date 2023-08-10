import { describe, beforeEach, it, expect } from 'vitest'

import { InitialStateType, _authReducer, _authActions } from './'

describe('authReducer', () => {
  let initialState: InitialStateType

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
    }
  })

  it('correct isLoggedIn should be set', () => {
    const action = _authActions.setIsLoggedIn(true)
    const endState = _authReducer(initialState, action)

    expect(endState.isLoggedIn).toBeTruthy()
  })
})
