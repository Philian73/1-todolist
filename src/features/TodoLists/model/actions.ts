import { FilterValuesType, TodoListType, UpdateTodoListDomainType } from './types.ts'

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
  updateTitleTodoList(ID: string, title: string) {
    return {
      type: 'UPDATE-TITLE-TODOLIST',
      payload: { ID, title },
    } as const
  },
  updateFilterTodoList(ID: string, filter: FilterValuesType) {
    return {
      type: 'UPDATE-FILTER-TODOLIST',
      payload: { ID, filter },
    } as const
  },
  updateTodoList(ID: string, data: UpdateTodoListDomainType) {
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
