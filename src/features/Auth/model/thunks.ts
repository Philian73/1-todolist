import { APIResultCodes } from '../../../app/api/api.ts'
import { appActions } from '../../../app/model/actions.ts'
import { AppThunkType } from '../../../app/store/store.ts'
import { errorAPIHandler, handlerServerNetworkError } from '../../../app/utils/error-handler.ts'
import { authAPI } from '../api/authAPI.ts'

import { authActions } from './actions.ts'
import { LoginParamsType } from './types.ts'

export const authThunks = {
  me(): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus('loading'))

      try {
        const response = await authAPI.me()

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(authActions.setIsLoggedIn(true))
          dispatch(appActions.setAppStatus('succeeded'))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(appActions.setAppIsInitialized(true))
      }
    }
  },
  login(data: LoginParamsType): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus('loading'))

      try {
        const response = await authAPI.login(data)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(authActions.setIsLoggedIn(true))
          dispatch(appActions.setAppStatus('succeeded'))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
}
