import { TaskType, UpdateTaskModelType } from './types.ts'

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

// TYPES
export type TasksActionsType = typeof tasksActions
