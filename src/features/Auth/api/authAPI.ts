import { AxiosResponse } from 'axios'

import { LoginParamsType, UserDate } from '../model'

import { instance, BaseResponseType } from '@/common/api'

export const authAPI = {
  me() {
    return instance.get<BaseResponseType<UserDate>>('auth/me')
  },
  login(data: LoginParamsType) {
    return instance.post<
      null,
      AxiosResponse<BaseResponseType<{ userId: number }>>,
      LoginParamsType
    >('auth/login', data)
  },
  logout() {
    return instance.delete<BaseResponseType>('auth/login')
  },
}
