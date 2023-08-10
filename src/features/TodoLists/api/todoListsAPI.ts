import { AxiosResponse } from 'axios'

import { TodoListType } from '../model'

import { instance, BaseResponseType } from '@/common/api'

export const todoListsAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>('todo-lists')
  },
  deleteTodoList(ID: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${ID}`)
  },
  createTodoList(title: string) {
    return instance.post<
      null,
      AxiosResponse<BaseResponseType<{ item: TodoListType }>>,
      { title: string }
    >('todo-lists', { title })
  },
  updateTitleTodoList(ID: string, title: string) {
    return instance.put<null, AxiosResponse<BaseResponseType>, { title: string }>(
      `todo-lists/${ID}`,
      {
        title,
      }
    )
  },
}
