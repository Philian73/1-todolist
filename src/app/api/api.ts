import axios from 'axios'

import { API_KEY } from './API_KEY.ts'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': API_KEY,
  },
})

// TYPES
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: D
}
