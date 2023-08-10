import { AxiosResponse } from 'axios'

import { TaskType, UpdateTaskModelType } from '../model'

import { instance, BaseResponseType } from '@/common/api'

export const tasksAPI = {
  getTasks(todoListID: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todoListID}/tasks`)
  },
  deleteTask(todoListID: string, taskID: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
  },
  createTask(todoListID: string, title: string) {
    return instance.post<
      null,
      AxiosResponse<BaseResponseType<{ item: TaskType }>>,
      {
        title: string
      }
    >(`todo-lists/${todoListID}/tasks`, { title })
  },
  updateTask(todoListID: string, taskID: string, model: UpdateTaskModelType) {
    return instance.put<
      null,
      AxiosResponse<
        BaseResponseType<{
          item: TaskType
        }>
      >,
      UpdateTaskModelType
    >(`todo-lists/${todoListID}/tasks/${taskID}`, model)
  },
}

// TYPES
type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}
