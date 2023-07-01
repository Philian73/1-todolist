import { Dispatch } from 'redux'

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
        [action.payload.task.todoListId]: [
          action.payload.task,
          ...state[action.payload.task.todoListId],
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
  addTask: (task: TaskType) =>
    ({
      type: 'ADD-TASK',
      payload: { task },
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

export const deleteTask = (todoListID: string, taskID: string) => {
  return (dispatch: Dispatch) => {
    todoListsAPI.deleteTask(todoListID, taskID).then(() => {
      dispatch(tasksActions.removeTask(todoListID, taskID))
    })
  }
}

export const createTask = (todoListID: string, title: string) => {
  return (dispatch: Dispatch) => {
    todoListsAPI.createTask(todoListID, title).then(response => {
      dispatch(tasksActions.addTask(response.data.data.item))
    })
  }
}
