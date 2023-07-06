import { Dispatch } from 'redux'

import { todoListsAPI } from '../../api/todoListsAPI.ts'
import { TasksType, TaskType, UpdateTaskModelType } from '../../types'
import { AppRootStateType } from '../store.ts'

import { SetDeleteCreateTodoListsActionsType } from './todoListsReducer.ts'

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

// ACTIONS
export const tasksActions = {
  setTasks(todoListID: string, tasks: TaskType[]) {
    return {
      type: 'SET-TASKS',
      payload: { todoListID, tasks },
    } as const
  },
  deleteTask(todoListID: string, taskID: string) {
    return {
      type: 'DELETE-TASK',
      payload: { todoListID, taskID },
    } as const
  },
  createTask(task: TaskType) {
    return {
      type: 'CREATE-TASK',
      payload: { task },
    } as const
  },
  updateTask(todoListID: string, taskID: string, model: Partial<UpdateTaskModelType>) {
    return {
      type: 'UPDATE-TASK',
      payload: { todoListID, taskID, model },
    } as const
  },
}

// THUNKS
export const tasksThunks = {
  getTasks(todoListID: string) {
    return (dispatch: Dispatch) => {
      todoListsAPI.getTasks(todoListID).then(response => {
        dispatch(tasksActions.setTasks(todoListID, response.data.items))
      })
    }
  },
  deleteTask(todoListID: string, taskID: string) {
    return (dispatch: Dispatch) => {
      todoListsAPI.deleteTask(todoListID, taskID).then(() => {
        dispatch(tasksActions.deleteTask(todoListID, taskID))
      })
    }
  },
  createTask(todoListID: string, title: string) {
    return (dispatch: Dispatch) => {
      todoListsAPI.createTask(todoListID, title).then(response => {
        dispatch(tasksActions.createTask(response.data.data.item))
      })
    }
  },
  updateTask(todoListID: string, taskID: string, data: Partial<UpdateTaskModelType>) {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const task = getState().tasks[todoListID].find(task => task.id === taskID)

      if (task) {
        const model: UpdateTaskModelType = {
          title: task.title,
          deadline: task.deadline,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          status: task.status,
          ...data,
        }

        todoListsAPI.updateTask(todoListID, taskID, model).then(() => {
          dispatch(tasksActions.updateTask(todoListID, taskID, model))
        })
      }
    }
  },
}

// TYPES
type TasksActionsType = typeof tasksActions

type ActionsType =
  | ReturnType<TasksActionsType[keyof TasksActionsType]>
  | SetDeleteCreateTodoListsActionsType
