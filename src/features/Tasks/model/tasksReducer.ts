import { SetDeleteCreateTodoListsActionsType } from '../../TodoLists/model/actions.ts'

import { TasksActionsType } from './actions.ts'
import { TasksType } from './types.ts'

const initialState = {} as TasksType

export const tasksReducer = (state = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'TODOLISTS/SET-TODOLISTS':
      return action.payload.todoLists.reduce((acc, todoList) => ({ ...acc, [todoList.id]: [] }), {})
    case 'TODOLISTS/DELETE-TODOLIST': {
      const stateCopy = { ...state }

      delete stateCopy[action.payload.ID]

      return stateCopy
    }
    case 'TODOLISTS/CREATE-TODOLIST':
      return { ...state, [action.payload.todoList.id]: [] }
    case 'TASKS/SET-TASKS':
      return {
        ...state,
        [action.payload.todoListID]: action.payload.tasks,
      }
    case 'TASKS/DELETE-TASK':
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID].filter(
          task => task.id !== action.payload.taskID
        ),
      }
    case 'TASKS/CREATE-TASK':
      return {
        ...state,
        [action.payload.task.todoListId]: [
          action.payload.task,
          ...state[action.payload.task.todoListId],
        ],
      }
    case 'TASKS/UPDATE-TASK':
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID].map(task =>
          task.id === action.payload.taskID ? { ...task, ...action.payload.model } : task
        ),
      }
    default:
      return state
  }
}

// TYPES
type ActionsType =
  | ReturnType<TasksActionsType[keyof TasksActionsType]>
  | SetDeleteCreateTodoListsActionsType
