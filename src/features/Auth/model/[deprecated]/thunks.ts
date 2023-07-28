import { appActions } from 'app/model/[deprecated]/actions.ts'
import { AppThunkType } from 'app/store.ts'
import { APIResultCodes } from 'common/api'
import { errorAPIHandler, handlerServerNetworkError } from 'common/utils/error-handling'
import { authAPI } from 'features/Auth/api'
import { authActions } from 'features/Auth/model/slice.ts'
import { LoginParamsType } from 'features/Auth/model/types.ts'
import { todoListsActions } from 'features/TodoLists/model/[deprecated]/actions.ts'

export const authThunks = {
  me(): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus('loading'))

      try {
        const response = await authAPI.me()

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
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
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
          dispatch(appActions.setAppStatus('succeeded'))
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
      dispatch(appActions.setAppStatus('loading'))

      try {
        const response = await authAPI.logout()

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
          dispatch(appActions.setAppStatus('succeeded'))
          dispatch(todoListsActions.clearTodoLists())
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      }
    }
  },
}
