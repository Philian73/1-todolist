import { SetDeleteCreateTodoListsActionsType } from '../../TodoLists/model/todoListsReducer.ts'

import { tasksActions } from './actions.ts'
import { TasksType } from './types.ts'

const initialState = {} as TasksType

export const tasksReducer = (state = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'SET-TODOLISTS':
      return action.payload.todoLists.reduce((acc, todoList) => ({ ...acc, [todoList.id]: [] }), {})
    case 'DELETE-TODOLIST': {
      const stateCopy = { ...state }

      delete stateCopy[action.payload.ID]

      return stateCopy
    }
    case 'CREATE-TODOLIST':
      return { ...state, [action.payload.todoList.id]: [] }
    case 'SET-TASKS':
      return {
        ...state,
        [action.payload.todoListID]: action.payload.tasks,
      }
    case 'DELETE-TASK':
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID].filter(
          task => task.id !== action.payload.taskID
        ),
      }
    case 'CREATE-TASK':
      return {
        ...state,
        [action.payload.task.todoListId]: [
          action.payload.task,
          ...state[action.payload.task.todoListId],
        ],
      }
    case 'UPDATE-TASK':
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
type TasksActionsType = typeof tasksActions

type ActionsType =
  | ReturnType<TasksActionsType[keyof TasksActionsType]>
  | SetDeleteCreateTodoListsActionsType
