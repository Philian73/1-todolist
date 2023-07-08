export type FilterValuesType = 'all' | 'active' | 'completed'
export type RequestStatusTodoListType = 'idle' | 'loading'

export type TodoListType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
  entityStatus: RequestStatusTodoListType
}

export type UpdateTodoListDomainModelType = Partial<
  Omit<TodoListDomainType, 'id' | 'addedDate' | 'order'>
>
