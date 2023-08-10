import axios from 'axios'

import { API_KEY } from './API_KEY'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': API_KEY,
  },
})

// TYPES
export enum APIResultCodes {
  SUCCESS = 0,
  ERROR = 1,
  CAPTCHA_ERROR = 10,
}

export type BaseResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: D
}
