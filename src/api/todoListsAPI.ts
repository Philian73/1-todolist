import { TaskType, TodoListType } from '../types/types.ts'

import { instance } from './api.ts'

type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export const todoListsAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>('todo-lists')
  },
  getTasks(todoListID: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todoListID}/tasks`)
  },
}
