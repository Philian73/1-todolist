import { describe, beforeEach, it, expect } from 'vitest'

import { AuthInitialStateType, authReducer, authThunks } from '../model'

import { createFulfilledAction } from '@/common/utils'

describe('authExtraReducers', () => {
  let initialState: AuthInitialStateType

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
    }
  })

  it('isLoggedIn set to true on authThunks.me()', () => {
    const action = createFulfilledAction(authThunks.initializeApp)
    const endState = authReducer(initialState, action)

    expect(endState.isLoggedIn).toBeTruthy()
  })

  it('isLoggedIn set to true on authThunks.login()', () => {
    const action = createFulfilledAction(authThunks.login)
    const endState = authReducer(initialState, action)

    expect(endState.isLoggedIn).toBeTruthy()
  })

  it('isLoggedIn set to false on authThunks.logout()', () => {
    const action = createFulfilledAction(authThunks.logout)
    const endState = authReducer(initialState, action)

    expect(endState.isLoggedIn).toBeFalsy()
  })
})
