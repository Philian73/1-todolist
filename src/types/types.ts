export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodoListDomainType = TodoListType & { filter: FilterValuesType }

export type TaskType = {
  addedDate: string
  deadline: string | null
  description: string | null
  id: string
  order: number
  priority: TaskPriorities
  startDate: string | null
  status: TaskStatuses
  title: string
  todoListId: string
}

export type UpdateTaskModelType = Partial<
  Omit<TaskType, 'id' | 'todoListId' | 'addedDate' | 'order'>
>

export type TasksType = {
  [key: string]: TaskType[]
}
