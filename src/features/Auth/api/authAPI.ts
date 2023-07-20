import { AxiosResponse } from 'axios'

import { instance, ResponseType } from '../../../app/api/api.ts'
import { LoginParamsType } from '../model/types.ts'

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<null, AxiosResponse<ResponseType<{ userId: number }>>, LoginParamsType>(
      'auth/login',
      data
    )
  },
}
