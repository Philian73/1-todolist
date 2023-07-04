import { AxiosResponse } from 'axios'

import { TaskType, TodoListType, UpdateTaskModelType } from '../types/types.ts'

import { instance, ResponseType } from './api.ts'

type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export const todoListsAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>('todo-lists')
  },

  deleteTodoList(ID: string) {
    return instance.delete<ResponseType>(`todo-lists/${ID}`)
  },

  createTodoList(title: string) {
    return instance.post<
      null,
      AxiosResponse<ResponseType<{ item: TodoListType }>>,
      { title: string }
    >('todo-lists', { title })
  },

  updateTitleTodoList(ID: string, title: string) {
    return instance.put<null, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${ID}`, {
      title,
    })
  },

  getTasks(todoListID: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todoListID}/tasks`)
  },

  deleteTask(todoListID: string, taskID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskID}`)
  },

  createTask(todoListID: string, title: string) {
    return instance.post<
      null,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      {
        title: string
      }
    >(`todo-lists/${todoListID}/tasks`, { title })
  },

  updateTask(todoListID: string, taskID: string, model: UpdateTaskModelType) {
    return instance.put<
      null,
      AxiosResponse<
        ResponseType<{
          item: TaskType
        }>
      >,
      UpdateTaskModelType
    >(`todo-lists/${todoListID}/tasks/${taskID}`, model)
  },
}
