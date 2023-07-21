import { AxiosResponse } from 'axios'

import { instance, ResponseType } from '../../../app/api/api.ts'
import { LoginParamsType, UserDate } from '../model/types.ts'

export const authAPI = {
  me() {
    return instance.get<ResponseType<UserDate>>('auth/me')
  },
  login(data: LoginParamsType) {
    return instance.post<null, AxiosResponse<ResponseType<{ userId: number }>>, LoginParamsType>(
      'auth/login',
      data
    )
  },
}
