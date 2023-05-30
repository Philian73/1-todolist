import { v1 } from 'uuid'

import { FilterValuesType, TodoListType } from '../../App.tsx'
import { InferActionTypes } from '../store.ts'

type ActionsType = InferActionTypes<typeof todoListsActions>

export const todoListsReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(todoList => todoList.id !== action.payload.id)
    case 'ADD-TODOLIST':
      return [{ id: action.payload.id, title: action.payload.title, filter: 'all' }, ...state]
    case 'CHANGE-TITLE-TODOLIST':
      return state.map(todoList =>
        todoList.id === action.payload.id
          ? {
              ...todoList,
              title: action.payload.newTitle,
            }
          : todoList
      )
    case 'CHANGE-FILTER-TODOLIST':
      return state.map(todoList =>
        todoList.id === action.payload.id
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
  removeTodoList: (id: string) => ({ type: 'REMOVE-TODOLIST', payload: { id } } as const),
  addTodoList: (title: string) => ({ type: 'ADD-TODOLIST', payload: { id: v1(), title } } as const),
  changeTitleTodoList: (id: string, newTitle: string) =>
    ({
      type: 'CHANGE-TITLE-TODOLIST',
      payload: { id, newTitle },
    } as const),
  changeFilterTodoList: (id: string, newFilter: FilterValuesType) =>
    ({
      type: 'CHANGE-FILTER-TODOLIST',
      payload: { id, newFilter },
    } as const),
}
