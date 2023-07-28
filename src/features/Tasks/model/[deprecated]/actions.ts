import { TaskType, UpdateTaskModelType } from '../types.ts'

export const tasksActions = {
  setTasks(todoListID: string, tasks: TaskType[]) {
    return {
      type: 'TASKS/SET-TASKS',
      payload: { todoListID, tasks },
    } as const
  },
  deleteTask(todoListID: string, taskID: string) {
    return {
      type: 'TASKS/DELETE-TASK',
      payload: { todoListID, taskID },
    } as const
  },
  createTask(task: TaskType) {
    return {
      type: 'TASKS/CREATE-TASK',
      payload: { task },
    } as const
  },
  updateTask(todoListID: string, taskID: string, model: Partial<UpdateTaskModelType>) {
    return {
      type: 'TASKS/UPDATE-TASK',
      payload: { todoListID, taskID, model },
    } as const
  },
}

// TYPES
export type TasksActionsType = typeof tasksActions
