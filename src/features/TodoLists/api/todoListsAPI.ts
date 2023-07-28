import { AxiosResponse } from 'axios'

import { instance, ResponseType } from 'common/api'
import { TodoListType } from 'features/TodoLists/model/types.ts'

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
