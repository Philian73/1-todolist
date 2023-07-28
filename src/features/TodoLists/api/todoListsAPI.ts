import { AxiosResponse } from 'axios'

import { TodoListType } from '../model/types.ts'

import { instance, ResponseType } from 'common/api/api.ts'

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
}
