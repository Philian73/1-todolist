import { describe, beforeEach, it, expect } from 'vitest'

import { authActions } from '../../features/Auth/model/actions.ts'
import { authReducer, InitialStateType } from '../../features/Auth/model/authReducer.ts'

describe('authReducer', () => {
  let initialState: InitialStateType

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
    }
  })

  it('correct isLoggedIn should be set', () => {
    const action = authActions.setIsLoggedIn(true)
    const endState = authReducer(initialState, action)

    expect(endState.isLoggedIn).toBeTruthy()
  })
})
