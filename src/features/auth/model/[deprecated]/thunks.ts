import { LoginParamsType } from '../'

import { _authActions } from './'

import { AppThunkType } from '@/app/deprecatedStore'
import { _appActions } from '@/app/model/[deprecated]'
import { APIResultCodes } from '@/common/api'
import { errorAPIHandler, handlerServerNetworkError } from '@/common/utils'
import { authAPI } from '@/features/auth/api'
import { _todoListsActions } from '@/features/todoLists/model/[deprecated]'

export const _authThunks = {
  me(): AppThunkType {
    return async dispatch => {
      dispatch(_appActions.setAppStatus('loading'))

      try {
        const response = await authAPI.me()

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(_authActions.setIsLoggedIn(true))
          dispatch(_appActions.setAppStatus('succeeded'))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(_appActions.setAppIsInitialized(true))
      }
    }
  },
  login(data: LoginParamsType): AppThunkType {
    return async dispatch => {
      dispatch(_appActions.setAppStatus('loading'))

      try {
        const response = await authAPI.login(data)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(_authActions.setIsLoggedIn(true))
          dispatch(_appActions.setAppStatus('succeeded'))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
  logout(): AppThunkType {
    return async dispatch => {
      dispatch(_appActions.setAppStatus('loading'))

      try {
        const response = await authAPI.logout()

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(_authActions.setIsLoggedIn(false))
          dispatch(_appActions.setAppStatus('succeeded'))
          dispatch(_todoListsActions.clearTodoLists())
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
}
