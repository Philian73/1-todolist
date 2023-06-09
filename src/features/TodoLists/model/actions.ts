import { TodoListType, UpdateTodoListDomainModelType } from './types.ts'

export const todoListsActions = {
  setTodoLists(todoLists: TodoListType[]) {
    return {
      type: 'TODOLISTS/SET-TODOLISTS',
      payload: { todoLists },
    } as const
  },
  deleteTodoList(ID: string) {
    return {
      type: 'TODOLISTS/DELETE-TODOLIST',
      payload: { ID },
    } as const
  },
  createTodoList(todoList: TodoListType) {
    return {
      type: 'TODOLISTS/CREATE-TODOLIST',
      payload: { todoList },
    } as const
  },
  updateTodoList(ID: string, data: UpdateTodoListDomainModelType) {
    return {
      type: 'TODOLISTS/UPDATE-TODOLIST',
      payload: { ID, data },
    } as const
  },
}

// TYPES
export type TodoListsActionsType = typeof todoListsActions

export type SetDeleteCreateTodoListsActionsType = ReturnType<
  TodoListsActionsType['createTodoList' | 'deleteTodoList' | 'setTodoLists']
>
