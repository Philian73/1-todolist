import { Dispatch } from 'redux'
import { v1 } from 'uuid'

import { todoListsAPI } from '../../api/todoListsAPI.ts'
import { TasksType, TaskType } from '../../types/types.ts'

import { AddRemoveSetTodolistsType } from './todoListsReducer.ts'

type TasksActionsType = typeof tasksActions

export type ActionsType =
  | ReturnType<TasksActionsType[keyof TasksActionsType]>
  | AddRemoveSetTodolistsType

export const initialState = {} as TasksType

export const tasksReducer = (state = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'SET-TODOLISTS':
      return action.payload.todoLists.reduce((acc, todoList) => ({ ...acc, [todoList.id]: [] }), {})
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state }

      delete stateCopy[action.payload.ID]

      return stateCopy
    }
    case 'ADD-TODOLIST':
      return { ...state, [action.payload.ID]: [] }
    case 'SET-TASKS':
      return {
        ...state,
        [action.payload.todoListID]: action.payload.tasks,
      }
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
    default:
      return state
  }
}

export const tasksActions = {
  setTasks: (todoListID: string, tasks: TaskType[]) =>
    ({
      type: 'SET-TASKS',
      payload: { todoListID, tasks },
    } as const),
  removeTask: (todoListID: string, taskID: string) =>
    ({
      type: 'REMOVE-TASK',
      payload: { todoListID, taskID },
    } as const),
  addTask: (todoListID: string, title: string) =>
    ({
      type: 'ADD-TASK',
      payload: { todoListID, title },
    } as const),
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

export const getTasks = (todoListID: string) => {
  return (dispatch: Dispatch) => {
    todoListsAPI.getTasks(todoListID).then(response => {
      dispatch(tasksActions.setTasks(todoListID, response.data.items))
    })
  }
}
