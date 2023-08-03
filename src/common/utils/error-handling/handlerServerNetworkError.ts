import { isAxiosError } from 'axios'
import { Dispatch } from 'redux'

import { appActions } from 'app/model/slice.ts'

export const handlerServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  if (isAxiosError(error)) {
    dispatch(appActions.setAppError({ error: error.response?.data.message || error.message }))
  } else if (error instanceof Error) {
    dispatch(appActions.setAppError({ error: error.message }))
  } else {
    dispatch(appActions.setAppError({ error: 'Some occurred error' }))
  }

  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
