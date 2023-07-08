import { AxiosError, isAxiosError } from 'axios'

import { ResponseType } from '../api/api.ts'
import { appActions } from '../model/actions.ts'
import { AppDispatchType } from '../store/store.ts'

export const errorAPIHandler = <D>(data: ResponseType<D>, dispatch: AppDispatchType) => {
  dispatch(appActions.setAppError(data.messages.length ? data.messages[0] : 'Some error occurred'))
  dispatch(appActions.setAppStatus('failed'))
}

export const handlerServerNetworkError = (error: unknown, dispatch: AppDispatchType) => {
  if (isAxiosError<AxiosError>(error) && error.response) {
    dispatch(appActions.setAppError(error.response.data.message))
  } else {
    dispatch(appActions.setAppError((error as Error).message))
  }
  dispatch(appActions.setAppStatus('failed'))
}
