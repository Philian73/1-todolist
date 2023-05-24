import { v1 } from 'uuid'

import { TasksType } from '../../App.tsx'
import { InferActionTypes } from '../store.ts'

import { todoListsActions } from './todoListsReducer.ts'

type ActionsType =
  | InferActionTypes<typeof tasksActions>
  | ReturnType<typeof todoListsActions.removeTodoList>
  | ReturnType<typeof todoListsActions.addTodoList>

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID].filter(
          task => task.id !== action.payload.taskID
        ),
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.payload.todoListID]: [
          {
            id: v1(),
            title: action.payload.title,
            isDone: false,
          },
          ...state[action.payload.todoListID],
        ],
      }
    case 'CHANGE-TITLE-TASK':
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID].map(task =>
          task.id === action.payload.taskID
            ? {
                ...task,
                title: action.payload.newTitle,
              }
            : task
        ),
      }
    case 'CHANGE-STATUS-TASK':
      return {
        ...state,
        [action.payload.todoListID]: state[action.payload.todoListID].map(task =>
          task.id === action.payload.taskID
            ? {
                ...task,
                isDone: action.payload.newStatus,
              }
            : task
        ),
      }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state }

      delete stateCopy[action.payload.id]

      return stateCopy
    }
    case 'ADD-TODOLIST':
      return { ...state, [action.payload.id]: [] }
    default:
      return state
  }
}

export const tasksActions = {
  removeTask: (todoListID: string, taskID: string) =>
    ({
      type: 'REMOVE-TASK',
      payload: { todoListID, taskID },
    } as const),
  addTask: (todoListID: string, title: string) =>
    ({ type: 'ADD-TASK', payload: { todoListID, title } } as const),
  changeTitleTask: (todoListID: string, taskID: string, newTitle: string) =>
    ({
      type: 'CHANGE-TITLE-TASK',
      payload: { todoListID, taskID, newTitle },
    } as const),
  changeStatusTask: (todoListID: string, taskID: string, newStatus: boolean) =>
    ({
      type: 'CHANGE-STATUS-TASK',
      payload: { todoListID, taskID, newStatus },
    } as const),
}
