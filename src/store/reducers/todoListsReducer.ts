import { v1 } from 'uuid'

import { FilterValuesType, TodoListDomainType, TodoListType } from '../../types/types.ts'

type TodoListsActionsType = typeof todoListsActions

export type AddAndRemoveTodoListsActionsType = ReturnType<
  TodoListsActionsType['addTodoList' | 'removeTodoList']
>

type ActionsType = ReturnType<TodoListsActionsType[keyof TodoListsActionsType]>

const initialState = [] as TodoListDomainType[]

export const todoListsReducer = (
  state = initialState,
  action: ActionsType
): TodoListDomainType[] => {
  switch (action.type) {
    case 'SET-TODOLISTS':
      return action.payload.todoLists.map(todoList => ({ ...todoList, filter: 'all' }))
    case 'REMOVE-TODOLIST':
      return state.filter(todoList => todoList.id !== action.payload.ID)
    case 'ADD-TODOLIST':
      return [
        {
          id: action.payload.ID,
          title: action.payload.title,
          filter: 'all',
          addedDate: new Date().toISOString(),
          order: 0,
        },
        ...state,
      ]
    case 'CHANGE-TITLE-TODOLIST':
      return state.map(todoList =>
        todoList.id === action.payload.ID
          ? {
              ...todoList,
              title: action.payload.newTitle,
            }
          : todoList
      )
    case 'CHANGE-FILTER-TODOLIST':
      return state.map(todoList =>
        todoList.id === action.payload.ID
          ? {
              ...todoList,
              filter: action.payload.newFilter,
            }
          : todoList
      )
    default:
      return state
  }
}

export const todoListsActions = {
  setTodoLists: (todoLists: TodoListType[]) =>
    ({ type: 'SET-TODOLISTS', payload: { todoLists } } as const),
  removeTodoList: (ID: string) =>
    ({
      type: 'REMOVE-TODOLIST',
      payload: { ID },
    } as const),
  addTodoList: (title: string) =>
    ({
      type: 'ADD-TODOLIST',
      payload: { ID: v1(), title },
    } as const),
  changeTitleTodoList: (ID: string, newTitle: string) =>
    ({
      type: 'CHANGE-TITLE-TODOLIST',
      payload: { ID, newTitle },
    } as const),
  changeFilterTodoList: (ID: string, newFilter: FilterValuesType) =>
    ({
      type: 'CHANGE-FILTER-TODOLIST',
      payload: { ID, newFilter },
    } as const),
}
