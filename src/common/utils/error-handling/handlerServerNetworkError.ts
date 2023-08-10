import { isAxiosError } from 'axios'

import { appActions } from '@/app/model'
import { AppDispatchType } from '@/app/store'

export const handlerServerNetworkError = (error: unknown, dispatch: AppDispatchType) => {
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
