import { v1 } from 'uuid'

import { TasksType } from '../../App.tsx'
import { InferActionTypes } from '../store.ts'

type ActionsType = InferActionTypes<typeof tasksActions>

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
}
