export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TodoListDomainType = TodoListType & { filter: FilterValuesType }

export type UpdateTodoListDomainType = Partial<
  Omit<TodoListDomainType, 'id' | 'addedDate' | 'order'>
>
