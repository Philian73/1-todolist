import { v1 } from 'uuid'

import { FilterValuesType, TodoListType } from '../../types/types.ts'
import { InferActionTypes } from '../store.ts'

type ActionsType = InferActionTypes<typeof todoListsActions>

const initialState = [] as TodoListType[]

export const todoListsReducer = (state = initialState, action: ActionsType): TodoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(todoList => todoList.id !== action.payload.ID)
    case 'ADD-TODOLIST':
      return [{ id: action.payload.ID, title: action.payload.title, filter: 'all' }, ...state]
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
