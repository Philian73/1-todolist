import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { tasksAPI } from '../api'

import { TasksType, TaskType, UpdateTaskModelType } from './types'

import { appActions, RequestStatusType } from '@/app/model'
import { APIResultCodes } from '@/common/api'
import { createAppAsyncThunk, errorAPIHandler, handlerServerNetworkError } from '@/common/utils'
import { todoListsActions, todoListsThunks } from '@/features/TodoLists/model'

//THUNKS
const fetchTasks = createAppAsyncThunk<{ todoListID: string; tasks: TaskType[] }, string>(
  '@@tasks/fetch-tasks',
  async (todoListID, { dispatch, rejectWithValue }) => {
    try {
      const response = await tasksAPI.getTasks(todoListID)
      const tasks = response.data.items

      return { todoListID, tasks }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    }
  }
)

const deleteTask = createAppAsyncThunk<
  { todoListID: string; taskID: string },
  { todoListID: string; taskID: string }
>('@@tasks/delete-task', async ({ todoListID, taskID }, { dispatch, rejectWithValue }) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  dispatch(tasksActions.updateEntityStatusTask({ todoListID, taskID, entityStatus: 'loading' }))

  try {
    await tasksAPI.deleteTask(todoListID, taskID)

    dispatch(appActions.setAppStatus({ status: 'succeeded' }))

    return { todoListID, taskID }
  } catch (error) {
    handlerServerNetworkError(error, dispatch)

    return rejectWithValue(null)
  } finally {
    dispatch(tasksActions.updateEntityStatusTask({ todoListID, taskID, entityStatus: 'idle' }))
  }
})

const createTask = createAppAsyncThunk<{ task: TaskType }, { todoListID: string; title: string }>(
  '@@tasks/create-task',
  async ({ todoListID, title }, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    dispatch(
      todoListsActions.updateEntityStatusTodoList({ ID: todoListID, entityStatus: 'loading' })
    )

    try {
      const response = await tasksAPI.createTask(todoListID, title)
      const task = response.data.data.item

      if (response.data.resultCode === APIResultCodes.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))

        return { task }
      } else {
        errorAPIHandler(response.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    } finally {
      dispatch(
        todoListsActions.updateEntityStatusTodoList({ ID: todoListID, entityStatus: 'idle' })
      )
    }
  }
)

const updateTask = createAppAsyncThunk<
  { todoListID: string; taskID: string; data: Partial<UpdateTaskModelType> },
  { todoListID: string; taskID: string; data: Partial<UpdateTaskModelType> }
>(
  '@@tasks/update-task',
  async ({ todoListID, taskID, data }, { dispatch, getState, rejectWithValue }) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    dispatch(tasksActions.updateEntityStatusTask({ todoListID, taskID, entityStatus: 'loading' }))

    try {
      const task = getState().tasks[todoListID].find(task => task.id === taskID)!
      const model: UpdateTaskModelType = {
        title: task.title,
        deadline: task.deadline,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        status: task.status,
        ...data,
      }
      const response = await tasksAPI.updateTask(todoListID, taskID, model)

      if (response.data.resultCode === APIResultCodes.SUCCESS) {
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))

        return { todoListID, taskID, data: model }
      } else {
        errorAPIHandler(response.data, dispatch)

        return rejectWithValue(null)
      }
    } catch (error) {
      handlerServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    } finally {
      dispatch(tasksActions.updateEntityStatusTask({ todoListID, taskID, entityStatus: 'idle' }))
    }
  }
)

//SLICE
const initialState: TasksInitialStateType = {}

const slice = createSlice({
  name: '@@tasks',
  initialState,
  reducers: {
    updateEntityStatusTask(
      state,
      action: PayloadAction<{
        todoListID: string
        taskID: string
        entityStatus: RequestStatusType
      }>
    ) {
      const tasks = state[action.payload.todoListID]
      const index = tasks.findIndex(task => task.id === action.payload.taskID)

      if (index !== -1)
        tasks[index] = { ...tasks[index], entityStatus: action.payload.entityStatus }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(todoListsThunks.fetchTodoLists.fulfilled, (state, action) => {
        action.payload.todoLists.forEach(todoList => {
          state[todoList.id] = []
        })
      })
      .addCase(todoListsThunks.deleteTodoList.fulfilled, (state, action) => {
        delete state[action.payload.ID]
      })
      .addCase(todoListsThunks.createTodoList.fulfilled, (state, action) => {
        state[action.payload.todoList.id] = []
      })
      .addCase(todoListsActions.clearTodoLists, () => ({}))
      .addCase(fetchTasks.fulfilled, (state, action) => {
        action.payload.tasks.forEach(task => {
          state[action.payload.todoListID].push({ ...task, entityStatus: 'idle' })
        })
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListID]
        const index = tasks.findIndex(task => task.id === action.payload.taskID)

        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift({
          ...action.payload.task,
          entityStatus: 'idle',
        })
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListID]
        const index = tasks.findIndex(task => task.id === action.payload.taskID)

        if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.data }
      })
  },
})

//EXPORTS
export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, deleteTask, createTask, updateTask }

// TYPES
export type TasksInitialStateType = TasksType
