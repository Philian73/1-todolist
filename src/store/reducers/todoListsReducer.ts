import { Dispatch } from 'redux'
import { v1 } from 'uuid'

import { todoListsAPI } from '../../api/todoListsAPI.ts'
import { FilterValuesType, TodoListDomainType, TodoListType } from '../../types/types.ts'

type TodoListsActionsType = typeof todoListsActions

export type SetDeleteCreateTodoListsActionsType = ReturnType<
  TodoListsActionsType['createTodoList' | 'deleteTodoList' | 'setTodoLists']
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
    case 'DELETE-TODOLIST':
      return state.filter(todoList => todoList.id !== action.payload.ID)
    case 'CREATE-TODOLIST':
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
    case 'UPDATE-TITLE-TODOLIST':
      return state.map(todoList =>
        todoList.id === action.payload.ID
          ? {
              ...todoList,
              title: action.payload.title,
            }
          : todoList
      )
    case 'UPDATE-FILTER-TODOLIST':
      return state.map(todoList =>
        todoList.id === action.payload.ID
          ? {
              ...todoList,
              filter: action.payload.filter,
            }
          : todoList
      )
    default:
      return state
  }
}

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

  createTodoList(title: string) {
    return {
      type: 'CREATE-TODOLIST',
      payload: { ID: v1(), title },
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
}

export const todoListsThunks = {
  getTodoLists() {
    return (dispatch: Dispatch) => {
      todoListsAPI.getTodoLists().then(response => {
        dispatch(todoListsActions.setTodoLists(response.data))
      })
    }
  },
  deleteTodoList(ID: string) {
    return (dispatch: Dispatch) => {
      todoListsAPI.deleteTodoList(ID).then(() => {
        dispatch(todoListsActions.deleteTodoList(ID))
      })
    }
  },
}
