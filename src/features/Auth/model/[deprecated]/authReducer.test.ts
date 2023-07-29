import { describe, beforeEach, it, expect } from 'vitest'

import { _authActions } from './actions.ts'
import { _authReducer, InitialStateType } from './authReducer.ts'

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
