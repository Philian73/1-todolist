import { AxiosResponse } from 'axios'

import { instance, ResponseType } from 'common/api'
import { LoginParamsType, UserDate } from 'features/Auth/model/types.ts'

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
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
}
