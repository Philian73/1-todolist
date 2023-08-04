import { isAxiosError } from 'axios'
import { Dispatch } from 'redux'

import { appActions } from 'app/model/slice.ts'

export const handlerServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = 'Some error occurred'

  if (isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error?.message || errorMessage
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(appActions.setAppError({ error: errorMessage }))
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
