import { Dispatch } from 'redux'

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
      return [{ ...action.payload.todoList, filter: 'all' }, ...state]
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

  createTodoList(title: string) {
    return (dispatch: Dispatch) => {
      todoListsAPI.createTodoList(title).then(response => {
        dispatch(todoListsActions.createTodoList(response.data.data.item))
      })
    }
  },

  updateTitleTodoList(ID: string, title: string) {
    return (dispatch: Dispatch) => {
      todoListsAPI.updateTitleTodoList(ID, title).then(() => {
        dispatch(todoListsActions.updateTitleTodoList(ID, title))
      })
    }
  },
}
