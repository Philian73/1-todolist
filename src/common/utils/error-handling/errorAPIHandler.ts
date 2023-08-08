import { Dispatch } from 'redux'

import { appActions } from '@/app/model'
import { ResponseType } from '@/common/api'

export const errorAPIHandler = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  dispatch(
    appActions.setAppError({
      error: data.messages.length ? data.messages[0] : 'Some error occurred',
    })
  )
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
