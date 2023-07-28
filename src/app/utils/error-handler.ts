import { AxiosError, isAxiosError } from 'axios'
import { Dispatch } from 'redux'

import { ResponseType } from 'app/api/api.ts'
import { appActions } from 'app/model/actions.ts'

export const errorAPIHandler = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  dispatch(appActions.setAppError(data.messages.length ? data.messages[0] : 'Some error occurred'))
  dispatch(appActions.setAppStatus('failed'))
}

export const handlerServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  if (isAxiosError<AxiosError>(error)) {
    dispatch(appActions.setAppError(error.response ? error.response.data.message : error.message))
  } else {
    dispatch(appActions.setAppError((error as Error).message))
  }

  dispatch(appActions.setAppStatus('failed'))
}
