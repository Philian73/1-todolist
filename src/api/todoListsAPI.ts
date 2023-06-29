import { TodoListType } from '../types/types.ts'

import { instance } from './api.ts'

export const todoListsAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>('todo-lists')
  },
}
