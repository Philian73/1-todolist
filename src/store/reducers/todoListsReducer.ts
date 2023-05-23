import { FilterValuesType, TodoListType } from '../../App.tsx'
import { InferActionTypes } from '../store.ts'

type ActionsType = InferActionTypes<typeof actions>

export const todoListsReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(todoList => todoList.id !== action.payload.id)
    case 'ADD-TODOLIST':
      return [...state, { id: action.payload.id, title: action.payload.title, filter: 'all' }]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(todoList =>
        todoList.id === action.payload.id
          ? {
              ...todoList,
              title: action.payload.newTitle,
            }
          : todoList
      )
    case 'CHANGE-TODOLIST-FILTER':
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

export const actions = {
  removeTodoList: (id: string) => ({ type: 'REMOVE-TODOLIST', payload: { id } } as const),
  addTodoList: (id: string, title: string) =>
    ({ type: 'ADD-TODOLIST', payload: { id, title } } as const),
  changeTodoListTitle: (id: string, newTitle: string) =>
    ({
      type: 'CHANGE-TODOLIST-TITLE',
      payload: { id, newTitle },
    } as const),
  changeTodoListFilter: (id: string, newFilter: FilterValuesType) =>
    ({
      type: 'CHANGE-TODOLIST-FILTER',
      payload: { id, newFilter },
    } as const),
}
