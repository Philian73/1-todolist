import { TodoListType, UpdateTodoListDomainModelType } from './types.ts'

export const todoListsActions = {
  setTodoLists(todoLists: TodoListType[]) {
    return {
      type: 'SET-TODOLISTS',
      payload: { todoLists },
    } as const
  },
  deleteTodoList(ID: string) {
    return {
      type: 'DELETE-TODOLIST',
      payload: { ID },
    } as const
  },
  createTodoList(todoList: TodoListType) {
    return {
      type: 'CREATE-TODOLIST',
      payload: { todoList },
    } as const
  },
  updateTodoList(ID: string, data: UpdateTodoListDomainModelType) {
    return {
      type: 'UPDATE-TODOLIST',
      payload: { ID, data },
    } as const
  },
}

// TYPES
export type TodoListsActionsType = typeof todoListsActions

export type SetDeleteCreateTodoListsActionsType = ReturnType<
  TodoListsActionsType['createTodoList' | 'deleteTodoList' | 'setTodoLists']
>
