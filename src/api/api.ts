import axios from 'axios'

import { KEY } from './key.ts'

export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: D
}

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': KEY,
  },
})
