import { TodoListType, UpdateTodoListDomainModelType } from '../'

export const _todoListsActions = {
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
  clearTodoLists() {
    return {
      type: 'TODOLISTS/CLEAR-TODOLISTS',
    } as const
  },
}

// TYPES
export type TodoListsActionsType = typeof _todoListsActions

export type SetDeleteCreateClearTodoListsActionsType = ReturnType<
  TodoListsActionsType['createTodoList' | 'deleteTodoList' | 'setTodoLists' | 'clearTodoLists']
>
