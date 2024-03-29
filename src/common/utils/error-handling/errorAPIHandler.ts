import { appActions } from '@/app/model'
import { AppDispatchType } from '@/app/store'
import { BaseResponseType } from '@/common/api'

export const errorAPIHandler = <D>(
  data: BaseResponseType<D>,
  dispatch: AppDispatchType,
  showError: boolean = true
) => {
  if (showError) {
    dispatch(
      appActions.setAppError({
        error: data.messages.length ? data.messages[0] : 'Some error occurred',
      })
    )
  }

  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
