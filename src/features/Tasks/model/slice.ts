import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { tasksAPI } from '../api'

import { TasksType, TaskType, UpdateTaskModelType } from './types.ts'

import { appActions } from 'app/model/slice.ts'
import { AppThunkType } from 'app/store.ts'
import { APIResultCodes } from 'common/api'
import { errorAPIHandler, handlerServerNetworkError } from 'common/utils'
import { todoListsActions } from 'features/TodoLists/model/slice.ts'

export type TasksInitialStateType = TasksType

const initialState: TasksInitialStateType = {}

const slice = createSlice({
  name: '@@tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<{ todoListID: string; tasks: TaskType[] }>) {
      action.payload.tasks.forEach(task => {
        state[action.payload.todoListID].push({ ...task, entityStatus: 'idle' })
      })
    },
    deleteTask(state, action: PayloadAction<{ todoListID: string; taskID: string }>) {
      const tasks = state[action.payload.todoListID]
      const index = tasks.findIndex(task => task.id === action.payload.taskID)

      if (index !== -1) tasks.splice(index, 1)
    },
    createTask(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift({
        ...action.payload.task,
        entityStatus: 'idle',
      })
    },
    updateTask(
      state,
      action: PayloadAction<{
        todoListID: string
        taskID: string
        model: Partial<UpdateTaskModelType>
      }>
    ) {
      const tasks = state[action.payload.todoListID]
      const index = tasks.findIndex(task => task.id === action.payload.taskID)

      if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(todoListsActions.setTodoLists, (state, action) => {
        action.payload.todoLists.forEach(todoList => {
          state[todoList.id] = []
        })
      })
      .addCase(todoListsActions.deleteTodoList, (state, action) => {
        delete state[action.payload.ID]
      })
      .addCase(todoListsActions.createTodoList, (state, action) => {
        state[action.payload.todoList.id] = []
      })
      .addCase(todoListsActions.clearTodoLists, state => {
        Object.keys(state).forEach(key => delete state[key])
      })
  },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {
  getTasks(todoListID: string): AppThunkType {
    return async dispatch => {
      const response = await tasksAPI.getTasks(todoListID)

      dispatch(tasksActions.setTasks({ todoListID, tasks: response.data.items }))
    }
  },
  deleteTask(todoListID: string, taskID: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(tasksActions.updateTask({ todoListID, taskID, model: { entityStatus: 'loading' } }))

      try {
        await tasksAPI.deleteTask(todoListID, taskID)

        dispatch(tasksActions.deleteTask({ todoListID, taskID }))
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(tasksActions.updateTask({ todoListID, taskID, model: { entityStatus: 'idle' } }))
      }
    }
  },
  createTask(todoListID: string, title: string): AppThunkType {
    return async dispatch => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(
        todoListsActions.updateEntityStatusTodoList({ ID: todoListID, entityStatus: 'loading' })
      )
      try {
        const response = await tasksAPI.createTask(todoListID, title)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(tasksActions.createTask({ task: response.data.data.item }))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          errorAPIHandler<{ item: TaskType }>(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(
          todoListsActions.updateEntityStatusTodoList({ ID: todoListID, entityStatus: 'idle' })
        )
      }
    }
  },
  updateTask(todoListID: string, taskID: string, data: Partial<UpdateTaskModelType>): AppThunkType {
    return async (dispatch, getState) => {
      dispatch(appActions.setAppStatus({ status: 'loading' }))
      dispatch(tasksActions.updateTask({ todoListID, taskID, model: { entityStatus: 'loading' } }))

      try {
        const task = getState().tasks[todoListID].find(task => task.id === taskID)!

        const model: UpdateTaskModelType = {
          title: task.title,
          deadline: task.deadline,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          status: task.status,
          entityStatus: task.entityStatus,
          ...data,
        }

        const response = await tasksAPI.updateTask(todoListID, taskID, model)

        if (response.data.resultCode === APIResultCodes.SUCCESS) {
          dispatch(tasksActions.updateTask({ todoListID, taskID, model }))
          dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        } else {
          errorAPIHandler<{ item: TaskType }>(response.data, dispatch)
        }
      } catch (error) {
        handlerServerNetworkError(error, dispatch)
      } finally {
        dispatch(tasksActions.updateTask({ todoListID, taskID, model: { entityStatus: 'idle' } }))
      }
    }
  },
}