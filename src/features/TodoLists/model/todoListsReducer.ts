import { TodoListsActionsType } from './actions.ts'
import { TodoListDomainType } from './types.ts'

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
    case 'UPDATE-TODOLIST':
      return state.map(todoList =>
        todoList.id === action.payload.ID ? { ...todoList, ...action.payload.data } : todoList
      )
    default:
      return state
  }
}

// TYPES
type ActionsType = ReturnType<TodoListsActionsType[keyof TodoListsActionsType]>
