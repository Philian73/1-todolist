import { AxiosError, isAxiosError } from 'axios'
import { Dispatch } from 'redux'

import { appActions } from 'app/model/slice.ts'

export const handlerServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  if (isAxiosError<AxiosError>(error)) {
    dispatch(
      appActions.setAppError({
        error: error.response ? error.response.data.message : error.message,
      })
    )
  } else {
    dispatch(appActions.setAppError({ error: (error as Error).message }))
  }

  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
